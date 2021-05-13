import { Component, OnInit } from '@angular/core';
import {ProductService} from "../../services/product.service";
import {Product} from "../../common/product";
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-product-list-grid',
  templateUrl: './product-list-grid.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  products: Product[];
  currentCatergoryId: number;
  constructor(private productService: ProductService , private route: ActivatedRoute) {

  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(() => {
      this.listProducts();
    });
  }
  listProducts(){
    const hasCategoryId: boolean = this.route.snapshot.paramMap.has('id');
    if (hasCategoryId){
      this.currentCatergoryId = +this.route.snapshot.paramMap.get('id');
    }
    else {
      this.currentCatergoryId = 1;
    }
    this.productService.getProductList(this.currentCatergoryId).subscribe(
      data => {
        this.products = data;
      }
    )
  }

}
