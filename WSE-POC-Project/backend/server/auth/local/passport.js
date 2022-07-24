
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
const crypto = require('crypto');


exports.setup =  (client, config) =>{
  passport.use(new LocalStrategy({ // or whatever you want to use
    usernameField: 'usrid',    // define the parameter in req.body that passport can use as username and password
    passwordField: 'password'
  },(usrid, password, done) => { // depending on your strategy, you might not need this function ...
    const pass = crypto.pbkdf2Sync(password, 'salt', 10000, 64,'sha512').toString('base64');
    client.query('SELECT * FROM admin.user_login($1, $2)', [usrid.toUpperCase(),pass],(err, user)=> {
      if(err) { return done(err); }
      else if(user.rows[0].user_login!='OK') {
        return done(null,{ message: user.rows[0].user_login });
      }
      else {
        client.query('select u.userid,u.brnid,u.usrnam,u.loginid,r.roltyp,u.status FROM ADMIN.USRMAS u join admin.roles r on u.usrole = r.roleid  WHERE u.loginid = $1', [usrid.toUpperCase()], (err, users) => {
          if (err && err != null){ console.log(err);}
          else {return done(null, users.rows[0]);}
        });      
      }
    });
    }
 
));
};
