import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, Validators } from '@angular/forms';

import { AuthenticationService } from 'src/app/authentication/authentication.service';
import { UserService } from 'src/app/utility/service/user.service';
import {Router} from "@angular/router";
import {ProfileService} from "../../../utility/service/profile.service";


@Component({
  selector: 'app-edit-coach',
  templateUrl: './edit-coach.component.html',
  styleUrls: ['./edit-coach.component.css']
})
export class EditCoachComponent implements OnInit {


  private _editCoachForm = this.formBuilder.group({
    availability: new FormControl("",[Validators.required]),
    introduction: new FormControl("",[Validators.required]),
  });

  constructor(public profileService: ProfileService, private userService: UserService, private formBuilder: FormBuilder, private authService: AuthenticationService, private router: Router) { }

  ngOnInit(): void {
    this.displayUser();
  }

  displayUser(): void {
    const id = this.authService.getId();
    this.userService.get(+id).subscribe(user => {
      this._editCoachForm.patchValue(user);
    });
  }

  update() {
    if(this._editCoachForm.valid){
      this.userService.updateCoach(this._editCoachForm.value, +this.authService.getId()).subscribe(
        (_ => {
          alert("Your changes have been saved.");
          this.router.navigateByUrl("/dashboard-coach");
        }),
        (error =>  this._editCoachForm.setErrors({serverError: 'oops something went wrong'}))
      );
    }
  }

  cancel(){
    this.userService.get(+this.authService.getId()).subscribe(user => {
      this._editCoachForm.patchValue(user);
      this.router.navigateByUrl("/dashboard-coach");
    });
  }

  get editCoachForm(){
    return this._editCoachForm;
  }

  get availability(){
    return this._editCoachForm.get('availability');
  }

  get introduction(){
    return this._editCoachForm.get('introduction');
  }

  wrongInputHasBeenTyped(input: AbstractControl): boolean{
    if (input === null){
      return false;
    }
    return input.invalid && (input.dirty || input.touched);
  }

}