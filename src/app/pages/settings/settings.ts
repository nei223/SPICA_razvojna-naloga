import { Component } from '@angular/core';
import { Auth } from '../../services/auth';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './settings.html',
  styleUrl: './settings.css',
})

export class Settings {
  clientId: string= '';
  clientSecret: string='';

  saveSettings(){
    localStorage.setItem('clientId', this.clientId);
    localStorage.setItem('clientSecret', this.clientSecret);

    alert('Information has been saved.');
  }
}
