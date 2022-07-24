import {
    Injectable
} from '@angular/core';
import { Observable } from "rxjs";
import { Router } from "@angular/router";
import { UserService } from './user.service';
import { GeneralService } from './general.service';


@Injectable()
export class PushNotificationsService {
    public permission: Permission;
    constructor(private router: Router, private userservice: UserService,private generalservice:GeneralService) {
        this.permission = this.isSupported() ? 'default' : 'denied';
    }
    public isSupported(): boolean {
        return 'Notification' in window;
    }
    requestPermission(): void {
        let self = this;
        if ('Notification' in window) {
            Notification.requestPermission(function (status) {
                return self.permission = status;
            });
        }
    }
    profile: any
    chatdoc: any
    chatres: any
    create(title: string, options?: PushNotification): any {
        let self = this;
        return new Observable(function (obs) {
            let _notify
          
            if (!('Notification' in window)) {
                obs.complete();
            }
            if (self.permission !== 'granted') {
                Notification.requestPermission().then(function (result) {
                    _notify = new Notification(title, options);
                });
                obs.complete();
            }
            else {
                _notify = new Notification(title, options);
                self.userservice.getProfile().subscribe(data => {
                    self.profile = data;
                    self.generalservice.getnotification().subscribe(result => {
                       
                        var messages: any = result;
                        for (const message of messages) {
                            if (message.toid && message.toid._id == self.profile._id && !message.read && message.type=='Share' && message.active == true) {
                                message.read = true;
                            }
                            if (message.fromid && message.fromid._id == self.profile._id && !message.read && message.type=='submit' && message.active == true) {
                                message.read = true;                      
                            }
                            if (message.fromid && message.fromid._id == self.profile._id && !message.read && message.type=='closed' && message.active == true) {
                                message.read = true;   
                            }
                        }
                    });
 
                })
            }

            _notify.onshow = function (e) {
                return obs.next({
                    notification: _notify,
                    event: e
                });
            };
            _notify.onclick = function (e) {               

                return obs.next({
                    notification: _notify,
                    event: e
                });
            };




            _notify.onerror = function (e) {
                return obs.error({
                    notification: _notify,
                    event: e
                });
            };
            _notify.onclose = function () {
                return obs.complete();
            };
        });
    }
    generateNotification(source: Array<any>): void {
        let self = this;
        source.forEach((item) => {
            let options = {
                body: item.alertContent,
                icon: "assets/images/Group2244.png",
                data: item.data,


            };
            let notify = self.create(item.title,options).subscribe();
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