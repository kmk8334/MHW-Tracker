// const models = require('../models');

const barrothPage = (req, res) => res.render('barroth', { csrfToken: req.csrfToken() });

const greatJagrasPage = (req, res) => res.render('great-jagras', { csrfToken: req.csrfToken() });

const kuluYaKuPage = (req, res) => res.render('kulu-ya-ku', { csrfToken: req.csrfToken() });

const tobiKadachiPage = (req, res) => res.render('tobi-kadachi', { csrfToken: req.csrfToken() });

module.exports.barrothPage = barrothPage;
module.exports.greatJagrasPage = greatJagrasPage;
module.exports.kuluYaKuPage = kuluYaKuPage;
module.exports.tobiKadachiPage = tobiKadachiPage;
