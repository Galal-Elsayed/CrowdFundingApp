# Users App - Custom Authentication

This app handles user authentication for the Crowdfunding platform.

## Features

- ✅ Email-based authentication (no username needed)
- ✅ Required fields: First Name, Last Name, Email, Password
- ✅ Egyptian phone number validation (+201XXXXXXXXX format)
- ✅ Password confirmation during registration
- ✅ JWT token authentication
- ✅ Admin interface for user management

## API Endpoints

### Registration
```
POST /auth/users/
{
    "email": "user@example.com",
    "password": "securepassword123",
    "re_password": "securepassword123",
    "first_name": "John",
    "last_name": "Doe",
    "phone": "+201234567890"
}
```

### Login
```
POST /auth/jwt/create/
{
    "email": "user@example.com",
    "password": "securepassword123"
}
```

### Get Current User
```
GET /auth/users/me/
Authorization: Bearer <your_token>
```

### Update User Profile
```
PUT /auth/users/me/
Authorization: Bearer <your_token>
{
    "first_name": "John",
    "last_name": "Smith",
    "phone": "+201234567890"
}
```

## Model Fields

- `email`: Unique email address (used for login)
- `first_name`: User's first name (required)
- `last_name`: User's last name (required)
- `phone`: Egyptian phone number (optional, validated format)
- `password`: User password (hashed)
- `date_joined`: Account creation date
- `is_active`: Account status
- `is_staff`: Admin access

## Phone Number Validation

Egyptian phone numbers must follow this format:
- Start with: `+201`
- Followed by: 9 digits
- Example: `+201234567890`

## Testing

Run tests with:
```bash
python manage.py test users
``` 