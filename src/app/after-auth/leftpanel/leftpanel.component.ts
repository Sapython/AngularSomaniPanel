import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-leftpanel',
  templateUrl: './leftpanel.component.html',
  styleUrls: ['./leftpanel.component.css']
})
export class LeftpanelComponent implements OnInit {

  constructor(private route: Router) { }

  ngOnInit(): void {
  }


  // call back fn
  // home(){
  //   console.log('home works!');
  //   this.route.navigate(['after-auth/home']);
  // }

  // transaction(){
  //   this.route.navigate(['after-auth/transaction']);
  // }
  
  // client(){
  //   console.log('client works!');
  //   this.route.navigate(['after-auth/client']);
  // }

  // staff(){
  //   console.log('staff works!');
  //   this.route.navigate(['after-auth/staff']);
  // }

  // task(){
  //   console.log('task works!');
  //   this.route.navigate(['after-auth/task']);
  // }

  // inventory(){
  //   console.log('inventory works!');
  //   this.route.navigate(['after-auth/inventory']);
  // }
 
  // msg(){
  //   console.log('message works!');
  //   this.route.navigate(['after-auth/message']); 
  // }

  // feedback(){
  //   console.log('feedback works!');
  //   this.route.navigate(['after-auth/feedback']);
  // }

  // logout(){
  //   console.log('logout works!');
  //   this.route.navigate(['before-auth/login']);
  // }
}
 