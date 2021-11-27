# project-storage

## Technologies

| USAGE                    | TECHNOLOGY  | DESCRIPTION                                        |
| ------------------------ | ----------- | -------------------------------------------------- |
| Asynchoronous operations | async-await | We decided to use async-await instead of promises. |
| Styling                  | Undecided   | Need to decide on a styling solution.              |
| File-uploads             | Cloudinary  | File uploads.                                      |

## Server-side

### Models

- User
  - firstName - String
  - lastName - String
  - phoneNumber - String
  - location - Point, has coordenates
  - email - String
  - passwordHashAndSalt - String
  - role - String, either 'tenant' or 'landlord',
  - active - Boolean, default: false
- Storage
  - name - String
  - description - String
  - owner - ObjectId, refers to user document
  - location - Point, has coordenates
  - price - String
  - galery - Array of strings
  - isRented - Boolean
  - renter - ObjectId, starts as null
  - width - Number
  - length - Number
- Review

  - reviewer - ObjectId
  - storage - ObjectId

- Subscription
  - user - ObjectId, refers to user document
  - startDate - Date
  - nextBillingDate - Date
  - active - Boolean
  - customerId - String, provided by Stripe (should exist for renters only).
- Charge
  - subscription - ObjectId, refers to subscription document
  - date - Date
  - successful - Boolean

### CRON Jobs

Some scripts need to run at predetermined intervals.

- Script that lists subscriptions where nextBillingDate is in the past and active is true. It triggers a credit card charge through Stripe, it creates a charge document where successful is set to wether the charge was successful or not. If true, then nextBillingDate on subscription document is set to today + 30 days. If false, active is set to false.

### Controllers (REST API endpoints)

// all, authenticated, viewers, creators, visitor

| METHOD | PATH                          | DESCRIPTION                                                             | AUTHENTICATION |
| ------ | ----------------------------- | ----------------------------------------------------------------------- | -------------- |
| GET    | "/user"                       | Return authenticated user.                                              | authenticated  |
| GET    | "/user/:id"                   | Return a user based on id.                                              | authenticated  |
| PATCH  | "/user"                       | Update a user based on id.                                              | authenticated  |
| DELETE | "/user"                       | Delete user based on id.                                                | authenticated  |
| GET    | "/storage/list"               | List all storages.                                                      | all            |
| GET    | "/storage/:id"                | Get a single storage with details.                                      | all            |
| POST   | "/storage"                    | Create a new storage.                                                   | landlord       |
| PATCH  | "/storage/:id"                | Update existing storage's details.                                      | landlord       |
| DELETE | "/storage/:id"                | Delete storage's details.                                               | landlord       |
| POST   | "/authentication/sign-up"     | Register for the service with a new account                             | visitor        |
| POST   | "/authentication/sign-in"     | Sign In.                                                                | visitor        |
| DELETE | "/authentication/sign-out"    | Sign Out.                                                               | authenticated  |
| GET    | "/subscription"               | Get status of subscription.                                             | renter         |
| POST   | "/subscription"               | Create new renter subscription (credit card details - stripe token)     | renter         |
| GET    | "/file-upload-authentication" | Allow imagekit to generate a signed URL that can be used to upload file | creators       |

// GET - Load data
// POST - Create new resource
// PATCH - Edit resource.
// DELETE - Delete resource.
// PUT - Replace resource.
// OPTIONS, ETC.

## Client-side

### Views

| NAME              | DESCRIPTION                                                                                                                                                                                                                        |
| ----------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Home              | Display landing page, maybe showing some storages near the user if authenticated in a carousel, if not authenticated show sign in and sign up options, allow user to search storages even if not authenticated                     |
| Storage           | Display information about the storage space such as price, pictures, owner, location and description. Should show availability and option to rent if authenticated, if not authenticated it should instead display 'login to rent' |
|                   |
| SignIn            | Show sign in form.                                                                                                                                                                                                                 |
| SignUp            | Show sign up form.                                                                                                                                                                                                                 |
| LandlordSignUp    | Show sign up form.                                                                                                                                                                                                                 |
| RentedSpaces      | Shows a renter the spaces he is renting, if no space is being rented by the user it should show storage spaces near him                                                                                                            |
| Settings          | Allow viewers to change account settings (email, password, locations).                                                                                                                                                             |
| StorageCreate     | Allows landlords to add a storage space                                                                                                                                                                                            |
| StorageList       | Shows a landlord all of their storages with option to click the to edit them (entering StorageManagement view)                                                                                                                     |
| StorageManagement | Allows landlords to manage a storage space. LandlordSignUp                                                                                                                                                                         |
| StorageSearch     | Displays input to search for storages with options to filter be parameters such as location, distance, price, size                                                                                                                 |
| Payment           | Displays the payment options with inputs for credit card number, expiration date etc.                                                                                                                                              |
