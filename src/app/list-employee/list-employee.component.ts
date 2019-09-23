import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';


@Component({
  selector: 'app-list-employee',
  templateUrl: './list-employee.component.html',
  styleUrls: ['./list-employee.component.css']
})
export class ListEmployeeComponent implements OnInit {

  constructor(private httpClient: HttpClient, private formBuilder: FormBuilder, private router: Router) { }

  public employeeList;
  public empDetails = false;
  public empList = true;
  public employee;
  checkoutForm;

  public empName;
  public dob;
  public salary;
  public skills;

  ngOnInit() {
    this.httpClient.get('http://localhost:3000/getEmployees').subscribe( res => {
      console.log(res);
      this.employeeList = res;
    })
    document.getElementById('home').style.display = 'none';
  }

  editEmployee(name){
    console.log('Edit Employee, name =', name)
    var url = 'http://localhost:3000/getEmployee/' + name;
    this.httpClient.get(url).subscribe(res => {
      console.log('res =', res);
      this.employee = res[0];
      this.empList = false;
      this.empDetails = true;
      this.empName = this.employee.name;
      this.dob = this.employee.dob;
      this.salary = this.employee.salary;
      this.skills = this.employee.skills;
    })
  }

  deleteEmployee(name){
    console.log('Delete Employee, name =', name)
    let url = 'http://localhost:3000/deleteEmployee/' + name;

    this.httpClient.get(url).subscribe(res => {
      console.log(res);
      window.location.reload();
    })
  }

  editEmployeeDetail(){
    var updateObj = {
      'name':this.empName,
      'dob': this.dob,
      'salary': this.salary,
      'skills': this.skills.split(',')
    }
    console.log('update Obj =',updateObj);
    
    this.httpClient.post('http://localhost:3000/updateEmployee', updateObj).subscribe(res => {
      console.log('Updated Successfully, res =',res);
      this.router.navigate(['/getEmployeed']);
      window.location.reload();
    })
  }
}
