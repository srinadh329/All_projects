import { Component, OnInit, Input, Output, EventEmitter, OnDestroy } from '@angular/core'
import {HttpClient} from '@angular/common/http';
// import { Response, Headers, RequestOptions} from '@angular/http';
import { Observable } from 'rxjs';
import { DocumentService } from '../document.service';

import {Router} from "@angular/router";
import { FrontEndConfig } from '../frontendConfig';
import { from } from 'rxjs';
import { AdminService } from '../admin.service';

@Component({
  selector: 'app-aunthicate',
  templateUrl: './aunthicate.component.html',
    styleUrls: ['./aunthicate.component.css']


})
export class AunthicateComponent implements OnInit, OnDestroy {
    @Input('authIputSend') authIputSend:any;
    @Output() closeModel = new EventEmitter<any>();
    serverurl=this.frontendconfig.getpythonurl();
   
    closemodal() {
        // this.closecam();
        // document.getElementById('closebtn').click();
        this.isclosed=true;
        this.closeModel.emit({ 'res': "failed" });
    }

    ngOnDestroy()
    {  if( this.video.srcObject!=null){
        this.closecam();}
    }
video:any
imageChanged:any
Profiledata:any
data="trying to detect liveness"
spoof="mobile phone"
pythonid:any
constraints = {
    audio: false,
    video: {
        width: {min: 640, ideal: 1280, max: 1920},
        height: {min: 480, ideal: 720, max: 1080}
    }
};
uploadWidth =  640; //the width of the upload file
mirror = false; //mirror the boundary boxes
updateInterval = 2000 / 30; //the max rate to upload images
scoreThreshold = 0.40;
apiServer = 'http://127.0.0.1:5000' + '/image'; //the full TensorFlow Object Detection API server url
imageChangeThreshold =  0.05; //how much the image can change before we trigger motion
//;

//Canvas setup
//create a canvas to grab an image for upload
imageCanvas = document.createElement('canvas');
imageCtx = this.imageCanvas.getContext("2d");

//create a canvas for drawing object boundaries
//  drawCanvas = document.createElement('canvas');
//  drawCtx = this.drawCanvas.getContext("2d");
 resp:any=true
 maxTime: any = 120;
 time: any = 0;
 timer;
 progresscount:any=0;
 isclosed=false;

//Used for motion detection
 lastFrameData = null;
    lastFrameTime = null;
  constructor(private newService: DocumentService,private frontendconfig:FrontEndConfig,private http: HttpClient,private adminService:AdminService,private router:Router) { }
  
  ngOnInit() {
      console.log(this.authIputSend)
    //   this.StartTimer()
    // this.adminService.getProfile().subscribe(data => {
        this.StartTimer();
        // this.Profiledata =data
    //   console.log(this.Profiledata)
      document.getElementById('authbtn').click();
    //   console.log(this.Profiledata._id)
        
       
    //   });
    var isPlaying = false;
    var gotMetadata = false;
this.video = document.getElementById('myVideo');
// document.body.appendChild(this.drawCanvas);
navigator.mediaDevices.getUserMedia(this.constraints)
    .then(stream => {
        this.video.srcObject = stream;
        console.log("Got local user video");
        this.video.onloadedmetadata=() =>{
            console.log("video metadata ready");
            gotMetadata = true;
            if (isPlaying && this.video.srcObject!=null)
                this.startObjectDetection()
        };
        
        //see if the video has started playing
        this.video.onplaying = ()=> {
           // this.StartTimer(this.maxTime);
            console.log("video playing");
            isPlaying = true;
            if (gotMetadata && this.video.srcObject!=null){
                this.startObjectDetection()}
                else{
                    console.log("hello")
                }
            };
    })
    .catch(err => {
        console.log('navigator.getUserMedia error: ', err)
    });
   if(this.video.srcObject==null){
       console.log("completed")
   }
   
 }


  
 StartTimer() {
    this.timer = setTimeout(x => {
        
        if (this.time < this.maxTime) {
            if(!this.isclosed){
                this.time += 1;
                this.progresscount=((this.time)/this.maxTime)*100;
                document.getElementById('progressdynamic').style.width=this.progresscount+'%';
                this.StartTimer();
            }
            
        }
        else {
            console.log("Time Up")
            //this.closecam();
            document.getElementById('closebtn').click();
            this.closeModel.emit({ 'res': "failed" });
        }
    }, 1000);
}

//Draw boxes and labels on each detected object
// drawBoxes=(objects):any=> {

//     //clear the previous drawings
//     // this.drawCtx.clearRect(0, 0, this.drawCanvas.width, this.drawCanvas.height);

//     //filter out objects that contain a class_name and then draw boxes and labels on each
//     // objects.filter(object => object.class_name).forEach(object => {

//     //     var  x = 25 * this.drawCanvas.width;
//     //     var  y = 25 * this.drawCanvas.height;
//     //     var  width = (50 * this.drawCanvas.width) - x;
//     //     var  height = (30 * this.drawCanvas.height) - y;

//     //     //flip the x axis if local video is mirrored
//     //     if (this.mirror) {
//     //         x = this.drawCanvas.width - (x + width)
//     //     }

//         //drawCtx.fillText(object.class_name ,150,150);
//         //drawCtx.strokeRect(x, y, width, height);
// 	// console.log(object.class_name);
// 	// if(object.class_name == "sekhar")
// 	// {
//     // //please call id with node to get username and prompt it in alert
// 	// alert("hello mr sekhar ");
// 	// }

//     // });
// }


//Add file blob to a form and post
postFile=(file):any => {
    from(new Promise((resolve, reject) => {
       
        let that =this

    //Set options as form data
    var formdata = new FormData();
    let  xhr = new XMLHttpRequest()

    formdata.append("image", file);
    formdata.append("threshold", '0.4');
    formdata.append("kycid",this.authIputSend)
    
  
    

    xhr.open('POST', this.serverurl + '/image', true);
    //xhr.withCredentials = true
    //xhr.onreadystatechange = handler;
    xhr.onload = function () {
        if (xhr.status === 200) {
            var objects = JSON.parse(xhr.response);
            //console.log(objects[0].class_name)
            that.data=objects[0].class_name
            //console.log("data value")
            //console.log(that.data)
            
                var  event = new CustomEvent('objectDetection', {detail: objects});
                document.dispatchEvent(event);

                //start over
                that.sendImageFromCanvas()
	    //console.log(object.class_name);
            //draw the boxes
           
        
            //dispatch an event
            
                
        }
        else {
            console.error("error");
        }
    }
    console.log(that.data)
    if(this.data!="trying to detect liveness"){
        if(this.data!="Unknown" && this.data!=this.spoof){
            this.pythonid=that.data;
            console.log(this.pythonid);
            console.log(this.authIputSend)
            //alert('hi2');
               // this.timer = '';
                //this.StartTimer = function(){};
            if(this.authIputSend==this.pythonid ){
            // this.newService.authuserforapp(this.pythonid).subscribe(data => {
               // this.resp=false;
                // alert("Hey Detected")
               // alert('hi');
               this.isclosed=true;
               document.getElementById('closebtn').click();
               this.closeModel.emit({'res':"success"});
            //    this.router.navigate(['/userheader/loanapplication']);
                // this.maxTime = -1;
               // this.StartTimer(this.maxTime)
                
               
            //  });
            }

        }else{
          //  this.maxTime = -1;
              //  this.StartTimer(this.maxTime)
               // this.closecam()
                
            if(this.data=="Unknown"){
                
                // alert("Authentication failed. try again later... ")
                this.isclosed=true;
                document.getElementById('closebtn').click();
                this.closeModel.emit({'res':"failed"});
                // this.router.navigate(['/userheader/userprofile']);
            }
            if(this.data==this.spoof){
                
                // alert("Authentication failed. try again later... ")
                this.isclosed=true;
                document.getElementById('closebtn').click();
                this.closeModel.emit({'res':"failed"});
                // this.router.navigate(['/userheader/userprofile']);
            }
        }
        
//close cam
this.closecam()

}
     


xhr.send(formdata)}
));}
closecam(){
    this.video.srcObject.getTracks().forEach(track => track.stop());
this.video.srcObject=null

}



imageChange=(sourceCtx, changeThreshold)=> {

    let  changedPixels = 0;
    const threshold = changeThreshold * sourceCtx.canvas.width * sourceCtx.canvas.height;   //the number of pixes that change change

    let currentFrame = sourceCtx.getImageData(0, 0, sourceCtx.canvas.width, sourceCtx.canvas.height).data;
    //console.log(currentFrame)
    //handle the first frame
    if (this.lastFrameData == null) {
        this.lastFrameData = currentFrame;
        return true;
    }

    //look for the number of pixels that changed
    for (let i = 0; i < currentFrame.length; i += 4) {
        let lastPixelValue = this.lastFrameData[i] + this.lastFrameData[i + 1] + this.lastFrameData[i + 2];
        let currentPixelValue = currentFrame[i] + currentFrame[i + 1] + currentFrame[i + 2];
        //console.log(Math.abs(lastPixelValue - currentPixelValue))
        //see if the change in the current and last pixel is greater than 10; 0 was too sensitive0
        if (Math.abs(lastPixelValue - currentPixelValue) > 10) {
            //console.log("hello")
            changedPixels = changedPixels + 1;
        }
    }

    //console.log("current frame hits: " + hits);
    this.lastFrameData = currentFrame;

    return (changedPixels > threshold);

}


//Check if the image has changed & enough time has passeed sending it to the API
sendImageFromCanvas=()=> {
    
    this.imageCtx.drawImage(this.video, 0, 0, this.video.videoWidth, this.video.videoHeight, 0, 0, this.uploadWidth, this.uploadWidth * (this.video.videoHeight / this.video.videoWidth));

    this.imageChanged = this.imageChange(this.imageCtx, this.imageChangeThreshold)
    let enoughTime = (+new Date() - this.lastFrameTime) > this.updateInterval;
    let that =this
    if (this.imageChanged && enoughTime) {
        this.lastFrameTime = new Date();
        if(this.video.srcObject!=null){
        this.imageCanvas.toBlob(function(blob){
            
            that.postFile(blob)
        }, 'image/jpeg');}
        
    }
    else {
        if(this.video.srcObject!=null){
        setTimeout(() =>{this.sendImageFromCanvas()}, this.updateInterval);
    }}
}

//Start object detection
startObjectDetection = ():any => {

    console.log("starting object detection");

    //Set canvas sizes base don input video
    // this.drawCanvas.width = this.video.videoWidth;
    // this.drawCanvas.height = this.video.videoHeight;

    this.imageCanvas.width = this.uploadWidth;
    this.imageCanvas.height = this.uploadWidth * (this.video.videoHeight / this.video.videoWidth);

    //Some styles for the drawcanvas
    // this.drawCtx.lineWidth = 4;
    // this.drawCtx.strokeStyle = "cyan";
    // this.drawCtx.font = "20px Verdana";
    // this.drawCtx.fillStyle = "cyan";

    //Now see if we should send an image
    this.sendImageFromCanvas()
}
};


