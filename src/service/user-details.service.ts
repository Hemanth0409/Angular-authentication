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

  getUserDetails(form: userDetails) {
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
        this.router.navigate(['/']);
      })
    })
  }
  isLogged(form: userDetails, id: number) {
    let Url = this.userDetails + '/' + id;
    form.isLogged = true;
    return this.http.put(Url, form).subscribe(() => { });
  }
  isLoggedOff(form: userDetails, id: number) {
    let Url = this.userDetails + '/' + id;
    form.isLogged = false;
    return this.http.put(Url, form).subscribe(() => { });
  }
  taskDetails(id: number) {
    let assignUrl = this.userDetails + '/' + id;
    this.http.get<userDetails>(assignUrl).subscribe((res)=>{
      res.taskAssigned=true;
      this.http.put(assignUrl,res).subscribe();
    })
  }
  validateUser() {
    return this.http.get<userDetails[]>(this.userDetails);
  }
}
