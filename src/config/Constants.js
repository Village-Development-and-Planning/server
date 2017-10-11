module.exports = {
  db: {
    connectionOptions: {
      poolSize: 5,
      useMongoClient: true,
    },
    connectionString: 'mongodb://localhost/test',
  },
  jwt: {
    secret: 'a general string',
    requestProperty: 'auth',
  },
}
;