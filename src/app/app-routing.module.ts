import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NpsPerguntaComponent } from './nps/nps-pergunta/nps-pergunta.component';
import { NpsMotivacaoComponent } from './nps/nps-motivacao/nps-motivacao.component';
import { AgradecimentoComponent } from './nps/agradecimento/agradecimento.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AuthGuard } from './auth/auth.guard';

const routes: Routes = [
  { path: '', component: NpsPerguntaComponent },
  { path: 'nps-motivacao', component: NpsMotivacaoComponent },
  { path: 'agradecimento', component: AgradecimentoComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
