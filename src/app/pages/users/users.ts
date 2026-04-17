import { Component, OnInit } from '@angular/core';
import { Auth } from '../../services/auth';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { finalize } from 'rxjs/operators';


@Component({
  selector: 'app-users',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './users.html',
})
export class Users implements OnInit {

  users: any[] = []; //seznam uporabnikov
  definitions: any[] = []; //seznam definicij
  showAll = false;
  absenceForms: { [key: string]: any } = {}; //shrani forme za oddajanje odsotnosti

  constructor(private auth: Auth, private http: HttpClient) {}

  //dobi vse upo. in vse tipe odsotnosti
  ngOnInit() {
  this.auth.getUsers().subscribe((res: any) => {
    this.users = res;
  });

  this.auth.getAbsenceDefinitions().subscribe((res: any) => {
    this.definitions = res;
  });
}

//iskalni niz
  searchTerm='';


  //vrne filtriran seznam upo glede na vnos
  //če ni vnost, NAJ BI vrglo vn vse upo (POGLEJ MAL)
get filteredUsers() {
  const term = this.searchTerm?.toLowerCase().trim();

  if (!term) {
    return this.users;
  }

  return this.users.filter(user =>
    (user.FirstName + ' ' + user.LastName)
      .toLowerCase()
      .includes(term)
  );
  
}

  newUser = {//moodel za dodajanje novega upo.

    FirstName: '',
    LastName: '',
    Email: ''
  }

loading = false;//flag za prikaz loading stanja


//doda novega upo, preveri validacijo, post na api, pa se ga doda
addUser(){
this.loading = true;

if(!this.newUser.FirstName || !this.newUser.LastName || !this.newUser.Email){
  alert('Fill all fields!');
  this.loading = false;
  return;
}

if(!this.newUser.Email.includes('@')){
  alert('Invalid email!');
  this.loading = false;
  return;
}
 

const token = localStorage.getItem('token');

const body = { //body za api
  firstName: this.newUser.FirstName,
  lastName: this.newUser.LastName,
  email: this.newUser.Email,
  userName: this.newUser.Email,
  isActive: true
};

  this.http.post(//api klic za dodajanje upo
    'https://api4.allhours.com/api/v1/Users',
    body,
    {
      headers:{
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    }
   )
  .pipe(
    finalize(() => this.loading = false) 
  )
  .subscribe({
    next: () => {
      alert('USER ADDED!');
      this.ngOnInit();

      this.newUser = { FirstName: '', LastName: '', Email: '' };
      this.loading = false;
    },
    error: (err) => {
      console.log('ERROR:', err);
      alert('Error adding user!');
      this.loading = false;
    }
  });
}


//doda odsotnost, validira, pretvori datume v pravo formo, pošlje pod na api
addAbsence(userId: string) {
  const form = this.absenceForms[userId];

  if (!form || !form.absenceDefinitionId || !form.start || !form.end) {
    alert('Fill all absence fields!');
    return;
  }

  const startDate = new Date(form.start);
  const endDate = new Date(form.end);

  if (endDate < startDate) {
    alert('End date cannot be before start date!');
    return;
  }

  //body za API (od-do finta)
  const body = {
  UserId: userId,
  AbsenceDefinitionId: form.absenceDefinitionId,
  Timestamp: new Date(form.start).toISOString(),

  PartialTimeFrom: new Date(form.start).toISOString(),
  PartialTimeTo: new Date(form.end).toISOString(),

  IsPartial: true,
  Origin: 0
};

  this.auth.addAbsence(body).subscribe({
    next: () => {
      alert('Absence added!');

      this.absenceForms[userId] = {};
    },
    error: (err) => {
      console.error('Error adding absence:', err);
      alert('Failed to add absence!');
    }
  });
}
}