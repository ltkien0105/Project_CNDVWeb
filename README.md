# All Project of CT313H

### Requirements: NodeJS

### To use peoject, you need to download entire repository and `cd` to project you want to use. Then, following these step to start the project
### Note: You can delete unnecessary project
 - With 2 front-end project (contactbook-fe, project-movie-frontend):
   - Run `npm install` to install necessary packages
   - Run `npm run dev` to start

 - With 2 back-end project (contactbook-be, project-movie-backend):
   - `npm install` to install necessary package
   - Import sql file to mysql database
   - Add .env file to the root of project with these config
     `PORT=3000
      DB_HOST=localhost
      DB_PORT=3306
      DB_USER={user database}
      DB_PASS={password of database}
      DB_NAME={name of database}
     `
   - Run `npx knex seed:run` to run seed file for inserting data to database.
   - Run `npm start` to start the server
