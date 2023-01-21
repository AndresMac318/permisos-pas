import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  flyUser!: boolean;

  constructor() {
    this.getRole();
  }


  ngOnInit(): void {
  }

  getRole(){
    if (sessionStorage.getItem('rol') === 'admin') {
      this.flyUser = true;
    } else {
      this.flyUser = false;
    }
  }

}
