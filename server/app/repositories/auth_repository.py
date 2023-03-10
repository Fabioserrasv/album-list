def get_data_from_user(current_user):
    return {
        'name': current_user.first_name,
        'email': current_user.email
    }