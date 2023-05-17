class Validator: 
  def is_valid(self, _data):
    pass
  
  def get_message_error(self, _att):
    pass

class ValidatorNumeric(Validator):
  def is_valid(self, data):
    return isinstance(data, int) or isinstance(data, float) 
  
  def get_message_error(self, att):
    return f"{att}: is not a valid number"

class ValidatorNotNull(Validator):
  def is_valid(self, data):
    return data is not None
  
  def get_message_error(self, att):
    return f"{att}: is None"
  
class ValidatorStr(Validator):
  def is_valid(self, data):
    return isinstance(data, str)
  
  def get_message_error(self, att):
    return f"{att}: is not a valid string"
  
class ValidatorMinimumChars(Validator):
  def is_valid(self, data):
    return len(data) > 3
      
  def get_message_error(self, att):
    return f"{att}: contains minimum characters except"
