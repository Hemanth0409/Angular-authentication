import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { taskdetails } from 'src/model/task';
import { userDetails } from 'src/model/userDetails';
import { UserDetailsService } from './user-details.service';
@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor(private http: HttpClient, private router: Router, private userservice: UserDetailsService) { }
  userDetails = "http://localhost:3000/userDetails";
  taskdata = "http://localhost:3000/task";

  fetchId(firstName: string) {
    const url = this.userDetails + '?firstName=' + firstName;
    return this.http.get<userDetails[]>(url);
  }

  fetchTask(id: number) {
    return this.http.get<taskdetails[]>(this.taskdata + '?userId=' + id);
  }

  updatetask(id: number, taskDetails: taskdetails) {
    const updateUrl = this.taskdata + '/' + id;
    return this.http.put<taskdetails[]>(updateUrl, taskDetails).subscribe(() => {
      const Toast = Swal.mixin({
        toast: true,
        position: 'top',
        timer:1000,
        showConfirmButton: false,
        timerProgressBar: true,
      })

      Toast.fire({
        icon: 'success',
        title: 'Item updated successfully'
      })
    }
    )
  }
  deleteTask(id: number) {
    const url = this.taskdata + '/' + id;
    return this.http.delete(url).subscribe(() => {
      const Toast = Swal.mixin({
        toast: true,
        position: 'top',
        showConfirmButton: false,
        timer: 1000,
        timerProgressBar: true,
      })
      Toast.fire({
        icon: 'success',
        title: 'Task Deleted successfully'
      }).then(() => {
        this.router.navigate(['/home']);
      })
    });
  }
  getUser() {
    return this.http.get<taskdetails[]>(this.taskdata);
  }


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
      }).then(() => {
        this.userservice.taskDetails(data.userId)
        this.router.navigate(['/home'])
      })
    })
  }

}
