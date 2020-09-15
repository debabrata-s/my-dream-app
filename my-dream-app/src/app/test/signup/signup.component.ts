import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ApiService } from '../services/api.service';
import { NewUser } from '../models/user';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
 
  public usernameFC = new FormControl('');
  public emailFC = new FormControl('');
  public firstnameFC = new FormControl('');
  public lastnameFC = new FormControl('');
  public passwordFC = new FormControl('');
  public signupFG = new FormGroup({
    username: this.usernameFC,
    email: this.emailFC,
    firstname: this.firstnameFC,
    lastname: this.lastnameFC,
    password: this.passwordFC
  })
  users: NewUser[] = [];

  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
    this.updateUsersList();
  }
  updateUsersList(){
    this.apiService.getUsers()
    .subscribe(res => {
      this.users = res;
    })
  }

  public onSubmit(){
    const user:NewUser ={ 
      username: this.usernameFC.value,
      email: this.emailFC.value,
      firstname: this.firstnameFC.value,
      lastname: this.lastnameFC.value,
      password: this.passwordFC.value
    }
    this.apiService.addUser(user)
    .subscribe(res => {
      console.log(res);
      this.updateUsersList();
      this.signupFG.reset();
    })
  }
  public deleteUser(id:string){
    this.apiService.deleteUser(id)
    .subscribe(res =>{
      console.log(res);
      this.updateUsersList();
      this.signupFG.reset();
    })
  }
  public resetdb(){
    
  }

}
