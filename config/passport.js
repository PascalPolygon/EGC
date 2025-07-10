const LocalStrategy = require('passport-local').Strategy;
// const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

console.log('Inside passport.js');

// REMOVED: Load Admin Model
// const Admin = require('../models/Admins');

module.exports = function (passport) {
    console.log('inside passport function');
    
    // REMOVED: Database authentication strategy
    passport.use(
        new LocalStrategy({ usernameField: 'email' }, function (email, password, done) {
            console.log('Authentication disabled - no database connection');
            return done(null, false, { message: 'Authentication is currently disabled' });
        })
    );

    passport.serializeUser(function (admin, done) {
        done(null, admin.id);
    });

    passport.deserializeUser(async (id, done) => {
        // REMOVED: Database user lookup
        console.log('User deserialization disabled - no database connection');
        done(null, null);
    });
};