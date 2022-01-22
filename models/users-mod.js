const { builtinModules } = require('module');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const dbURI = 'API_KEY'


const userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
});

const User = mongoose.model('user', userSchema);

module.exports = {
    User: User,
    dbURI: dbURI,
}

