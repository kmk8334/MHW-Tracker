const controllers = require('./controllers');
const mid = require('./middleware');

const router = (app) => {
  app.get('/getToken', mid.requiresSecure, controllers.Account.getToken);
  app.get('/getDomos', mid.requiresLogin, controllers.Domo.getDomos);
  app.post('/deleteDomo', mid.requiresSecure, controllers.Domo.deleteDomo);
  app.get('/login', mid.requiresSecure, mid.requiresLogout, controllers.Account.loginPage);
  app.post('/login', mid.requiresSecure, mid.requiresLogout, controllers.Account.login);
  app.post('/signup', mid.requiresSecure, mid.requiresLogout, controllers.Account.signup);
  app.get('/logout', mid.requiresLogin, controllers.Account.logout);
  app.get('/maker', mid.requiresLogin, controllers.Domo.makerPage);
  app.post('/maker', mid.requiresLogin, controllers.Domo.make);
  app.get('/barroth', mid.requiresLogin, controllers.InfoPage.barrothPage);
  app.get('/great-jagras', mid.requiresLogin, controllers.InfoPage.greatJagrasPage);
  app.get('/kulu-ya-ku', mid.requiresLogin, controllers.InfoPage.kuluYaKuPage);
  app.get('/tobi-kadachi', mid.requiresLogin, controllers.InfoPage.tobiKadachiPage);
  app.get('/', mid.requiresSecure, mid.requiresLogout, controllers.Account.loginPage);
};

module.exports = router;
