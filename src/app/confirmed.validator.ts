import {FormGroup} from '@angular/forms';
export function MustMatch(controlName:any,matchingControlName:any){
   return (formgroup:FormGroup)=>{
          const control=formgroup.controls[controlName];
          const matchingcontrol=formgroup.controls[matchingControlName];

          if(matchingcontrol.errors && !matchingcontrol.errors['mustMatch']){
                return;
          }
          if(control.value !== matchingcontrol.value){
              matchingcontrol.setErrors({mustMatch:true});
          }
          else{
            matchingcontrol.setErrors(null);
          }
          }
}