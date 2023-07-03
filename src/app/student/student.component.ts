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
  allstudentdata: any;

  constructor(private formbuilder: FormBuilder, private api: ApiService) { }
  
  ngOnInit(): void {
    this.formValue = this.formbuilder.group({
      name: ['', Validators.required],
      email: ['', Validators.required],
      mobile: ['', Validators.required],
      city: ['', Validators.required]
    })
    this.getdata()
  }
// to hide on add
  add() {
    this.showAdd = true;
    this.showUpdate = false;
  }
// to hide on edit
  edit(data: any) {
    this.showAdd = false;
    this.showUpdate = true;
    this.studentmodelobj.id = data.id;
    this.formValue.controls['name'].setValue(data.name)
    this.formValue.controls['email'].setValue(data.email)
    this.formValue.controls['mobile'].setValue(data.mobile)
    this.formValue.controls['city'].setValue(data.city)
  }

  // update on edit
  update() {
     this.studentmodelobj.name = this.formValue.value.name;
     this.studentmodelobj.email = this.formValue.value.email;
     this.studentmodelobj.mobile = this.formValue.value.mobile;
    this.studentmodelobj.city = this.formValue.value.city;
    
    this.api.updatestudent(this.studentmodelobj, this.studentmodelobj.id).subscribe(res => {
      this.formValue.reset();
      this.getdata();
      alert('Record updated successfully');
    },
      err => {
        alert("Something went wrong");
    }
    )
  }

  addstudent() {
    this.studentmodelobj.name = this.formValue.value.name;
    this.studentmodelobj.email = this.formValue.value.email;
    this.studentmodelobj.mobile = this.formValue.value.mobile;
    this.studentmodelobj.city = this.formValue.value.city;

    this.api.poststudent(this.studentmodelobj).subscribe(res => {
      this.formValue.reset()
      // to avoid refresh of page to view new added record
      this.getdata()
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
        this.allstudentdata = res;
    })
  }

  // delete  studdent record
  deletestudent(data: any) {
    if(confirm('Are you sure that you want to delete this record?'))
    this.api.deletestudent(data.id)
      .subscribe(res => {
        alert("Record deleted successfully");
        this.getdata();
    })
  }

}
