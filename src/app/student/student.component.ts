import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { studentdata } from './student.model';
import { ApiService } from '../shared/api.service';

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.css']
})
export class StudentComponent {

  showAdd!: boolean;
  showUpdate!: boolean;
  studentmodelobj:studentdata=new studentdata

  formValue!: FormGroup;

  constructor(private formbuilder: FormBuilder, private api: ApiService) { }
  
  ngOnInit(): void {
    this.formValue = this.formbuilder.group({
      name: ['', Validators.required],
      email: ['', Validators.required],
      mobile: ['', Validators.required],
      city: ['', Validators.required]
    })
  }
// to hide on add
  add() {
    this.showAdd = true;
    this.showUpdate = false;
  }
// to hide on edit
  update() {
    this.showAdd = false;
    this.showUpdate = true;
  }

  addstudent() {
    this.studentmodelobj.name = this.formValue.value.name;
    this.studentmodelobj.email = this.formValue.value.email;
    this.studentmodelobj.mobile = this.formValue.value.mobile;
    this.studentmodelobj.city = this.formValue.value.city;

    this.api.poststudent(this.studentmodelobj).subscribe(res => {
      this.formValue.reset()
      console.log(res);
      alert("Record added successfully")
    },
      err => {
        alert("Something went wrong!!!");
      }
    )
  }
  
// get data
  getdata() {
    this.api.getstudent()
      .subscribe(res => {
      
    })
  }

}
