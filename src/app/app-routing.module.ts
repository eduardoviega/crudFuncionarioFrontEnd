import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { AddEditFuncionarioComponent } from './pages/add-edit-funcionario/add-edit-funcionario.component';

const routes: Routes = [
  { path: '', component: HomeComponent},
  { path: 'editar/:id', component: AddEditFuncionarioComponent },
  { path: 'cadastrar', component: AddEditFuncionarioComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
