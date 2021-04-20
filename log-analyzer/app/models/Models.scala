package models

import scala.collection.mutable.ArrayBuffer

case class FileSize(size: Long)

case class FileStatus(status: String)

case class HighlightText(
    fromPosition: Int,
    toPosition: Int
)

case class Data(
    datetime: String,
    message: String,
    highlightText: ArrayBuffer[HighlightText]
)

case class GetDataResponse(
    data: ArrayBuffer[Data],
    datetimeFrom: String,
    datetimeUntil: String,
    phrase: String
)

case class RequestDataForm(
    datetimeFrom: String,
    datetimeUntil: String,
    phrase: String
)

case class Histogram(
    datetime: String,
    counts: Int
)

case class GetHistogramResponse(
    histogram: ArrayBuffer[Histogram],
    datetimeFrom: String,
    datetimeUntil: String,
    phrase: String
)
