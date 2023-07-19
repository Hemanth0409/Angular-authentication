import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UserDetailsService } from 'src/service/user-details.service';
import { userDetails } from 'src/model/userDetails';
import { TaskService } from 'src/service/task.service';
import { taskdetails } from 'src/model/task';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  form: FormGroup = new FormGroup({});
  constructor(private userDetail: UserDetailsService, private taskdetails: TaskService) { }

  details: userDetails[] = [];
  fetchDetails: taskdetails[] = [];
  userD: userDetails = {
    id: 0,
    firstName: '',
    lastName: '',
    userEmail: '',
    password: '',
    isLogged: false,
    role: ''
  };

  taskDetails: taskdetails[] = [];
  userTask: taskdetails = {
    id: 0,
    userId: 0,
    firstName: '',
    task: ''
  };
  assignTask!: FormGroup;
  task!: FormControl;
  user!: FormControl;

  getId() {
    return this.taskdetails.fetchId(this.userTask.firstName).subscribe((res) => {
      this.userTask.userId = res[0].id;
    })
  }

  createTask(task: FormGroup) {
    this.assignTask.reset();
    return this.taskdetails.taskDetails(this.userTask);

  }

  taskInfo(id: number) {
    return this.taskdetails.fetchTask(id).subscribe((res) => this.fetchDetails = res);
  }
  // updateTaskInfo(id: number) {
  //   return this.taskdetails.updatetask(id).subscribe((res) => this.fetchDetails = res)
  // }
  removeTask(id:number) {
    return this.taskdetails.deleteTask(id).subscribe((res) => this.fetchDetails = res);
  }

  ngOnInit(): void {
    this.userDetail.validateUser().subscribe((res) => {
      this.details = res;
    })
    this.taskdetails.getUser().subscribe((res) => {
      this.taskDetails = res
    })
    this.task = new FormControl('', [Validators.required]);
    this.user = new FormControl('', [Validators.required]);
    this.assignTask = new FormGroup({
      task: this.task,
      user: this.user,
    })

  }

}
