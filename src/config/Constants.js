module.exports = {
  db: {
    connectionOptions: {
      poolSize: 2,
      useMongoClient: true,
    },
    connectionString: 'mongodb://localhost/test',
  },
  cookieName: 'ptracking_jwt',
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
