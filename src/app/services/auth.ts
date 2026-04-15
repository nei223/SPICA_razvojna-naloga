import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';


@Injectable({
  providedIn: 'root',
})
export class Auth {
private tokenUrl = 'https://login.allhours.com/connect/token';
  constructor (private http: HttpClient){}

  getToken(clientId: string, clientSecret: string){
    const body = new HttpParams()
    .set('grant_type', 'client_credentials');

    const basicAuth = btoa(`${clientId}:${clientSecret}`);

  return this.http.post<any>(this.tokenUrl, body.toString(), {
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded',
    'Authorization': `Basic ${basicAuth}`
  }
});
  }

getUsers(){
  const token = localStorage.getItem('token');

  return this.http.get<any[]>('https://api4.allhours.com/api/v1/Users', {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
}
}


