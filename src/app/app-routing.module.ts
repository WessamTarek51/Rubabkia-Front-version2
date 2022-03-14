import { ProductListingComponent } from './content/product-listing/product-listing.component';
import { FavProductsComponent } from './pages/fav-products/fav-products.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChatUserComponent } from './chat/chat-user/chat-user.component';
import { HomeComponent } from './home/home/home.component';
import { AddEditComponent } from './pages/add-edit/add-edit.component';
import { ProductDetailsComponent } from './pages/product-details/product-details.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { ProductsofcategoryComponent } from './pages/productsofcategory/productsofcategory.component';
import { RegisterComponent } from './pages/register/register.component';
import { LoginComponent } from './pages/login/login.component';
import { AuthGuard } from './auth.guard';
import { ForgetpasswordComponent } from './pages/forgetpassword/forgetpassword.component';
import { ResetPasswordComponent } from './pages/reset-password/reset-password.component';
import { EditprofileComponent } from './pages/editprofile/editprofile.component';
import { GetstartedComponent } from './pages/getstarted/getstarted.component';
import { ListchatComponent } from './chat/chat-user/listchat/listchat.component';
import { LoadingComponent } from './pages/loading/loading.component';
import { RequestsComponent } from './pages/requests/requests.component';
import { UserProfileComponent } from './pages/user-profile/user-profile.component';

const routes: Routes = [
  {path:'',component:HomeComponent},
  {path:'show/:id',component:ProductDetailsComponent},
  // {path:'profile/1',component:ProfileComponent},
  {
  path:'profile/:id',component:ProfileComponent,
  canActivate:[AuthGuard]
  },
  {path:'forgetpassword',component:ForgetpasswordComponent},
  {path:'reset-password',component:ResetPasswordComponent },
  {path:'product',component:ProductListingComponent },



  {path:'getstarted',component:GetstartedComponent },



  {path:'profile/:id',component:ProfileComponent, canActivate:[AuthGuard]},
  {path:'user/:id',component:UserProfileComponent},

  {path:'chat/:id',component:ChatUserComponent,canActivate:[AuthGuard]},

  {path:'fav/:id',component:FavProductsComponent},
  {path:'nof/:id',component:RequestsComponent},


  {path:'add',component:AddEditComponent},
  {path:'edit/:id',component:AddEditComponent},
  {path:'category/:id',component:ProductsofcategoryComponent,children:[
  {path:'show/:id',component:ProductDetailsComponent},

  ]},
  {path:'profile/',children:[
  {path:'edit/:id',component:AddEditComponent},
]
},
{path:'editprofile',component:EditprofileComponent},
{path:'register',component:RegisterComponent},
{path:'login',component:LoginComponent},
{path:'message',component:ListchatComponent},
{path:'loading',component:LoadingComponent},
{path:'requests',component:RequestsComponent},


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
