export class FrontEndConfig {

  constructor() { }

  serverurl = "http://localhost:9000";
  RTCserverURL = "http://localhost:9001/";
  VCUrl = 'http://aidevvchrms.webchatbot.co.uk/';
  TurnUrl = 'http://aidevturnhrms.webchatbot.co.uk/';

  getserverurl() {
    return this.serverurl;
  }  

  getRTCUrl() {
    return this.RTCserverURL;
  }

  getVCUrl() {
    return this.VCUrl;
  }
}
//https://nodescm.webchatbot.co.uk
