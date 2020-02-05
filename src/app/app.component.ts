import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase'
import { config } from 'rxjs';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'clone-instagram';

  ngOnInit(): void {
    var firebaseConfig = {
     //api key do firebase
    };
    
    firebase.initializeApp(firebaseConfig)
  }
}
