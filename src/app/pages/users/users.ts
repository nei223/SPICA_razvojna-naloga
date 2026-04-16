import { Component, OnInit } from '@angular/core';
import { Auth } from '../../services/auth';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './users.html',
})
export class Users implements OnInit {

  users: any[] = [];
  definitions: any[] = [];

  absenceForms: { [key: string]: any } = {};

  constructor(private auth: Auth, private http: HttpClient) {}

  ngOnInit() {
  this.auth.getUsers().subscribe((res: any) => {
    this.users = res;
  });

  this.auth.getAbsenceDefinitions().subscribe((res: any) => {
    this.definitions = res;
  });
}



  searchTerm='';

  get filteredUsers(){
  return this.users.filter(user =>(user.FirstName + ' ' + user.LastName)
  .toLowerCase().includes(this.searchTerm.toLocaleLowerCase()));  
  }


  newUser = {
    FirstName: '',
    LastName: '',
    Email: ''
  }

  loading = false;

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

  const body = {
  firstName: this.newUser.FirstName,
  lastName: this.newUser.LastName,
  email: this.newUser.Email,
  userName: this.newUser.Email,
  isActive: true
};

  this.http.post(
    'https://api4.allhours.com/api/v1/Users',
    body,
    {
      headers:{
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    }
  ).subscribe({
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

addAbsence(userId: string) {
  const form = this.absenceForms[userId];

  if (!form || !form.absenceDefinitionId || !form.start || !form.end) {
    alert('Fill all absence fields!');
    return;
  }

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