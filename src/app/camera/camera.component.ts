import { Component, OnInit, ViewChild, Renderer2, AfterViewInit, OnDestroy, ElementRef, NgZone } from '@angular/core';
import * as RecordRTC from 'recordrtc';
import { FormControl, Validators, NgModel,FormBuilder } from '@angular/forms';
let RecordRTC = require('recordrtc/RecordRTC.min');
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';
import { count } from 'rxjs/operators';
@Component({
  selector: 'app-camera',
  templateUrl: './camera.component.html',
  styleUrls: ['./camera.component.css']
})
export class CameraComponent implements AfterViewInit, OnDestroy {

  @ViewChild('video',{static:false}) videoElement: any;  
  @ViewChild('canvas', { static: true }) canvas: ElementRef;
  video: any;
  recordflag:any;
  CameraChoice: string;
  recordduration=900;
  cameraInit: boolean=false;
  private stream: MediaStream;
  private recordRTC: any;
  videorecord: boolean=false;
  recordedvideo: any = null;
  recordedvideoblob: any=null;
  result: any;
  trigger: Boolean = false;
  recordminute: number;
  recordseconds: number;
  constructor(private snackbar: MatSnackBar, private renderer: Renderer2, public dialogRef: MatDialogRef<CameraComponent>,public dialog: MatDialog,private zone: NgZone,) {
    this.recordduration=900;
    this.recordminute=Math.floor(this.recordduration/60);
    this.recordseconds=this.recordduration%60;
    // this.video.controls = false;
  }

  ngAfterViewInit() {
   
    this.video = this.videoElement.nativeElement;
    this.video.muted = true;
    this.video.controls = false;
    this.video.autoplay = true;
    let mediaConstraints:any = {
      video: {
        mandatory: {
          minWidth: 640,
          minHeight: 480
        }
      }, audio: true,
      echoCancellation:true,
      
    };
    console.log(this.video)
    console.log(this.videoElement)
    navigator.mediaDevices.getUserMedia(mediaConstraints)
      .then((stream)=> {
        this.cameraInit=true;
        this.video.srcObject = stream;
        // this.video.setAttribute('playsinline', 'true'); // required to tell iOS safari we don't want fullscreen
        // this.video.controls=false
        // this.video.play();
        console.log("Camera Started")
      }, ()=>{
        console.log("Unable to Start Camera");
      });
  }

  ngOnDestroy() {
    console.log("OnDestroy");
    setTimeout(() => {
      this.video.srcObject.getTracks().forEach(track => { 
      console.log(track)
        console.log(track.stop());
      });
    }, 0);
    console.log("OnDestroy end");
  }

  takepicture() {
    this.trigger=true;
    this.CameraChoice ='picture';
    console.log(this.video.videoWidth, this.video.videoHeight)
    this.renderer.setProperty(this.canvas.nativeElement, 'width', this.video.videoWidth);
    this.renderer.setProperty(this.canvas.nativeElement, 'height', this.video.videoHeight);
    this.canvas.nativeElement.getContext('2d').drawImage(this.videoElement.nativeElement, 0, 0);
    console.log(this.canvas);
    var res = this.canvas.nativeElement.toDataURL();
    var byteString = atob(res.split(',')[1]);
    var mimeString = res.split(',')[0].split(':')[1].split(';')[0]
    var ab = new ArrayBuffer(byteString.length);
    var ia = new Uint8Array(ab);
    for (var i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }
    var bb = new Blob([ab], { type: mimeString });
    const file = new File([bb], "camera", { type: mimeString });
    this.result= file;
    console.log("res: ",this.result);
    this.dialogRef.close(this.result)
  }

  startrecord() {

    this.trigger=true;
    this.CameraChoice ='video';
    this.video.controls=false;
    this.videorecord=true
    var options = {
      mimeType: 'video/webm', // or video/webm\;codecs=h264 or video/webm\;codecs=vp9
      // audioBitsPerSecond: 64000,
      // videoBitsPerSecond: 64000,
      bitsPerSecond: 128000 // if this line is provided, skip above two
    };
    this.recordRTC = RecordRTC(this.video.srcObject, options);
    this.recordRTC.startRecording();
    
    this.recordflag=setInterval(() => {
      // console.log("Count: ",this.recordduration);
      this.recordminute= Math.floor(this.recordduration/60);
      this.recordseconds=this.recordduration%60;
      this.recordduration--;
      if(this.recordduration == 0) {
        this.stoprecord()
      }
    }, 1000);
  }

  closedialog() {
    setTimeout(() => {
      this.dialogRef.close(null);
      this.video.srcObject.getTracks().forEach(track =>  track.stop());
    }, 0);
  }
  pauserecordvideo:any=null;

  pauserecord() {
    this.pauserecordvideo=true
    let recordRTC= this.recordRTC;
    var temp = this.recordduration;
    clearInterval(this.recordflag);
    console.log("Left duration: ",temp);
    this.recordduration=temp;
    recordRTC.pauseRecording();
  }
  resumerecord() {
    this.pauserecordvideo=false;
    let recordRTC= this.recordRTC;
    recordRTC.resumeRecording();
    this.recordflag=setInterval(() => {
      // console.log("Count: ",this.recordduration);
      this.recordminute= Math.floor(this.recordduration/60);
      this.recordseconds=this.recordduration%60;
      this.recordduration--;
      if(this.recordduration == 0) {
        this.stoprecord()
      }
    }, 1000);
  }
  
  stoprecord() {

  clearInterval(this.recordflag);   
    this.trigger=true;
    this.video.controls=false;
    this.videorecord=false;
    let recordRTC = this.recordRTC;
    recordRTC.stopRecording(() => {
      this.recordedvideoblob=recordRTC.getBlob();
      console.log("Recorded Blob: ", this.recordedvideoblob);
      this.recordedvideo = new File([this.recordedvideoblob], "videorecording", {type: 'video/webm', lastModified: Date.now()});
      console.log(this.recordedvideo);
      
      this.result=this.recordedvideo;
      this.zone.run(() => {
        this.snackbar.open(`Processing Video. Please Wait!!`, "x", {
          duration: 2000,
          verticalPosition: 'top',
          horizontalPosition: 'center'
        });
      });
      setTimeout(() => {
        this.dialogRef.close(this.result);
      },0)
        
    });
      

  }

}