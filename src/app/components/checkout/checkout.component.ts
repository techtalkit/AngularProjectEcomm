import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { address, order } from 'src/app/data-type';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
  totalPrice:number|undefined;
  constructor(private product:ProductService,private router:Router) { }

  ngOnInit(): void {
    this.product.currentCart().subscribe((result) => {
      // console.log(result);
      let price = 0;
      result.forEach((item) => {
        if(item.quantity){
          price = price +(+item.price * item.quantity);
        }  
      })
      this.totalPrice=price-(price/10)+(price/10)+100;
      console.log(this.totalPrice);
    })
  }
  orderNow(data:address){
    let user=localStorage.getItem("user");
    let userId=user && JSON.parse(user).id;
    if(this.totalPrice){
      let orderData: order={
        ...data,
        totalPrice:this.totalPrice,
        userId
      }
      this.product.orderNow(orderData).subscribe((result)=>{
        if(result){
          alert("Order Placed")
          this.router.navigate(['/my-orders'])
        }
      })
    }
  }

}
