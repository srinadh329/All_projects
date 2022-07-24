'use strict';

var express = require('express');
var controller = require('./message.controller');
var auth = require('../../auth/auth.service');

var router = express.Router();

router.get('/', controller.index);
router.get('/:id',auth.isAuthenticated(),controller.show);


router.post('/', controller.create);
router.post('/subscriber', controller.subscriber);
router.post('/staredMessage',controller.staredMessage);
router.put('/:id', controller.update);
router.patch('/:id', controller.update);
router.delete('/:id', controller.destroy);
router.post('/deltingAllmsgs',controller.deletingAllmsgs);
router.post('/delteSinglemsg',auth.isAuthenticated(),controller.deletingSinglemsg);
router.post('/undelteSinglemsg',auth.isAuthenticated(),controller.undeletingSinglemsg);
router.post('/seenMsg',controller.seenmsg)
router.post('/blocking1',controller.blockinguser1);
router.post('/blocking2',controller.blockinguser2);
router.post('/slide',controller.slideforOfflinemsg);
router.post('/updatingMessage', controller.editMessage);
router.post('/forwardmsg',controller.forwardingmsg);
router.post('/starmsg',controller.starmsg);
router.post('/replyingmsg',controller.replymsgs);
router.post('/incognitoaccept3',controller.incognitoAcceptChat4);
router.post('/ videocallaccept3',controller.videoCallAccept4);
router.post('/incognitoReject3',controller.incognitoRejectChat4);
router.post('/videocallReject3',controller.videocallReject4);
router.post('/showresp',controller.showresponsenull);
router.post('/incognitoblock',controller.incognitoBlock);
router.post('/msgIndicator',controller.messagetypingindicator);
router.post('/getmessages',auth.isAuthenticated(),controller.getmessages);
module.exports = router;