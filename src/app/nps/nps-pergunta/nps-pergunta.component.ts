import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NpsService } from '../nps.service';

@Component({
  selector: 'app-nps-pergunta',
  templateUrl: './nps-pergunta.component.html',
  styleUrls: ['./nps-pergunta.component.css']

})
export class NpsPerguntaComponent {
  selectedScore: number | null = null;

  constructor(private npsService: NpsService, private router: Router) {}

  selectScore(score: number) {
    this.selectedScore = score;
    this.npsService.setScore(score);
  }

  next() {
    if (this.selectedScore !== null) {
      this.router.navigate(['/nps-motivacao']);
    }
  }
}
