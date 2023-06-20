from wvalidate import Validate as v
from wvalidate.validator import Validator
from wvalidate.validator_return import ValidatorReturn
from wvalidate.validator_error import ValidatorError
from datetime import datetime

class EventDateValidator(Validator):
  def validateFormatDate(self, date):
    try:
      res = bool(datetime.strptime(date, "%Y-%m-%dT%H:%M"))
    except ValueError:
      res = False
    return res
  
  def is_valid(self, data: object) -> ValidatorReturn:
    
    if not isinstance(data, str):
      return ValidatorReturn(False, ValidatorError("Invalid date format."))
    
    if not self.validateFormatDate(data):
      return ValidatorReturn(False, ValidatorError("Invalid date format."))
      
    if datetime.now() >= datetime.strptime(data, "%Y-%m-%dT%H:%M"):
      return ValidatorReturn(False, ValidatorError("Invalid date, event date can not be before now."))
    
    return ValidatorReturn(True)

data_event = v.dict({
  "name": v.string(min=1),
  "description": v.string(min=1),
  "address": v.string(min=1),
  "city": v.string(min=1),
  "datetime": EventDateValidator()
})