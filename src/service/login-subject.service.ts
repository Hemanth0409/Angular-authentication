import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class LoginSubjectService {
  userUrl = 'http://localhost:3000/userDetails'
  constructor() { }
  public loginSubject = new Subject<boolean>();

  validateSubject(data: boolean) {
    return this.loginSubject.next(data)
  }
  value?: boolean
  getLoginStatus() {
    this.loginSubject.subscribe(data => {
      this.value = data
    });
    return this.value;
  }
}
