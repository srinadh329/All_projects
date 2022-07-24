import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Router } from "@angular/router";
import { FrontEndConfig } from "./frontendConfig"
import { AdminService } from './admin.service';
import { CookieService } from 'ngx-cookie-service';
import * as CryptoJS from 'crypto-js';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient, private router: Router, private frontendconfig: FrontEndConfig, private adminService: AdminService,public CookieService:CookieService) {
    this.isUserLoggedIn = JSON.parse(localStorage.getItem('loggedIn') || ('false'))
    this.picEmitter = new EventEmitter();
  }
  public picEmitter: EventEmitter<any>;
  encryptSecretKey='key'
  localstorageData:any={};
  currentpath:any={}
  routing:any
  emittpic(): void {
    this.picEmitter.emit()
  }
currentelement
  serverurl = this.frontendconfig.getserverurl();
  getserverurl() {
    return this.serverurl
  }


  encryptData(data) {
    return  CryptoJS.AES.encrypt(JSON.stringify(data), this.encryptSecretKey).toString();
  }
  decryptData(data) {
     if(data){ const bytes = CryptoJS.AES.decrypt(data, this.encryptSecretKey);
      if (bytes.toString()) {
        return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
      }}
      return data;
  }
  checkLogin(user) {

    return this.http.post(this.serverurl + '/auth/local', user)

  }

 setcurrentelement(data){
   this.currentelement=data

  }
  getcurrentelement(){
   return this.currentelement
 
   }
setpath(data){
    this.currentpath={
      'active':this.encryptData(data[0].active),
      'createdAt':this.encryptData(data[0].createdAt),
      'encryptedId':data[0].encryptedId,
      'isFolder':this.encryptData(data[0].isFolder),
      'isSent':this.encryptData(data[0].isSent),
      'name':this.encryptData(data[0].name),
      'nameCount':this.encryptData(data[0].nameCount),
      'updatedAt':this.encryptData(data[0].updatedAt),
      'updated_at':this.encryptData(data[0].updated_at),
      'userid':this.encryptData(data[0].userid),
      '__v':this.encryptData(data[0].__v),
      '_id':this.encryptData(data[0]._id)
    }
  localStorage.setItem('currentpath', JSON.stringify([this.currentpath]));

}
getpath(){
  return JSON.parse(localStorage.getItem('currentpath'))

}

setroutingnavigation(data){
  this.routing=this.encryptData(data)
  localStorage.setItem('navigation',this.routing);
  return this.routing
}
getroutingnavigation(){ 
  return localStorage.getItem('navigation')
}
  deleteDoc(obj){
    return this.http.get(this.serverurl + '/api/users/deletesocialdoc/'+ obj)
  }
  getmobile(mobilenumber) {

    var postVar = { type: "mobile", value: mobilenumber };

    return this.http.post(this.serverurl + '/api/users/checkusers', postVar)
  }


  checkslug(user) {

    var postVar1 = { type: "slug", value: user };
    return this.http.post(this.serverurl + '/api/users/checkusers', postVar1)
  }
  getparticularrecord(id)
  {
    return this.http.post(this.serverurl + '/api/folders/getparticularrecord',id)
  }
  twitterLogin(obj){
    return this.http.post(this.serverurl + '/api/users/twitterlogin',obj)
  }
  facebookLogin(obj){
    return this.http.post(this.serverurl + '/api/users/facebooklogin',obj)
  }
  checkpassword(password) {
    var postVar1 = { type: "password", value: password };
    return this.http.post(this.serverurl + '/api/users/oldPasswordChecking', postVar1)
  }



  getUsers() {
    return this.http.get(this.serverurl + '/api/users/getUsers')
  }
  getProfile() {
    return this.http.get(this.serverurl + '/api/users/me')
  }
getuserid(data){
  
  return this.http.get(this.serverurl + '/api/users/checkuserid/'+data)

}
  ////////////////////////////////////////////////////////////////////

  forgotPassEmail(otpObj) {
    return this.http.post(this.serverurl + '/api/users/forgotPassEmail', otpObj)
  }

  verifyOtp(otpObj) {
    return this.http.post(this.serverurl + '/api/users/verifyotp', otpObj)
  }
  saveFiles(selectedFiles: any) {
    return this.http.post(this.serverurl + '/api/medias', selectedFiles)
  }

  changeForgotPass(Pass) {
    return this.http.post(this.serverurl + '/api/users/changeForgotPass', Pass)
  }
  ////////////////////////////////////////////////////////////////////

  changePass(user) {

    return this.http.put(this.serverurl + '/api/users/change/password', user)

  }

  ////////////////////////////////////////////////////////////////////////

  private isUserLoggedIn;

  setUserLoggedIn(data) {
    if(data.user.type=='organisation'){
      this.localstorageData={
        'token':data.token,
        'email':this.encryptData(data.user.email),
        'role':this.encryptData(data.user.role),
        'type':this.encryptData(data.user.type),
        'new':this.encryptData(data.user.new),
        'id':this.encryptData(data.user._id),
        'name':this.encryptData(data.user.companyname)
      }
    }
    if(data.user.type=='individual'){
      this.localstorageData={
        'token':data.token,
        'email':this.encryptData(data.user.email),
        'name':this.encryptData(data.user.name),
        'role':this.encryptData(data.user.role),
        'type':this.encryptData(data.user.type),
        'id':this.encryptData(data.user._id),
        'new':this.encryptData(data.user.new)
      }
    }
    if(data.user.type=='employee'){
      this.localstorageData={
        'token':data.token,
        'email':this.encryptData(data.user.email),
        'name':this.encryptData(data.user.name),
        'role':this.encryptData(data.user.role),
        'type':this.encryptData(data.user.type),
        'id':this.encryptData(data.user._id),
        'new':this.encryptData(data.user.new),
        'organizationid':this.encryptData(data.user.organizationid)
      }
    }
      localStorage.setItem('loggedIn', 'true')
      localStorage.setItem('currentUser', JSON.stringify(this.localstorageData));
    }
  getUserLoggedIn() {

    return JSON.parse(localStorage.getItem('loggedIn') || this.isUserLoggedIn.toString())
  }
  setUserLogout() {
    this.isUserLoggedIn = false;
    localStorage.setItem('loggedIn', 'false')
  }
  logout() {
    var userToken = { 'token': null ,'email':null,'name':null,'type':null,'role':null,'new':null}
    localStorage.setItem('loggedIn', "false")
    localStorage.setItem('currentUser', JSON.stringify(userToken))
    this.CookieService.delete('token','/')
    this.router.navigate(['/']);
  }
  getImage() {
    const data = this.http.get(this.serverurl + "/api/users/qrcode");

    return data

  }
  verifyemail(user) {
    return this.http.post(this.serverurl + '/api/users/verifyemail1', user)
  }

  //========================================================================
  //getting all users in database for two way verfication
  getUser(mobilenumber) {

    var postVar = { type: "mobile", value: mobilenumber };
  

    return this.http.post(this.serverurl + '/api/users/checkusers', postVar)
  }

  updateimages(data) {
    return this.http.put(this.serverurl + '/api/users/update/' + data._id, data)
  }

  updateAuthantication(data) 
  {
    return this.http.put(this.serverurl + '/api/users/authanticate/' + data._id, data)
  }
  userStatusUpdate(user)
  {
    return this.http.put(this.serverurl + '/api/users/' + user._id,user)

  }
  getemail(email) {

    var postVar1 = { type: "email", value: email };
    return this.http.post(this.serverurl + '/api/users/checkusers', postVar1)
  }
  
  getUserData(email){
    var postVar1 = { type: "email", value: email };
    return this.http.post(this.serverurl + '/api/users/checkusers1', postVar1)
  }

  getallemail(email) {``
    return this.http.post(this.serverurl + '/api/users/checkallusers', email)
  }


 
//========================================================================

  getRegisteredUsers() 
  {
    return this.http.get(this.serverurl + '/api/users/getRegisteredUsers')
  }

//================================  CHAT FUNCTIONS  ===================================

  createChat(chatdata) {
    return this.http.post(this.serverurl + '/api/chats/', chatdata);
  }

  getChatHistory(id) {
    return this.http.get(this.serverurl + '/api/chats/' + id);
  }

  getChatDoc(id) {
    return this.http.get(this.serverurl + '/api/chats/getdoc/' + id);
  }

  getChatDocuments() {
    return this.http.get(this.serverurl + '/api/chats/');
  }

  markedchatread(i) {
    return this.http.put(this.serverurl + '/api/chats/' + i._id, i)
  }
  googlelogin(){
    return this.http.get(this.serverurl + '/auth/google',);

  }

  getDept(department)
  {
    var postVar = { type: "department", value: department };
    return this.http.post(this.serverurl + '/api/departments/checkdepartments', postVar)
  }

  filterusers(data)
  {
    return this.http.post(this.serverurl + '/api/users/filterUsers', data)

  }
  semdMailForSignup(email)
  {
    return this.http.post(this.serverurl + '/api/users/sendMail/Signup', email)
    
  }
  Searchuser(search)
  {
    return this.http.post(this.serverurl + '/api/users/search/user',search)
  }

  checkemail(email)
  {
    var email1={type:"activeEmail",value:email}
    return this.http.post(this.serverurl + '/api/users/checkusers',email1);
  }
  userdecryptData(data)
  {
    return this.http.post(this.serverurl + '/api/users/userecryptDatas',data);
  }
  getcountries(country){
    return this.http.post(this.serverurl + '/api/users/getcountries',country);
    }
}
