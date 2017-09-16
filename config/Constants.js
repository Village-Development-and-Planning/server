module.exports = {
  db: {
    connectionOptions: {
      db: { native_parser: true },
      server: { poolSize: 5 },
    },
    connectionString: "mongodb://localhost/test"
  },
  jwt: {
    secret: 'a general string',
    requestProperty: 'auth',
  },
}