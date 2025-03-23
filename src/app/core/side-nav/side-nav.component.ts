import { Component } from '@angular/core';
import { SharedService } from '../../shared/shared.service';

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

    ,
    {
        "name": "Fournisseurs",
        "route": "providers",
        "icon": "users",
        "order": 3,
        "subsNavbar": []
    }

    ,
    {
        "name": "Catégories",
        "route": "category",
        "icon": "folder",
        "order": 4,
        "subsNavbar": []
    }

    ,
    {
        "name": "Tva",
        "route": "tva",
        "icon": "factory",
        "order": 5,
        "subsNavbar": []
    }
    ,
    {
      "name": "Clients",
      "route": "clients",
      "icon": "users",
      "order": 6,
      "subsNavbar": []
  },
  {
    "name": "Marques",
    "route": "brands",
    "icon": "tags",
    "order": 7,
    "subsNavbar": [],
},
{
  "name": "Modeles",
  "route": "modeles",
  "icon": "form",
  "order": 8,
  "subsNavbar": [],
  "roles": ["SuperAdmin", "Admin"]
},
{
  "name": "Produits",
  "route": "products",
  "icon": "store",
  "order": 9,
  "subsNavbar": [],
"roles": ["SuperAdmin", "Admin"]}
]
  role: any;
constructor(private sharedService: SharedService) {}
  ngOnInit(): void {
    this.role = this.sharedService.getCookie('role');
  }
}
