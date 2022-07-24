import { Component, OnInit, ViewChild, ElementRef, Input, Injectable, ViewEncapsulation, Output, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserService } from '../services/user.service';
declare var H:any;


@Component({
  selector: 'app-locationmaps',
  templateUrl: './locationmaps.component.html',
  styleUrls: ['./locationmaps.component.css'],
  encapsulation: ViewEncapsulation.None
})

@Injectable({
  providedIn: 'root'
})

export class LocationmapsComponent implements OnInit {

  @ViewChild("map", {static:false})
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

  @Input('coordinates') coordinates : any; // need to add to new component 

  @Output() getlat= new EventEmitter<Object>()

  private platform: any;
  private map: any;
  private ui: any;
  private search: any;
  public geocoder: any;
  public latitude: any;
  public langitude: any;
  public behavior: any;
  getsuggistions: any;
  nearbylocations: any;
  public abc: any
  public static lat: any
  public static lng: any

  marker1;

  //////////////////newly added//////////////////
  langitude2
  latitude1;
  supplierprofile;
  loc;
  location:any;
  markerposition: any=null;;
  /////////////////////////////////////////
  constructor(private http: HttpClient, private userService: UserService) {
    this.markerposition=null;
   }

  ngOnInit() {
    this.platform = new H.service.Platform({
      "app_id": 'xeeSniVGFJguQieOyDvg',
      "app_code": 'CYXw3RyDsetaa5pSVf3EAw',
      useHTTPS:true
    });
    this.search = new H.places.Search(this.platform.getPlacesService());
    this.geocoder = this.platform.getGeocodingService();
    if (localStorage.getItem("coordinates")) {
      this.loc = JSON.parse(localStorage.getItem("coordinates"))
      console.log("this.loc: ",this.loc)
      this.latitude1 = this.loc.lat, this.langitude2 = this.loc.lng
    }


    if(this.coordinates != undefined || this.coordinates != null)
    {
      console.log("cordinates",this.coordinates);

      this.latitude1 = this.coordinates.lat, this.langitude2 = this.coordinates.lng
    }
  }


  public ngAfterViewInit() {
    let defaultLayers = this.platform.createDefaultLayers();

    if (this.loc) {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position: any) => {
          console.log("Position: ",position)
          this.latitude = position.coords.latitude ; 
          this.langitude = position.coords.longitude;
          this.location = {
            latitude : this.latitude,
            longitude : this.langitude
          }
          console.log("this.location: ",this.location)
          this.getlat.emit( {lat:this.location.latitude,lng:this.location.longitude})
          this.getNearbyPlaces(this.location);
          this.map = new H.Map(
            this.mapElement.nativeElement,
            defaultLayers.normal.map,
            {
              zoom: 10,
              center: { lat: this.latitude, lng: this.langitude }
            });
          let behavior = new H.mapevents.Behavior(new H.mapevents.MapEvents(this.map));
          this.behavior = behavior;
          this.ui = H.ui.UI.createDefault(this.map, defaultLayers);
          this.dropMarker({ lat: this.latitude, lng: this.langitude }, this.map, behavior)
        }, error => {
          var loc=JSON.parse(localStorage.getItem('mylocation'));
          this.location = {
            latitude : '17.8061312',
            longitude : '83.3896448'
          }
          this.getNearbyPlaces(this.location);

          this.map = new H.Map(
            this.mapElement.nativeElement,
            defaultLayers.normal.map,
            {
              zoom: 10,
              center: { lat: '17.8061312', lng: '83.3896448' },
            });
            let behavior = new H.mapevents.Behavior(new H.mapevents.MapEvents(this.map));
            this.behavior = behavior;
  
          this.ui = H.ui.UI.createDefault(this.map, defaultLayers);
          this.dropMarker({ lat: this.latitude, lng: this.langitude },this.map, this.behavior);
      });
      } else {
        console.error("Geolocation is not supported by this browser!");
      }
    }

    else {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
          this.latitude = position.coords.latitude;
          this.langitude = position.coords.longitude;
          this.location = {
            latitude : this.latitude,
            longitude : this.langitude
          }
          this.getNearbyPlaces(this.location);
          this.map = new H.Map(
            this.mapElement.nativeElement,
            defaultLayers.normal.map,
            {
              zoom: 15,
              center: { lat: '17.8061312', lng: '83.3896448'}
            });
          let behavior = new H.mapevents.Behavior(new H.mapevents.MapEvents(this.map));
          this.behavior = behavior;
          this.ui = H.ui.UI.createDefault(this.map, defaultLayers);
          this.dropMarker({ lat: this.latitude, lng: this.langitude }, this.map, behavior);
        }, error => {
          var loc=JSON.parse(localStorage.getItem('mylocation'));
          this.location = {
            latitude : '17.8061312',
            longitude : '83.3896448'
          }
          this.getNearbyPlaces(this.location);
          this.map = new H.Map(
            this.mapElement.nativeElement,
            defaultLayers.normal.map,
            {
              zoom: 12,
              center: { lat:loc.latitude, lng: loc.longitude },
            });
            let behavior = new H.mapevents.Behavior(new H.mapevents.MapEvents(this.map));
            this.behavior = behavior;
  
          this.ui = H.ui.UI.createDefault(this.map, defaultLayers);
          this.dropMarker({ lat: loc.latitude, lng: loc.longitude },this.map, this.behavior);
      });
      } else {
        console.error("Geolocation is not supported by this browser!");
      }
    }
  }

  clear() {
    this.getsuggistions = false;
  }

  places(query: string) { 
    console.log("Places: ",query)
      var gets=this;
      var xhr = new XMLHttpRequest()
      xhr.open("GET", 'https://autocomplete.geocoder.api.here.com/6.2/suggest.json?app_id=xeeSniVGFJguQieOyDvg&app_code=CYXw3RyDsetaa5pSVf3EAw&query=' + query);
      xhr.responseType = 'json'
      xhr.onload = function () {
        gets.getsuggistions = xhr.response;
        console.log( xhr.response)
    }
      xhr.send()
      xhr.onerror = function () {
      }    
  }
  response:any;
  public locatMap = function (suggistion) {
    console.log("suggistion: ",suggistion)
    var gets = this;
    var xhr = new XMLHttpRequest()
    xhr.open("GET",'https://geocoder.api.here.com/6.2/geocode.json?app_id=xeeSniVGFJguQieOyDvg&app_code=CYXw3RyDsetaa5pSVf3EAw&locationid=' + suggistion.locationId + '&jsonattributes=1&gen=9')
    xhr.responseType = 'json'
    xhr.onload = function () {
      if(xhr && xhr.response) {
        console.log("XHR Response: ",xhr.response);
        let location = xhr.response.response.view[0].result[0].location.displayPosition;
        console.log(location)

        gets.map.setCenter({lat:location.latitude, lng: location.longitude});
        gets.dropMarker({ lat: location.latitude, lng: location.longitude }, gets.map, gets.behavior);
        gets.getNearbyPlaces(location);
      }
  }
   xhr.send()
    xhr.onerror = function () {
    } 
  }

   getNearbyPlaces(location){
    var location2 = location.latitude +','+ location.longitude;
    console.log(location2);
    /*
  rfv5MLjt7ouZ5K8E16iqZn_MI3m3aMowURNXSVZfn3A  // my apikey
    */

   var gets = this;
   var xhr = new XMLHttpRequest()
   xhr.open("GET", "https://places.sit.ls.hereapi.com/places/v1/discover/here?apiKey=rfv5MLjt7ouZ5K8E16iqZn_MI3m3aMowURNXSVZfn3A&at=" + location2 + '&pretty')
   xhr.responseType = 'json'
   xhr.onload = function () {
     if(xhr && xhr.response) {
       console.log("xhr.response: ",xhr.response)
       gets.nearbylocations = xhr.response.results.items;
       gets.userService.emitPlaceChangeEvent(gets.nearbylocations); // emiting places to map view component
       localStorage.setItem('nearbyplaces', JSON.stringify(gets.nearbylocations))
       console.log("places", xhr.response.results.items)
     }
 }
  xhr.send()
   xhr.onerror = function () {
   } 

  }

  
  
  private dropMarker(coordinates: any, map: any, behavior: any) {
    this.marker1 = new H.map.Marker(coordinates);
    console.log("Marker Init: ",this.marker1.getPosition());
    localStorage.setItem("coordinates", JSON.stringify(coordinates));

    this.marker1.setData("<p> Set Your Location</p>");
    this.marker1.addEventListener('tap', function (evt) {
      var coord = map.screenToGeo(evt.currentPointer.viewportX, evt.currentPointer.viewportY);
      console.log("Tap: ",coord);
    })

    this.marker1.draggable = true;
    map.removeObjects(map.getObjects ())
    map.addObject(this.marker1);

    // disable the default draggability of the underlying map
    // when starting to drag a marker object:
    map.addEventListener('dragstart', function (ev) {
      var target = ev.target;
      if (target instanceof H.map.Marker) {
        behavior.disable();
      }
    }, false);

    // re-enable the default draggability of the underlying map
    // when dragging has completed
    map.addEventListener('dragend', (event) => {
      this.abc = event.target;
      this.lat = this.abc.b.lat;
      this.lng = this.abc.b.lng;
      this.getdata(this.lat, this.lng);
      this.getlat.emit( {lat:this.lat,lng:this.lng})
      if (this.abc instanceof H.map.Marker) {
        behavior.enable();
      }
      this.markerposition=this.marker1.getPosition();
      console.log("lat: ",this.lat);
      console.log("long: ",this.lng);
      console.log("Drag ENd Marker Position: ",this.marker1.getPosition());
    }, false);

    // Listen to the drag event and move the position of the marker
    // as necessary
    map.addEventListener('drag', function (ev) {
      var target = ev.target,
        pointer = ev.currentPointer;

      if (target instanceof H.map.Marker) {
        target.setGeometry(map.screenToGeo(pointer.viewportX, pointer.viewportY));
      }
      // console.log("Target:", target)
    }, false);
  }

  /**
   * When user drag and drop the location to other places it will trigger
   * @param lat location latitude
   * @param lng location longitude
   */
  getdata(lat, lng) {
    var location = {
      lat: lat, lng: lng
    }
     localStorage.setItem("coordinates", JSON.stringify(location));
  }
}