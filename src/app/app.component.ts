import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Employee Management System';
  public home = true;

  constructor(private httpClient: HttpClient){}

  fun(){
    console.log('Call me pressed')

    this.httpClient.get('http://localhost:3000').subscribe( res => {
      console.log('res =', res)
    })
  }
}
