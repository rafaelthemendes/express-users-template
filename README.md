
# Express Boilerplate - User authentication

Express boilerplate for a user authentication flow. In this project I used typescript and typeorm to connect to a postgres database. The architecture is based on SOLID principles.


### Requirements

```

node >= 8.3

yarn >= 1.19.1

```


### Setup
First of all, create a postgres database on localhost, with [these credentials](ormconfig.json)

Install the dependencies:
`npx yarn`

Finally, run the migrations:
`npx yarn typeorm migration:run`

### Running project
`npx yarn dev:server`


### Tests
`npx yarn test`


### Debug (VSCode)
If you're using Visual Studio Code, just launch the Debug configuration AFTER the project is run


### Create migrations
To create a migration, run:
`npx yarn typeorm migration:create -n CreateSomething`

It will be created [here](src/shared/database/migrations)
