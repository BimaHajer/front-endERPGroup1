import { Component } from '@angular/core';

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrl: './side-nav.component.css'
})
export class SideNavComponent {
  NavBars: any[] = [
    {
        "name": "Tableau de board",
        "route": "/dashboard",
        "icon": "dashboard",
        "order": 1,
        "subsNavbar": []
    },
    {
        "name": "Utilisateurs",
        "route": "users",
        "icon": "user",
        "order": 2,
        "subsNavbar": []
    }
]

}
