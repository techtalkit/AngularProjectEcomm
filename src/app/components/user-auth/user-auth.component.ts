import { Component, OnInit } from '@angular/core';
import { Cart, Login, Product, Signup } from 'src/app/data-type';
import { ProductService } from 'src/app/services/product.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-auth',
  templateUrl: './user-auth.component.html',
  styleUrls: ['./user-auth.component.css']
})
export class UserAuthComponent implements OnInit {
  showLogin:boolean=true;
  authError:string="";
  constructor(private user:UserService,private product:ProductService) { }

  ngOnInit(): void {
    this.user.userAuthReload();
  }
  signUp(data:Signup){
    this.user.userSignup(data);
  }
  login(data: Login){
    this.user.userLogin(data); 
    this.user.invalidUserAuth.subscribe((result)=>{
      //console.log("apple",result);
      if(result){
         this.authError="Please enter Valid User Deatils";
      }else{
        // setTimeout(() => {
        //   let user=localStorage.getItem('user');
        //   let userId=user && JSON.parse(user).id; 
        //   this.product.getCartList(userId);
        // },10);  
        setTimeout(() => {
          this.localCartToRemoteCart(); 
        },5);     
      }
    })
  }
  openLogin(){
    this.showLogin=true;
  }
  openSignup(){
    this.showLogin=false;
  }
  localCartToRemoteCart(){
      let data=localStorage.getItem('localCart');
      let user=localStorage.getItem('user');
      let userId=user && JSON.parse(user).id; 
      if(data){
        let cartDataList:Product[]=JSON.parse(data);     
        cartDataList.forEach((product:Product,index) => {
          let cartData:Cart={
            ...product,
            productId:product.id,
            userId
          };
          delete cartData.id;
          setTimeout(() => {
            this.product.addToCart(cartData).subscribe((result)=>{
              if(result){
                //console.log("Item stored in DB")
              }
            })
            if(cartDataList.length===index+1){
               localStorage.removeItem('localCart');
            }
          }, 500);      
        });
      }      
      this.product.getCartList(userId); 
      //  
  }
}
