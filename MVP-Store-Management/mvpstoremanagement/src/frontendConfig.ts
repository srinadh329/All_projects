export class FrontEndConfig {
    constructor() { }
   
   serverurl = 'http://localhost:4000';
  appUrl = '';
  
  error =true
    getServerUrl() {
      return this.serverurl;
    }
    
  }
  