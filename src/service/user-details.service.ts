import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { userDetails } from 'src/model/userDetails';
import Swal from 'sweetalert2';
@Injectable({
  providedIn: 'root'
})
export class UserDetailsService {

  constructor(private http: HttpClient, private router: Router) { }
  userDetails = "http://localhost:3000/userDetails";
  admin = 'http://localhost:3000/Admin';
  
  getUserDetails(form: string | number) {
    return this.http.post<userDetails[]>(this.userDetails, form).subscribe(() => {
      const Toast = Swal.mixin({
        toast: true,
        position: 'top',
        showConfirmButton: false,
        timer: 1000,
        timerProgressBar: true,
      })
      Toast.fire({
        icon: 'success',
        title: 'Registered successfully'
      }).then(() => {
        this.router.navigate(['/signin']);
      })
    })
  }

  validateUser() {

  }
}
