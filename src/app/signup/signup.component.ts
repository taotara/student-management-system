import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent {
  signupform!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.signupform = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', Validators.required],
      mobile: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  // creation
  signup() {
    this.http
      .post<any>('http://localhost:3000/signup', this.signupform.value)
      .subscribe((res) => {
        alert('Student registered successfully');
        this.signupform.reset();
        this.router.navigate(['login'])
      }, err => {
        alert("Something went wrong")
      }
      );
  }
}
