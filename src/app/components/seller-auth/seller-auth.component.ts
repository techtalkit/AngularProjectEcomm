import { Component, OnInit } from '@angular/core';
import { SellerService } from 'src/app/services/seller.service';
import { Router } from '@angular/router';
import { Login, Signup } from 'src/app/data-type';

@Component({
  selector: 'app-seller-auth',
  templateUrl: './seller-auth.component.html',
  styleUrls: ['./seller-auth.component.css']
})
export class SellerAuthComponent implements OnInit {

  constructor(private seller:SellerService,private router:Router) { }
  showLogin=false;
  authError:string='';
  ngOnInit(): void {
    this.seller.reloadSeller();
  }
  signUp(data:Signup):void{
      this.seller.userSignUp(data);
  }
  login(data:Login):void{
    this.authError="";
    console.log(data);
    this.seller.userLogin(data);
    this.seller.isLoginError.subscribe((isError)=>
     {
       if(isError){
          this.authError="Email or password is not correct";
       }
     }
    )
  }
  openLogin(){
     this.showLogin=true;
  }
  openSignup(){
    this.showLogin=false;
  }


}
