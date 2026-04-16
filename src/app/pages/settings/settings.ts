import { Component, OnInit } from '@angular/core';
import { Auth } from '../../services/auth';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './settings.html',
  styleUrl: './settings.css',
})

export class Settings implements OnInit {
  //Shrani cliend id in secret
  clientId: string= '';
  clientSecret: string='';

  token: string = ''; //token za api klice
  error: string = ''; //za sporočilo o napaki

  //router za nav, in breanje parametrov
  constructor( private route: ActivatedRoute, private router: Router) {}



  //shrani client id in secret v local storage in pogleda preavilnost
  saveSettings() {
  localStorage.setItem('clientId', this.clientId);
  localStorage.setItem('clientSecret', this.clientSecret);

  if (
    this.clientId === 'gNa0rGEkFYcBrU8qAevzCzPZe' &&
    this.clientSecret === 'ia1QN38I0TMMX1BdZ3yKhSVswtXCzxqP5UTNpgOzlxJBvCui5z'
  ) {
    this.error = '';
    this.router.navigate(['/users']); 
  } else {
    this.error = 'Wrong client ID or client secret!';
  }
}



//prebere client id, secret in token iz loc. storage in če je err
ngOnInit() {
  this.clientId = localStorage.getItem('clientId') || '';
  this.clientSecret = localStorage.getItem('clientSecret') || '';
  this.token = localStorage.getItem('token') || '';

  this.route.queryParams.subscribe(params => {
    this.error = params['error'] || '';
  });
}


//shrani token v loc storage, da ga lah uporabijo api klici drugje
saveToken() {
  localStorage.setItem('token', this.token);
  alert('Token saved!');
}
}
