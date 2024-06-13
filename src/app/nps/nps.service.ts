import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NpsService {
  private npsScore: number | null = null;
  private npsReason: string | null = null;

  setScore(score: number) {
    this.npsScore = score;
  }

  setReason(reason: string) {
    this.npsReason = reason;
  }

  getNpsData() {
    return { score: this.npsScore, reason: this.npsReason };
  }

  private npsData: Array<{ score: number, reason: string }> = [];

  setResponse(score: number, reason: string) {
    this.npsData.push({ score, reason });
    localStorage.setItem('npsData', JSON.stringify(this.npsData));
  }

  getResponses() {
    const storedData = localStorage.getItem('npsData');
    return storedData ? JSON.parse(storedData) : [];
  }
}
