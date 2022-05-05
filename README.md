# Todo app using NodeJS and NextJS

This is a simple to do app developed using NodeJS for backend server and NextJS for frontend. This application uses JWT for token authentication mechanism for accessing the APIs.

## Installation

First clone the repository.

### Frontend

Navigate in to the frontend directory and run the following command.

```bash
npm install
```

Then you can up the frontend app by running,

```bash
npm run dev
```
You can access the frontend app after doing the above steps by navigaing to http://localhost:3000/

### Backend

Navigate in to the backend directory and run the following command.

```bash
npm install
```
After installing the dependencies, navigate in to the <b>app/config</b> directory and give your own mysql database credentials to the fields in the file <b>db.config.js</b>.

Then you can up the backend server by running,

```bash
node server.js
```

Once the server is up all the database tables will be created and meta data for the tables will be added.
