import { Component, OnInit } from '@angular/core';
// import { FormGroup, FormControl } from '@angular/forms'

// import { SharedService } from '../../../services/shared.service';
import { FunctionsService } from '../../../services/functions.service';
import { UserService } from '../../../services/user.service';

import { LoginForm, UserModel } from '../../../includes/Models';
import {MembershipService} from '../../../services/membership.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm:LoginForm;
  isSubmitted:boolean = false;
  formErrors:string[] = [];

  constructor(private myFunctions:FunctionsService ,private user:UserService, private membership:MembershipService) { }

  ngOnInit() {
    this.loginForm = {
      username:'',
      password:'',
      grant_type:'password'
    };
  }

  login(e:any, loginForm:LoginForm){
    this.isSubmitted = true;
    this.formErrors = [];
    loginForm.grant_type = 'password';
    this.membership.login(e, loginForm).subscribe((data:any) => {
      let myUser:UserModel = {isLogged: false, user:null, token: data, follows: null};
      this.user.setToken(data);
      this.membership.GetUserInfo(myUser.token).subscribe((res:any) => {
        myUser.user = res.user;
        myUser.follows = res.follows;
        this.user.saveUser(myUser);
        this.loginForm = {
          username:'',
          password:'',
          grant_type:'password'
        };
        setTimeout(() =>{
            this.myFunctions.dropdown_event();
            this.myFunctions.psy_popup();
            this.myFunctions.reset_page_state();
        },200);
        this.isSubmitted = false;
      },(err) => {
        this.isSubmitted = false;
        this.formErrors.push(err.error.message);
      });
      
    },(err) => {
      this.isSubmitted = false;
      this.formErrors.push(err.error.message);
      //console.error(err);
    });
  }

}

