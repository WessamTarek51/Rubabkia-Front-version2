import { Category } from './../../_models/category.models';
import { CategoryServiceService } from './../../services/category-service.service';
import { Component, OnInit } from '@angular/core';
// import Swal from 'sweetalert2';

@Component({
  selector: 'app-caregory-listing',
  templateUrl: './caregory-listing.component.html',
  styleUrls: ['./caregory-listing.component.css']
})
export class CaregoryListingComponent implements OnInit {
category!:Category[];
dropDownOpen=false;
totalLength:any;
page:number=1;


  constructor(private service:CategoryServiceService) { }

  ngOnInit(): void {
// this.category=this.service.categories;

this.service.getAllcategories().subscribe(
  (res:any)=>{
    this.category = res.data
  },



)

  }

/////////////////////////////////////////
  // successNotification() {
  //   Swal.fire('Hi', 'We have been informed!', 'success');
  // }

  // alertConfirmation() {
  //   Swal.fire({
  //     title: 'Are you sure?',
  //     text: 'This process is irreversible.',
  //     icon: 'warning',
  //     showCancelButton: true,
  //     confirmButtonText: 'Yes, go ahead.',
  //     cancelButtonText: 'No, let me think',
  //   }).then((result) => {
  //     if (result.value) {
  //       Swal.fire('Removed!', 'Product removed successfully.', 'success');
  //     } else if (result.dismiss === Swal.DismissReason.cancel) {
  //       Swal.fire('Cancelled', 'Product still in our database.)', 'error');
  //     }
  //   });
  // }
// }

}
