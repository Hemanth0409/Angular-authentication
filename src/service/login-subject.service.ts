import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class LoginSubjectService {
  userUrl = 'http://localhost:3000/userDetails'
  constructor() { }
  public loginSubjectAdmin = new Subject<boolean>();
  public loginSubjectUser = new Subject<boolean>();
  validateSubjectAdmin(data: boolean) {
    return this.loginSubjectAdmin.next(data)
  }
  validateSubjectUser(val: boolean) {
    return this.loginSubjectUser.next(val)
  }
}
