const mongoose = require('mongoose')


const Schema = mongoose.Schema


const urlListSchema = new Schema({
    originalUrl: {
        type: String,
        required: true
    },
    shortenedUrl: {
        type: Number,
        required: true
    }
}, {timestamps: true})

module.exports = mongoose.model('urlList', urlListSchema)
