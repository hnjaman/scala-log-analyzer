package services

import models.{
  Data,
  FileSize,
  FileStatus,
  GetDataResponse,
  GetHistogramResponse,
  HighlightText,
  Histogram,
  RequestDataForm
}

import java.io.File
import java.time.LocalDate
import scala.collection.mutable.ArrayBuffer
import scala.io.Source

class LogAnalyzeService {

  val logFilePath = "/var/log/messages"
  val OK = "Ok"
  val NOT_EXISTS = "Not exists"

  def getFileStatus(): FileStatus = {
    val status = if (isFileExists(logFilePath)) OK else NOT_EXISTS
    FileStatus(status)
  }

  def getFileSize(): FileSize = {
    val size: Long = new File(logFilePath).length()
    FileSize(size)
  }

  def isFileExists(filePath: String): Boolean = {
    new File(filePath).exists()
  }

  def getData(requestDataForm: RequestDataForm): GetDataResponse = {
    val data: ArrayBuffer[Data] = readLog(requestDataForm)
    GetDataResponse(
      data,
      requestDataForm.datetimeFrom,
      requestDataForm.datetimeUntil,
      requestDataForm.phrase
    )
  }

  def getHistogram(requestDataForm: RequestDataForm): GetHistogramResponse = {
    val histogramArray = ArrayBuffer[Histogram]()
    val dataArray: ArrayBuffer[Data] = readLog(requestDataForm)
    for (data <- dataArray) {
      val histogram = Histogram(data.datetime, data.highlightText.length)
      histogramArray.addOne(histogram)
    }
    GetHistogramResponse(
      histogramArray,
      requestDataForm.datetimeFrom,
      requestDataForm.datetimeUntil,
      requestDataForm.phrase
    )
  }

  def readLog(requestDataForm: RequestDataForm): ArrayBuffer[Data] = {
    var dataList = new ArrayBuffer[Data]()
    val pattern = "(\\d{4}-\\d{2}-\\d{2})".r // 2021-04-10
    val dateTimePattern =
      "(\\d{4}-\\d{2}-\\d{2}\\s\\d{2}:\\d{2}:\\d{2})".r // 2021-04-10 00:17:57
    val datetimeFrom = LocalDate.parse(requestDataForm.datetimeFrom)
    val datetimeUntil = LocalDate.parse(requestDataForm.datetimeUntil)
    val bufferedSource = Source.fromFile(logFilePath)
    for (line <- bufferedSource.getLines) {
      val logDate = (pattern findAllIn line).mkString("")
      val logDateTime = (dateTimePattern findAllIn line).mkString("")
      val logLocalDate = LocalDate.parse(logDate)
      if (
        (datetimeFrom.compareTo(logLocalDate) == 0 || datetimeFrom.compareTo(
          logLocalDate
        ) < 0)
        && (datetimeUntil.compareTo(logLocalDate) == 0 || datetimeUntil
          .compareTo(logLocalDate) > 0)
      ) {
        val message = line.substring(logDateTime.length + 2)
        val highlightTextArray: ArrayBuffer[HighlightText] =
          getHighlightText(message, requestDataForm.phrase)
        val data = Data(logDateTime, message, highlightTextArray)
        dataList.addOne(data)
      }
    }
    bufferedSource.close

    dataList
  }

  def getHighlightText(
      message: String,
      phrase: String
  ): ArrayBuffer[HighlightText] = {
    var highlightTextList = new ArrayBuffer[HighlightText]();
    val size = message.length() - phrase.length() + 1;
    for (i <- 0 until size) {
      if (message.substring(i, i + phrase.length()).equals(phrase)) {
        val highlightText = HighlightText(i, i + phrase.length() - 1)
        highlightTextList.addOne(highlightText)
      }
    }
    highlightTextList
  }
}
