const Clarifai = require('clarifai');

const app = new Clarifai.App({
    apiKey: 'c5fa362e9f6e4bb5810c7371dd13a128'
   });
  

const handleAPICall = (req, res) => {
    app.models.predict(
    "a403429f2ddf4b49b307e318f00e528b", 
    req.body.input
    )
    .then(data => res.json(data))
    .catch(err => res.status(400).json('unable to make API call'))
}

const handleImage = (req, res, db) => {
    const  { id } = req.body;
    db
        .select('*').from('users')
        .where('id', '=', id)
        .increment('entries', 1)
        .returning('entries')
        .then(entries => {
            res.json(entries[0])
        })
        .catch(err => {
            res.status(400).json('Unable to get entries')
        })
}

module.exports = {
    handleImage: handleImage,
    handleAPICall: handleAPICall
};