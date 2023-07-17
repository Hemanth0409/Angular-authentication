import { Component, OnInit } from '@angular/core';
import { FormGroup,FormControl } from '@angular/forms';
import { UserDetailsService } from 'src/service/user-details.service';
import { userDetails } from 'src/model/userDetails';
import { TaskService } from 'src/service/task.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  form: FormGroup = new FormGroup({})
  constructor(private userDetail: UserDetailsService, private taskdetails: TaskService) { }
  details: userDetails[] = [];
 
  createTask(task: userDetails, id: userDetails) {
  }

  removeTask(task: userDetails) {
  }
  
  ngOnInit(): void {
    this.userDetail.validateUser().subscribe((res) => {
      this.details = res;
    })

  }

}
