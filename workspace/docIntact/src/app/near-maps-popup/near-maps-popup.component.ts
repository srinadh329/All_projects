import { Component, OnInit, ViewChild, ElementRef, Input, Inject, ViewEncapsulation } from '@angular/core';
import { HttpClient } from '@angular/common/http';
// import { MatDialog,MAT_DIALOG_DATA ,MatDialogRef} from '@angular/material';
declare var H: any;

@Component({
  selector: 'app-near-maps-popup',
  templateUrl: './near-maps-popup.component.html',
  styleUrls: ['./near-maps-popup.component.css']
})
export class NearMapsPopupComponent implements OnInit {
  @Input('longitude') longitudeMYfile: any;
  @Input('lattitude') lattitudeMyfile: any;
  @Input('type') mapType: any;
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
  @Input('mapsdata') mapsdata: string; //path
  @Input() childMessage: string;
  @Input()

  public height: any;
  private platform: any;
  private map: any;
  private ui: any;
  private search: any;
  public geocoder: any;
  public latitude: any;
  public langitude: any;
  public behavior: any;
  getsuggistions: any;
  public abc: any;
  public static lat: any;
  public static lng: any;
  marker1; group; marker2;
  wareinfo: any;
  dailogdata: any;
mapdata :any
  constructor( private http: HttpClient) { }

  ngOnInit() {// localStorage.getItem("location",location);
  this.platform = new H.service.Platform({
    "app_id": 'xeeSniVGFJguQieOyDvg',
    "app_code": 'CYXw3RyDsetaa5pSVf3EAw',
    useHTTPS:true
  });
  this.search = new H.places.Search(this.platform.getPlacesService());
  this.geocoder = this.platform.getGeocodingService();
  this.mapdata=this.mapsdata
}
message:string;

receiveMessage($event) {
  this.message = $event
}
public onVoted(warehouse) {
}

latitude1 = []; longitude1 = [];
public ngAfterViewInit() {
  var pixelRatio = window.devicePixelRatio || 1;
  let defaultLayers = this.platform.createDefaultLayers({
    tileSize: pixelRatio === 1 ? 256 : 512,
    ppi: pixelRatio === 1 ? undefined : 320
  });

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(position => {
      this.latitude = this.mapdata.latitude;
      this.langitude = this.mapdata.longitude;
      // this.latitude = this.dailogdata.latitude;
      // this.langitude = this.dailogdata.longitude;
      this.map = new H.Map(
        this.mapElement.nativeElement,
        defaultLayers.normal.map,
        {
          zoom:6,
          center: { lat: this.latitude, lng: this.langitude }
        });
      let behavior = new H.mapevents.Behavior(new H.mapevents.MapEvents(this.map));
      this.behavior = behavior;
      this.ui = H.ui.UI.createDefault(this.map, defaultLayers);
      var ui = this.ui;
      this.group = new H.map.Group();
      this.map.addObject(this.group);
      this.group.addEventListener('tap', function (evt) {
        var bubble = new H.ui.InfoBubble(evt.target.getPosition(), {
          content: evt.target.getData()
        });
        ui.addBubble(bubble);
      }, false);
      // this.dropMarker({ lat: this.latitude, lng: this.langitude }, this.map, behavior);
      this.dropMarker1({ lat:this.latitude, lng:this.langitude }, this.group, behavior, 'location');

    }, error => {
      this.latitude = this.mapdata.latitude;
      this.langitude = this.mapdata.longitude;
      this.map = new H.Map(
        this.mapElement.nativeElement,
        defaultLayers.normal.map,
        {
          zoom:6,
          center: { lat: this.latitude, lng: this.langitude }
        });
      let behavior = new H.mapevents.Behavior(new H.mapevents.MapEvents(this.map));
      this.behavior = behavior;
      this.ui = H.ui.UI.createDefault(this.map, defaultLayers);
      var ui = this.ui;
      this.group = new H.map.Group();
      this.map.addObject(this.group);
      this.group.addEventListener('tap', function (evt) {
        var bubble = new H.ui.InfoBubble(evt.target.getPosition(), {
          content: evt.target.getData()
        });
        ui.addBubble(bubble);
      }, false);
      // this.dropMarker({ lat: this.latitude, lng: this.langitude }, this.map, behavior);
      this.dropMarker1({ lat:this.latitude, lng:this.langitude }, this.group, behavior, 'location');
    });
  } else {
    console.error("Geolocation is not supported by this browser!");
  }
}

private dropMarker1(coordinates: any, map: any, behavior, html) {
  var parisPngIcon = new H.map.Icon("https://image.flaticon.com/icons/svg/252/252025.svg", { size: { w: 32, h: 32 } })
  this.marker2 = new H.map.Marker(coordinates, { icon: parisPngIcon });
  this.marker2.setData(html);
  map.addObject(this.marker2);
}

private dropMarker2(coordinates: any, map: any, behavior, html) {
  this.marker2 = new H.map.Marker(coordinates);
  this.marker2.setData(html)
  map.addObject(this.marker2);
}

}
