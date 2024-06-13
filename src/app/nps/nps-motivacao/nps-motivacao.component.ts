import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NpsService } from '../nps.service';

@Component({
  selector: 'app-nps-motivacao',
  templateUrl: './nps-motivacao.component.html',
})
export class NpsMotivacaoComponent {
  reason: string = '';

  constructor(private npsService: NpsService, private router: Router) {}

  next() {
    const score = this.npsService.getNpsData().score;
    this.npsService.setResponse(score!, this.reason);
    this.router.navigate(['/agradecimento']);
  }
}
