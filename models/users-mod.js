const { builtinModules } = require('module');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const dbURI = 'mongodb://dimitar:1234@cluster0-shard-00-00.p4jdz.mongodb.net:27017,cluster0-shard-00-01.p4jdz.mongodb.net:27017,cluster0-shard-00-02.p4jdz.mongodb.net:27017/Vesta-s?ssl=true&replicaSet=atlas-5kz6i3-shard-0&authSource=admin&retryWrites=true&w=majority'


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

