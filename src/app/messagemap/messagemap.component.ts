import { Component, OnInit, ViewChild, ElementRef, Input, Injectable, ViewEncapsulation,OnChanges } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserService } from '../services/user.service';

declare var H:any;

@Component({
  selector: 'app-messagemap',
  templateUrl: './messagemap.component.html',
  styleUrls: ['./messagemap.component.css'],
  encapsulation: ViewEncapsulation.None
})

export class MessagemapComponent implements OnInit,OnChanges {

  @ViewChild("messagemap", {static:false})
  public mapElement: ElementRef;

  @Input()
  public appId: any = 'xeeSniVGFJguQieOyDvg';

  @Input()
  public appCode: any = 'CYXw3RyDsetaa5pSVf3EAw';

  @Input()
  public latitude: any;

  @Input()
  public longitude: any;

  @Input()
  public width: any;

  @Input()
  public heigth: any;

  @Input('coordinates') coordinates:any;

  private platform:any;
  private map: any;
  private ui: any;
  public geocoder:any;
  public latitude1:any;
  public longitude1: any;
  public dragcoords: any;
  public behavior: any;
  public  lat: any
  public  lng: any
  // private search: any;
  getsuggestions: any;
  nearbylocations: any;
  marker1;
  longitude2;
  latitude2;
  loc;
  location:any;

  constructor(private http:HttpClient, private userService: UserService) { }

  ngOnInit() {
    this.platform = new H.service.Platform({
      "app_id": 'xeeSniVGFJguQieOyDvg',
      "app_code": 'CYXw3RyDsetaa5pSVf3EAw',
       useHTTPS:true
    });

    // this.search = new H.places.Search(this.platform.getPlacesService());
    this.geocoder = this.platform.getGeocodingService();

    console.log('ppp')
 
  }

  public ngAfterViewInit() {
    let defaultLayers = this.platform.createDefaultLayers();

    if(this.coordinates) {
      console.log(this.coordinates);

      this.map = new H.Map(
        this.mapElement.nativeElement,
        defaultLayers.normal.map,
        {
          zoom: 10,
          center: {lat: this.coordinates.latitude, lng: this.coordinates.longitude}
        });

        let behavior = new H.mapevents.Behavior(new H.mapevents.MapEvents(this.map));
        this.behavior = behavior;
        this.ui = H.ui.UI.createDefault(this.map, defaultLayers);
        this.dropMarker({lat: this.coordinates.latitude, lng: this.coordinates.longitude}, this.map,behavior)
      }
      else {
        console.error("Geolocation is not supported by this browser!");
      }
  }

  private dropMarker(coordinates: any, map:any, behavior: any) {
    this.marker1 = new H.map.Marker(coordinates);
    localStorage.setItem("coordinates", JSON.stringify(coordinates));

    this.marker1.setData("<p>Location</p>");
    this.marker1.addEventListener("tap", event =>{
      let bubble  = new H.ui.InfoBubble(event.target.getPosition(), {
        content: event.target.getData()
      });
      this.ui.addBubble(bubble);
    }, false);

    this.marker1.draggable = true;
    map.removeObjects(map.getObjects())
    map.addObject(this.marker1);
}

ngOnChanges()
{
  if(this.map) {
    this.marker1.setPosition({lat:this.coordinates.latitude, lng:this.coordinates.longitude});
    this.map.setCenter({lat:this.coordinates.latitude, lng:this.coordinates.longitude})
  }
  ;
}
}