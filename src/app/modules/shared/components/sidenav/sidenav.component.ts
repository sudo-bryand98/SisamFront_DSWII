import { MediaMatcher } from '@angular/cdk/layout';
import { Component, OnInit } from '@angular/core';
import { KeycloakService } from 'keycloak-angular';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent implements OnInit {

  mobileQuery: MediaQueryList;
  username: any;

  menuNav = [
    {name: "Home", route: "home", icon: "home"},
    {name: "Mascotas", route: "animal", icon: "pets"},
    {name: "Adoptante", route: "adoptante", icon: "person"},
    {name: "Encargado", route: "encargado", icon: "assignment_ind"},
    {name: "Registrar Solicitud", route: "solicitud", icon: "description"}
  ]

  constructor(media: MediaMatcher, private keycloakService: KeycloakService) { 
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
  }

  ngOnInit(): void {
    this.username = this.keycloakService.getUsername();
  }

  logout(){
      this.keycloakService.logout();
  }

}
