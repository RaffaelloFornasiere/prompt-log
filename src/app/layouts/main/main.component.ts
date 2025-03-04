import {Component, OnInit} from '@angular/core';
import {RouterOutlet} from "@angular/router";
import {SidenavComponent} from "../sidenav/sidenav.component";
import {ToastComponent} from '../../shared/toast/toast/toast.component';

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

