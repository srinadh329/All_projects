import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { NotificationsService } from './notifications.service';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})

export class PushNotificationsService {
  public permission: Permission;
  public isSupported(): boolean { return 'Notification' in window; }

  profileData: any;

  constructor(private notificationService: NotificationsService, private userService: UserService) {
    this.permission = this.isSupported() ? 'default' : 'denied';
  }

  createNotification(title: string, options?: PushNotification): any {
    let self = this;
    return new Observable(function (obsrv) {
      let _notify;
      if (!('Notification' in window)) {
        console.log('Notifications are not available in this environment');
        obsrv.complete();
      }
      if (self.permission !== 'granted') {
        Notification.requestPermission().then(function (result) {
          _notify = new Notification(title, options);
        });
        console.log("The user hasn't granted you permission to send push notifications");
        obsrv.complete();
      }
      else {
        _notify = new Notification('Nikhil', options);
        self.notificationService.getNotifications().subscribe(info => {
          var messages: any = info;
          self.userService.userprofile().subscribe(data => {
            self.profileData = data;
            for (const msg of messages) {
              // Sender Notifications
              if (msg.read == false && msg.senderId == self.profileData._id) {
                msg.read = true;
                self.notificationService.markAsRead(msg).subscribe(read => { })
              }
              // Receiver Notifucation
              if (msg.read == false && msg.receiverid == self.profileData._id) {
                msg.read = true;
                self.notificationService.markAsRead(msg).subscribe(read => { })
              }
            }
          })
        })
      }
    })
  }

    generateNotification(source: Array<any>): void {
    let self = this;
    source.forEach((item) => {
      let options = {
        body: item.alertContent,
        icon: "/assets/loginsideimage.png",
        data: item.By,
      };


      console.log(options.data, item.By)
      let notify = self.createNotification(item.title, options).subscribe();
    })
  }
}

export declare type Permission = 'denied' | 'granted' | 'default';
export interface PushNotification {
  body?: string;
  icon?: string;
  tag?: string;
  data?: any;
  renotify?: boolean;
  silent?: boolean;
  sound?: string;
  noscreen?: boolean;
  sticky?: boolean;
  dir?: 'auto' | 'ltr' | 'rtl';
  lang?: string;
  vibrate?: number[];
}
