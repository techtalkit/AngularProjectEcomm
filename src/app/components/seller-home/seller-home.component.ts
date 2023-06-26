import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/data-type';
import { ProductService } from 'src/app/services/product.service';
//import { faHeart} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-seller-home',
  templateUrl: './seller-home.component.html',
  styleUrls: ['./seller-home.component.css']
})
export class SellerHomeComponent implements OnInit {
 productList: undefined | Product[];
 productMessage:undefined | string;
  constructor(private product: ProductService) { }

  ngOnInit(): void {
    this.plist();
  }
  deleteProduct(id:number){
      this.product.deleteProduct(id).subscribe((result)=>
      {
        if(result){
          this.productMessage=`The product with ${id} is deleted`;
          this.plist();
        }
        setTimeout(()=>{
         this.productMessage='';
        },4000);
      })
  }
  plist(){
      this.product.productList().subscribe((result)=>{
      console.log(result);
      this.productList=result;
   })
  }

}
