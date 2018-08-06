# Bookshelf API 

## Requeriments:

* Node.js
* MongoDB Server


### Step 1: Installing dependencies

It's neccesary to have all dependencies listed in `package.json` installed in order to run our server properly. 

> $ npm install

When all dependencies are instaled, run the aplication.

> $ node app

If everything is OK, you will see the following in the console: 

```
Running on port 8000
```

Now we have the app up and running! 

### Step 2: populating MongoDB

Using postman or web broser, make an HTTP GET request to the following endpoint: 

```
http://localhost:8000/api/populateDB

```

This endpoint populates the DB with 13 books and a default user with `admin:admin` credentials 

### Step 3: Knowing the API

#### Models

Book model schema:

```JavaScript
  bookId: Number,
  isbn: String,
  acquisitionDate: Date,
  bookshelf: {
    location: String,
    copies: Number,
    isLent: Boolean,
  },
  rating: Number,
```

User model schema: 
```JavaScript
  username: String,
  password_hash: String,
  full_name: String,
  role: String,
  occupation: String,
  age: Number,
```
Reservation model schema: 
```JavaScript
  bookId: Number,
  userId: Number,
  returnDate: Date,
```






The API has the following endpoints with their respective methods and authorizations: 

```
Non-Authenticated
POST: /api/login
POST: /api/signup

Bearer token (JWT Signed)
GET: /api/books/
GET: /api/books/:id
POST: /api/books/:id/lend
```

#### NOTE: All POST requests must be sent using x-www-form-urlencoded:  

POST requests header: 
```JSON
'Content-Type': "application/x-www-form-urlencoded"
```

### Step 4: Creating a new user

In order to use the authenticated endpoints we need to create an user, to do this we are going to use the `/api/signup` endpoint with Postman 

The body of this request consist in the following `key : value` pairs: 

```JSON
"username": String
"password": String
"full_name": String
"role": String
"occupation": String
"age": Number
```
If everyting is ok , the server will give you the following response: 

In this case I put my personal info

```JSON
{
    "status": 201,
    "message": "User created sucessfully!",
    "user_data": {
        "username": "Misaji",
        "full_name": "Miguel Isaza",
        "role": "ADMIN",
        "occupation": "Developer",
        "age": 23,
        "password_hash": "It's secret!",
        "_id": 1,
        "__v": 0
    }
}
```

### Step 5: Logging in 

Now, we have an account!, let's login to get our token...

You can reach login in the `/api/login` endpoint

The body of this request consist in the following `key : value` pairs: 

```JSON
"username": String
"password": String
```

If everyting is OK, the server will give you the following response: 

In this case I put my personal info

```JSON
{
    "username": "Misaji",
    "name": "Miguel Isaza",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Ik1pc2FqaSIsImZ1bGxfbmFtZSI6Ik1pZ3VlbCBJc2F6YSIsIl9pZCI6MCwicm9sZSI6ImFkbWluIiwiaWF0IjoxNTI5NzA1NjE5LCJleHAiOjE1Mjk3MDkyMTl9.yLhPMFojbVME5tOmiGJx-7kl9T87hNljJUVbegqNJNY"
}
```

### Step 6: Using private endpoints.

Now we have an access token! 

With this token we can use the private endpoints

#### It's necessary to put the token in request headers in order get a sucessful response 

If you don't provide the token, the server will give you the following response: 

```JSON
{
    "status": 401,
    "message": "You must be authenticated to access this endpoint!"
}
```

The following `key : value` pair must be in the request header: 

```JSON 
"Content-Type": "application/x-www-form-urlencoded",
"Authorization": "Bearer YOUR_TOKEN",
```

If everything is ok, you will get the normal response of the server.

## Bookshelf Endpoints: 

* ###  `/api/books`

This endpoint returns all `books` in any `bookshelf`, you can filter by the bookshelves location using the `location` query parameter, followed by the name of the location.

 If you enter an invalid location, the server will give you the following response: 

 ```JSON
 {
    "status": 400,
    "message": "Enter a valid location!",
    "valid_locations": [
        "Cartagena",
        "Medellin",
        "Quito",
        "Digital"
    ]
}
 ```
If everything is ok, the server will give you the following response: 

```JSON
{
    "status": 200,
    "message": "OK",
    "books": [
        {
            "bookshelf": {
                "location": "Cartagena",
                "copies": 1,
                "isLent": false
            },
            "_id": "5b2ab398da3e4d44335d6bf8",
            "bookId": 12,
            "isbn": "0471237124",
            "rating": 5
        },
        {
                ...
        }
        ...
    ]
}
```

You also can enter multiple locations in the query. 

* ###  `/api/books/:id`

This endpoind will return you a single `Book` by its `bookId` 

If you enter a `bookId` that doesn't exist, the server will give you the following response: 

```JSON
{
    "status": 404,
    "description": "Not found",
    "message": "There is no book with this id"
}
```

If everyting is OK, the server will respond with a single `Book`.

* ###  `/api/books/:id/lent`

This endpoint makes the lent process for a particular book


The body of this request consist in the following `key : value` pairs: 

```JSON
"return_day": Date
```
This `Date` format is MM/DD/YYYY.

If you put another key value in the body the server will respond with the following message: 

```JSON
{
    "status": 400,
    "message": "Please enter a valid body key",
    "valid_key": "return_day"
}
```

If everyting is OK, the server will respond with the following: 

```JSON
{
    "status": 200,
    "message": "OK, book lent",
    "data": {
        "book": {
            "bookshelf": {
                "location": "Digital",
                "copies": null,
                "isLent": true
            },
            "_id": "5b2ab398da3e4d44335d6bf7",
            "bookId": 1,
            "isbn": "9781451648546",
            "rating": 3
        },
        "username": "Misaji",
        "return_day": "06/24/2018"
    }
}
```
