import { Component, ViewChild } from '@angular/core';
import { MatDrawer } from '@angular/material/sidenav';
import { Router } from '@angular/router';
import { TestComponent } from '../test/test.component';
import { RouterModule, Routes } from '@angular/router';
/* src/styles.css */

@Component({
  selector: 'app-slide-bar',
  templateUrl: './slide-bar.component.html',
  styleUrls: ['./slide-bar.component.css']
})



export class SlideBarComponent {
  showFiller = true;


  constructor(private router: Router) {}

  showContent(contentNumber: number): void {
    // Determine the route based on the selected button
    let route: string;

    switch (contentNumber) {
      case 1:
        route = 'admin';
        break;
      case 2:
        route = 'about-us';
        break;
      case 3:
        route = 'test';
        break;
      case 4:
        route = 'content4';
        break;
      default:
        route = '';
    }

    // Navigate to the selected content
    this.router.navigate([route]);
  }
  


}
