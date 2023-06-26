import { EventEmitter, Injectable } from '@angular/core';
import { Login, Signup } from '../data-type';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class UserService {
  invalidUserAuth=new EventEmitter<boolean>(false);
  constructor(private http: HttpClient,private router:Router) { }
  userSignup(user:Signup){
    this.http.post("http://localhost:3000/users",user,{observe:'response'})
    .subscribe((result)=>
    {
      console.log(result);
      if(result){
        //Store the user in the localstorage in the stringyfy form
        localStorage.setItem('user',JSON.stringify(result.body));
        //Redirect the user to the home page
        this.router.navigate(['/']);
      }
    })
  }
  userLogin(data:Login){
    this.http.get<Signup[]>(`http://localhost:3000/users?email=${data.email}&password=${data.password}`,
    {observe:'response'})
    .subscribe((result)=>{
      if(result && result.body?.length){
        this.invalidUserAuth.emit(false);
        //Store the user in the localstorage in the stringyfy form
        localStorage.setItem('user',JSON.stringify(result.body[0]));
        //Redirect the user to the home page
        this.router.navigate(['/']);
      }else{
        this.invalidUserAuth.emit(true);
      }
    })
  }
  userAuthReload(){
    if(localStorage.getItem('user')){
      this.router.navigate(['/']);
    }
  }
}
