
import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { TranslocoModule } from '@ngneat/transloco';
import { LanguageSwitcherComponent } from '../language-switcher/language-switcher.component';
import { MatTooltipModule } from '@angular/material/tooltip';
// import { UserDetailsDTO } from 'src/app/core/models/users';
// import { User } from 'src/app/core/models/user.model';


@Component({
  selector: 'app-navbar',
  imports: [
    CommonModule,
    MatTooltipModule,
    RouterModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    TranslocoModule,
    LanguageSwitcherComponent
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent implements OnInit {

  currentUser?: null;
  currentCompany!: string;

  // constructor(private auth: AuthService) { }

  ngOnInit(): void {
    
  //   this.auth.companyName$.subscribe(name => {
  //     this.currentCompany = name ?? '';
  //   });

  //   this.auth.currentUser$.subscribe(user => {
  //     this.currentUser = user;
  //   });
  }

  isLoggedIn(): boolean {
    // return this.auth.isLoggedIn();
    return false;
  }

  logout() {
    // this.auth.logout();
  }
}
