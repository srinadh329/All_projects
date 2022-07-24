var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

exports.setup = function (User, config) {
  // based on schema we will define the same field name here => EmaiId, password
  passport.use(new LocalStrategy({
    username: 'EmailId',
      password: 'password' // this is the virtual field on the model
    },
    function(EmailId, password, done) {
      User.findOne({
        EmailId: EmailId.toLowerCase()
      }).populate('organization_id').populate('roleid').exec(function(err, user) {
        if (err) return done(err);
        console.log("User log: ", user);
        if (!user) {
          console.log('return response', 'This email is not registered.')
          return done(null, false, { message: 'This email is not registered.' });
        }
        if (!user.authenticate(password)) {
          return done(null, false, { message: 'This password is not correct.' });
        }
        if (user.status!="Active")
        {
          return done(null, false, { message: 'This is blocked account... Please contact Admin.' });
        }
        if(user.onCall == false) {
          return done(null, user);
        }
        if(user.onCall == true) {
          User.findOneAndUpdate({
            EmailId: EmailId.toLowerCase()
          },{$set:{onCall:false}},{new:true},function(err,res) {
            console.log("Updated Value: ",res);
            return(done(null,res));
          })
        }

        
      });
    }
  ));
};