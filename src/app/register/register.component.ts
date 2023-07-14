
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { userDetails } from 'src/model/userDetails';
import { UserDetailsService } from 'src/service/user-details.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  form: FormGroup = new FormGroup({
    
  })
  constructor(private formBuilder: FormBuilder, private userDetails: UserDetailsService) { }
  regirationForm! : FormGroup;
  firstName: FormControl | any;
  lastName: FormControl | any;
  userEmail: FormControl | any;
  password: FormControl | any;

  userDetailReg:userDetails={
    firstName: '',
    lastName: '',
    userEmail: '',
    password: '',
    isLogged: false,
    role: 'User',
    id: 0
  }
  onSubmit() {
    this.userDetailReg.firstName=this.firstName.value;
    this.userDetailReg.lastName=this.lastName.value;
    this.userDetailReg.userEmail=this.userEmail.value;
    this.userDetailReg.password=this.password.value;
    this.userDetails.getUserDetails(this.userDetailReg);
  }

  ngOnInit(): void {
    this.firstName = new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(20),
    ]),
      this.lastName = new FormControl('', [
        Validators.required,
      ]),
      this.userEmail = new FormControl('', [
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')
      ]),
      this.password = new FormControl('', [
        Validators.required,
        Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,}$')
      ]),
      this.regirationForm = new FormGroup({
        firstName: this.firstName,
        lastName: this.lastName,
        userEmail: this.userEmail,
        password: this.password,
        isLogged: this.formBuilder.control(false),
      });
  }

}
