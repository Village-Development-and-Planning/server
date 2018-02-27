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
  admin: {
    username: 'ptracking',
    passphrase: 'vaazhvuT',
  },
  routeSecurity: [
    {prefix: '/cms', roles: 'root content-manager'},
    {prefix: '/app', roles: 'root surveyor'},
  ],
};
