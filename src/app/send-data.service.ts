import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { FormInterface } from './main-page/form-interface';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class SendDataService {
  send_address_API = "http://localhost:8000/api/send_address/"; 

  constructor(private http: HttpClient) { }


  sendAddress(address: any, qrCode: any): Observable<FormInterface>{
    return this.http.post<FormInterface>(this.send_address_API, {'publicAddress': address, 'qrCode': qrCode});
  }




}
