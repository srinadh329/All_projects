import { Injectable } from '@angular/core';
import { HttpClient, HttpEventType, HttpResponse, HttpErrorResponse, HttpRequest } from '@angular/common/http';
import { Router } from '@angular/router';
import * as _ from 'lodash';
import { FrontEndConfig } from './frontendConfig';
import { BehaviorSubject } from 'rxjs';
import { Observable, Subject } from 'rxjs';
import { MatSnackBar } from '@angular/material';
import { Subscription } from 'rxjs/Subscription';
import { FileuploadService } from './fileupload.service';
import { saveAs } from 'file-saver';
export enum FileQueueStatus {
  Pending,
  Success,
  Error,
  Progress,
  Complete
}

@Injectable({
  providedIn: 'root'
})




export class DocumentService {
  serverurl = this.frontendconfig.getserverurl();
  folders
  progress
  isPending
  isSuccess = 0
  isError
  inProgress = true
  i = 1;

  array1;
  constructor(private http: HttpClient, private uploader: FileuploadService, private router: Router, private frontendconfig: FrontEndConfig, public snackBar: MatSnackBar) {
    
  }
 
  private subject = new Subject<any>();
  starturl
  sendStartUrl(starturl){
    this.starturl=starturl
  }
  getStartUrl(){
    return this.starturl
  }
  sendFileData(message) {
 this.subject.next(message);
  }

  getFileData(): Observable<any> {
    return this.subject.asObservable();
  }



  checkpassword(password: any) {
    //alert(password)
    return this.http.get(this.serverurl + '/api/sharingpeoples/checkpassword/' + password)
  }


  savedragedFiles(queueObj: any) {
    return this.http.post(this.serverurl + '/api/documents/dragcreate', queueObj)
  }
  saveFiles(queueObj: any) {
    // return this.http.post(this.serverurl+'/api/documents', selectedFiles)
    const req = new HttpRequest('POST', this.serverurl + '/api/documents', queueObj, {
      reportProgress: true,

    });
   return this.http.request(req)
  

  }
  getCurrentVersionDocFields(data) {
    return this.http.post(this.serverurl + '/api/fieldoption/CurrentVersionDocFields/', data)
  }
  getuserfiles() {
    return this.http.get(this.serverurl + '/api/documents/')

  }

  getDeleteFiles(id) {
    return this.http.get(this.serverurl + '/api/documents/getDeleteFiles/' + id)

  }
  sharing(data) {
    return this.http.post(this.serverurl + '/api/sharingpeoples', data)
  }
  //
  getsharingpeople(id) {
    if (id._id)
      return this.http.get(this.serverurl + '/api/sharingpeoples/getsharingpeople/' + id._id)
    else
      return this.http.get(this.serverurl + '/api/sharingpeoples/getsharingpeople/' + id)


  }
  recentfiles() {
    return this.http.get(this.serverurl + '/api/documents/recentfiles/')
  }
  encryptedvalues(data) {
  
    return this.http.post(this.serverurl + '/api/documents/encrypt/',data)
  }
  decryptedvalues(data) {
  console.log(data)
    return this.http.post(this.serverurl + '/api/documents/decrypt/',data)
  }
  getsharingdocs() {
    return this.http.get(this.serverurl + '/api/sharingpeoples/')

  }

  getSharePeopleEmails() {
    return this.http.get(this.serverurl + '/api/sharingpeoples/getSharePeopleEmails/')

  }

  decryptfileid(id) {
    var v = { 'id': id }
    return this.http.post(this.serverurl + '/api/sharingpeoples/fileid', v)

  }

  decryptfileid1(id) {
    var v = { 'id': id }
    return this.http.post(this.serverurl + '/api/sharingpeoples/fileid1', v)

  }

  /// for folder view <START>
  createfolder(folderdetail) {
    return this.http.post(this.serverurl + '/api/folders', folderdetail)
  }


  getparentfolders(id) {
    return this.http.get(this.serverurl + '/api/folders/getparentfolders/' + id)
 }
  getfolder() {
    return this.http.get(this.serverurl + '/api/folders')
  }

  deletefolder(delete_element) {
    if (delete_element.isFile) return this.http.put(this.serverurl + '/api/documents/deletefile/' + delete_element._id, delete_element)
    else return this.http.put(this.serverurl + '/api/folders/deletefolder/' + delete_element._id, delete_element)
  }

  // deletesentfolder(deletedata){
  //   console.log(deletedata)
  //    return this.http.put(this.serverurl + '/api/sharpingpeoples/deletefile/' + deletedata._id, deletedata)
  // }
  
  multiShareFolderDelete(sharefolders)
  {
    return this.http.post(this.serverurl + '/api/sharingpeoples/multiFolder/ShareDelete/' ,sharefolders)
  }

  multiFileDelete(files)
  {
    return this.http.post(this.serverurl + '/api/documents/multiFileDelete/' ,files)
  }
  multiFolderDelete(folders)
  {
    return this.http.post(this.serverurl + '/api/folders/multiFolderDelete/' ,folders)
  }
  multiselectmove(data)
  {
    return this.http.post(this.serverurl + '/api/folders/multiselectmove/' ,data)

  }
  multiselect_Permenant_Delete(data)
  {
    return this.http.post(this.serverurl + '/api/folders/multiselect_Permenant_Delete/' ,data)

  }
  trashfiles() {

    return this.http.get(this.serverurl + '/api/documents/trashbin/')
  }

  trashfolders() {
    return this.http.get(this.serverurl + '/api/folders/trashbin/')
  }
  folderDeletion(id, del) {

    var data = { id: id, value: del }

    return this.http.post(this.serverurl + '/api/folders/permanentFolderDeletion/', data)
  }

  downloadfiles(file) {
    location.href = this.serverurl + '/api/documents/downloadfiles/' + file._id
    // return this.http.get(this.serverurl + '/api/documents/downloadfiles/' + file._id);
  }

  saveZipfiles(file: any) {
    // const req = new HttpRequest('POST', this.serverurl + '/api/documents/zipuploads', file, {
    //   reportProgress: true,
    // });
    // return this.http.request(req)
    return this.http.post(this.serverurl + '/api/documents/zipuploads', file)
  }

  extractZipfiles(event) {
    const req = new HttpRequest('POST', this.serverurl + '/api/documents/extractzipfiles', event, {
      reportProgress: true,
    });
    return this.http.request(req);
  }

  
  deleteBin(doc) {

    if (doc.isFile) return this.http.delete(this.serverurl + '/api/documents/' + doc._id)
    else return this.http.delete(this.serverurl + '/api/folders/' + doc._id)
  }

  trashdelete() {
    return this.http.get(this.serverurl + '/api/folders/trashdeleteFF')
  }

  updatefolderOnMove(update) {
    if (update.element.isFolder) {
      return this.http.put(this.serverurl + '/api/folders/move/update/' + update.element._id, update)
    }
    else {
      return this.http.put(this.serverurl + '/api/documents/move/update/' + update.element._id, update)
    }
  }
  updatefolder(update) {
    if (update.isFolder) {
      return this.http.put(this.serverurl + '/api/folders/' + update._id, update)
    }
    else {
      return this.http.put(this.serverurl + '/api/documents/' + update._id, update)
    }
  }
  updatefolder1(update){ 
      return this.http.post(this.serverurl + '/api/documents/restore', update)
  }
  restorefolder(update){
    return this.http.post(this.serverurl + '/api/folders/restore' ,update)
 }
  multipleRemovesent(data){
    return this.http.put(this.serverurl + '/api/documents/multiple/remove/sentfiles' , data)
  }
  updatesentfolder(update) {
    if (update.isFolder) {
      return this.http.put(this.serverurl + '/api/folders/removeSentFolder/' + update._id, update)
    }
    else {
      return this.http.put(this.serverurl + '/api/documents/removeSentFile/' + update._id, update)
    }
  }
  updatefiledata(file) {
    return this.http.put(this.serverurl + '/api/documents/check/' + file._id, file)
  }

  getfilepassword(id) {
    return this.http.get(this.serverurl + '/api/sharpingpeoples/' + id)

  }
  /// for folder view <END>
  //get shared floderfiles
  getfolderfiles(id) {
    return this.http.get(this.serverurl + '/api/documents/' + id)
  }

  //get all folders for move tp
  getallfolders() {
    return this.http.get(this.serverurl + '/api/folders/getallfolders/')

  }
  getSelectedDoc(id) {
    return this.http.get(this.serverurl + '/api/documents/' + id)
  }
  //get shared floders data
  getfolderdetails(id) { return this.http.get(this.serverurl + '/api/folders/' + id) }

  upload(files) {
    let headers = new Headers();
    // let options = new RequestOptions({ headers: headers });
    // options.params = parameters;
    return this.http.post(this.serverurl + '/api/documents', files)

    // this.http.post(this._baseURL + 'upload', files, options)
    //          .map(response => response.json())
    //          .catch(error => Observable.throw(error));

  }
 isFolderIsExist(data) {
    return this.http.post(this.serverurl + '/api/folders/isFolderIsExist', data)
  }

  sharingupdate(doc) {
    return this.http.put(this.serverurl + '/api/sharingpeoples/' + doc._id, doc)

  }
  getFileContent(content) {
    return this.http.get(this.serverurl + '/api/documents/getcontent/' + content)

  }
  getpublicFileContent(content) {
    return this.http.get(this.serverurl + '/api/documents/getfilecontent/' + content)

  }

  RemoveShareduser(doc) {
    return this.http.delete(this.serverurl + '/api/sharingpeoples/' + doc._id)

  }
  openSnackBar(message, action: string) {
     this.snackBar.open(message, action, {
      duration: 5000,
      panelClass: ['bar-color'],
      horizontalPosition: 'right',
      verticalPosition: 'bottom',
      
    });
  }

  openActionSnackBar(message, action: string) {

    this.snackBar.open(message, action, {
      duration: 5000,
      panelClass: ['bar-color'],
      horizontalPosition: 'right',
      verticalPosition: 'bottom',

    });
  }

  saveFieldOptions(data) {
    return this.http.post(this.serverurl + '/api/fieldoption/', data);
  }

  getFileReviewContent(id) {
    return this.http.get(this.serverurl + '/api/fieldoption/' + id)
  }
  emailsearch(email) {
    return this.http.post(this.serverurl + '/api/fieldoption/emailcheck', email);

  }

  saveSharedPeople(data) {
    return this.http.post(this.serverurl + '/api/fielddatas/', data);
  }

  getSharedData(id) {
    return this.http.get(this.serverurl + '/api/fielddatas/' + id)
  }

  updateFieldValues(data) {
    return this.http.post(this.serverurl + '/api/fieldvalues/updateFieldValues', data);
  }
  getFieldValues(data) {
    return this.http.post(this.serverurl + '/api/fieldvalues/getvalues/', data)
  }

  getDocFieldValueRecords(data) {
    return this.http.post(this.serverurl + '/api/fieldvalues/getDocFieldValueRecords/', data)
  }

  getSharedDoc(id) {
    return this.http.get(this.serverurl + '/api/sharingpeoples/getSharedDoc/' + id)
  }

  getDocumentRecord(id) {
    return this.http.get(this.serverurl + '/api/documents/getDocumentRecord/' + id)
  }
  getFieldDataRecord(id) {
    return this.http.get(this.serverurl + '/api/fielddatas/getFieldDataRecord/' + id)
  }

  getpass(id) {
    return this.http.get(this.serverurl + '/api/sharingpeoples/' + id)

  }
  saveSignatureimages(selectedFiles: any) {
    return this.http.post(this.serverurl + '/api/signatures/', selectedFiles)

  }
  savePhotoimages(selectedFiles: any) {
    return this.http.post(this.serverurl + '/api/photos/', selectedFiles)

  }
  saveStampimages(selectedFiles: any) {
    return this.http.post(this.serverurl + '/api/stamps/', selectedFiles)

  }
  publicgetSelectedDoc(id) {
    return this.http.get(this.serverurl + '/api/documents/publicdoc/' + id)

  }



  saveVersion(data) {
    return this.http.post(this.serverurl + '/api/versions/', data)

  }

  getAllDocVersions(docId) {
    return this.http.get(this.serverurl + '/api/versions/AllDocVersions/' + docId)
  }
  createfieldlogs(data) {
    return this.http.post(this.serverurl + '/api/documentlogs/fieldlogs/', data)
  }
  createBulkFieldLogs(data) {
    return this.http.post(this.serverurl + '/api/documentlogs/createBulkFieldLogs/', data)
  }
  getCurrentVersionDocFieldOptions(data) {
    return this.http.post(this.serverurl + '/api/fieldoption/CurrentVersionDocFields/', data)
  }

  getCurrentVersionDocFieldWithValues(data) {
    return this.http.post(this.serverurl + '/api/fieldoption/versionDocfieldvalues/', data)
  }

  updateSharedFieldsValue(data) {
    return this.http.post(this.serverurl + '/api/fieldvalues/updateSharedFields', data)
  }
  editVersionName(data) {
    return this.http.put(this.serverurl + '/api/versions/' + data._id, data)
  }
  getCurrentVersionDocFieldValues(data) {
    return this.http.post(this.serverurl + '/api/fieldvalues/getCurrFieldVal', data)
  }

  getCurVerSharedPeopleList(data) {
    return this.http.post(this.serverurl + '/api/sharingpeoples/getCurVerSharedPeopleList/', data)
  }

  updateDocVersionInSharedPeople(data) {
    return this.http.post(this.serverurl + '/api/sharingpeoples/updateCurVerSharedPeopleList/', data)
  }
  ListOfSignatures(email) {
    return this.http.get(this.serverurl + '/api/signatures/' + email)
  }
  ListOfInitials(email) {
    return this.http.get(this.serverurl + '/api/signatures/initialList/' + email)
  }
  ListOfPhotos(email) {
    return this.http.get(this.serverurl + '/api/photos/' + email)
  }
  ListOfStamps(email) {
    return this.http.get(this.serverurl + '/api/stamps/' + email)
  }

  sendingLink(data) {
    return this.http.post(this.serverurl + '/api/mobilelinks/', data)
  }
  getMobileLink(id) {
    return this.http.get(this.serverurl + '/api/mobilelinks/' + id)
  }
  updateMobileLink(data) {
    return this.http.put(this.serverurl + '/api/mobilelinks/' + data._id, data)
  }
  saveSignatureFromMobileLink(data) {
    return this.http.post(this.serverurl + '/api/signatures/createfrommobilelink/', data)
  }
  savePhotoFromMobileLink(data) {
    return this.http.post(this.serverurl + '/api/photos/createfrommobilelink/', data)
  }
  saveStampFromMobileLink(data) {
    return this.http.post(this.serverurl + '/api/stamps/createfrommobilelink/', data)
  }
  uploadVideo(formdata) {
    return this.http.post(this.serverurl + '/api/documentlogs/uploadvideo/', formdata)
  }

  setSignatureDefaultSettings(data) {
    return this.http.put(this.serverurl + '/api/signatures/setDefaultSetting/' + data._id, data)
  }

  setPhotoDefaultSettings(data) {
    return this.http.put(this.serverurl + '/api/photos/setDefaultSetting/' + data._id, data)
  }

  setStampDefaultSettings(data) {
    return this.http.put(this.serverurl + '/api/stamps/setDefaultSetting/' + data._id, data)
  }
  getDefaultSignature(data) {
    return this.http.post(this.serverurl + '/api/signatures/getDefault/' + data.email, data)

  }
  getDefaultPhoto(id) {

    return this.http.get(this.serverurl + '/api/photos/getDefault/' + id)

  }
  getDefaultStamp(id) {
    return this.http.get(this.serverurl + '/api/stamps/getDefault/' + id)

  }
  bottlenecksCreationForPhoto(data) {
    return this.http.post(this.serverurl + '/api/photos/bottlenecksCreation/', data)
  }


  postcomments(data) {
    return this.http.post(this.serverurl + '/api/comments/', data)
  }


  postcommentsoutside(data) {
    return this.http.post(this.serverurl + '/api/comments/postcommentsoutside', data)
  }
  getcomments(data) {

    return this.http.post(this.serverurl + '/api/comments/getcomments/', data)
  }


  deletecomments(data, title) {
    var v = { id: data, status: title }
    return this.http.post(this.serverurl + '/api/comments/commentupdate', v)

  }

  editcomments(data) {
    var comment = {
      comment: data.comment
    }
    return this.http.put(this.serverurl + '/api/comments/' + data.documentid, comment)

  }


  replycomments(data) {
    return this.http.post(this.serverurl + '/api/comments/replycomments/', data)

  }

  replycommentsoutside(data) {
    return this.http.post(this.serverurl + '/api/comments/replycommentsoutside/', data)

  }

  getnavigationfolder(id) {

    return this.http.get(this.serverurl + '/api/folders/getnavigationfolder/' + id)

  }

  deleteshared(id) {
    return this.http.delete(this.serverurl + '/api/sharingpeoples/' + id)
  }
  savemousemovement(data) {
    return this.http.post(this.serverurl + '/api/documentlogs/', data)

  }
  getSignature(id) {
    return this.http.get(this.serverurl + '/api/signatures/getsignature/' + id)
  }
  getStamp(id) {
    return this.http.get(this.serverurl + '/api/stamps/getstamp/' + id)
  }
  getPhoto(id) {
    return this.http.get(this.serverurl + '/api/photos/getphoto/' + id)
  }
  getDocumentLogs(doc) {
    return this.http.get(this.serverurl + '/api/documentlogs/' + doc._id)
  }

  getSingleLog(id)
  {
    return this.http.get(this.serverurl+ '/api/documentlogs/getSingleLog/'+id);
  }
  getSharingPeoples(doc){
    return this.http.get(this.serverurl + '/api/sharingpeoples/getsharingpeople/auditlog/' + doc)
  }
  DownloadDocInAuditLog(doc){
    return this.http.get(this.serverurl + '/api/documents/Download/OriginalPDF/'+doc._id).subscribe((data: any) => {
      var data1 = this.serverurl + '/uploads/' + data.path;
      saveAs(data1, doc.name);
  })
}
  createfavorite(data) {

    return this.http.post(this.serverurl + '/api/favorites/', data)
  }

  getfavorites() {
    return this.http.get(this.serverurl + '/api/favorites/')
  }

  removefavorite(data) {
    return this.http.delete(this.serverurl + '/api/favorites/' + data._id)
  }

  getparticularfavorite(data) {

    return this.http.get(this.serverurl + '/api/favorites/' + data)

  }
  googleupload(file) {
    return this.http.post(this.serverurl + '/api/documents/googledrive', file)

  }
  // gettempltes() {
  //   return this.http.get(this.serverurl + '/api/fieldoption/agrementcopy/templtesget')

  // }
  getSelectedTemplate(data) {
    return this.http.get(this.serverurl + '/api/fieldoption/getSelectedTemplate/' + data)

  }
  gettempltes(){
    return this.http.get(this.serverurl + '/api/fieldoption/gettempltes')
  }
  edittemplate(data) {
    return this.http.put(this.serverurl + '/api/fieldoption/' + data._id, data)

  }
  overridetemplate(data) {
    return this.http.put(this.serverurl + '/api/fieldoption/overridetemplate/' + data._id, data)

  }
  searchfolders(data) {
    return this.http.post(this.serverurl + '/api/folders/searchfiles/', data)

  }
  searchfiles(data) {

    return this.http.post(this.serverurl + '/api/documents/searchfiles/', data)
  }

  searchdocuments(searchdata) {
    return this.http.post(this.serverurl + '/api/documents/searchdocuments/', searchdata)
  }

  getSentDocs() {
    return this.http.get(this.serverurl + '/api/folders/getSentDocs/sent')
  }

  documentlogs(apiname, newcoords) {
    return this.http.post(this.serverurl + apiname, newcoords)
  }

  search(api, data) {
    return this.http.post(this.serverurl + '/api/' + api, data);
  }

  getSearch(api) {
    return this.http.get(this.serverurl + '/api/' + api);
  }

  put(api, data) {
    return this.http.put(this.serverurl + '/api/' + api, data)
  }

  pdfDownload(downData) {
    return this.http.post(this.serverurl + '/api/documents/pdfDownload/',downData);
  }

  pdfPrint(filedata){
    var printdata: any ={
      id:filedata._id
    }
     return this.http.post(this.serverurl + '/api/documents/pdfDownload/',printdata)
    //  .subscribe((data:any) =>
    //  {
    //      var xhr = new XMLHttpRequest()
    //      xhr.open("GET", data.path)
    //      xhr.responseType = 'blob' 
    //      xhr.onload = function() {
    //       var blob = new Blob([xhr.response], {type: 'application/pdf'});
    //       const blobUrl = URL.createObjectURL(blob);
    //         const iframe = document.createElement('iframe');
    //         iframe.style.display = 'none';
    //         iframe.src = blobUrl;
    //         document.body.appendChild(iframe);
    //         iframe.contentWindow.print();
    //      }
    //      xhr.send()
    //   });
  }

  newCompletedDocImgs(data){
    return this.http.post(this.serverurl + '/api/documents/pdfDownload/',data)
  }
  getFolderRecord(id)
  {
    return this.http.get(this.serverurl + '/api/folders/folder/info/'+id)
  }
  getDocumentImages(id){
    return this.http.get(this.serverurl + '/api/docimages/getDocumentImages/' + id);
  }

  deleteAllFilesFolder()
  {
    return this.http.delete(this.serverurl + '/api/folders/filesFolder/delete');
  }
  multiFavorite(data)
  {
    return this.http.post(this.serverurl + '/api/favorites/multifavorite',data);

  }
  multisharing(data)
  {
    return this.http.post(this.serverurl + '/api/sharingpeoples/multishare',data);

  }
  verifydocument(data){
    return this.http.post(this.serverurl + '/api/documents/verifydocument/',data)
  }
  getFolderFiles(folderid)
  {
    console.log(folderid)
    return this.http.get(this.serverurl + '/api/documents/getFolderFiles/'+folderid)

  }
  getdevice(data){
    return this.http.post(this.serverurl + '/api/documentlogs/getdevice', data)

  }
  getDocumentSingleLog(data){
    return this.http.post(this.serverurl + '/api/documentlogs/getDocumentSingleLog/', data)
  }
}


