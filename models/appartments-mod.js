const { builtinModules } = require('module');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const dbURI = 'mongodb://dimitar:1234@cluster0-shard-00-00.p4jdz.mongodb.net:27017,cluster0-shard-00-01.p4jdz.mongodb.net:27017,cluster0-shard-00-02.p4jdz.mongodb.net:27017/Vesta-s?ssl=true&replicaSet=atlas-5kz6i3-shard-0&authSource=admin&retryWrites=true&w=majority'


const apartSchema = new Schema({
    Title: {
        type: String,
        required: true
    },
    Prices: {
        type: String,
        required: true
    },
    Size: {
        type: String,
        required: true
    },
    Description: {
        type: String,
        required: true
    },
    Locations: {
        type: String,
        required: true
    },
    Neighborhoods: {
        type: String,
        required: true
    },
    Types: {
        type: String,
        required: true
    },
    BuildingTypes: {
        type: String,
        required: true
    },
    YearsBuild: {
        type: String,
        required: true
    },
    Floors: {
        type: String,
        required: true
    },
    BrokerContacts: {
        type: String,
        required: true
    },
    PhoneContacts: {
        type: String,
        required: true
    },
    Rooms: {
        type: String,
        required: true
    },
    Heatings: {
        type: String,
        required: true
    },
    Images: {
        type: Array,
        required: true
    }
});

const Apartment = mongoose.model('apartment', apartSchema);

module.exports = {
    Apartment: Apartment,
    dbURI: dbURI,
}

