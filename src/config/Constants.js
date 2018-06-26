module.exports = {
  db: {
    connectionOptions: {
      poolSize: 2,
      useMongoClient: true,
    },
    connectionString: 'mongodb://localhost/test',
  },
  staticPath: 'tmp/static',
  cookieName: 'ptracking_jwt',
  jwt: {
    secret: '235a21d1385b6b877d8efb4fc6445c8e',
  },
  admin: {
    username: 'root',
    passphrase: '7232aa3fbbb01be2f556bb76c2827410',
  },
  routeSecurity: [
    {prefix: '/', roles: 'root'},
    {prefix: '/cms', roles: 'admin'},
    {prefix: '/cms', method: 'get', roles: 'content-viewer content-manager'},
    {prefix: '/app', roles: 'admin surveyor'},
    {prefix: '/cms/surveys', roles: 'content-manager'},
    {prefix: '/cms/surveyors', roles: 'content-manager'},
    {prefix: '/cms/artifacts', roles: 'content-manager'},
    {prefix: '/cms/locations', roles: 'content-manager'},
    {prefix: '/cms/answers', roles: 'content-manager'},
    {prefix: '/cms/processes', roles: 'content-manager'},
  ],
  origin: 'http://localhost',
};
