import { Injectable } from '@angular/core';
import * as _ from 'lodash';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpRequest, HttpResponse } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { HttpEventType } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { FrontEndConfig } from './frontendConfig';
import { Router } from '@angular/router';
import { Subject, Observable } from 'rxjs'

export enum FileQueueStatus {
  Pending,
  Success,
  Error,
  Progress,
  Complete,

}

export class FileQueueObject {
  public file: any;
  public id: any = Math.random()
  public status: FileQueueStatus = FileQueueStatus.Pending;
  public progress: number = 0;
  public completeall: number = 0;
  public count: number = 0;
  public request: Subscription = null;
  public response: HttpResponse<any> | HttpErrorResponse = null;
  public responsedata: any;
  public responsefile: any;
  public type: any
  public size:any
  constructor(file: any) {
    this.file = file;
  }



  // actions
  public upload = () => { /* set in service */ };
  public cancel = () => { /* set in service */ };
  public remove = () => { /* set in service */ };

  // statuses
  public isPending = () => this.status === FileQueueStatus.Pending;
  public isSuccess = () => this.status === FileQueueStatus.Success;
  public isComplete = () => this.status === FileQueueStatus.Complete;
  public isError = () => this.status === FileQueueStatus.Error;
  public inProgress = () => this.status === FileQueueStatus.Progress;
  public isUploadable = () => this.status === FileQueueStatus.Pending || this.status === FileQueueStatus.Error;
}



@Injectable({
  providedIn: 'root'
})

export class FileuploadService {

  constructor(private http: HttpClient, private router: Router, public frontendconfig: FrontEndConfig) {
    this._queue = <BehaviorSubject<FileQueueObject[]>>new BehaviorSubject(this._files);

  }
  private subject = new Subject<any>();
  private Response = new Subject<any>();
  private singleResponse = new Subject<any>();

  count = 0;
  index: number;
  errorOnUpload:boolean=false
  sendUploadSuccess(message: any) {
    this.subject.next(message);
  }
  getUploadSuccess(): Observable<any> {
    return this.subject.asObservable();

  }
  sendUploadresponse(data: any) {
    this.Response.next(data);
  }

  getUploadResponse(): Observable<any> {
    return this.Response.asObservable();
  }

  oncomplete_Singlefile() {
    return this.singleResponse.asObservable()
  }

  serverurl = this.frontendconfig.getserverurl();
  progress
  private _queue: BehaviorSubject<FileQueueObject[]>;
  private _files: FileQueueObject[] = [];
  public totalfilesize: any;
  public remTime: any;
  url: any;
  array1;
  continue: boolean = true

  // the queue
  public get queue() {
    return this._queue.asObservable();
  }

  // public events
  public onCompleteItem(queueObj: FileQueueObject, response: any): any {
    if (queueObj.isComplete) {
      this.singleResponse.next(queueObj)
     
    }

  }

  // public functions
  public addToQueue(data: any) {
    // add file to the queue
    _.each(data, (file: any) => this._addToQueue(file));

  }


  public clearQueue() {
    // clear the queue
    this._files = [];
    this._queue.next(this._files);
  }

  public removequeue() {
    // clear the queue
    this._files = []
    this._queue.asObservable()
  }
  public uploadAll = async function () {
    // upload all except already successfull or in progress
    var queueObj: FileQueueObject
    for (queueObj of this._files) {
      if (!queueObj.count) {
      var result = await this._upload(queueObj);
       if (result.progress == 0 && queueObj.status == 2) {
          this.index = this._files.indexOf(queueObj);
          return false
        }
      }
      // else{
      //   return false

      // }

    }

    // _.each(this._files,async (queueObj: FileQueueObject,callback)=> {
    //   console.log('called')
    //   if (queueObj.isUploadable()) {
    //   var result= await this._upload(queueObj);
    //   }
    // });
  }

  continueQueue = async function () {
    var queueObj: FileQueueObject
    var checkarray
    checkarray = Object.assign([], this._files)
    checkarray.splice(0, this.index + 1)
    for (queueObj of checkarray) {
      if (!queueObj.isSuccess()) {
        var result = await this._upload(queueObj);
        if (result.progress == 0 && queueObj.status == 2) {
          this.index = this._files.indexOf(queueObj);
          return false
        }
      }
      else return false
    }
  }


  // private functions
  public _addToQueue(file: any) {
    console.log(file)
    const queueObj = new FileQueueObject(file);
    var filetype = queueObj.file.name.split('.')
    queueObj.type = filetype[filetype.length - 1]
    queueObj.size= (queueObj.file.size/1024)/1024
    // set the individual object events
    // if (queueObj.file.parentid){ this._upload(queueObj) }
    queueObj.upload = () => this._upload(queueObj);
    queueObj.remove = () => this._removeFromQueue(queueObj);
    queueObj.cancel = () => this._cancel(queueObj);
    // push to the queue
    this._files.push(queueObj);
    this._queue.next(this._files);
  }

  //====================================== make a copy =======================================

  makecopy(id) {
    var data = { id: id }
    return this.http.post(this.serverurl + '/api/documents/makecopy', data)
  }
  multimakecopy(data){
    var obj={
      files:data
    }
    return this.http.post(this.serverurl + '/api/documents/multimakecopy', obj)
  }
  //==========================================================================================

  private _removeFromQueue(queueObj: FileQueueObject) {
    _.remove(this._files, queueObj);
  }

  private _upload(queueObj: FileQueueObject) {
    // create form data for file
    return new Promise(async (resolve, reject) => {
      const form = new FormData();
      if (queueObj.type == 'pdf') form.append("type", 'application/pdf')
      if (queueObj.type == 'doc') form.append("type", "application/msword")
      if (queueObj.type == 'docx') form.append("type", "application/vnd.openxmlformats-officedocument.wordprocessingml.document");
      if (queueObj.file.parentid) form.append("folderid", queueObj.file.parentid);
      else if (queueObj.file.folderid) form.append("folderid", queueObj.file.folderid);
      if ((queueObj.type == 'pdf' || queueObj.type == 'doc' || queueObj.type == 'docx') && queueObj.size<=10 ) 
      {
        if(queueObj.file.resultFileName)
          form.append("uploads[]", queueObj.file, queueObj.file.resultFileName);
        else
          form.append("uploads[]", queueObj.file, queueObj.file.name);
        // upload file and report progress
        let req = new HttpRequest('POST', this.serverurl + '/api/documents/', form, {
          reportProgress: true,
        });
        queueObj.request = this.http.request(req).subscribe(
          (event: any) => {
            queueObj.count = 1
            if (event.type === HttpEventType.UploadProgress) {
              this._uploadProgress(queueObj, event);
            } else if (event instanceof HttpResponse) {
              // console.log(event.body.pagesInfo.length)

              if(event.body.pagesInfo && event.body.pagesInfo.length > 100){
                this.http.get(this.serverurl + '/api/documents/createImages/'+event.body._id).subscribe(data=>{
                  console.log(data)
                })
              }  
                console.log(event.body._id)
              var res:any = queueObj.response;
              
              this._uploadComplete(queueObj, event);
              this.array1--;
              if (!this.array1) {
                if(this.errorOnUpload)setTimeout(() => { this.sendUploadSuccess(this._files) }, 60000)
                else setTimeout(() => { this.sendUploadSuccess(this._files) }, 5000)
              }
              resolve(queueObj)
              // reject(queueObj)
            }

          },

          (err: HttpErrorResponse) => {
            if (err.error instanceof Error) {
              // A client-side or network error occurred. Handle it accordingly.
              this._uploadFailed(queueObj, err);
            } else {
              // The backend returned an unsuccessful response code.
              this._uploadFailed(queueObj, err);
            }
          }
        );
      }
       else{
         this.errorOnUpload=true
      this.array1--;
      if (!this.array1) {
        if(this.errorOnUpload)setTimeout(() => { this.sendUploadSuccess(this._files) }, 60000)
                else setTimeout(() => { this.sendUploadSuccess(this._files) }, 6000)
       }
      resolve(queueObj)

       }

      // this.http.post(this.serverurl + '/api/documents/', form, {reportProgress: true, observe: 'events'})
      //   .subscribe(event => {
      //     if (event.type === HttpEventType.UploadProgress) {
      //       console.log(event.loaded)
      //       // this.percentDone = Math.round(100 * event.loaded / event.total);
      //     } else if (event instanceof HttpResponse) {
      //       // this.uploadSuccess = true;
      //     }
      // });
    })
    //  return queueObj
  }


  private _cancel(queueObj: FileQueueObject) {
    // update the FileQueueObject as cancelled
    queueObj.request.unsubscribe();
    queueObj.progress = 0;
    queueObj.status = FileQueueStatus.Pending;
    this._queue.next(this._files);
    this.continueQueue()
  }



  private _uploadProgress(queueObj: FileQueueObject, event: any) {
    // update the FileQueueObject with the current progress

    var progress = Math.round(100 * event.loaded / event.total);
    progress = Math.round(progress - progress * (10 / 100))
    if (progress < 0) progress = 0
    queueObj.progress = progress;
    queueObj.status = FileQueueStatus.Progress;
    this._queue.next(this._files);

  }

  private _uploadComplete(queueObj: FileQueueObject, response: HttpResponse<any>) {
    // update the FileQueueObject as completed
    queueObj.progress = 100;
    queueObj.status = FileQueueStatus.Success;
    queueObj.response = response.body;
    
    queueObj.responsedata = response.body.Message;
    queueObj.responsefile = response.body.files;
    if (queueObj.responsedata === "PDF is password protected, please enter password") {
      queueObj.status = 2
      queueObj.progress = 0;
      this.continue = false
      this.errorOnUpload=true
     this.sendUploadresponse(queueObj);
    }
    else {
      this._queue.next(this._files);
      this.onCompleteItem(queueObj, response.body);
    }
  }

  private _uploadFailed(queueObj: FileQueueObject, response: HttpErrorResponse) {
    // update the FileQueueObject as errored
    queueObj.progress = 0;
    queueObj.status = FileQueueStatus.Error;
    queueObj.response = response;
    this._queue.next(this._files);
  }

  // public pause_queue()
  // {
  //   this.continue=false
  // }

  passwordremover(data) {
     var data1 = {
      file: data.file.responsefile,
      password: data.password,
      folderid:undefined,
    }
    if(data.file.file.folderid!=undefined)data1.folderid=data.file.file.folderid

    //  let filedata = new FileQueueObject(data.file.uploads[0])
    // filedata.next(data)
    // return this.http.post(this.serverurl + '/api/documents/passwordcheck', data)

    this.http.post(this.serverurl + '/api/documents/passwordcheck', data1, { reportProgress: true, observe: 'events' })
      .subscribe(event => {
        if (event.type === HttpEventType.UploadProgress) {
          // filedata.progress = Math.round(100 * event.loaded / event.total);
        } else if (event instanceof HttpResponse) {
          this._files.forEach(x => {
            if (x.id == data.file.id) {
              let response: HttpResponse<any> = event
              x.status = FileQueueStatus.Success;
              x.response = response.body;
              x.responsedata = response.body.Message;
              x.responsefile = response.body.files;
              if (x.responsedata == "Please check your password") {
                x.status = 2
                x.progress = 0;
                this.sendUploadresponse(x);
              }
              else {
                this._uploadComplete(x, event);
                this.continueQueue()
              }
              //  this._queue.next(this._files);
            }
          })

        }
      });
    return data

  }

  urlcontent(value) {
    return this.http.post(this.serverurl + '/api/documents/url', value)
  }

  onedriveurlcontent(value) {
    return this.http.post(this.serverurl + '/api/documents/onedrive', value)
  }
}



