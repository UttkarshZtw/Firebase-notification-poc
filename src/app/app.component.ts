import { AfterViewInit, Component, ContentChild, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { environment } from "../environments/environment";
import { getMessaging, getToken, onMessage } from "firebase/messaging";
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, AfterViewInit {
  title = 'notification-poc';
  message:any = null;
  constructor() {}
  @ViewChild('optionTemp')
  optionTeamplate!: TemplateRef<any>;
  ngOnInit(): void {
    this.requestPermission();
    this.listen();
  }
  ngAfterViewInit(): void {
    console.log(this.optionTeamplate);
  }
  requestPermission() {
    const messaging = getMessaging();
    getToken(messaging, 
     { vapidKey: environment.firebase.vapidKey}).then(
       (currentToken) => {
         if (currentToken) {
           console.log("Hurraaa!!! we got the token.....");
           console.log(currentToken);
         } else {
           console.log('No registration token available. Request permission to generate one.');
         }
     }).catch((err) => {
        console.log('An error occurred while retrieving token. ', err);
    });
  }
  listen() {
    const messaging = getMessaging();
    console.log("messanging -->",messaging)
    onMessage(messaging, (payload) => {
      console.log('Message received. ', payload);
      this.message=payload;
    });
    console.log("minor changes");
  }
}
