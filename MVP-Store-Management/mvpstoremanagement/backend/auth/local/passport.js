
var passport = require('passport');

var LocalStrategy = require('passport-local').Strategy;
var config = require('../../config/environment');
var client = config.client;
var key = "secretkey";
var crypto = require("crypto");
var async = require('async');

function encrypt(key, data) {
  var cipher = crypto.createCipher('aes-256-cbc', key);
  var crypted = cipher.update(data, 'utf-8', 'hex');
  crypted += cipher.final('hex');
  return crypted;
}
//===============================================================================================
function decrypt(key, data) {
  var decipher = crypto.createDecipher('aes-256-cbc', key);
  var decrypted = decipher.update(data, 'hex', 'utf-8');
  decrypted += decipher.final('utf-8');
  return decrypted;
}

exports.setup =  (client, config) =>{
  passport.use(new LocalStrategy({ // or whatever you want to use
    usernameField: 'usrid',    // define the parameter in req.body that passport can use as username and password
    passwordField: 'password'
  },(usrid, password, done) => { // depending on your strategy, you might not need this function ...
    const pass = crypto.pbkdf2Sync(password, 'salt', 10000, 64,'sha512').toString('base64');
    client.query('SELECT * FROM admin.user_login($1, $2)', [usrid,pass], (err, user)=> {
      if(err) { return done(err); }
      else if(user.rows[0].user_login!='OK') {
        return done(null,{ message: user.rows[0].user_login });
      }
      else {
        client.query('select u.userid,u.brnid,u.usrnam,u.loginid,r.roltyp,u.status FROM ADMIN.USRMAS u join admin.roles r on u.usrole = r.roleid  WHERE u.loginid = $1', [usrid], (err, users) => {
          if (err && err != null){ console.log(err);}
          else {return done(null, users.rows[0]);}
        });      
      }
    });
    }
 
));
};

// exports.setup = function (req, res) {
//   passport.use(new LocalStrategy({
//     username: 'username',
//     password: 'password'
//   }, function (username, password, done) {
//     const a = username;
//     const b = password;
//     const sql = 'SELECT  * FROM users WHERE email = ?';
//     client.query(sql, [a], function (err, body) {
//       if (!err) {
//         if (body[0]) {
//           const b2 = decrypt(key, body[0].password);
//           if (b === b2) {
//             if (body[0].active) {
//               const fetch = 'SELECT  * FROM user_roles WHERE id = ?';
//               var sql = 'update users set online_status = ?  where id=?';
//               client.query(sql, [true, body[0].id], function (err, user) {
//                 if (err) {
//                   return res.status(400).json(err)
//                 }
//                 else {
//                   client.query(fetch, [body[0].role_id], function (err, body1) {
//                     if (body1 && body1[0]) {
//                       body[0].role = body1[0].name;
//                       body[0].permissions = [];

//                       if (body1 && body1[0] && ['employee', 'employer', 'admin'].indexOf(body1[0].name) == -1) {
//                         const permisiion = 'SELECT  * FROM roles_permissions WHERE role_id = ?';
//                         client.query(permisiion, [body1[0].id], function (err, permiss) {
//                           if (err) {
//                             return done(null, err);
//                           }
//                           else {
//                             async.each(permiss, function (eachPermisiion, permisiionCB) {
//                               if (eachPermisiion) {
//                                 var modul = 'select * from  permission_modules where id =?';
//                                 var per = 'select * from  permission_types where id =?';
//                                 client.query(modul, [eachPermisiion.permission_module], function (err, modules) {
//                                   client.query(per, [eachPermisiion.permission_type], function (err, permiss) {
//                                     if (modules && permiss) {
//                                       if (modules[0].name === 'Job Management' && permiss[0].name === 'Add') {
//                                         body[0].permissions.push("JOB_ADD");
//                                       }
//                                       else if (modules[0].name === 'Job Management' && permiss[0].name === 'Edit') {
//                                         body[0].permissions.push("JOB_EDIT");
//                                       }
//                                       else if (modules[0].name === 'Job Management' && permiss[0].name === 'View') {
//                                         body[0].permissions.push("JOB_VIEW");
//                                       }
//                                       else if (modules[0].name === 'Job Management' && permiss[0].name === 'Delete') {
//                                         body[0].permissions.push("JOB_DELETE");
//                                       }
//                                       else if (modules[0].name === 'Folders' && permiss[0].name === 'Add') {
//                                         body[0].permissions.push("FOLDER_ADD");
//                                       }
//                                       else if (modules[0].name === 'Folders' && permiss[0].name === 'Edit') {
//                                         body[0].permissions.push("FOLDER_EDIT");
//                                       }
//                                       else if (modules[0].name === 'Folders' && permiss[0].name === 'View') {
//                                         body[0].permissions.push("FOLDER_VIEW");
//                                       }
//                                       else if (modules[0].name === 'Folders' && permiss[0].name === 'Delete') {
//                                         body[0].permissions.push("FOLDER_DELETE");
//                                       }
//                                       else if (modules[0].name === 'User Management' && permiss[0].name === 'Add') {
//                                         body[0].permissions.push("USER_ADD");
//                                       }
//                                       else if (modules[0].name === 'User Management' && permiss[0].name === 'Edit') {
//                                         body[0].permissions.push("USER_EDIT");
//                                       }
//                                       else if (modules[0].name === 'User Management' && permiss[0].name === 'View') {
//                                         body[0].permissions.push("USER_VIEW");
//                                       }
//                                       else if (modules[0].name === 'User Management' && permiss[0].name === 'Delete') {
//                                         body[0].permissions.push("USER_DELETE");
//                                       }
//                                       else if (modules[0].name === 'Company Profile' && permiss[0].name === 'Add') {
//                                         body[0].permissions.push("PROFILE_ADD");
//                                       }
//                                       else if (modules[0].name === 'Company Profile' && permiss[0].name === 'Edit') {
//                                         body[0].permissions.push("PROFILE_EDIT");
//                                       }
//                                       else if (modules[0].name === 'Company Profile' && permiss[0].name === 'View') {
//                                         body[0].permissions.push("PROFILE_VIEW");
//                                       }
//                                       else if (modules[0].name === 'Company Profile' && permiss[0].name === 'Delete') {
//                                         body[0].permissions.push("PROFILE_DELETE");
//                                       }
//                                       else if (modules[0].name === 'Candidates' && permiss[0].name === 'Add') {
//                                         body[0].permissions.push("CANDIDATE_ADD");
//                                       }
//                                       else if (modules[0].name === 'Candidates' && permiss[0].name === 'Edit') {
//                                         body[0].permissions.push("CANDIDATE_EDIT");
//                                       }
//                                       else if (modules[0].name === 'Candidates' && permiss[0].name === 'View') {
//                                         body[0].permissions.push("CANDIDATE_VIEW");
//                                       }
//                                       else if (modules[0].name === 'Candidates' && permiss[0].name === 'Delete') {
//                                         body[0].permissions.push("CANDIDATE_DELETE");
//                                       }
//                                       else if (modules[0].name === 'Assessment' && permiss[0].name === 'Add') {
//                                         body[0].permissions.push("ASSESSMENT_ADD");
//                                       }
//                                       else if (modules[0].name === 'Assessment' && permiss[0].name === 'Edit') {
//                                         body[0].permissions.push("ASSESSMENT_EDIT");
//                                       }
//                                       else if (modules[0].name === 'Assessment' && permiss[0].name === 'View') {
//                                         body[0].permissions.push("ASSESSMENT_VIEW");
//                                       }
//                                       else if (modules[0].name === 'Assessment' && permiss[0].name === 'Delete') {
//                                         body[0].permissions.push("ASSESSMENT_DELETE");
//                                       }
//                                       else if (modules[0].name === 'Interviews' && permiss[0].name === 'Add') {
//                                         body[0].permissions.push("INTERVIEW_ADD");
//                                       }
//                                       else if (modules[0].name === 'Interviews' && permiss[0].name === 'Edit') {
//                                         body[0].permissions.push("INTERVIEW_EDIT");
//                                       }
//                                       else if (modules[0].name === 'Interviews' && permiss[0].name === 'View') {
//                                         body[0].permissions.push("INTERVIEW_VIEW");
//                                       }
//                                       else if (modules[0].name === 'Interviews' && permiss[0].name === 'Delete') {
//                                         body[0].permissions.push("INTERVIEW_DELETE");
//                                       }
//                                       else if (modules[0].name === 'Events' && permiss[0].name === 'Add') {
//                                         body[0].permissions.push("EVENT_ADD");
//                                       }
//                                       else if (modules[0].name === 'Events' && permiss[0].name === 'Edit') {
//                                         body[0].permissions.push("EVENT_EDIT");
//                                       }
//                                       else if (modules[0].name === 'Events' && permiss[0].name === 'View') {
//                                         body[0].permissions.push("EVENT_VIEW");
//                                       }
//                                       else if (modules[0].name === 'Events' && permiss[0].name === 'Delete') {
//                                         body[0].permissions.push("EVENT_DELETE");
//                                       }
//                                       else if (modules[0].name === 'Chats' && permiss[0].name === 'Add') {
//                                         body[0].permissions.push("CHAT_ADD");
//                                       }
//                                       else if (modules[0].name === 'Chats' && permiss[0].name === 'Edit') {
//                                         body[0].permissions.push("CHAT_EDIT");
//                                       }
//                                       else if (modules[0].name === 'Chats' && permiss[0].name === 'View') {
//                                         body[0].permissions.push("CHAT_VIEW");

//                                       }
//                                       else if (modules[0].name === 'Chats' && permiss[0].name === 'Delete') {
//                                         body[0].permissions.push("CHAT_DELETE");
//                                       }
//                                       else if (modules[0].name === 'Tickets' && permiss[0].name === 'Add') {
//                                         body[0].permissions.push("TICKET_ADD");
//                                       }
//                                       else if (modules[0].name === 'Tickets' && permiss[0].name === 'Edit') {
//                                         body[0].permissions.push("TICKET_EDIT");
//                                       }
//                                       else if (modules[0].name === 'Tickets' && permiss[0].name === 'View') {
//                                         body[0].permissions.push("TICKET_VIEW");
//                                       }
//                                       else if (modules[0].name === 'Tickets' && permiss[0].name === 'Delete') {
//                                         body[0].permissions.push("TICKET_DELETE");
//                                       }
//                                     }
//                                     permisiionCB();
//                                   })
//                                 })
//                               }
//                             }, function (err) {
//                               if (err) res.status(400).json({ err })
//                               return done(null, body[0]);
//                             });
//                           }
//                         })
//                       }
//                       else {
//                         return done(null, body[0]);
//                       }
//                     }

//                   })
//                 }
//               })

//             }
//             else {
//               return done(null, { message: 'inactive-user' });
//             }

//           } else {
//             return done(null, { message: 'incorrectpassword' });
//           }
//         }
//         else {
//           return done(null, { message: 'noaccount' });
//         }

//       }
//       else {
//         return done(null, { message: 'Unknownuser' });
//       }
//     })
//   }
//   ));
// };
