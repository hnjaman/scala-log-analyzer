package controllers.api

import models.{
  Data,
  FileSize,
  FileStatus,
  GetDataResponse,
  GetHistogramResponse,
  HighlightText,
  Histogram
}
import play.api.libs.json.{Json, OFormat}
import play.api.mvc.{
  AbstractController,
  Action,
  AnyContent,
  ControllerComponents
}
import services.LogAnalyzeService
import util.Helper

import javax.inject.Inject

class LogAnalyzeController @Inject() (
    controllerComponents: ControllerComponents,
    logAnalyzeService: LogAnalyzeService,
    helper: Helper
) extends AbstractController(controllerComponents) {
  implicit val highlightTextModelJson: OFormat[HighlightText] =
    Json.format[HighlightText]
  implicit val histogramJson: OFormat[Histogram] = Json.format[Histogram]
  implicit val dataModelJson: OFormat[Data] = Json.format[Data]
  implicit val getDataResponseJson: OFormat[GetDataResponse] =
    Json.format[GetDataResponse]
  implicit val getHistogramResponseJson: OFormat[GetHistogramResponse] =
    Json.format[GetHistogramResponse]
  implicit val fileStatusJson: OFormat[FileStatus] = Json.format[FileStatus]
  implicit val fileSizeJson: OFormat[FileSize] = Json.format[FileSize]

  def getFileSize: Action[AnyContent] =
    Action {
      Ok(Json.toJson(logAnalyzeService.getFileSize()))
    }

  def getFileStatus: Action[AnyContent] =
    Action {
      Ok(Json.toJson(logAnalyzeService.getFileStatus()))
    }

  def getData: Action[AnyContent] =
    Action { implicit request =>
      val requestDataForm = helper.dataRequestFormatter(request.body)
      requestDataForm match {
        case requestDataForm =>
          Ok(Json.toJson(logAnalyzeService.getData(requestDataForm)))
        case null =>
          BadRequest
      }
    }

  def getHistogram: Action[AnyContent] =
    Action { implicit request =>
      val requestDataForm = helper.dataRequestFormatter(request.body)
      requestDataForm match {
        case requestDataForm =>
          Ok(Json.toJson(logAnalyzeService.getHistogram(requestDataForm)))
        case null =>
          BadRequest
      }
    }
}
