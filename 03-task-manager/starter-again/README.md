# Task Manager Starter - A nodejs and mongodb based project

[Task Manager](https://nodejs-task-manager-dpauld.herokuapp.com/) Live here.

This contains the project files of Task Manager when I practised the project again. This contains the most latest codes of the project. Please read the [docs](../starter/README.md) for understanding the project better.

## Clone this project

1. Clone the project in your local repository from Github
2. Install all the node modules using `npm install` command or install the required package individually.
3. Uncomment `require("dotenv").config()` line of `app.js` to run it locally. On the other hand, If you plan to deploy, comment this line of code to avoid port conflict. In case of running locally create a new file for setting up environment varibale, name it `.env`. Then assign `PORT = 3000` and `MONGODB_URI = "<your mongodb database connection string>"` inside the `.env` file.
4. [Optional] If `node_modules` is added in `.gitignore` file, then dont have it in `.gitigone` file. This way the node_modules will get deployed in the server. You may face error if you dont deploy the `node_modules` folder in the server.

Further information about the Deployment of Task Manager project read the [deployment doc](https://github.com/dpauld/nodejs-task-manager-app/blob/main/README.md) section.
