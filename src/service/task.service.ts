import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { taskdetails } from 'src/model/task';
import { userDetails } from 'src/model/userDetails';
@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor(private http: HttpClient, private router: Router) { }
  userDetails = "http://localhost:3000/userDetails";
  taskdata = "http://localhost:3000/task";

  fetchId(firstName: string) {
    const url = this.userDetails + '/?firstName=' + firstName;
    return this.http.get<userDetails[]>(url);
  }
  fetchTask(id: number) {
    return this.http.get<taskdetails[]>(this.taskdata + '?userId_like=' + id);
  }
  // updatetask(id: number) {
  //   return this.http.put<taskdetails[]>(this.taskdata + '?id_like=' + id);
  // }
  deleteTask(id:number){
    return this.http.delete<taskdetails[]>(this.taskdata + '?id_like=' + id);
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
        this.router.navigate(['/home'])
      })
    })
  }

}
