import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, FormArray } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  genders = ['male', 'female'];
  signupForm: FormGroup
  forbiddenUserName = ["Md.","Chris","Anna"]

  ngOnInit() {
    // form control is key value pair
    this.signupForm = new FormGroup({
      'userData': new FormGroup( {
        'username': new FormControl(null, [Validators.required, this.forbiddenNames.bind(this)]), // validator reference
        'email': new FormControl(null, [Validators.required, Validators.email])
      }),
      'gender': new FormControl('male'),
      'hobbies' : new FormArray([]) // form array hold an array of controls
    });
    // this.signupForm.valueChanges.subscribe(
    //   (value) => console.log(value)
    // )

    this.signupForm.statusChanges.subscribe(
      (status)=> console.log(status)
      
    )
     this.signupForm.setValue({
      'userData':{
        'username': 'Max',
        'email': "max@test.com"
      },
      'gender': 'female',
      'hobbies': []
     })

     this.signupForm.patchValue({
      'userData':{
        'username': 'Anna',
      }
     })
  }

  onSubmit(){
    console.log(this.signupForm);
    this.signupForm.reset()
    
  }

  onAddHobby(){
    // <FormArray>:casting, this bracket enclosed part tells the typescript this is my array
    const control = new FormControl(null, Validators.required);
    (<FormArray>this.signupForm.get('hobbies')).push(control);
  }
  // validator is a function that angular execute automatically
  forbiddenNames (control: FormControl): {[s: string]: boolean}{
    if (this.forbiddenUserName.indexOf(control.value)!==-1){
      return {'nameIsForbidden': true};
    }
    return null; // if the validation is succesfull retun nothing or null
  }

}
