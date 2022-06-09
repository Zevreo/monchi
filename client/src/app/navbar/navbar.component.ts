import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  navLogo: string;

  constructor() {
    this.navLogo= 'assets/613b38eaa594d30013a82b27.png';
   }

  ngOnInit(): void {
  }

}
