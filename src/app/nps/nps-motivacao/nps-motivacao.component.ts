import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NpsService } from '../nps.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-nps-motivacao',
  templateUrl: './nps-motivacao.component.html',
})
export class NpsMotivacaoComponent {
  motivacaoForm!: FormGroup;

  constructor(private fb: FormBuilder, private npsService: NpsService, private router: Router) {
    this.motivacaoForm = this.fb.group({
      reason: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  next() {
    const score = this.npsService.getNpsData().score;
    this.npsService.setResponse(score!, this.motivacaoForm.value.reason);
    this.router.navigate(['/agradecimento']);
  }
}
