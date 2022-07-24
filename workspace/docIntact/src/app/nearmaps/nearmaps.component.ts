import { Component, OnInit, ViewChild, ElementRef, Input } from '@angular/core';
import { round } from 'lodash';
import { Router, ActivatedRoute } from '@angular/router';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { DocumentService } from '../document.service'
import { AdminService } from '../admin.service';
import { Subscription } from 'rxjs';
import { connectableObservableDescriptor } from 'rxjs/internal/observable/ConnectableObservable';
declare var H: any;
@Component({
  selector: 'app-nearmaps',
  templateUrl: './nearmaps.component.html',
  styleUrls: ['./nearmaps.component.css']
})
export class NearmapsComponent implements OnInit {

  @ViewChild("map")
  public mapElement: ElementRef;

  @Input()
  public appId: any = 'xeeSniVGFJguQieOyDvg';

  @Input()
  public appCode: any = 'CYXw3RyDsetaa5pSVf3EAw';

  @Input()
  public lat: any;

  @Input()
  public lng: any;

  @Input()
  public width: any;

  @Input()
  public height: any;

  @Input('email') email;

  @Input('todaydate') todaydate;

  @Input('yesterdaydate') yesterdaydate;

  parameters;
  startMarker: any;
  routeLine: any;
  endMarker: any;
  startPoint: any;
  endPoint: any;
  private platform: any;
  private map: any;
  private ui: any;
  private search: any;
  public geocoder: any;
  public latitude: any;
  public longitude: any;
  public behavior: any;
  getsuggistions: any;
  public abc: any
  public static lat: any
  public static lng: any
  loc1;
  loc2;
  newwarehouse: any
  counter = 0;
  arr = [];
  marker1; group; marker2: any;

  latitude1 = []; longitude1 = [];
  logsList;
  datelogslist;
  profiledata: any;
  newyesterday: any;
  marker3: any;
  createdAt: any;
  start: any;
  type: Boolean = false;
  end: any;
  Getlocations: any = {};
  subscription: Subscription;
  mapdata:any
  today
  constructor(private router: Router, private route: ActivatedRoute, private documentService: DocumentService, private AdminService: AdminService, public dialog: MatDialog) {
    this.subscription = this.documentService.getFileData().subscribe(message => {
      this.Getlocations = message;
    });
  }

  public ngOnInit() {
    this.today=this.todaydate
    this.platform = new H.service.Platform({
      "app_id": 'xeeSniVGFJguQieOyDvg',
      "app_code": 'CYXw3RyDsetaa5pSVf3EAw',
      useHTTPS: true
    });

    // this.search = new H.places.Search(this.platform.getPlacesService());
    this.geocoder = this.platform.getGeocodingService();

    this.AdminService.getdates.subscribe(data => {
      this.yesterdaydate = data;
      this.start = null;
      this.end = null;
      this.todaydate = this.today;
      // this.getnewcoords(this.latitude, this.longitude, this.yesterdaydate, this.start, this.end);
      this.getVendor(0,0,0,0)
    });

    this.AdminService.gettdates.subscribe(data => {
      this.todaydate = data;
      this.yesterdaydate = null;
      this.start = null;
      this.end = null;
      // this.getnewcoords(this.latitude, this.longitude, this.todaydate, this.start, this.end);
      this.getVendor(0,0,0,0)
    });

    this.AdminService.getdatespick.subscribe(data => {
      this.start = data[0];
      this.end = data[1];
      this.todaydate = null;
      this.yesterdaydate = null;
      // this.getnewcoords(this.latitude, this.longitude, this.createdAt, this.start, this.end);
      this.getVendor(0,0,0,0)
    });
  }



  public ngAfterViewInit() {


    this.getplaces();
    var pixelRatio = window.devicePixelRatio || 1;
      let defaultLayers = this.platform.createDefaultLayers({
        tileSize: pixelRatio === 1 ? 256 : 512,
        ppi: pixelRatio === 1 ? undefined : 320
      });
      //step : initialize a map
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
        console.log(position)
          this.latitude = position.coords.latitude;
          this.longitude = position.coords.longitude;
          this.map = new H.Map(
            this.mapElement.nativeElement,
            defaultLayers.normal.map,
            {
              zoom: 10,
              center: { lat: this.latitude, lng: this.longitude },

            });
          // this.getnewcoords(this.latitude, this.longitude, this.yesterdaydate, this.start, this.end);
          // this.addCircleToMap(this.latitude, this.longitude);
            this.getVendor(0,0,0,0)
          //initialize a map end  

          let behavior = new H.mapevents.Behavior(new H.mapevents.MapEvents(this.map));
          this.behavior = behavior;

          this.ui = H.ui.UI.createDefault(this.map, defaultLayers);
          var ui = this.ui;

          this.group = new H.map.Group();
          this.map.addObject(this.group);

          this.group.addEventListener('tap', function (evt) {
            if (!bubble) {
              var bubble = new H.ui.InfoBubble(
                //position
                evt.target.getPosition(), {
                  //content data
                  content: evt.target.getData()
                });
              ui.addBubble(bubble);
            }
            else {
              bubble.setPosition(position);
              bubble.setContent(evt.target.getData());
              bubble.open();
            }
          }, false);

          if(this.latitude && this.longitude)
          this.dropMarker1({ lat: this.latitude, lng: this.longitude }, this.group);

        }, error => {

          this.documentService.openSnackBar(" Your Location is Blocked ", "X");
            var newcoords = {
              email:this.email.email,
              todaydate:this.todaydate,
              yesterdaydate:this.yesterdaydate,
              startdate:this.start,
              enddate:this.end 
          } 
          this.documentService.documentlogs('/api/documentlogs/logs/', newcoords).subscribe(data => {
            this.logsList = data;
          this.latitude =  this.logsList[0].latitude;
          this.longitude =  this.logsList[0].longitude;
          this.map = new H.Map(
            this.mapElement.nativeElement,
            defaultLayers.normal.map,
            {
              zoom: 10,
              center: { lat: this.latitude, lng: this.longitude },
            });
          // this.getnewcoords(this.latitude, this.longitude, this.yesterdaydate, this.start, this.end);
          // this.addCircleToMap(this.latitude, this.longitude);
          this.getVendor(0,0,0,0)

          //initialize a map end  

          let behavior = new H.mapevents.Behavior(new H.mapevents.MapEvents(this.map));
          this.behavior = behavior;

          this.ui = H.ui.UI.createDefault(this.map, defaultLayers);
          var ui = this.ui;

          this.group = new H.map.Group();
          this.map.addObject(this.group);

          this.group.addEventListener('tap', function (evt) {
            if (!bubble) {
              var bubble = new H.ui.InfoBubble(
                //position
                evt.target.getPosition(), {
                  //content data
                  content: evt.target.getData()
                });
              ui.addBubble(bubble);
            }
            else {
              bubble.setPosition();
              bubble.setContent(evt.target.getData());
              bubble.open();
            }
          }, false);


          // this.dropMarker1({ lat: this.latitude, lng: this.longitude }, this.group);
        });
      });
      } else {
        console.error("Geolocation is not supported by this browser!");
      
    }

  }
  newrad: any;




  // getnewcoords(lat, lng, yesterdaydate, startdate, enddate) {
  //   var lat1 = lat - 0.10,
  //     lng1 = lng - 0.10,
  //     R = 6371;
  //   var pi = 0.017453292519943295;
  //   var d = 0.1;
  //   var bearing = 1.57;
  //   // Degree to Radian
  //   var latitude1 = lat1 * (pi / 180);
  //   var longitude1 = lng1 * (pi / 180);
  //   var brng = bearing * (pi / 180);

  //   var latitude2 = Math.asin(Math.sin(latitude1) * Math.cos(d / R) + Math.cos(latitude1) * Math.sin(d / R) * Math.cos(brng));
  //   var longitude2 = longitude1 + Math.atan2(Math.sin(d / R) * Math.cos(latitude1), Math.cos(d / R) - Math.sin(latitude1) * Math.sin(latitude2));


  //   this.newrad = d * 1000;

  //   // back to degrees
  //   latitude2 = latitude2 * (180 / pi);
  //   longitude2 = longitude2 * (180 / pi);

  //   var lat2 = round(latitude2, 15);
  //   var lng2 = round(longitude2, 15);



  //   if(!isNaN(lat2) && !isNaN(lng2))
  //   {
  //     this.getVendor(lat1, lng1,lat2, lng2);
  //   }

  //   // new check

  //   // test code 
  //   var dLat = this.deg2rad(lat2 - lat1);
  //   var dLon = this.deg2rad(lng2 - lng1);

  //   var a =
  //     Math.sin(dLat / 2) * Math.sin(dLat / 2) +
  //     Math.cos(this.deg2rad(lat1)) * Math.cos(this.deg2rad(lat2)) *
  //     Math.sin(dLon / 2) * Math.sin(dLon / 2)
  //     ;
  //   var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  //   var d = R * c; // Distance in km


  //   var p = 0.017453292519943295;    // Math.PI / 180
  //   var a = 0.5 - Math.cos((lat2 - lat1) * p) / 2 +
  //     Math.cos(lat1 * p) * Math.cos(lat2 * p) *
  //     (1 - Math.cos((lng1 - lng2) * p)) / 2;

  //   var distance = 12742 * Math.asin(Math.sqrt(a));
  //   var newdistance = Number(String(d).substring(0, 5));
  //   return d;

  //   // test code end

  //   //new check end

  // }

  deg2rad(deg) {
    return deg * (Math.PI / 180)
  }

  // addCircleToMap(lat, lng) {
  //   var circle = new H.map.Circle(
  //     // The central point of the circle

  //     { lat: lat, lng: lng },
  //     // The radius of the circle in meters
  //     this.newrad * 99,

  //     {
  //       style: {
  //         strokeColor: 'rgba(255, 255, 255, 0.5)', // Color of the perimeter rgb(204, 223, 255)
  //         lineWidth: 2,
  //         fillColor: 'rgb(150, 178, 224,0.8)',

  //         // Color of the circle
  //       },
  //     }
  //   );
  //   circle.draggable = true;
  //   this.map.addObject(circle);

  //   //circle drag start check
  //   this.map.addEventListener('dragstart', (ev) => {
  //     const target = ev.target;
  //     if (target instanceof H.map.Circle) {
  //       this.behavior.disable();

  //     }
  //     if (ev.target.B === true) {
  //       this.removeMarkers(this.arr);
  //     }

  //   }, false);

  //   // circle drag 
  //   this.map.addEventListener('drag', (ev) => {
  //     const target = ev.target,
  //       pointer = ev.currentPointer;

  //     if (target instanceof H.map.Circle) {
  //       target.setCenter(this.map.screenToGeo(pointer.viewportX, pointer.viewportY));
  //     }
  //   }, false);

  //   //circle dragend
  //   this.map.addEventListener('dragend', (ev) => {
  //     const target = ev.target;
  //     this.getnewcoords(target.o.lat, target.o.lng, this.yesterdaydate, this.start, this.end);
  //     if (target instanceof H.map.Circle) {
  //       this.behavior.enable();
  //     }
  //   }, false);

  // }

  firstTime=true
  getVendor(lat1, lng1,lat2, lng2)
  {
   lat1 = round(lat1, 6);
    lng1 = round(lng1, 6);
    lat2 = round(lat2, 6);
    lng2 = round(lng2, 6);



      var newcoords = {
        oldlatitude:lat1,
        oldlongitude:lng1,
        latitude: lat2,
        longitude: lng2,
        email:this.email.email,
        todaydate:this.todaydate,
        yesterdaydate:this.yesterdaydate,
        startdate:this.start,
        enddate:this.end 
    }
    // if(this.todaydate && !this.yesterdaydate)
    // {   
      
      this.documentService.documentlogs('/api/documentlogs/logs/', newcoords).subscribe(data => {
         this.logsList = data;
         this.removeMarkers(this.arr);
        // if (this.firstTime) {
        //   this.firstTime = false
          // this.dropMarker1({ lat: this.latitude, lng: this.longitude }, this.group);
        // }
        //  console.log('==>',this.latitude,this.longitude)
        //  this.dropMarker2({ lat:this.latitude, lng: this.longitude }, this.group,this.behavior, 'Your Current Location', '');
         for(var i=0; i<this.logsList.length; i++)
         {
           if (this.logsList[i].latitude && this.logsList[i].longitude) {
             this.dropMarker2({ lat:this.logsList[i].latitude, lng: this.logsList[i].longitude }, this.group, this.behavior, this.logsList[i].documentid?this.logsList[i].documentid.name:'', this.logsList[i]._id);
           }
           else {
             this.latitude1[i] = 0;
             this.longitude1[i] = 0;
           }
         }
       });
    // }     
    // else if(this.yesterdaydate && !this.todaydate)    {
    //   this.removeMarkers(this.arr);
    //   this.documentService.documentlogs('/api/documentlogs/logs/', newcoords).subscribe(data => { 
    //      this.datelogslist = data;
    //      this.dropMarker1({ lat:this.latitude, lng: this.longitude }, this.group);      
    //      for(var i=0; i<this.datelogslist.length; i++)
    //      {
    //        if (this.datelogslist[i].latitude && this.datelogslist[i].longitude) {
    //          this.dropMarker3({ lat:this.datelogslist[i].latitude, lng: this.datelogslist[i].longitude }, this.group, this.behavior, this.datelogslist[i].documentid?this.datelogslist[i].documentid.name:'', this.datelogslist[i]._id);
    //        }
    //        else {
    //          this.latitude1[i] = 0;
    //          this.longitude1[i] = 0;
    //        }
    //      }
    //    });
    // }
    // else if(this.start && this.end)
    // {
    //   this.removeMarkers(this.arr);
    //   this.documentService.documentlogs('/api/documentlogs/logs/', newcoords).subscribe(data => {
    //      this.datelogslist = data;
    //      this.dropMarker1({ lat:this.latitude, lng: this.longitude }, this.group);
    //      for(var i=0; i<this.datelogslist.length; i++)
    //      {
    //        if (this.datelogslist[i].latitude && this.datelogslist[i].longitude) {
    //          this.dropMarker3({ lat:this.datelogslist[i].latitude, lng: this.datelogslist[i].longitude }, this.group, this.behavior, this.datelogslist[i].documentid?this.datelogslist[i].documentid.name:'', this.datelogslist[i]._id);
    //        }
    //        else {
    //          this.latitude1[i] = 0;
    //          this.longitude1[i] = 0;
    //        }
    //      }
    //    });
    // }

  }




  private dropMarker1(coordinates: any, map: any) {
    var placesService = this.platform.getPlacesService()
    this.parameters = {
      at: this.latitude + "," + this.longitude
    };

    placesService.here(this.parameters,
      function (result) {
        // console.log(result);
      }, function (error) {
        // alert(error);
        console.log(error)
      });
    var bubble;
    // this.marker1 = new H.map.Marker(coordinates);
    var parisPngIcon = new H.map.Icon("assets/images/currentlocation.png", { size: { w: 40, h: 40, } })
    this.marker1 = new H.map.Marker(coordinates, { icon: parisPngIcon });
    console.log('------>',coordinates)
    this.marker1.setData("<p>Your Current Location</p>");
    this.marker1.addEventListener('pointerenter', event => {
      bubble = new H.ui.InfoBubble(event.target.getPosition(), {
        content: event.target.getData()
      });
      this.ui.addBubble(bubble);
    }, false);
    this.marker1.addEventListener('pointerleave', event => {
      bubble.close();
    }, false);
    map.addObject(this.marker1);
  }


  private dropMarker2(coordinates: any, map: any, behavior, html, id) {
    // console.log(coordinates);

    var bubble;
    var parisPngIcon = new H.map.Icon("assets/images/whimg.png", { size: { w: 26, h: 26, } })
    this.marker2 = new H.map.Marker(coordinates, { icon: parisPngIcon });

    this.arr.push(this.marker2);
    this.marker2.setData(html);
    this.marker2.addEventListener('tap', event => {
      bubble = new H.ui.InfoBubble(event.target.getPosition(), {
        content: event.target.getData(),
      });

      this.ui.addBubble(bubble);
      // console.log(bubble, slug, id);  

      // setTimeout(() => {
      //   var encrypted = this.encrypt.set('123456$#@$^@1ERF', id);
      //   this.router.navigate(['/navbar/vend'], { queryParams: { slug:slug,queryvendor:encrypted } });
      // }, 1000);


    }, false);
    this.marker2.addEventListener('tap', event => {
      bubble.close();
    }, false);
    map.addObject(this.marker2)

  }


  private dropMarker3(coordinates: any, map: any, behavior, html, id) {


    var bubble;
    var parisPngIcon = new H.map.Icon("https://image.flaticon.com/icons/svg/608/608671.svg", { size: { w: 34, h: 34, } })
    this.marker3 = new H.map.Marker(coordinates, { icon: parisPngIcon });

    this.arr.push(this.marker3);
    this.marker3.setData(html);
    this.marker3.addEventListener('tap', event => {
      bubble = new H.ui.InfoBubble(event.target.getPosition(), {
        content: event.target.getData(),
      });

      this.ui.addBubble(bubble);
      // console.log(bubble, slug, id);  

      // setTimeout(() => {
      //   var encrypted = this.encrypt.set('123456$#@$^@1ERF', id);
      //   this.router.navigate(['/navbar/vend'], { queryParams: { slug:slug,queryvendor:encrypted } });
      // }, 1000);


    }, false);
    this.marker3.addEventListener('tap', event => {
      bubble.close();
    }, false);
    map.addObject(this.marker3)

  }

  removeMarkers(arr) {
    this.group.removeObjects(arr)
    this.arr = [];
  }

  getplaces() {

  }


  getdata(lat, lng) {
    var location = {
      lat: lat, lng: lng
    }
    localStorage.setItem("location", JSON.stringify(location));
  }
}