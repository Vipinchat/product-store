import { Component, OnInit } from '@angular/core';
import AOS from 'aos';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})

export class AppComponent implements OnInit {
 
  ngOnInit(): void {
   AOS.init({
      duration: 2000,
      offset: 50,
      easing: 'ease-out-cubic',
      once: false,
      mirror:true
    });
  }
  
}
