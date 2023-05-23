from rest_framework.response import Response
from rest_framework import status


def validator(validator):
  def decorator(function):
    def wrapper_decorator(*args, **kwargs):
      request = args[1]
      data = request.data if request.data else request.GET
      ok, errors = validator.is_valid(data)
      
      if ok:
        return function(*args, **kwargs)
      
      return Response({"errors": [error.values() for error in errors]}, status=status.HTTP_400_BAD_REQUEST)

    return wrapper_decorator    
  return decorator