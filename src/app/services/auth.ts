import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';


@Injectable({
  providedIn: 'root',
})
export class Auth {
// URL za OAuth token
private tokenUrl = 'https://login.allhours.com/connect/token';
  constructor (private http: HttpClient){}

//dobi vse upo iz api in prebere token iz loc storage
getUsers(){
  const token = localStorage.getItem('token');

  return this.http.get<any[]>('https://api4.allhours.com/api/v1/Users', {
    headers: {
      Authorization: `Bearer ${token}` //token gre v autgarization header
    }
  });
}

//dobi vse tipe odsotnosti
getAbsenceDefinitions(){
  const token = localStorage.getItem('token');

  return this.http.get<any[]>(
    'https://api4.allhours.com/api/v1/AbsenceDefinitions',
    {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  );
}
//dobi osnostons za določen čas
getAbsences(date: string){
  const token = localStorage.getItem('token');

  return this.http.get<any[]>(
    `https://api4.allhours.com/api/v1/Absences?date=${date}`,
    {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  );
}

//doda novo odsotnos upo
addAbsence(body: any){
  const token = localStorage.getItem('token');

  return this.http.post(
    'https://api4.allhours.com/api/v1/Absences',
    body,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    }
  );
}

}


