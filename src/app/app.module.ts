import { environment } from './../environments/environment';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './layout/header/header.component';
import { FooterComponent } from './layout/footer/footer.component';
import { CarouselComponent } from './content/carousel/carousel.component';
import { CaregoryListingComponent } from './content/caregory-listing/caregory-listing.component';
import { ProductListingComponent } from './content/product-listing/product-listing.component';
import { HomeComponent } from './home/home/home.component';
import { ProductDetailsComponent } from './pages/product-details/product-details.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { ChatUserComponent } from './chat/chat-user/chat-user.component';
import { AddEditComponent } from './pages/add-edit/add-edit.component';
import { FavProductsComponent } from './pages/fav-products/fav-products.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { FormsModule } from '@angular/forms';
import { CustomFormsModule } from 'ng2-validation';
import { ReactiveFormsModule } from '@angular/forms';
import { ProductsofcategoryComponent } from './pages/productsofcategory/productsofcategory.component';
import { RequestsComponent } from './pages/requests/requests.component';



import { RouterModule,Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
// import { Ng2SearchPipeModule} from 'ng2-search-filter';
import { ProductServiceService } from './services/product-service.service';
import { AngularFireModule } from '@angular/fire/compat';



import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { CommonModule } from '@angular/common';


import { RegisterComponent } from './pages/register/register.component';
import { LoginComponent } from './pages/login/login.component';
import { ForgetpasswordComponent } from './pages/forgetpassword/forgetpassword.component';
import { ResetPasswordComponent } from './pages/reset-password/reset-password.component';



import { GetstartedComponent } from './pages/getstarted/getstarted.component';


const appRoutes: Routes=[
  {path:'',component:ProfileComponent}
];


import { ListchatComponent } from './chat/chat-user/listchat/listchat.component';
import { FirebaseApp } from '@angular/fire/app';
import * as firebase from 'firebase/app';
import { LoadingComponent } from './pages/loading/loading.component';
import { EditprofileComponent } from './pages/editprofile/editprofile.component';
import { UserProfileComponent } from './pages/user-profile/user-profile.component';


firebase.initializeApp(environment.firebaseConfig);

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    CarouselComponent,
    CaregoryListingComponent,
    ProductListingComponent,
    HomeComponent,
    ProductDetailsComponent,
    ProfileComponent,
    ChatUserComponent,
    AddEditComponent,
    FavProductsComponent,
    ProductsofcategoryComponent,
    RegisterComponent,
    LoginComponent,
    ForgetpasswordComponent,
    ResetPasswordComponent,

    GetstartedComponent,

    ListchatComponent,
    LoadingComponent,
     EditprofileComponent,
     RequestsComponent,
     UserProfileComponent,



  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgxPaginationModule,
    FormsModule,
    CustomFormsModule,
    ReactiveFormsModule,

    RouterModule.forRoot(appRoutes),
    HttpClientModule,
    BrowserAnimationsModule ,
    ToastrModule.forRoot(),
  RouterModule.forRoot(appRoutes,{scrollPositionRestoration: 'top'}),
  AngularFireModule.initializeApp(environment.firebaseConfig, 'rubibkia'),
    CommonModule,


  ],
  providers: [ProductServiceService],
  bootstrap: [AppComponent]
})
export class AppModule { }
