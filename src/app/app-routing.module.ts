import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth/auth.guard';

const routes: Routes = [
  {
    path: '',canActivate: [AuthGuard],
    loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule)
  },
  {
    path: 'account',
    loadChildren: () => import('./account/account.module').then(m => m.AccountModule)
  },
  {
    path: 'users',canActivate: [AuthGuard],
    loadChildren: () => import('./user/user.module').then(m => m.UserModule)
  },
  {
    path: 'providers',canActivate: [AuthGuard],
    loadChildren: () => import('./providers/providers.module').then(m => m.ProvidersModule)
  }
  ,
  {
    path: 'category',canActivate: [AuthGuard],
    loadChildren: () => import('./category/category.module').then(m => m.CategoryModule)
  }
  ,
  {
    path: 'tva',canActivate: [AuthGuard],
    loadChildren: () => import('./tva/tva.module').then(m => m.TvaModule)
  }
  ,  {
    path: 'clients',canActivate: [AuthGuard],
    loadChildren: () => import('./client/client.module').then(m => m.ClientModule)
  },
  {
    path: 'brands',canActivate: [AuthGuard],
    loadChildren: () => import('./brand/brand.module').then(m => m.BrandModule)
  },
  {
    path: 'modeles',canActivate: [AuthGuard],
    loadChildren: () => import('./modele/modele.module').then(m => m.ModeleModule)
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
