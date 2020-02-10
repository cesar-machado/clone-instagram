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
     apiKey: "AIzaSyBxHsxO5vPBkPFgM2UsAF-XeN4nQ2sJi80",
     authDomain: "instagram-clone-ces.firebaseapp.com",
     databaseURL: "https://instagram-clone-ces.firebaseio.com",
     projectId: "instagram-clone-ces",
     storageBucket: "instagram-clone-ces.appspot.com",
     messagingSenderId: "629401368277",
     appId: "1:629401368277:web:ad75d10d81769f3a11945c",
     measurementId: "G-L19DSWGNJP"
    };
    
    firebase.initializeApp(firebaseConfig)
  }
}
