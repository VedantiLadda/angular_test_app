import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { IProduct } from './product';
import { ProductService } from './product.service';

@Component({
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {

  pageTitle: string = 'Product Detail';
  product: IProduct = null;
  errormessage: string;
  

  constructor(private route: ActivatedRoute,
    private router: Router, private productService: ProductService) {
     }

  ngOnInit(): void {
    let id = +this.route.snapshot.paramMap.get('id');
    // this.pageTitle += `: ${id}`;
    // this.product = {
    //   'productId': id,
    //   'productName': 'Leaf Rake',
    //   'productCode': 'GDN-0011',
    //   'releaseDate': 'March 19, 2019',
    //   'description': 'Leaf rake with 48-inch wooden handle.',
    //   'price': 19.95,
    //   'starRating': 3.2,
    //   'imageUrl': 'assets/images/leaf_rake.png'
    // };
    this.productService.getProductById(id).subscribe({
      next: product => {this.product = product;},
      error: err => this.errormessage = err
    });
  }
  onBack(): void {
    this.router.navigate(['/products']);
  }
}
