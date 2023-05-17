from rest_framework.response import Response
from rest_framework import status
def is_valid(data, validators):
  for att, wrapper_validators in validators.items():
    if isinstance(wrapper_validators, dict):
      sub_data = data.get(att, None)
      
      if not isinstance(sub_data, dict):
        return False, f"{att}: invalid format"
      
      ok, message_error = is_valid(sub_data, wrapper_validators)
      if not ok:
        return False, message_error
    
    elif isinstance(wrapper_validators, list):
      for validator in wrapper_validators:
        if not validator.is_valid(data.get(att, None)):
          return False, validator.get_message_error(att)
        
    else: 
      validator = wrapper_validators
      if not validator.is_valid(data.get(att, None)):
        return False, validator.get_message_error(att)
      
  return True, None

def validator(validator):
  def decorator(function):
    def wrapper_decorator(*args, **kwargs):
      request = args[1]
      data = request.data if request.data else request.GET
      ok, message_error = is_valid(data, validator)
      
      if ok:
        return function(*args, **kwargs)
      
      return Response({"error":message_error}, status=status.HTTP_400_BAD_REQUEST)

    return wrapper_decorator    
  return decorator