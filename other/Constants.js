module.exports = {
  db: {
    clusterURL: 'mongodb://swaaminathanm:thambi%4099@pudhuvaazhvu-developement-shard-00-00-bkn0z.mongodb.net:27017,pudhuvaazhvu-developement-shard-00-01-bkn0z.mongodb.net:27017,pudhuvaazhvu-developement-shard-00-02-bkn0z.mongodb.net:27017/test?ssl=true&replicaSet=Pudhuvaazhvu-Developement-shard-0&authSource=admin',
    userName: 'swaaminathanm',
    password: 'thambi@99',
  },
  jwt: {
    secret: 'a general string',
    requestProperty: 'auth',
  },
}