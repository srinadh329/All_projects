import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { MainComponent } from '../main/main.component';
import { MatDialogRef } from '@angular/material';
import { UserService } from '../services/user.service';
import { ElementFinder } from 'protractor';
declare var H:any;
@Component({
  selector: 'app-mapview',
  templateUrl: './mapview.component.html',
  styleUrls: ['./mapview.component.css']
})
export class MapviewComponent implements OnInit {

  public query: string;
  location={
    locationlabel: null,
    latitude: null,
    longitude: null
  }
  locationlink;
  platform = null;
  locationurl = null;
  nearbylocations:any;
  selectedlocationData;
  locationlabel=null;
  constructor(private cdref: ChangeDetectorRef,  private userService: UserService,public dialogRef: MatDialogRef<MainComponent>)
    { 
      this.userService.nearbyplacechange.subscribe(data=>{
        this.nearbylocations = data;
      });
 
    }

  ngOnInit() { }

  onNoClick(): void {
    this.dialogRef.close(null);
  }

  displayCounter(count){
  console.log("location value",count)
  }

  locationname(data) {
    console.log("location Name: ",data)
    this.query = data.label;
    this.selectedlocationData = data;
  }

  selectedlocation(place) {
    this.dialogRef.close(place);

  }
  GO(){
    console.log("Location Data: ",this.selectedlocationData);
    if(this.selectedlocationData){
      this.dialogRef.close(this.selectedlocationData);
    }  
  }

/* 
 Function Name: sendlocation
 Input: None
 Output: Latitude and Longitude (Geo location of current user)
 Desc: When user clicks on send location, Check Grant permissions for location access or else send location link
 */

 sendlocation() {
   var self=this
  console.log("show my location");
  if (!navigator.geolocation) {
    console.warn('Geolocation is not supported/ Disabled by your browser')
  }
  else {
    navigator.geolocation.getCurrentPosition(async (Position) => {
      console.log("Position2: ",Position)
      // this.location = {
      //   latitude: Position.coords.latitude,
      //   longitude: Position.coords.longitude,
      //   locationlabel:null
      // }
      var latlong = Position.coords.latitude.toString()+","+Position.coords.longitude+",20";
      console.log(latlong);
      this.platform = new H.service.Platform({
        "app_id": 'xeeSniVGFJguQieOyDvg',
        "app_code": 'CYXw3RyDsetaa5pSVf3EAw',
        useHTTPS:true
      });
      await this.reverseGeoCode(this.platform,latlong,Position);
                   
      }),
      function () {
        // alert('unable to fetch location')
      }
  }
  this.cdref.detectChanges();
}

reverseGeoCode(platform,latlong, position) {
  console.log("ReverseGeoCode: ","latlong: ",latlong,"position:", position)
  var self=this;
  var geocoder = platform.getGeocodingService(),
  parameters = {
    prox: latlong,
    mode: 'retrieveAddresses',
    maxresults: '1',
    gen: '9'
  };
  geocoder.reverseGeocode(parameters,
    function (result) {
      self.location = {
        locationlabel:result.Response.View[0].Result[0].Location.Address.Label,
      latitude:position.coords.latitude,
      longitude:position.coords.longitude
      }
      console.log("Reverse GeoCode: ",result);
      console.log(result.Response.View[0].Result[0].Location.Address.Label);
      self.dialogRef.close(self.location)
      self.locationlink = "https://www.google.com/maps?q="
      self.locationurl = `${self.locationlink}${self.location.latitude},${self.location.longitude}`;
    }, function (error) {
      console.log(error);
    });
}

}