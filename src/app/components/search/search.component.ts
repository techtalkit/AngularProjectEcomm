import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import { Product } from 'src/app/data-type';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
searchResult: undefined | Product[];
  constructor(private activeRoute:ActivatedRoute,private product:ProductService) { }

  ngOnInit(): void {
    let query=this.activeRoute.snapshot.paramMap.get('query');
    //console.log(query)
    query && this.product.searchProducts(query).subscribe((result)=>{
         this.searchResult=result;
    })
  }

}
