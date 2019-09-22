import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http'

@Component({
  selector: 'app-list-employee',
  templateUrl: './list-employee.component.html',
  styleUrls: ['./list-employee.component.css']
})
export class ListEmployeeComponent implements OnInit {

  constructor(private httpClient: HttpClient) { }

  public employeeList;
  public empDetails = false;
  public empList = true;

  ngOnInit() {
    this.httpClient.get('http://localhost:3000/getEmployees').subscribe( res => {
      console.log(res);
      this.employeeList = res;
    })
  }

  editEmployee(name){
    console.log('Edit Employee, name =', name)
  }

  deleteEmployee(name){
    console.log('Delete Employee, name =', name)

  }

}
