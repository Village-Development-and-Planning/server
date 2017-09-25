global.appRequire = (name) => require(`${__dirname}/${name}`);
appRequire('server');
