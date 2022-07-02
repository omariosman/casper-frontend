import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormGroup, FormGroupDirective } from '@angular/forms';
import { SendDataService } from '../send-data.service'; 
import { FormInterface } from './form-interface';


@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})
export class MainPageComponent implements OnInit {

  isSubmitted: boolean;
  isValid: boolean;
  clickedSend: boolean;
  gender_val: any;


  form = new FormGroup({
    publicAddress: new FormControl('', Validators.required),

  });

  submission = {} as FormInterface;


  constructor(private ser: SendDataService) { 
    this.isSubmitted = false;
    this.isValid = true;
    this.clickedSend = false;
  }

  ngOnInit(): void {
  }


  onSubmit() {
    this.clickedSend = true;
    this.form.markAllAsTouched();
    this.isValid = true;
    if (this.form.valid) {
      this.clickedSend = false;
      this.formResultRow();
      this.recordResult();
    } else {
      this.isValid = false;
    }
  }


  
  recordResult() {
    console.log("tst", this.submission);
    this.ser.sendAddress(this.submission).subscribe(data => {
      this.form.reset();
      this.isSubmitted = true;
      //document.getElementById('form-body-id').setAttribute('style','display:none');


      setTimeout(() => {
        this.isSubmitted = false;
        //document.getElementById('form-body-id').setAttribute('style','display:block');
      }, 2000);
    });
  }

  formResultRow() {
    this.submission.publicAddress = this.form.get('publicAddress')?.value;

  } 

  onOptionsSelected(value:string){
    console.log("the selected value is " + value);
    //this.submission.gender = "";
    this.gender_val = value;
    
/*
    this.mainSer.get_club_info({"club_name": value}).subscribe(data => {
      this.club_info = data;
      console.log(this.club_info);
    })
    */
}


}
