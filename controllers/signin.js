
const handleSignIn = (req, response, db, bcrypt) => {
    const { email, password } = req.body;
    if(!email || !password){
        response.status(400).json('incomplete credentials');
    } else {
        db
            .select('email', 'hash').from('login')
            .where('email', '=', email)
            .then(data => {
                bcrypt.compare(password, data[0].hash, function(err, res) {
                    if (res) { 
                        db
                            .select('*').from('users')
                            .where('email', '=', email)
                            .then(user => {
                                response.json(user[0])
                            })
                    .catch(err => response.status(400).json('error logging in'))
                    } else {
                        response.status(400).json('wrong credentials')
                    }
                });
            })
            .catch(err => response.status(400).json('wrong credentials'))

    }
}

module.exports = {
    handleSignIn: handleSignIn
};