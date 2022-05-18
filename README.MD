# Typescript Base API
InversifyJS Typescript API is a starter project for building a rest API. The API is built using Typescript, InversifyJS, and Typeorm. Documentation is generated using APIDoc. Testing and coverage reports are done via Jest and Supertest.

- [Typescript](https://www.typescriptlang.org/docs/home.html) - A strongly typed, object oriented, compiled language.
- [InversifyJS](https://github.com/inversify/InversifyJS) - A powerful and lightweight inversion of control container for JavaScript & Node.js apps powered by TypeScript.
- [TypeOrm](https://typeorm.io) - An orm with Typescript support running on Nodejs.
- [Class Validator](https://github.com/typestack/class-validator) - Allows use of decorator and non-decorator based validation.
- [ApiDoc](http://apidocjs.com/) - Creates a documentation from API annotations in your source code.
- [Jest](https://jestjs.io/) - Jest is a delightful JavaScript Testing Framework with a focus on simplicity.
- [Supertest](https://github.com/visionmedia/supertest) - HTTP assertions made easy via superagent.

## Development
To start developemnt, Please do the following.
#### Configuration
Add a .env file to the project in the base directory, and add the following.
``` touch .env ```
#### .env
```
DATABASE_HOST=localhost
DATABASE_USER=postgres
DATABASE_PORT=5432
DATABASE_PASSWORD=postgres
DATABASE_DB=my_db

AUTH_SECRET=
AUTH_ISSUER=api.domain.com
AUTH_AUDIENCE=api.domain.com
AUTH_EXPIRES_IN=24h
```
#### Run the Project
Run the following commands. The API will run in watch mode at http://locahost:5001/
``` npm install ```
``` npm run dev ```

## Testing
Tests are contained within the ``` ./tests ``` directory. Please follow the exampled provided.

#### Running tests
- To run in watch mode: ``` npm run test ```
- To run for ccoverage: ``` npm run coverage ```

## Documentation
Documentation is generated via APIDoc. Please annotate controllers with the proper documentation. The API documentation is only avaailable in develpment.
- Generate documentation: ``` npm run build:docs ```
- Navigate to http://localhost:5001/apidoc/ to view the generated documentation.

## PostGraphIQL
GraphQL Explorer is enabled when the environment is not production. This explorer displays all of your data tables and allows you to generate and test new queries easily.
- Navigate to http://localhost:5001/graphiql to view the explorer.

## Production Build
To create a production build, please run the following:
``` npm run build ```
The output directory is set to ``` ./dist ```
