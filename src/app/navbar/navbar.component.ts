import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserDetailsService } from 'src/service/user-details.service';
import Swal from 'sweetalert2';
import { LoginSubjectService } from 'src/service/login-subject.service';
import { userDetails } from 'src/model/userDetails';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  constructor(private router: Router, private details: UserDetailsService, private sub: LoginSubjectService) { }
  Admin: boolean = false;
  User: boolean = false;
  loginDetails: any;
  ngOnInit(): void {
    this.details.validateUser().subscribe((res) => {
      this.loginDetails = res;
      this.loginDetails.find((data: userDetails) => {
        if (data.role == 'Admin') {
          this.sub.loginSubjectAdmin.subscribe(data => {
            this.Admin = data
          });
        }
        else if (data.role == 'User') {
          this.sub.loginSubjectUser.subscribe(val => {
            this.User = val
          });
        }
      })
    })


  }



  profile: any
  logout() {
    this.details.validateUser().subscribe((res) => {
      this.profile = res
      this.profile.find((data: any) => {
        if (data.isLogged == true) {
          localStorage.removeItem('token');
          this.details.isLoggedOff(data, data.id);
          const Toast = Swal.mixin({
            toast: true,
            showConfirmButton: false,
            position: 'top',
            timer: 1000
          })
          Toast.fire({
            icon: 'success',
            title: 'Logged successfully'
          }).then(() => {
            this.router.navigate(['/signin']);
            window.location.reload();
          })
          return true;
        }
        return false;
      })
    })
  }
}
