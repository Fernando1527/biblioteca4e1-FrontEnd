import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LibrosComponent } from './libros/libros.component';

const routes: Routes = [
  { path: 'libros', component: LibrosComponent },
  { path: '', redirectTo: 'libros', pathMatch: 'full' }, // Redireccionar a la página de administración por defecto
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
