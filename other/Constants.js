module.exports = {
  db: {
    connectionOptions: {
      db: { native_parser: true },
      server: { poolSize: 5 },
    },
    connectionString: "mongodb://localhost/pvdb"
  },
  jwt: {
    secret: 'a general string',
    requestProperty: 'auth',
  },
}