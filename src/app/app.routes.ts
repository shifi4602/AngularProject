import { Routes } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';
import { ProductsComponent } from './components/products/products.component';
import { GiftsComponent } from './components/gifts/gifts.component';
import { BranchesComponent } from './components/branches/branches.component';
//import { ElectricComponent} from './components/electric/electric.component';
import { OrgenizeComponent } from './components/orgenize/orgenize.component';
//import { KnifesComponent } from './components/knifes/knifes.component';
import { GarbigeComponent } from './components/garbige/garbige.component';
import { HostingAndSrvingComponent } from './components/hosting-and-srving/hosting-and-srving.component';
import { ToGoComponent } from './components/to-go/to-go.component';
import { HomeComponent } from './components/home/home.component';
import { BasketComponent } from './components/basket/basket.component';
import { ProductPageComponent } from './components/product-page/product-page.component';
import { CookComponent } from './components/cook/cook.component';
import { PayComponent } from './components/pay/pay.component';
import { LoginComponent } from './components/login/login.component';
import { NewUserComponent } from './components/new-user/new-user.component';
import { AuthComponent } from './components/auth/auth.component';
import { ProductFormComponent } from './components/product-form/product-form.component';
import { ProductEditComponent } from './components/product-edit/product-edit.component';

export const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'products', component: ProductsComponent },
    { path: 'gifts', component: GiftsComponent },
    { path: 'to-go', component: ToGoComponent },
    { path: 'hosting-and-srving', component: HostingAndSrvingComponent },
    { path: 'garbige', component: GarbigeComponent },
    //{ path: 'knifes', component: KnifesComponent },
    { path: 'organization', component: OrgenizeComponent },
    //{ path: 'electric', component: ElectricComponent },
    { path: 'basket', component: BasketComponent },
    { path: 'branches', component: BranchesComponent },
    { path: 'products-page/:id', component: ProductPageComponent },
    {path: 'cook', component: CookComponent},
    { path: 'pay', component: PayComponent },
    { path: 'login', component: LoginComponent },
    { path: 'new-user', component: NewUserComponent },
    { path: 'auth', component: AuthComponent },
    { path: 'product-form', component: ProductFormComponent},
    { path: 'product-edit/:id', component: ProductEditComponent },
    { path: '**', redirectTo: '' }
];
