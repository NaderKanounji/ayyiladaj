import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { _globals } from '../includes/globals';
import { RegisterForm } from '../includes/Models';

@Injectable()
export class MembershipService {

  constructor(private http:HttpClient) { }

  register(e, form:RegisterForm){
    e.stopPropagation();
    let body = JSON.stringify(form);
    console.log(form);
    
    const headers = new HttpHeaders().set("Content-Type", "application/json");
    // headers.set('Content-Type', 'application/json');
    // headers.set('Accept', 'application/json');
    console.log('headers: ' + headers.keys);
    this.http.post(_globals.API_URL + 'Administrators/Registerv1', body, {headers}).subscribe((data:any) =>{
        console.log(data);
        
    });
    return false;
  }
}