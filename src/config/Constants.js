module.exports = {
  db: {
    connectionOptions: {
      poolSize: 5,
      useMongoClient: true,
      j: true,
      w: 1,
    },
    connectionString: 'mongodb://localhost/test',
  },
  jwt: {
    secret: 'a general string',
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
