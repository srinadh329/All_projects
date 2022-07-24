import { Injectable } from '@angular/core';
import { FrontEndConfig } from "../frontendconfig";
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class GroupsService {
  serverurl = this.frontendconfig.getserverurl();

  constructor(private http: HttpClient,private frontendconfig: FrontEndConfig) { }
  
  getgroupdata(id) {

    return this.http.get(this.serverurl + '/api/groups/' + id);
  }
  sendSlug(Group) {
    
    return this.http.post(this.serverurl + '/api/groups/groupsMail', Group)
  }
  // Adding members to the group
  addingMember(info){
    console.log("info: ",info);
    return this.http.post(this.serverurl + '/api/groupmembers/addingMembers', info);
    
  }
// Getting group members from group
  gettingMembersList(group) {

    return this.http.get(this.serverurl + '/api/groupmembers/gettingMembers/'+group);
  }
  // UPdating group members
  updateGroupMember(info){

    return this.http.post(this.serverurl + '/api/groupmembers/updateStatus', info);
    
  }
  // Getting members count of group
  gettingMembersCount(id){
 
    return this.http.get(this.serverurl + '/api/groupmembers/gettingCount/'+id); 
  }
  // Creating group message
  groupMessage(message){
    return this.http.post(this.serverurl + '/api/groupmessages/groupMessages', message);
  }
  // Getting group message
  getGroupMessages(data){
   
    return this.http.get(this.serverurl + '/api/groupmessages/getMessages/'+data);
    
  }
  // Getting badge count of messages
  getBadgeCount(obj){
    return this.http.post(this.serverurl + '/api/groupmessages/getMessageschat', obj);
  }
  // Removing bagdge count after seen the messages
  removeBadgeCount(data){
    return this.http.post(this.serverurl + '/api/groupmessages/removeBadgeCount', data);
  }
  // Leave group from existing groups
  leaveGroup(did, gid, id){
    return this.http.delete(this.serverurl + '/api/groupmembers/leaveGroup/'+did+'/'+gid+'/'+id);
  }
  // Renaming groups
  renameGroup(data){
    console.log(data);
    
    return this.http.put(this.serverurl + '/api/groups/rename/name' ,data);
  }
  // Particular group information
  gInfor(gid, id){
    console.log(gid, id);
    return this.http.get(this.serverurl + '/api/groupmembers/gInfor/'+gid+'/'+id);
    
  }
  // Particular group members information
  gViewMembers(id){
    return this.http.get(this.serverurl + '/api/groupmembers/viewMembers/' + id);
  }
  // Fetching group all members details
  fetchMemberDetails(id) {
    console.log("ID: ",id);
    return this.http.get(this.serverurl + '/api/groupmembers/getgroups2/' + id);
  }
  checkExits(gid){
    return this.http.get(this.serverurl + '/api/groups/checkingGroupExist/'+gid);
  }
  // Deleting single group message
  deleteGroupMessage(data){
    return this.http.post(this.serverurl +'/api/groupmessages/deleteGroupMessage', data);
  }
  // Clear chat of paricular group chat
  clearData(gid, id){
    return this.http.get(this.serverurl + '/api/groupmessages/clearData/' +gid+'/'+id);
  }
  // Make messsages favouraite
  groupStarMessage(data){
    return this.http.post(this.serverurl + '/api/stargroupmessages/makeStarred', data);
  }
  // Getting star messages
  getStarGroupMessage(gid, id){
    return this.http.get(this.serverurl + '/api/stargroupmessages/getStarGroupMessages/'+gid + '/' +id);
  }

  addStarMessage(id, did){
    return this.http.get(this.serverurl + '/api/groupmessages/addStarId/' +id+'/'+did);
  }
  removeStarGroupMessage(data){
    return this.http.put(this.serverurl + '/api/stargroupmessages/makeUnStarGroupMessage/unStar', data);
  }
//  Dleting star messages
  removeStarStatus(info){
    return this.http.put(this.serverurl + '/api/groupmessages/deleteStarStatus/delete', info);
  }
  // Making mute andu unmute group message notifications
  muteBadge(value){
    return this.http.post(this.serverurl + '/api/groupmembers/muteBadge', value);
  }
   // Making star unstar to groups
  starStatus(info){
    return this.http.post(this.serverurl + '/api/groupmembers/starStatus', info);
  }
  groupblockstatus(info){
    return this.http.post(this.serverurl + '/api/groupmembers/groupblockstatus', info);
  }

}
