import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserDetailsService } from 'src/service/user-details.service';
import { userDetails } from 'src/model/userDetails';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { LoginSubjectService } from 'src/service/login-subject.service';
@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {
  form: FormGroup = new FormGroup({})

  constructor(private userDetail: UserDetailsService, private router: Router, private sub: LoginSubjectService) { }

  signInForm: FormGroup|any;
  mail: FormControl | any;
  password: FormControl | any;
  ngOnInit(): void {
    this.mail = new FormControl('', [
      Validators.required,
      Validators.pattern('^[a-zA-Z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')
    ]),
      this.password = new FormControl('', [
        Validators.required,
        Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8}$')
      ]),
      this.signInForm = new FormGroup({
        mail: this.mail,
        password: this.password
      })
  }
  loginDetails: any
  onSubmit() {
    this.userDetail.validateUser().subscribe((res) => {
      this.loginDetails = res;
      this.loginDetails.find((details: userDetails) => {
        if (details.userEmail === this.signInForm.value.mail &&
          details.password === this.signInForm.value.password && details.role == 'Admin') {
          this.userDetail.isLogged(details, details.id);
          console.log(details.role);
          if (details.role == 'Admin') {
            this.signInForm.reset();
            localStorage.setItem('token', Math.random().toString())
            const Toast = Swal.mixin({
              toast: true,
              position: 'top',
              showConfirmButton: false,
              timer: 2000,
              timerProgressBar: true,
            });
            Toast.fire({
              icon: 'success',
              title: 'Logged successfully',
            }).then(() => {
              this.router.navigate(['/home']);
              this.sub.validateSubjectAdmin(true)
            });
          }
          return true;
        }
        else if (details.userEmail === this.signInForm.value.mail &&
          details.password === this.signInForm.value.password && details.role == 'User') {
          this.userDetail.isLogged(details, details.id);
          console.log(details.role);
          if (details.role == 'User') {
            this.signInForm.reset();
            localStorage.setItem('token', Math.random().toString())
            const Toast = Swal.mixin({
              toast: true,
              position: 'top',
              showConfirmButton: false,
              timer: 2000,
              timerProgressBar: true,
            });
            Toast.fire({
              icon: 'success',
              title: 'Logged successfully',
            }).then(() => {
              this.router.navigate(['user/'+details.id]);
              this.sub.validateSubjectUser(true)
            });
          }
          return true;

      }

        return false
      });


    });


  }
}
