import { Component, OnInit } from '@angular/core';
import { Auth } from '../../services/auth';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-absences',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './absences.html',
  styleUrl: './absences.css',
})


export class Absences implements OnInit {

  absences: any[] = [];
  selectedDate = '';

  constructor(private auth: Auth) {}

  ngOnInit() {
    this.loadAllAbsences(); 
  }

allAbsences: any[] = [];

    loadAbsences() {
      this.auth.getAbsences('').subscribe((res: any) => {

        this.allAbsences = res;

        if (!this.selectedDate) {
          this.absences = res;
          return;
        }

        this.absences = res.filter((a: any) => {
        const d = new Date(a.PartialTimeFrom || a.Timestamp);

        const date =
          d.getFullYear() + '-' +
          String(d.getMonth() + 1).padStart(2, '0') + '-' +
          String(d.getDate()).padStart(2, '0');

        return date === this.selectedDate;
      });

        console.log('FILTERED:', this.absences);
      });
    }

  loadAllAbsences() {
    this.auth.getAbsences('').subscribe((res: any) => {
      this.absences = res;
      console.log('ALL:', res);
    });
  }
}