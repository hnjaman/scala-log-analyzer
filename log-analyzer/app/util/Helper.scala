package util

import models.RequestDataForm
import play.api.libs.json.{Json, OFormat}
import play.api.mvc.AnyContent

class Helper {
  implicit val requestDataFormJson: OFormat[RequestDataForm] =
    Json.format[RequestDataForm]

  def dataRequestFormatter(body: AnyContent): RequestDataForm = {
    val content = body
    val jsonObject = content.asJson
    val requestDataForm: Option[RequestDataForm] = {
      jsonObject.flatMap(Json.fromJson[RequestDataForm](_).asOpt)
    }
    requestDataForm match {
      case Some(requestData) =>
        RequestDataForm(
          requestData.datetimeFrom,
          requestData.datetimeUntil,
          requestData.phrase
        )
      case None =>
        null
    }
  }
}
