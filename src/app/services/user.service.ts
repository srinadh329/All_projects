import { Injectable, EventEmitter, } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';
import { FrontEndConfig } from "../frontendconfig";
import { EncrDecrServiceService } from './encr-decr-service.service';
import { Observable } from "rxjs";
import { Subject } from 'rxjs';
import * as socketIo from 'socket.io-client';
import { Socket } from '../shared/interfaces';


declare var io: { connect(url: string): Socket; };

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private subject = new Subject<any>();
  private emoji = new Subject<any>();

  constructor(private http: HttpClient, private frontendconfig: FrontEndConfig, private router: Router, private snackBar: MatSnackBar, private encryptDecrypt: EncrDecrServiceService) {
    this.isAdminLoggedIn = JSON.parse(localStorage.getItem('adminloggedIn') || ('false')),
      this.isUserLoggedIn = JSON.parse(localStorage.getItem('loggedIn') || ('false')),
      this.isClientLoggedIn = JSON.parse(localStorage.getItem('clientloggedIn') || ('false')),
      this.isPremiumUserLoggedIn = JSON.parse(localStorage.getItem('loggedIn1') || ('false'))
  }

  serverurl = this.frontendconfig.getserverurl();

  socket: Socket;
  /////////////////////////////////////////////////////////////////////////////////////////////
  private isUserLoggedIn; // for normal user login
  private isClientLoggedIn; // form client login
  private isPremiumUserLoggedIn; // for premium user login
  private isAdminLoggedIn; // for admin login
  refreshNav = new EventEmitter<any>();
  id;
  // sendMessage = new EventEmitter<any>();
  Userdetails = new EventEmitter<any>();
  chatUserdetails = new EventEmitter<any>();
  nearbyplacechange = new EventEmitter();
  emojiCollector = new EventEmitter();
  // Userdetails:Subject<any> = new Subject();
  /* 
 function name: logout
 Input: logoout status
 Output: token null
 Desc: based on status which user is logout and clear the token and shows snackbar 
 */

  ////////////////////////////////////<<<<<< LOGOUT >>>>>>>>/////////////////////////////////////
  logout(message) {
    localStorage.clear();
    var userToken = { 'token': null }
    localStorage.setItem('currentUser', JSON.stringify(userToken))
    if (this.isAdminLoggedIn) localStorage.setItem('adminloggedIn', 'false');
    if (this.isClientLoggedIn) localStorage.setItem('clientloggedIn', 'false');
    if (this.isPremiumUserLoggedIn) localStorage.setItem('loggedIn1', 'false');
    this.router.navigate(['/']);
    this.openSnackBarFail(message, "X");
  }


  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 5000,
      panelClass: ['bar-color'],
      horizontalPosition: 'right',
      verticalPosition: 'top',
    });
  }

  openSnackBarFail(snackBarMeassageFail: string, action: string) {
    this.snackBar.open(snackBarMeassageFail, action, {
      duration: 6000,
      panelClass: ['bar-color-fail'],
      horizontalPosition: 'right',
      verticalPosition: 'top',
    });
  }



  // ///////////////////////////////////Users(client)////////////////////////////////////////////////

  setClientLoggedIn(info) {
    console.log(info)
    this.isClientLoggedIn = true;
    if (info.result) {
      var profileData = {
        EmailId: info.result.EmailId,
        Name: info.result.Name,
        createdAt: info.result.createdAt,
        role: info.result.role,
        status: info.result.status,
        slug: info.result.slug,
        id: info.result._id,
        token: info.token
      }
    } else if (info.user) {
      var profileData = {
        EmailId: info.user.EmailId,
        Name: info.user.Name,
        createdAt: info.user.createdAt,
        role: info.user.role,
        status: info.user.status,
        slug: info.user.slug,
        id: info.user._id,
        token: info.token
      }
    }

    localStorage.setItem('currentUser', JSON.stringify(profileData))

    localStorage.setItem('clientloggedIn', 'true')
  }

  getClientLoggedIn() {
    return JSON.parse(localStorage.getItem('clientloggedIn') || this.isClientLoggedIn.toString())
  }


  setClientLogout() {
    this.isClientLoggedIn = false;
    localStorage.setItem('clientloggedIn', 'false')
  }


  /* 
function name: getAdminLoggedIn
Input: None
Output: Boolean
Desc: Checking whether the user is loggedin or not 
*/
  getAdminLoggedIn() {
    return JSON.parse(localStorage.getItem('adminloggedIn') || this.isAdminLoggedIn.toString())
  }

  /* 
 function name: setAdminLoggedIn
 Input: None
 Output: Boolean
 Desc: Checking whether the user is loggedin or not and set localstorage  
 */
  setAdminLoggedIn() {
    this.isAdminLoggedIn = true;
    localStorage.setItem('adminloggedIn', 'true')
  }

  /* 
 function name: getAdminLoggedIn
 Input: None
 Output: Boolean
 Desc: Admin logout and clear the localstorage 
 */
  setAdminLogout() {
    this.isAdminLoggedIn = false;
    localStorage.clear();
    localStorage.setItem('adminloggedIn', 'false')
  }


  ///////////////////////////////////Premium////////////////////////////////////////////////

  getPremiumUserLoggedIn() {
    return JSON.parse(localStorage.getItem('loggedIn1') || this.isPremiumUserLoggedIn.toString())
  }

  setPremiumUserLoggedIn(info) {
    info.ismanagerAndWH = info && info.ismanagerAndWH ? info.ismanagerAndWH : 'nomanagerAndwarehouse';
    var profileData = {
      'email': info.EmailId ? this.encryptDecrypt.set('123456$#@$^@1ERF', info.EmailId) : null,
      'name': this.encryptDecrypt.set('123456$#@$^@1ERF', info.Name),
      'role': this.encryptDecrypt.set('123456$#@$^@1ERF', info.role),
      'id': this.encryptDecrypt.set('123456$#@$^@1ERF', info._id)
    }
    this.isPremiumUserLoggedIn = true;
    localStorage.setItem('profile', JSON.stringify(profileData))
    localStorage.setItem('loggedIn1', 'true')
  }

  setPremiumUserLogout() {
    this.isPremiumUserLoggedIn = false;
    localStorage.setItem('loggedIn1', 'false');
  }

  // user profile endpoint api call
  userprofile() {
    return this.http.get(this.serverurl + '/api/users/me');
  }

  // links in user api 
  linkExpire(temp, time) {
    var a = {
      temp: temp, time: time
    };
    return this.http.post(this.serverurl + '/api/users/links', a);
  }

  verifyOtp(otpObj) {
    console.log(otpObj);

    return this.http.post(this.serverurl + '/api/users/verifyotpforgot', otpObj)
  }

  //user registration
  saveuser(user, groupinvite) {
    console.log("user: ", user);
    console.log("groupinvite: ", groupinvite)
    return this.http.post(this.serverurl + '/api/users/saveuser', { user, groupinvite });
  }


  getuseremail(email) {
    var postVar2 = { type: "email", value: email };
    return this.http.post(this.serverurl + '/api/users/checkuser', postVar2, {
    })
  }

  checkUserExists(emailid) {
    console.log("Service checkUserExists: ", emailid)
    return this.http.get(this.serverurl + '/api/users/checkUserExists/' + emailid);
  }

  changePass(user) {
    console.log("userservice", user)
    return this.http.put(this.serverurl + '/api/users/change/password', user);
  }
  forgetPassword(user) {
    console.log(user);
    return this.http.post(this.serverurl + '/api/users/forgetpwd', user);
  }

  forgotPassEmail(otpObj) {
    return this.http.post(this.serverurl + '/api/users/forgotPassEmail', otpObj)
  }


  changeforgotpassword(user) {
    return this.http.post(this.serverurl + '/api/users/changeForgotPass', user)
  }

  //Client Login
  checkLogin(user) {
    return this.http.post(this.serverurl + '/auth/local', user);
  }



  // get list users
  getUsers(id) {
    return this.http.get(this.serverurl + '/api/users/' + id);
  }

  // get my friends
  from: any;
  getFriends(id) {
    return this.http.get(this.serverurl + '/api/friendslists/gettingFriends/' + id);
  }

  getVideoCallFriends(id) {
    return this.http.get(this.serverurl + '/api/friendslists/gettingVideoCallFriends/' + id);
  }

  getStatusFriends(id) {
    return this.http.get(this.serverurl + '/api/friendslists/gettingStatusFriends/' + id);
  }

  getFriendsdata(data) {
    return this.http.get(this.serverurl + '/api/friendslists/gettingFriendsdata/' + data);
  }

  getInvitations(id) {

    return this.http.get(this.serverurl + '/api/friendslists/gettingInvitations/' + id);
  }
  getGroupInvitations(id) {

    return this.http.get(this.serverurl + '/api/groupmembers/getInvitations/' + id);
  }


  // Invitation
  sendInviteMail(data) {
    console.log("data: ", data)
    return this.http.post(this.serverurl + '/api/invitations/mailstatus', data);
  }

  /* 
   function name: getuserdata
   Input: JSON data
   Output: JSON data
   Desc: send the userid and get the user details from users collection
  */

  getuserdata(id) {
    return this.http.get(this.serverurl + '/api/users/unique/' + id);
  }

  // updatelogin status to 1
  updateloginstatus(updatedata) {
    console.log(updatedata);
    return this.http.post(this.serverurl + '/api/users/update', updatedata);
  }

  //profile pic upload
  saveFiles(selectedFiles: any) {
    return this.http.post(this.serverurl + '/api/medias', selectedFiles);
  }

  imageFiles(data) {
    console.log(data);

    return this.http.post(this.serverurl + '/api/medias/updateprofile', data);
  }

  emailid;
  getsearchedemail(email) {
    console.log("email: ", email)
    return this.http.get(this.serverurl + '/api/users/' + email)
  }



  GroupinvitationExpiry(obj) {
    console.log("GroupinvitationExpiry: ", obj)
    return this.http.post(this.serverurl + '/api/invitations/GroupinvitationExpiry', obj);
  }


  invitationExpiry(invitationexpirydata) {
    console.log(invitationexpirydata)
    return this.http.post(this.serverurl + '/api/invitations/invitationExpiry', { invitationexpirydata })
  }

  invitingFriend(invitingfrienddata) {
    console.log(invitingfrienddata);
    return this.http.post(this.serverurl + '/api/users/invitingFriend', invitingfrienddata)
  }

  acceptFriend(acceptfrienddata) {
    console.log(acceptfrienddata);
    return this.http.post(this.serverurl + '/api/users/acceptFriend', acceptfrienddata)
  }

  rejectFriend(rejectfriend) {
    console.log(rejectfriend);
    return this.http.post(this.serverurl + '/api/users/rejectFriend', rejectfriend)
  }


  profile(userdata) {
    return this.http.post(this.serverurl + '/api/userprofiles', userdata)
  }
  // emitMessage(message) {
  //   this.sendMessage.emit(message)
  // }
  userName(data) {
    this.Userdetails.emit(data);
  }
  userProfileDetails(id) {
    console.log(id)
    return this.http.get(this.serverurl + '/api/userprofiles/' + id)
  }
  InvitedUser(InviteduserData) {
    console.log(InviteduserData)
    return this.http.post(this.serverurl + '/api/friendslists/creatingFriends', InviteduserData)
  }

  // same function is duplicated with getFriends()
  // sentInvitations(id)
  // {
  //   console.log(id);
  //   return this.http.get(this.serverurl + '/api/friendslists/gettingFriends/' + id)
  // }

  Updatestatus(updatedata) {
    console.log(updatedata)
    return this.http.post(this.serverurl + '/api/friendslists/updatingAccept', updatedata)
  }

  // updateGroupStatus(updatedata)
  // {
  //   console.log(updatedata)
  //   return this.http.post(this.serverurl + '/api/groupmembers/updatingAccept',updatedata)
  // }
  get(apiname) {
    console.log(apiname);
    return this.http.get(this.serverurl + '/api/' + apiname);
  }


  autoRefreshUserProfile() {
    let observable = new Observable<any>(observer => {
      if (this.socket)
        this.socket.on('userprofile:save', (data) => {
          observer.next(data);
        });
    });
    return observable;
  }



  update(apiname, data) {
    console.log("service", data);

    return this.http.put(this.serverurl + '/api/' + apiname, data);
  }

  add(apiname, data) {
    console.log(data);

    return this.http.post(this.serverurl + '/api/' + apiname, data);
  }

  addProfile(data) {
    console.log(data);
    return this.http.post(this.serverurl + '/api/userprofiles/OrgLogo', data);
  }


  deltingAllmsgs(deletingAllmsgs) {
    return this.http.post(this.serverurl + '/api/messages/deltingAllmsgs', deletingAllmsgs)
  }

  deltingSinglemsg(deletingSinglemsgdata) {

    console.log("deletingSinglemsgdata: ", deletingSinglemsgdata)
    return this.http.post(this.serverurl + '/api/messages/delteSinglemsg', deletingSinglemsgdata)
  }

  undeltingSinglemsg(deletingSinglemsgdata) {

    console.log("deletingSinglemsgdata (undelete): ", deletingSinglemsgdata)

    return this.http.post(this.serverurl + '/api/messages/undelteSinglemsg', deletingSinglemsgdata)
  }

  /*
  Function Name:BlockingFriends
  Input:JSON
  OUTPUT: JSON
  
  */
  priorityFriends(prioInfo) {

    return this.http.post(this.serverurl + '/api/friendslists/priorityFriends', prioInfo)


  }
  blockingFriends(info) {

    return this.http.post(this.serverurl + '/api/friendslists/blockFriends', info)
  }
  sendData(msg) {
    this.subject.next(msg)
  };
  sendObs(): Observable<any> {
    return this.subject.asObservable()
  }

  // This is for delete contact from friendslist permanently
  deletecontact(deletecontactdata) {
    console.log(deletecontactdata)
    return this.http.post(this.serverurl + '/api/friendslists/deletecontact', deletecontactdata)
  }

  chatuserName(data) {
    console.log(data);
    this.chatUserdetails.emit(data);
  }

  emitPlaceChangeEvent(places) {
    this.nearbyplacechange.emit(places);
  }

  emitEmojis(Emojis) {
    this.emojiCollector.emit(Emojis);
  }

  getGroupss(id) {
    console.log("ID: ", id);
    return this.http.get(this.serverurl + '/api/groupmembers/mygroups/' + id);

  }
  createGroup(groupdata) {
    console.log(groupdata);

    return this.http.post(this.serverurl + '/api/groups', groupdata)
  }

  showGroupmembers(groupdata) {
    console.log("Groupdata (UserService): ", groupdata);
    return this.http.get(this.serverurl + '/api/groups', groupdata)
  }

  fetchgrouppic(gid) {
    console.log("gid: ", gid)
    return this.http.get(this.serverurl + '/api/groups/fetchprofilepic/' + gid);
  }



  // getorganizationdata()
  // {
  //   return this.http.get(this.serverurl + '/api/admin/');
  // }

  // This is for video call 
  videocall(data) {
    console.log("VideoCall Service: ", data);
    return this.http.post(this.serverurl + '/api/friendslists/videocall', data)
  }

  fetchcalllogs(data) {
    console.log("Fetch Calls: ", data)
    return this.http.get(this.serverurl + '/api/calls/fetchcalllogs/' + data)
  }


  // This is for incognito chat
  inCognito(data) {
    console.log(data)
    return this.http.post(this.serverurl + '/api/friendslists/incognitochat', data)
  }
  role
  getroles() {
    return this.http.get(this.serverurl + '/api/roless');
  }
  sendEmojidata(msg) {
    this.emoji.next(msg)
  };

  getEmoji(): Observable<any> {
    return this.emoji.asObservable()
  }

  // This is for show the contact list bio when user drag the mouse to contact
  chatcontactbio(data) {
    console.log(data);
    return this.http.post(this.serverurl + '/api/userprofiles/chatcontactbioshow', data)
  }

  // chatOFF updaate user loginstatus
  chatoff(data) {
    return this.http.post(this.serverurl + '/api/users/chatingOff', data)
  }

  // tab close event function
  tabClosee(data) {
    return this.http.post(this.serverurl + '/api/users/tabcloseing', data)
  }
  changepassword(data) {
    console.log(data);

    return this.http.put(this.serverurl + '/api/admins/change/password', data)
  }
  // getuserpassword(oldpassword)
  // {
  //   console.log(oldpassword);
  //   return this.http.post(this.serverurl + '/api/admins/checkingOldPassword',oldpassword)
  // }

  getOrgUsers(data1, data2) {
    console.log(data1, data2);
    return this.http.get(this.serverurl + '/api/users/orgsearch/' + data1 + '/' + data2)

  }

  getAllNormalUsers(data) {
    console.log(data);

    return this.http.get(this.serverurl + '/api/users/normalusers/' + data)
  }
  refreshevent(data) {
    console.log(data);
    return this.http.post(this.serverurl + '/api/users/refreshpage', data)
  }


  getBlogs() {
    return this.http.get(this.serverurl + '/api/blogs/')
  }

  videocallend(data) {
    console.log("Videocall end: ", data);
    return this.http.post(this.serverurl + '/api/users/endvideocall/', data)
  }

  updateUserStatus(data) {
    console.log("updateSeenStatus: ", data)
    return this.http.post(this.serverurl + '/api/userstatuss/updateSeenStatus', data);

  }

  createStatus(data) {
    console.log("Status Service: ", data);
    return this.http.post(this.serverurl + '/api/userstatuss/', data);
  }

  fetchsolostatus(userid) {
    // console.log("Refetch Status: ",userid);
    return this.http.get(this.serverurl + '/api/userstatuss/fetchsolostatus/' + userid);
  }

  getStatus(data) {
    return this.http.post(this.serverurl + '/api/userstatuss/fetchstatus/', data);
  }

  fetchmystatus(myid) {
    console.log("myid: ", myid);
    return this.http.get(this.serverurl + '/api/userstatuss/' + myid);
  }
  getblogpic(id) {
    return this.http.get(this.serverurl + '/api/medias/' + id);
  }

  updateStatusLikes(data) {
    console.log("Service Status like: ", data);
    return this.http.post(this.serverurl + '/api/userstatuss/updatelikes/', data);
  }

  addStatusComments(comment) {
    console.log("Add comment service: ",comment)
    return this.http.post(this.serverurl + '/api/userstatuss/updatecomments/',comment);
  }

  muteStatus(data) {
    console.log("Mute Status: ",data)
    return this.http.post(this.serverurl + '/api/userstatuss/mutestatus/', data)
  }

  unmuteStatus(data) {
    console.log("Unmute Status: ",data)
    return this.http.post(this.serverurl + '/api/userstatuss/unmutestatus/', data)
  }
  getEmployeeMessages(data)
{
  console.log(data);
  
  return this.http.post(this.serverurl+'/api/messages/getmessages',data);
}
}