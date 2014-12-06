/**
 * User.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/#!documentation/models
 */
var bcrypt = require('bcrypt');

module.exports = {
    connection: 'rustyOldMySQLDatabase',
    tableName: 'our_users',
    attributes: {
        id: {
            type: 'integer',
            primaryKey: true,
            required: true,
            autoincrement: true
        },
        id_parent: {
            type: 'integer',
            required: true
        },
        first_name: {
            type: 'string',
            size: 200
            required: true
        },
        last_name: {
            type: 'string',
            size: 200
            required: true
        },
        birth_date: {
            type: 'date',
            required: true
        },
        email: {
            type: 'string',
            size: 200
            required: true
        },
        password: {
            type: 'string',
            size: 20
            required: true
        },
        created: {
            type: 'datetime',
            required: true
        },
        modified: {
            type: 'datetime',
            required: true
        },
        toJSON: function() {
            var obj = this.toObject();
            delete obj.password;
            return obj;
        }
    },
    beforeCreate: function(user, cb) {
        bcrypt.genSalt(10, function(err, salt) {
            bcrypt.hash(user.password, salt, function(err, hash) {
                if (err) {
                    console.log(err);
                    cb(err);
                } else {
                    user.password = hash;
                    cb(null, user);
                }
            });
        });
    }
};