import { Component, OnInit } from '@angular/core';
import { taskdetails } from 'src/model/task';
import { TaskService } from 'src/service/task.service';
@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit{
  constructor(private taskDetails:TaskService){}
  fetchDetails:taskdetails[]=[];

  taskInfo(id: number) {
    return this.taskDetails.userTask().subscribe((res) => this.fetchDetails = res);
  }

  ngOnInit(): void {
    this.taskDetails.getUser().subscribe((res) => {
      this.fetchDetails = res
    })
  }
 
}
