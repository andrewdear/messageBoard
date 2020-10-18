###To run for development

`docker-compose up mongo`

then

`npm install`
`npm run dev`

###To run for production

`docker-compose up`

###To run tests

`docker-compose up mongo`

then 

`npm run testServer`

then while that is running

`npm run test`

###Trade offs,

Using normal console logs for logging, would be better to use something like winston.

For it to be truly production ready you would need to add in some cors configuration, this can be done by adding a middleware to express. After setup of front end's this would need to be added.

More advanced and generic error handling

Write more comprehensive unit tests, that work without a server running

