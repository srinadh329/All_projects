import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from "@angular/router";
import { FrontEndConfig } from "./frontendConfig"
@Injectable({
  providedIn: 'root'
})
export class OrganizationService {

  constructor(private http: HttpClient, private router: Router, private frontendconfig: FrontEndConfig) { }
  serverurl = this.frontendconfig.getserverurl();
  getserverurl() {
    return this.serverurl
  }

  addDep(dept) {
    return this.http.post(this.serverurl + '/api/departments', dept);
  }

  getDepartments() {

    return this.http.get(this.serverurl + '/api/departments/')
  }

  getdeptlist()
  {
    return this.http.get(this.serverurl + '/api/departments/departmentslist')
  }

  getDeptlist() {

    return this.http.get(this.serverurl + '/api/departments/')
  };
  getempbygroup(id){
    return this.http.get(this.serverurl + '/api/sharingpeoples/getempbygroup/'+id)
  }

  updateempdetails(details) {
    return this.http.put(this.serverurl + '/api/departments/' + details._id, details)
  }

  postemp(empdata) {
    return this.http.post(this.serverurl + '/api/users/addEmployee', empdata);
  }

  activateuser(user) {
    return this.http.post(this.serverurl + '/api/users/update/', user)
  }

  getemployee(id) {
    return this.http.get(this.serverurl + '/api/users/getemployee/' + id)
  }

  getemplist() {
    return this.http.get(this.serverurl + '/api/users/employeedetails')
  }

  SearchEmployee(search){
    return this.http.post(this.serverurl + '/api/users/searchEmployee',search)
  }
  
  SearchDepartment(search){
    return this.http.post(this.serverurl + '/api/departments/searchdepartment/search',search)
  }

  getemploylist() 
  {

    return this.http.get(this.serverurl + '/api/users/empdata');
  }

  updateemployeelogindetails(abc) {
    return this.http.post(this.serverurl + '/api/users/employeelogindetails/', abc)
  }

  removeempdetails(c) {
    return this.http.put(this.serverurl + '/api/users' + c._id, c)
  }

  getShareable_employees(departmentid) {
    return this.http.get(this.serverurl + '/api/users/shareable_employees/' + departmentid)

  }

  getShareableemails(departmentid) {
    return this.http.get(this.serverurl + '/api/users/shareableemails/' + departmentid)

  }

  getorgsharingpeople(id){
    return this.http.get(this.serverurl+ '/api/sharingpeoples/getorgsharingpeople/'+id);
  }

  getshareDocbasedemp(id){
    return this.http.get(this.serverurl+ '/api/sharingpeoples/getshareDocbasedemp/'+id);
  }

  updateorgsharingpeople(did,e){
    return this.http.put(this.serverurl + '/api/sharingpeoples/updateorgsharingpeople/'+did,e)
  }
  Shareto_Department(sharedata) {
    return this.http.post(this.serverurl + '/api/sharingpeoples/Shareto_Department', sharedata)

  }

  SharedWith_Departments(departments) {
    return this.http.post(this.serverurl + '/api/sharingpeoples/SharedWith_Departments', departments)
  }

  updatesharedpeople(Shareddoc) {
    return this.http.put(this.serverurl + '/api/sharingpeoples/' + Shareddoc._id, Shareddoc)

  }
  AllSharedpeopleupdate(Shareddoc) {
    return this.http.post(this.serverurl + '/api/sharingpeoples/AllSharedpeopleupdate', Shareddoc)

  }

  removedepartsharing(id){
    return this.http.put(this.serverurl + '/api/sharingpeoples/removedepartsharing/' +id,id)

  }

  multiShareto_Department(data)
  {
    return this.http.post(this.serverurl + '/api/sharingpeoples/multisharetodepartment',data);

  }

  addemployeesfromexcel(data)
  {
    return this.http.post(this.serverurl + '/api/users/addemployeess', data);

    
  }
}
