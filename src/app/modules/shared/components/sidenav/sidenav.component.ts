import { MediaMatcher } from '@angular/cdk/layout';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent implements OnInit {

  mobileQuery: MediaQueryList;

  menuNav = [
    {name: "Home", route: "home", icon: "home"},
    {name: "Animal", route: "animal", icon: "pets"},
    {name: "Adoptante", route: "adoptante", icon: "person"},
    {name: "Encargado", route: "Encargado", icon: "assignment_ind"},
    {name: "Registrar Solicitud", route: "Registrar Solicitud", icon: "description"}
  ]

  constructor(media: MediaMatcher) { 
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
  }

  ngOnInit(): void {
  }

}
