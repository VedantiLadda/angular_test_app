import { NgModule } from '@angular/core';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { ConvertToSpacesPipe } from '../shared/convert-to-spaces.pipe';
import { RouterModule } from '@angular/router';
import { ProductsDetailGuard } from './product-guards/products-detail.guard';
import { SharedModule } from '../shared/shared.module';
import { ProductEditComponent } from './product-edit/product-edit.component';
import { ProductEditGuard } from './product-guards/product-edit.guard';
import { AuthGuard } from '../users/auth.guard' ;



@NgModule({
  declarations: [ProductListComponent,
    ProductDetailComponent,
    ConvertToSpacesPipe,
    ProductEditComponent],
  imports: [
    RouterModule.forChild([
      { path: 'products', component: ProductListComponent },
      {
        path: 'products/:id',
        canActivate: [ProductsDetailGuard],
        component: ProductDetailComponent
      },
      {
        path: 'products/:id/edit',
        canActivate : [AuthGuard],
        canDeactivate: [ProductEditGuard],
        component: ProductEditComponent
      }
    ]),
    SharedModule
  ]
})
export class ProductModule { }
