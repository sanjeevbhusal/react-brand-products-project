This project uses React in Frontend with Typescript for TypeSafety, Tailwind CSS for styling, axios for data-fetching and React-icons for svg Icons.

### Flow of the application

Frontend communicates with Json-server backend to perform CRUD Operations on Brand and Products.

Json-server backend writes to a file called `db.json`.

### Running Project Locally

To start Backend application, run the command.
`json-server --watch db.json`

Note: You need to install json-server globally with the command
`npm install json-server -g`

To start Frontend, run the command
`npm install && npm run dev`

Json-server runs on port 3000 by default. Frontend communicates with json-serveron port 3000. If any other application is running on port 3000, please close that application.
