import {inject, Injectable, signal} from '@angular/core';
import {sidenavItems} from './sidenav-items';
import {AuthService} from '../../auth/auth.service';

export type SidenavItem = {
  name: string,
  label: string,
  route: string,
  icon?: string,
}


@Injectable({
  providedIn: "root"
})
export class SidenavService {
  opened = signal(true)
  items = signal<SidenavItem[]>(sidenavItems)


  toggle(value?: boolean): void {
    this.opened.set(value !== undefined ? value : !this.opened())
  }

  login(){

  }
}
