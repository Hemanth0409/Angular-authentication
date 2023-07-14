import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserDetailsService } from 'src/service/user-details.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  constructor(private router: Router, private details: UserDetailsService) { }
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
            this.router.navigate(['/']);
          })
          return true;
        }
        return false;
      })
    })
  }
}
