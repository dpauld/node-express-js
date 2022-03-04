### Which folder does what and How to use the resources of this folder

1. **http-in-depth** - Contains some example of node\'s http method

2. **final** - contains all the example files of express tutorial

3. **methods-public** - this contains the frontend app of a form, which is used as a middleware inside the files named \*11-methods-\**, located inside the *final\* folder to explain how to handle http methods(GET, POST, PUT, DELETE).

4. **navbar-app** - this contains html file, which is used inside _4-express-app.js_

5. **public** - this folder contains files(mainly to serve css,images, static html pages) used inside _4-express-app.js_ and _5-express-all-static.js_

6. **middlewares** - _logger.js_, _loggerTime.js_ and _authorize.js_ are middlewares which are used in the files located in _final_-> _files with prefixes 8 to 10 in the names_.

7. **route** - contains router files that is used in _app.js_ to set the route

8. **controllers** - contains router controller files that is used in the files of _route_ folders. The files inside controllers folder contains callbacks methods to handle requests.

9. parse form data, 'urlencoded()' is used to recognize the incoming Request Object as strings or arrays. Mostly, used for req by html form post

```javascript
app.use(express.urlencoded({ extended: false }));
```

This is used to parse json,

```javascript
app.use(express.json());
```

### Concepts

1. `next()`
   `next()` is used to pass the execution to the next middleware.
   Example 1:

   ```javascript
   app.get("/hello", function (req, res, next) {
     res.send("Hello World !!!!");
   });
   app.get("/hello", function (req, res, next) {
     res.send("Hello Planet !!!!");
   });
   ```

   Here we have 2 middleware functions for the same path. But you always gonna get the response from the first one. Because that is mounted first in the middleware stack and res.send will end the cycle.

   But what if we always do not want the “Hello World !!!!” response back. For some conditions we may want the "Hello Planet !!!!" response. Let’s modify the above code and see what happens.

   Example 2:

   ```javascript
   app.get('/hello', function (req, res, next) {
       if(some condition){
           next();
           return;
        }
        res.send("Hello World !!!!");
   });

   app.get('/hello', function (req, res, next) {
       res.send("Hello Planet !!!!");
   });
   ```

   The `next()` method called inside if gonna skip the first middleware function if the condition is true and invoke the next middleware function and you will have the "Hello Planet !!!!" response.
   [Read This...](https://stackoverflow.com/questions/10695629/what-is-the-parameter-next-used-for-in-express) and [Read More..](https://stackoverflow.com/questions/8710669/having-a-hard-time-trying-to-understand-next-next-in-express-js)
