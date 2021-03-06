const Clarifai = require('clarifai');
const validUrl = require('valid-url');

const app = new Clarifai.App({
  apiKey: process.env.CLARIFAI_KEY
});

const handleApiCall = (db) => (req, res) => {
  const { input, userId } = req.body;
  if (validUrl.isUri(input)) {
    app.models.predict(Clarifai.FACE_DETECT_MODEL, input)
    .then(data => {
      if (!isNaN(userId) && (userId > 0)){
        db('users').where('id', '=', userId)
        .increment('entries', 1)
        .returning('entries')
        .then(entries => {
          res.json({data: data, entries: entries[0]});
        })
        .catch(err => res.status(409).json('unable to get entries'));
      } else {
        res.status(409).json('Wrong parameter passed');
      }
    })
    .catch(err => res.status(500).json('unable to work with API'));
  } else {
    res.status(409).json('Wrong parameter passed');
  }
}

module.exports = {
  handleApiCall
}