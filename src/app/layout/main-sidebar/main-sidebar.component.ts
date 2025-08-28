import { Component, inject, signal } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { TranslocoModule } from '@ngneat/transloco';
import { SubmenuService } from '../services/submenu.service';
import { SubmenuItem } from '../models/submenu-item.model';


@Component({
  selector: 'app-main-sidebar',
  imports: [
    CommonModule,
    RouterModule,
    MatIconModule,
    TranslocoModule
  ],
  standalone: true,
  templateUrl: './main-sidebar.component.html',
  styleUrl: './main-sidebar.component.scss'
})
export class MainSidebarComponent {



  private submenuService = inject(SubmenuService);

  openSubmenu(section: string) {
    const optionsMap: Record<string, { title: string; items: SubmenuItem[] }> = {
      projects: {
        title: 'submenu.projects.title',
        items: [
          { name: 'submenu.projects.createProject', route: '/projects/create' },
          { name: 'submenu.projects.projectList', route: '/projects/list' },
        ]
      },
      templates: {
        title: 'submenu.templates.title',
        items: [
          { name: 'submenu.templates.createTemplate', route: '/template/create' },
          { name: 'submenu.templates.templateList', route: '/templates' },
        ]
      },
      users: {
        title: 'submenu.users.title',
        items: [
          { name: 'submenu.templates.createTemplate', route: '/template/create' },
          { name: 'submenu.templates.templateList', route: '/templates' },
        ]
      }
    };

    this.submenuService.open(optionsMap[section]);
  }
}
