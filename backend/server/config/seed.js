/**
 * Populate DB with sample data on server start
 * to disable, edit config/environment/index.js, and set `seedDB: false`
 */

'use strict';
// Insert seed models below
var Userstatus = require('../api/userstatus/userstatus.model');
var Call = require('../api/call/call.model');
var Stargroupmessage = require('../api/stargroupmessage/stargroupmessage.model');
var Faqs = require('../api/faqs/faqs.model');
var Emails = require('../api/emails/emails.model');
var Roles = require('../api/roles/roles.model');
var Admin = require('../api/admin/admin.model');
var Starredmessage = require('../api/starredmessage/starredmessage.model');
var Media = require('../api/media/media.model');
var Notification = require('../api/notification/notification.model');
var Log = require('../api/log/log.model');
var Bookmarks = require('../api/bookmarks/bookmarks.model');
var Blogcontent = require('../api/blogcontent/blogcontent.model');
var Comment = require('../api/comment/comment.model');
var Calls = require('../api/calls/calls.model');
var Contact = require('../api/contact/contact.model');
var Follower = require('../api/follower/follower.model');
var Userfeed = require('../api/userfeed/userfeed.model');
var Blog = require('../api/blog/blog.model');
var Sharedgroup = require('../api/sharedgroup/sharedgroup.model');
var Groupmessage = require('../api/groupmessage/groupmessage.model');
var Group = require('../api/group/group.model');
var Userreports = require('../api/userreports/userreports.model');
var Invitation = require('../api/invitation/invitation.model');
var Userprofile = require('../api/userprofile/userprofile.model');
var Link = require('../api/link/link.model');
var Message = require('../api/message/message.model');
var User = require('../api/user/user.model');
var Friendslist = require('../api/friendslist/friendslist.model');
var Groupmember = require('../api/groupmember/groupmember.model');
// Insert seed data below
var userstatusSeed = require('../api/userstatus/userstatus.seed.json');
var callSeed = require('../api/call/call.seed.json');
var stargroupmessageSeed = require('../api/stargroupmessage/stargroupmessage.seed.json');
var faqsSeed = require('../api/faqs/faqs.seed.json');
var emailsSeed = require('../api/emails/emails.seed.json');
var rolesSeed = require('../api/roles/roles.seed.json');
var adminSeed = require('../api/admin/admin.seed.json');
var starredmessageSeed = require('../api/starredmessage/starredmessage.seed.json');
var notificationSeed = require('../api/notification/notification.seed.json');
var logSeed = require('../api/log/log.seed.json');
var bookmarksSeed = require('../api/bookmarks/bookmarks.seed.json');
var blogcontentSeed = require('../api/blogcontent/blogcontent.seed.json');
var commentSeed = require('../api/comment/comment.seed.json');
var callsSeed = require('../api/calls/calls.seed.json');
var contactSeed = require('../api/contact/contact.seed.json');
var followerSeed = require('../api/follower/follower.seed.json');
var userfeedSeed = require('../api/userfeed/userfeed.seed.json');
var blogSeed = require('../api/blog/blog.seed.json');
var sharedgroupSeed = require('../api/sharedgroup/sharedgroup.seed.json');
var groupmessageSeed = require('../api/groupmessage/groupmessage.seed.json');
var groupSeed = require('../api/group/group.seed.json');
var userreportsSeed = require('../api/userreports/userreports.seed.json');
var invitationSeed = require('../api/invitation/invitation.seed.json');
var userprofileSeed = require('../api/userprofile/userprofile.seed.json');
var linkSeed = require('../api/link/link.seed.json');
var messageSeed = require('../api/message/message.seed.json');
var friendslist = require('../api/friendslist/friendslist.seed.json');
var groupmember = require('../api/groupmember/groupmember.seed.json');

// Insert seed inserts below
Userstatus.find({}).remove(function() {
	Userstatus.create(userstatusSeed);
});

Call.find({}).remove(function() {
	Call.create(callSeed);
});

Stargroupmessage.find({}).remove(function() {
	Stargroupmessage.create(stargroupmessageSeed);
});


Blog.find({}).remove(function() {
	Blog.create(blogSeed);
});

Faqs.find({}).remove(function() {
	Faqs.create(faqsSeed);
});

Emails.find({}).remove(function() {
	Emails.create(emailsSeed);
});

Roles.find({}).remove(function() {
	Roles.create(rolesSeed);
});


Admin.find({}).remove(function() {
	Admin.create(adminSeed);
});

Starredmessage.find({}).remove(function() {
	Starredmessage.create(starredmessageSeed);
});


Media.find({}).remove(function() {
	Media.create(mediaSeed);
});

Notification.find({}).remove(function() {
	Notification.create(notificationSeed);
});

Log.find({}).remove(function() {
	Log.create(logSeed);
});

Bookmarks.find({}).remove(function() {
	Bookmarks.create(bookmarksSeed);
});

Blogcontent.find({}).remove(function() {
	Blogcontent.create(blogcontentSeed);
});

Comment.find({}).remove(function() {
	Comment.create(commentSeed);
});

Calls.find({}).remove(function() {
	Calls.create(callsSeed);
});

Contact.find({}).remove(function() {
	Contact.create(contactSeed);
});

Follower.find({}).remove(function() {
	Follower.create(followerSeed);
});

Userfeed.find({}).remove(function() {
	Userfeed.create(userfeedSeed);
});

Blog.find({}).remove(function() {
	Blog.create(blogSeed);
});

Sharedgroup.find({}).remove(function() {
	Sharedgroup.create(sharedgroupSeed);
});

Groupmessage.find({}).remove(function() {
	Groupmessage.create(groupmessageSeed);
});

Group.find({}).remove(function() {
	Group.create(groupSeed);
});

Userreports.find({}).remove(function() {
	Userreports.create(userreportsSeed);
});

Invitation.find({}).remove(function() {
	Invitation.create(invitationSeed);
});

Userprofile.find({}).remove(function() {
	Userprofile.create(userprofileSeed);
});

Link.find({}).remove(function() {
	Link.create(linkSeed);
});

Message.find({}).remove(function() {
	Message.create(messageSeed);
});

Friendslist.find({}).remove(function() {
	Friendslist.create(friendslistSeed)
});

Groupmember.find({}).remove(function() {
	Groupmember.create(groupmemberSeed);
});

// Thing.find({}).remove(function() {
//   Thing.create(thingSeed);
// });