import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from "@angular/router";

import { MenuItem } from '../../interfaces/menu-item.intercace';
import { reactiveRoutes } from './../../../reactive/reactive.route';

const reactiveRoute = reactiveRoutes[0].children ?? [];

@Component({
  selector: 'app-side-menu',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './side-menu.component.html',
})
export class SideMenuComponent {
  reactiveMenu: MenuItem[] = reactiveRoute
    .filter((item) => item.path !== '**')
    .map(item => ({
      route: `reactive/${item.path}`,
      title: `${item.title}`,
    }));

  authMenu: MenuItem[] = [
    {
      title: 'Register',
      route: 'auth/sign-up',
    },
  ];

  countryMenu: MenuItem[] = [
    {
      title: 'Countries',
      route: './country'
    }
  ]
}
