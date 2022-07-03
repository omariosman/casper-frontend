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
  value : string = 'Recycling Team Casper Network';
  isSubmitted: boolean;
  isValid: boolean;
  clickedSend: boolean;
  gender_val: any;


  form = new FormGroup({
    publicAddress: new FormControl('', Validators.required),
    qrCode: new FormControl('', Validators.required),

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
    console.log("test", this.submission);
    this.ser.sendAddress(this.submission.publicAddress,this.submission.qrCode).subscribe(data => {
      this.form.reset();
      this.isSubmitted = true;

      setTimeout(() => {
        this.isSubmitted = false;
      }, 2000);
    });
  }

  formResultRow() {
    this.submission.publicAddress = this.form.get('publicAddress')?.value;
    this.submission.qrCode = this.form.get('qrCode')?.value;

  } 



}
