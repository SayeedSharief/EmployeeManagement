import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { HttpClient } from '@angular/common/http'

@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.css']
})
export class AddEmployeeComponent implements OnInit {


  ngOnInit() {
    document.getElementById('home').style.display = 'none';
  }

  items;
  checkoutForm;
  skillSet =    [{
    Name: "Angular",
    Checked: true
   },
   {
     Name: "React",
     Checked: true
   },
   {
     Name: "Node",
     Checked: false
   },
   {
    Name: "JavaScript",
    Checked: false
  },
  {
    Name: "HTML",
    Checked: false
  },
  {
    Name: "CSS",
    Checked: false
  },
  {
    Name: "jQuery",
    Checked: false
  },
  {
    Name: "BootsTrap",
    Checked: false
  },
  {
    Name: "Java",
    Checked: false
  },
  {
    Name: "Python",
    Checked: false
  } ]

  constructor(
    private formBuilder: FormBuilder,
    private httpClient: HttpClient
  ) {

    this.checkoutForm = this.formBuilder.group({
      name: '',
      dob: '',
      salary: ''
    });
 
  }

  onSubmit(customerData) {
    // Process checkout data here
    // console.warn('Your order has been submitted', customerData);
    // console.warn('Check Box Data', this.skillSet);
    var skills = [];

    for(let i=0; i<this.skillSet.length; i++){
      if(this.skillSet[i].Checked == true){
        skills.push(this.skillSet[i].Name)
      }
    }
    // console.log(skills)
    customerData.skills = skills;


    console.log('POST Obj =', customerData)

    this.httpClient.post('http://localhost:3000/addEmployee', customerData).subscribe( res => {
      console.log('Res =', res)
    })

    this.checkoutForm.reset();
  }

  // editskillSetSubmit() {
  //   console.log(this.skillSet);
  // }

}
