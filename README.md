# Batch 3 Assignment 3 (2-meeting-room-booking-system)

## Installation:

1. Clone the repository.
2. Install dependencies using `npm install`.
3. Rename `.env.example` to `.env`.
4. Run the server using `npm run start:dev or npm run start:prod`.

## Configuration:

- Environment Variables:
  - `NODE_ENV`: Select your project mode.
  - `PORT`: Port number for server listening.
  - `DATABASE_URL`: Provide MongoDB Mongoose Database URL.
  - `JWT_SECRET`: Secret key for JWT token generation.
  - `BYCRYPT_SALT_ROUND`: Provide Bcrypt Salt Round.
  - `JWT_ACCESS_SECRET`: Provide Access Secret text.
  - `EXPIRES_IN`: Token expiry duration.

## Usage:

- API Endpoints:

  - POST `/api/auth/signup`

    - Description: User Register.
    - Request:
      ```json
      {
        "name": "Ahsan Habib",
        "email": "habib@hero.com",
        "password": "hb-password",
        "phone": "1234567890",
        "role": "admin",
        "address": "Dhaka, Bangladesh"
      }
      ```
    - Response:
      ```json
      {
        "success": true,
        "statusCode": 200,
        "message": "User registered successfully",
        "data": {
          "_id": "66ddbe80eb64d3d5c3b5744d",
          "name": "Ahsan Habib",
          "email": "habib@hero.com",
          "phone": "1234567890",
          "role": "admin",
          "address": "Dhaka, Bangladesh"
        }
      }
      ```

  - POST `/api/auth/login`

    - Description: Registers a new user.
    - Request:

      ```json
      {
        "email": "habib@hero.com",
        "password": "hb-password"
      }
      ```

      - Response:

      ```json
      {
        "success": true,
        "statusCode": 200,
        "message": "User logged in successfully",
        "token": "Something",
        "data": {
          "_id": "60629b8e8cfcd926384b6e5e",
          "name": "Programming Hero",
          "email": "web@programming-hero.com",
          "phone": "1234567890",
          "role": "admin",
          "address": "123 Main Street, City, Country"
        }
      }
      ```

    - We work More Routes all routes cannot be possible to describe please follow this type of instruction and You need more information please contact me.

## Dependencies:

- `bcrypt`: For Encrypt Password.
- `cors`: Express middleware for CORS .
- `dotenv`: For Environment file ex: .env.
- `express`: Node JS Web Framework.
- `httpstatus`: For Correct Status code for Website.
- `jsonwebtoken`: For Secure Website. To verify user by token.
- `mongoose`: No SQL MongoDB Database ODM Library.
- `zod`: For Schema Validation.
