const mongoose = require('mongoose')

const muteSchema = mongoose.Schema(
    {
        roles: {
            type: Array,
            required: true
        }
    }
)

module.exports = mongoose.model('mutes-testing', muteSchema)