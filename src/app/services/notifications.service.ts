import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FrontEndConfig } from '../frontendconfig';

@Injectable({
  providedIn: 'root'
})
export class NotificationsService {

  constructor(private http: HttpClient, private frontendconfig: FrontEndConfig) { }
  serverurl = this.frontendconfig.getserverurl();

  createNotification(notifications) {
    return this.http.post(this.serverurl + '/api/notifications', notifications);
  }

  getNotifications() {
    return this.http.get(this.serverurl + '/api/notifications');
  }

  markAsRead(notification) {
    return this.http.put(this.serverurl + '/api/notifications/' + notification._id, notification);
  }

  readAll() {
    return this.http.post(this.serverurl + '/api/notifications/readAll',{});
  }

  deleteOneNotification(id) {
    return this.http.delete(this.serverurl + '/api/notifications/' + id);
  }

}