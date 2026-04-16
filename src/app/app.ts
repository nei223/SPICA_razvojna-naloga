import { Component, OnInit } from '@angular/core';
import { Router, RouterOutlet, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, CommonModule],
  templateUrl: './app.html',
})
export class App implements OnInit {

  constructor(private router: Router) {}

  //ob zagonu pogleda ali so v localstorage nastavljeni client id, secret pa token
  //če ka manja te preusmeri direktno na settings
  ngOnInit() {
    const clientId = localStorage.getItem('clientId');
    const clientSecret = localStorage.getItem('clientSecret');
    const token = localStorage.getItem('token');

    if (!clientId || !clientSecret || !token) {
      this.router.navigate(['/settings']);
    }
  }
}