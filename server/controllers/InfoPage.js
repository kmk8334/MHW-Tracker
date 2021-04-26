const models = require('../models');

const barrothPage = (req, res) => {
    return res.render('barroth', { csrfToken: req.csrfToken() });
};

const greatJagrasPage = (req, res) => {
    return res.render('great-jagras', { csrfToken: req.csrfToken() });
};

const kuluYaKuPage = (req, res) => {
    return res.render('kulu-ya-ku', { csrfToken: req.csrfToken() });
};

const tobiKadachiPage = (req, res) => {
    return res.render('tobi-kadachi', { csrfToken: req.csrfToken() });
};

module.exports.barrothPage = barrothPage;
module.exports.greatJagrasPage = greatJagrasPage;
module.exports.kuluYaKuPage = kuluYaKuPage;
module.exports.tobiKadachiPage = tobiKadachiPage;