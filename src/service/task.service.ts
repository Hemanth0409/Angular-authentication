import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { taskdetails } from 'src/model/task';
@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor(private http: HttpClient, private router: Router) { }
  userDetails = "http://localhost:3000/userDetails";
  taskdata = "http://localhost:3000/task";

  taskDetails(data: taskdetails) {
    return this.http.post<taskdetails[]>(this.taskdata, data).subscribe(() => {
      const Toast = Swal.mixin({
        toast: true,
        position: 'top',
        showConfirmButton: false,
        timer: 1000,
        timerProgressBar: true,
      })
      Toast.fire({
        icon: 'success',
        title: 'Task Assigned successfully'
      })
    })
  }

}
