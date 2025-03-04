import {Component, inject, OnInit} from '@angular/core';
import {ActivatedRoute, RouterOutlet} from "@angular/router";
import {SidenavComponent} from "../sidenav/sidenav.component";
import {ToastComponent} from '../../shared/toast/toast/toast.component';
import {StoreService} from '../../features/service/store.service';

@Component({
  selector: "app-main",
  standalone: true,
  imports: [RouterOutlet, SidenavComponent, ToastComponent],
  templateUrl: "./main.component.html",
  styleUrl: "./main.component.scss",
})
export class MainComponent implements OnInit {

  ngOnInit() {
  }
}

