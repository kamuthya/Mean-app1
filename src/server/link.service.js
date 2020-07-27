const Link = require('./link.model');
const ReadPreference = require('mongodb').ReadPreference;

require('./mongo').connect();

function getLinks(req, res) {
  const docquery = Link.find({}).read(ReadPreference.NEAREST);
  docquery
    .exec()
    .then(heroes => {
      res.status(200).json(heroes);
    })
    .catch(error => {
      res.status(500).send(error);
      return;
    });
}



module.exports = {
  getLinks

};
