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
  public employee;

  ngOnInit() {
    this.httpClient.get('http://localhost:3000/getEmployees').subscribe( res => {
      console.log(res);
      this.employeeList = res;
    })
  }

  editEmployee(name){
    console.log('Edit Employee, name =', name)
    var url = 'http://localhost:3000/getEmployee/' + name;
    this.httpClient.get(url).subscribe(res => {
      console.log('res =', res);
      this.employee = res[0];
      this.empList = false;
      this.empDetails = true;
    })
  }

  deleteEmployee(name){
    console.log('Delete Employee, name =', name)

  }

}
