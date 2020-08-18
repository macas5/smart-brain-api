const Clarifai = require('clarifai');
const validUrl = require('valid-url');

const app = new Clarifai.App({
  apiKey: process.env.CLARIFAI_KEY
});

const handleApiCall = () => (req, res) => {
  const { input } = req.body;
  if (validUrl.isUri(input)) {
    app.models.predict(Clarifai.FACE_DETECT_MODEL, input)
    .then(data => {
      res.json(data);
    })
    .catch(err => res.status(500).json('unable to work with API'));
  } else {
    res.status(409).json('Wrong parameter passed');
  }
}

const handleImage = (db) => (req, res) => {
  const { id } = req.body;
  if (!isNaN(id) && (id > 0)){
    db('users').where('id', '=', id)
    .increment('entries', 1)
    .returning('entries')
    .then(entries => {
      res.json(entries[0]);
    })
    .catch(err => res.status(409).json('unable to get entries'));
  } else {
    res.status(409).json('Wrong parameter passed');
  }
}

module.exports = {
  handleImage,
  handleApiCall
}