import {Component, computed, inject, OnInit, signal} from '@angular/core';
import {RouterOutlet} from "@angular/router";
import {SidenavComponent} from "../sidenav/sidenav.component";
import {ToastComponent} from '../../shared/toast/toast/toast.component';
import {Auth} from '@angular/fire/auth';

@Component({
  selector: "app-main",
  standalone: true,
  imports: [RouterOutlet, SidenavComponent, ToastComponent],
  templateUrl: "./main.component.html",
  styleUrl: "./main.component.scss",
})
export class MainComponent implements OnInit {
  loading = true;
  private auth = inject(Auth)
  protected authenticated = signal(false)

  constructor() {
    this.auth.authStateReady().then(() => {
      console.log('Auth state ready')
      this.loading = false
      this.authenticated.set(this.auth.currentUser !== null)
    })
    this.auth.onAuthStateChanged((user) => {
      this.authenticated.set(user !== null)
    })
  }
  ngOnInit() {
  }
}

