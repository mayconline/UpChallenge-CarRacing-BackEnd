require('dotenv').config();

const { GraphQLServer } = require('graphql-yoga');
const path = require('path');
const resolvers = require('./resolvers');
const mongoose = require('mongoose');

const {MONGO_URL, PORT} = process.env;


mongoose.Promise = global.Promise;
mongoose.connect( MONGO_URL, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true }).then(
  () => {console.log('Conectado ao db com sucesso') },
  err => { console.log('nao foi possivel conectar a data base '+ err)}
);

const options = {
    port: PORT,
    endpoint: '/graphql',
    playground: '/playground',
    cors:{
        credentials: true,
        origin: ["*"]
    }
   
}

const server = new GraphQLServer({
    typeDefs: path.resolve(__dirname, 'schema.graphql'),
    resolvers
});

server.start(options);