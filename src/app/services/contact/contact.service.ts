import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Contact } from '@models/contact';
import { CONSTANTS } from 'app/shared/constant';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  constructor(private readonly httpClient: HttpClient) {}

  public getContactList(): Observable<Contact[]> {
    return this.httpClient.get<Contact[]>(CONSTANTS.BASE_URL);
  }
}
