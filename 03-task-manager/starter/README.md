# HTTP Requests Types

## Terms

- Upsert - An operation that inserts rows into a database table if they do not already exist, or updates them if they do. Example:
- Insert - An operation that inserts rows into a database table does not chekcs if they exist or not. Example: Creating a new post in Facebook.

## HTTP Requests

- `POST` - Create NEW record
- `PUT` - If the record exists then update , else create a new record.
  - Replacing the record: use `PUT`. Does modifies values of other attributes as it replaces existing record. When using PUT, it is assumed that you are sending the complete entity, and that complete entity replaces any existing entity at that URI. When we create new document in the drive folder and it's already available we can replace that item, in Drive and it's available
- `PATCH` - update. If the record exists then update, otherwise send an error.
  - Updating a single attribute: use `PATCH`. Does not modifies values of other attributes.
    [PUT vs PATCH](https://stackoverflow.com/a/34400076/7828981)
- `GET` - read
- `DELETE` - delete

# How to find how many and which api need to be designed for a project?

Answer: for this to answer, just consider an app of single page, such as task manager project. Firstly if the ux design is available, see the design or scetch the design. Now mark where we need to interact with database or server?

1. When we want to got to a new page we need to interact with server. So the initial request of accessing the page is a get request.
2. Requests Associated with forms
   1. Task1: to read(and then show) all the tasks - get request
   2. Task2: submit item or create new item - post request (with body))
   3. Task3: get single task - get request (with params)
   4. Task4: editSingleItem - put/patch request (with new body)
   5. Task5: deleteSingleItem - delete request (with params)

# Database

1. Info 1: normally database connection code is placed inside environment folder. For this project initially we will place it inside db folder.

## Mongo DB

NoSQL, Non Relational DB, Stores in JSON Formate, Database is stored in ATLAS cloud.

1. Database is called `database`. Tables is called `collections`. And rows of a table is called `document`. For example, consider an ecommerce store database having the following table.
   1. users - table containing all the user data
   2. products - contains all the products data
      Then the "users" and "products" is a collection.
2. There is no set structure in a collection in Mongo Database. That means a document(or row) in a collection can have different amount and different data types and their values. But using different structure for different document is not a good practice. An example: ![Store database in MongoDB](./READMEImages/mongoDatabaseStructure.PNG)

3. We use mongoose schema for having a structured set of documents
4. to connect with database we use a connection string like the following: [mongodb+srv://user:<password>@nodeexpressprojects.thetp.mongodb.net/myFirstDatabase?retryWrites=true&w=majority]
   `myFirstDatabase` - change this to the database, If you manually created a database already. If you did not create one already, just use the databse name as you need, Mongo will automatically create one after connecting and then adding some item.
   `user` - change the user name to yours.
   `<password>` - add password of that user.
5. `mongoos.connect()` `parameters` - What they do? useNewUrlParse, useUnifiedTopology, useCreateIndex(deprecated), useFindAndModify(deprecated) etc
6. `mongoos.schema()` - Everything in Mongoose starts with a `Schema`. Each schema maps to a MongoDB collection and defines the shape or structure of the documents within that collection. Usually mongodb database does not have any structure, whereas in case of coding structure is important.

```javascript
import mongoose from "mongoose";
const { Schema } = mongoose;

const blogSchema = new Schema({
  title: String, // String is shorthand for {type: String}
  author: String,
  body: String,
  comments: [{ body: String, date: Date }],
  date: { type: Date, default: Date.now },
  hidden: Boolean,
  meta: {
    votes: Number,
    favs: Number,
  },
});
```

7. [`mongoose.model()`](https://mongoosejs.com/docs/models.html) - To use our `schema` definition, we need to convert it into a `Model` we can work with. To do so, we pass it into `mongoose.model(modelName, schema)`. An instance of a model is called a document. Models are responsible for creating and reading documents from the underlying MongoDB database.

```javascript
const Task = mongoose.model("Task", TaskSchema);
```

The first argument is the singular name of the collection your model is for. **_Mongoose automatically looks for the plural, lowercased version of your model name._** Thus, for the example above, the model Task is for the tasks collection in the database.

**_Note_**: The `.model()` function makes a copy of `schema`. Make sure that you've added everything you want in `schema` definition, including hooks, before calling `.model()`!

An instance of a model is called a document. Creating them and saving to the database is easy.

```javascript
const taskShakeNBake = new Task({ name: "shakeNbake" });
// there are other ways to create as well
```

8. Creating A document or adding a new item into the database collection

```javascript
//without catching the error
const task = await Task.create(req.body);
//or
const task = await Task.create({
  name: req.body.name,
  completed: req.body.completed,
});

//Alternative approach to handle error
const task = await Task.create(req.body, function (error, name, completed) {
  if (error) return res.status(500).json(error);
  // saved!
});

//or try catch to handle the error
try {
  const task = await Task.create(req.body);
  res.status(201).json({ task }); //201 for created
} catch (error) {
  res.status(500).json({ msg: error });
  // res.status(501).json(error.errors.name.message);
}
```

9. **_ Any extra property values passed to the database that is not part of `schema` definition will be ignored _**. For example,
   If schema is like so,

```javascript
const TaskSchema = mongoose.Schema({
  name: String,
  completed: Boolean,
});
```

But passed extra properties such as `random` and `amount` will be ignored. Database will not store these.

```javascript
{
    "name":"testing schema",
    "random" : "random",
    "completed": false,
    "amount": 5
}
```

10. **_ If you leave a property value undefined and not even assign a default value to a property, mongodb will ignore that property _** and will not add that property to the collection even if it was defined the schema. We add `validation` to avoid these issues.

```javascript
{
    "name":"testing schema",
    //"completed": false,// "completed" remains undefined, as a result will not be added in database
}
```

11. We can add `validation` when defining schema inside schema method.
    Q) handling promise error with passing error handling paramater callback inside create method
12. [Queries](https://mongoosejs.com/docs/queries.html): Mongoose `models` provide several static helper functions for **_ CRUD _** operations. Each of these functions(such as, model.find(), model.findbyId()) returns a mongoose `Query` object.
    Mongoose has a `Query` object which has a `.then()` method like promise. However, **_ `query` object is not a promise. _**
    [Reading on Async Await](http://thecodebarbarian.com/common-async-await-design-patterns-in-node.js.html)
    Q. Since the Query object returned by helper functions is not promise, why do we use async-await?
    [Awaiting a non-promise effect](https://stackoverflow.com/questions/55262996/does-awaiting-a-non-promise-have-any-detectable-effect) and
    (Any non promise converted to promise)[https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/await#conversion_to_promise]
13. Queries: **_ `Model.find()` _**
    `Model.find()` method always **_returns an empty array if no item is found_**, does not return null. To check if an array is empty or not we can use `if(!array.length)`.
14. Queries: `Model.findById()`
    `Model.findById()` method **_returns null if no item is found_**, does not return empty array
15. Queries: `.findOne()`
    `Model.findOne()` method **_returns null if no item is found_**, does not return empty array
16. `.exec()` in mongoose: `.exec()` returns a full fledge promise(mentioned in the second line)[https://mongoosejs.com/docs/promises.html#queries-are-not-promises], whereas just using normal queries returns a thenable object. Another benefit is with `.exec()` stack tracing is better. [read](https://mongoosejs.com/docs/promises.html#should-you-use-exec-with-await)
    Q. What does `.exec()` method do in mongoose findOne method?
    Answer: [read](https://stackoverflow.com/questions/31549857/mongoose-what-does-the-exec-function-do)
17. `Model.findOneAndDelete()`
    Finds a matching document, removes it, and passes the found document (if any) to the callback. **_ `findOneAndDelete` returns null if item is not found. _**
18. `findOneAndDelete()` vs `findOneAndRemove() `
    `Model.findOneAndDelete()` function differs slightly from `Model.findOneAndRemove()` in that mongoose `findOneAndRemove()` becomes a MongoDB `findAndModify()` command, as opposed to a mongoose `findOneAndDelete()` command. For most mongoose use cases, this distinction is purely pedantic. You should use findOneAndDelete() unless you have a good reason not to.
    Source: [mongoose documentation on delete](https://mongoosejs.com/docs/api.html#model_Model.findOneAndDelete) or [delete vs remove stackoverflow](https://stackoverflow.com/questions/31549857/mongoose-what-does-the-exec-function-do)
19. `findOneAndUpdate()`

# Dotenv

This package is used to have some secret environment setup for security reason.

1. A `.env` file stores the data
2. to access the data inside `.env` file from another package or file we use the follwing code that uses `dotenv` package

   ```javascript
   require("dotenv").config(); // to import the data to that file

   process.env.VARIABLE_NAME; //to access the VARIABLE_NAME data
   ```

   `process.env` now has the keys and values defined in .env file.

3. more in [npm dotenv package](https://www.npmjs.com/package/dotenv)

# Which folder does what?

1. routes - contains router files that is used in app.js to set the route. Example of Router files: `auth.js` contains all the codes to route controller function(eg. `.getTask() `, `.deleteTask()`) related to user authentication that will handle all the get, post, delete and other requests. Also `task.js` contains all the codes to route to all the get, post, delete controller function related to tasks. See the Jobs-API project for better understanding.
2. controllers - contains router controller files that is used in the files of route folders. The files inside controllers folder contains callbacks methods known as controller function to handle get, post or other requests. For example `auth.js` contains all the callback functions to deliver the get, post, delete or other request related to user authentication. Also `task.js` contains all the callback functions to deliver the get, post, delete or other request related to task.
3. middlewares - contains all the user defined middlewares.
4. errors - contains all the user defined errors. Each of them will deliver custom message based on different error.
5. db - contains the connection and all of database setup
6. models - contains the schema or definitions of collections

# Package used in this project

1. express
2. axios
3. mongoose
4. dotenv
5. nodemon (development dependecy)

# Builtin Middlewares used

1. For parsing json, order of placing matters

```javascript
//parse json middleware,
app.use(express.json());
```

2. For other

# Questions?

1. (need more investigation) Instance of model creation with mongoose create function. Why we use await with create? We use await since `create` returns promise or something else? and why not use insternal callback parameter?
2. (Answerd) What await line in async await returns?
   Answer: the result of resolved promise.
3. (?) Task: Getting back to query then method and promise then method. [Link](https://mongoosejs.com/docs/queries.html#queries-are-not-promises), does promise with callback and after that using then performse like the query then.
4. Real life usage example of PUT
5. Does AXIOS treats 404, 500 responses as error by default?

# To DO

1. Handle error related to id being less than 24 hex (Cast to ObjectId failed for value)
