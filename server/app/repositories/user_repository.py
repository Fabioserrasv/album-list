def validate_user_sign_up(user, data):
    response = True
    if user:
        response = False
    elif len(data['email']) < 4:
        response = False
    elif len(data['name']) < 2:
        response = False
    elif data['password1'] != data['password2']:
        response = False
    elif len(data['password1']) < 7:
        response = False
    return response