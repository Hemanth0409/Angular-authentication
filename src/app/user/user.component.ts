import { Component, OnInit } from '@angular/core';
import { taskdetails } from 'src/model/task';
import { TaskService } from 'src/service/task.service';
import { userDetails } from 'src/model/userDetails';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  constructor(private taskDetails: TaskService, private route: ActivatedRoute) { }
  fetchDetails: taskdetails[] = [];
  userDetails: userDetails[] = [];
  userId!: number
  taskInfo() {
    return this.taskDetails.getUser().subscribe((res) => this.fetchDetails = res);
  }
  updateTask(id: number, task: taskdetails) {
    if(task.status=='Assigner'){
    task.status='Task Started'}
    else{
      task.status='Completed'
    }
    return this.taskDetails.updatetask(id, task);
  }
  taskFound = false;
  ngOnInit(): void {
    this.taskDetails.getUser().subscribe((res) => {
      this.fetchDetails = res
    })
    this.userId = this.route.snapshot.params['id'];
    this.taskDetails.fetchTask(this.userId).subscribe((res) => {
       this.fetchDetails = res; 
         if (res.length <= 0) {
        this.taskFound = true;
      }
      console.log(this.fetchDetails)
    })
  }

}
