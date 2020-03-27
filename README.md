# Install and run

In order to run the server, run `npm i` and `npm start` on the root folder.
This will start a nodejs server on port 4000. The server is in development mode, so it will reload with your changes

In order to run the app, run `cd app` and `npm i` followed by `npm start`.
This will start the webpack-dev-server on port 3000. If you navigate to [http://localhost:3000](http://localhost:3000), you should be able to see the app and use it.

Have fun!

# API

The REST API allows to add/remove/update/view employees and reviews.
Some api calls you can perfom are:

```
curl -d '{"id": 4, "name": "Pikachu", "icon": "https://assets.pokemon.com/assets/cms2/img/pokedex/full/025.png", "description": "Pika Pika!"}' -H "Content-Type: application/json" -X POST http://localhost:4000/employees
curl -H "Content-Type: application/json" -X DELETE http://localhost:4000/employees/4
curl http://localhost:4000/reviews
curl http://localhost:4000/reviews?recipient=2
curl -H "Content-Type: application/json" -X DELETE http://localhost:4000/reviews/4
curl -d '{"content": "With this starter you will never regret a thing!"}' -H "Content-Type: application/json" -X PUT http://localhost:4000/reviews/2
```
