import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserDetailsService } from 'src/service/user-details.service';
import { userDetails } from 'src/model/userDetails';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {
  form: FormGroup = new FormGroup({})

  constructor(private userDetail: UserDetailsService,private router:Router) { }

  signInForm!: FormGroup;
  signInMail: FormControl | any;
  signInPassword: FormControl | any;
  ngOnInit(): void {
    this.signInMail = new FormControl('', [
      Validators.required,
      Validators.pattern('^[a-zA-Z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')
    ]),
      this.signInPassword = new FormControl('', [
        Validators.required,
        Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,}$')
      ]),
      this.signInForm = new FormGroup({
        signInMail: this.signInMail,
        signInPassword: this.signInPassword
      })
  }
  loginDetails: any
  onSubmit() {
    this.userDetail.validateUser().subscribe((res) => {
      this.loginDetails = res;
      const user = this.loginDetails.find((details: userDetails) => {
        if (details.userEmail === this.signInForm.value.signInMail &&
          details.password === this.signInForm.value.signInPassword && details.role == 'Admin') {

          this.userDetail.isLogged(details, details.id);
          console.log(details.role)
          return true;
        }
        else if (details.userEmail === this.signInForm.value.signInMail &&
          details.password === this.signInForm.value.signInPassword && details.role == 'User') {
          this.userDetail.isLogged(details, details.id);
          return true;
        }
        return false
      });
      if (user) {
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
        });
      } else {
        const Toast = Swal.mixin({
          toast: true,
          position: 'top',
          showConfirmButton: false,
          timer: 1000,
          timerProgressBar: true,
        });
        Toast.fire({
          icon: 'error',
          title: 'Went wrong',
        });
        this.signInForm.reset();
      }
    });
    
  }
}
