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
    userId:0,
    firstName: '',
    task: ''
  };
  assignTask!: FormGroup;
  task!: FormControl;
  user!: FormControl;
  userId:FormControl|any;
  getId() {
    this.taskdetails.fetchId(this.userTask.firstName).subscribe((res) => {
      this.userTask.id = res[0].id;
      console.log(this.userTask.id)
    })
  }

  // createTask(task:FormGroup) {
  //   this.taskdetails.taskDetails(task.value);
  //   this.assignTask.reset();
  // } 
   createTask(task: FormGroup) {
    this.taskdetails.taskDetails(this.userTask)
    // this.taskdetails.taskDetails(task.value);
    this.userTask.userId=this.userD.id;
    this.assignTask.reset();
  }
 

  removeTask(task: userDetails) {
  }

  ngOnInit(): void {
    this.userDetail.validateUser().subscribe((res) => {
      this.details = res;
    })
    this.task = new FormControl('', [Validators.required]);
    this.user = new FormControl('', [Validators.required]);
    this.assignTask = new FormGroup({
      task: this.task,
      user: this.user,
    })

  }

}
