import { Injectable, signal } from '@angular/core';
import { SubmenuItem } from '../models/submenu-item.model';

@Injectable({ providedIn: 'root' })
export class SubmenuService {
  submenuTitle = signal<string | null>(null);
  submenuItems = signal<SubmenuItem[]>([]);
  isOpen = signal(false);

  open({ title, items }: { title: string; items: SubmenuItem[] }) {
    this.submenuTitle.set(title);
    this.submenuItems.set(items);
    this.isOpen.set(true);
  }

  close() {
    this.isOpen.set(false);
  }
}
