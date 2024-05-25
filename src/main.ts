import 'zone.js/dist/zone';
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { bootstrapApplication } from '@angular/platform-browser';
declare var webkitSpeechRecognition: new () => any;

@Component({
  selector: 'my-app',
  standalone: true,
  imports: [CommonModule],
  template: `
    <h1>Hello from {{name}}!</h1>


    <button  (click)="startListening()">Click me</button>
  `,
})
export class App {
  name = 'Angular';

  results: any;

  startListening() {
    // let voiceHandler = this.hiddenSearchHandler?.nativeElement;
    if ('webkitSpeechRecognition' in window) {
      const vSearch = new webkitSpeechRecognition();
      vSearch.continuous = true;
      vSearch.interimresults = false;
      vSearch.lang = 'ar-SA';
      vSearch.start();
      vSearch.onresult = (e: { results: { transcript: any; }[][]; }) => {
        console.log(e);
        // voiceHandler.value = e?.results[0][0]?.transcript;
        this.results = e.results[0][0].transcript;
        this.getResult();
        // console.log(this.results);
        vSearch.stop();
      };
    } else {
      alert('Your browser does not support voice recognition!');
    }
  }

  getResult() {
    console.log(this.results);
  }
}

bootstrapApplication(App);
