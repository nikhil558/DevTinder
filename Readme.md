- create a repository
- Intialize the repository
- node_modules, package.json, package-lock.json
- Install Express
- Create a server
- Listen to port 7777
- Write request handlers for /hello, /test
- Install Nodemon and update scripts inside package.json
- What are dependencies
- What is the use of "-g" while npm install
- Difference between caret and tilde (^ vs ~) 

- initilize git
- .gitignore
- create a remote repo in github
- push all code to remote repo
- play with routes and route extentions
- Order of the routes matter a lot.
- install postman app and make a workspace/collection > test api call
- write logic to handel get, post, delete api calls and test them on postman
- Explore routing and use of ?, +, (), * in the routes
- Use of regex in routes /a/ , /.*fly$/
- Reading the query params in the routes
- Reading the dynamic routes

- multiple route handlers - play with the code
- next()
- next function and errors along with res.send()
- What is middleware? why do we need middleware
- How express js basically handles request behind the scenes
- Difference between app.use and app.all
- write a dummy auth middleware for admin
- write a dummy auth middleware for All user routes, except login
- Error handling using app.use("/", (err, req, res, next) = {})

- create a free cluster on mangodb official website
- install mangoose library
- connect your application to database "connection url"/devTinder
- call the connectDb function and connect to database before starting application on 3000
- create a user schema & user model
- Create Post /signup API to add data to database
- Push some documents using API calls from postman
- Error handling using try catch

- JS object vs JSON (difference)
- Add the express.json middleware to your app
- make your signup API dynamic to receive data from the end user
- User.findone with dublicate email id's, which object returned?
- API - Get user by email 
- API - Feed API - Get /feed - get all the users from the database
- Create Delete API
- API - Update a user 
- Explore the Mongoose Documentation for model methods
- What are options is a model.findOneAndUpdate method, explore more about it
- API - update the user with email id

- Explore schemtype options from the documentation
- add required, unique, lowercase, min, minLength, trim
- Add default
- Create a custom validate function for gender
- Improve the DB schema - Put all appropiate validations on each field in schema
- Add timestamps to the userSchema
- ADD API Level validation on patch request & Signup post api
- Add API validation for each field