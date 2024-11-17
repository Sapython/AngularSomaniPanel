import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({ 
  selector: 'app-otp',
  templateUrl: './otp.component.html',
  styleUrls: ['./otp.component.css']
})
export class OtpComponent implements OnInit {

  constructor(private route : Router) { }

  ngOnInit(): void {
  }

  join(){
    console.log("join works");
    this.route.navigate(['/before-auth/login']);
  }

  reset(){
    console.log("reset works");
    this.route.navigate(['/before-auth/login']);
  }
}
