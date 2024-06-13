import { Component, OnInit } from '@angular/core';
import { ChartOptions, ChartType, ChartDataset } from 'chart.js';
import { NpsService } from '../nps/nps.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  pieChartData: any;
  pieChartOptions: ChartOptions = {};
  barChartData: any;
  barChartOptions: ChartOptions = {};
  responses: Array<{ score: number, reason: string }> = [];
  filteredResponses: Array<{ score: number, reason: string }> = [];

  constructor(private npsService: NpsService) {}

  ngOnInit() {
    this.responses = this.npsService.getResponses();
    this.filteredResponses = this.responses;

    const detractors = this.responses.filter(r => r.score <= 6).length;
    const passives = this.responses.filter(r => r.score == 7 || r.score == 8).length;
    const promoters = this.responses.filter(r => r.score >= 9).length;

    const totalResponses = this.responses.length;
    const detractorsPercentage = (detractors / totalResponses) * 100;
    const passivesPercentage = (passives / totalResponses) * 100;
    const promotersPercentage = (promoters / totalResponses) * 100;

    this.pieChartData = {
      labels: ['Detratores (1-6)', 'Neutros (7-8)', 'Promotores (9-10)'],
      datasets: [{
        data: [detractorsPercentage, passivesPercentage, promotersPercentage],
        backgroundColor: ['#ff6384', '#ffcd56', '#4bc0c0'],
        borderColor: ['#ff6384', '#ffcd56', '#4bc0c0'],
        borderWidth: 1
      }]
    };
    this.pieChartOptions = {
      responsive: true,
      plugins: {
        legend: {
          display: false
        }
      }
    };

    const scoresCount: { [key: number]: number } = this.responses.reduce((acc, response) => {
      acc[response.score] = (acc[response.score] || 0) + 1;
      return acc;
    }, {} as { [key: number]: number });

    const barColors = Object.keys(scoresCount).map(score => {
      if (parseInt(score) <= 6) return '#ff6384'; // Detractors
      if (parseInt(score) == 7 || parseInt(score) == 8) return '#ffcd56'; // Passives
      return '#4bc0c0'; // Promoters
    });

    this.barChartData = {
      labels: Object.keys(scoresCount),
      datasets: [{
        data: Object.values(scoresCount),
        backgroundColor: barColors,
        borderColor: barColors,
        borderWidth: 1
      }]
    };
    this.barChartOptions = {
      responsive: true,
      plugins: {
        legend: {
          display: false
        }
      },
      scales: {
        x: {
          beginAtZero: true
        },
        y: {
          beginAtZero: true,
          ticks: {
            precision: 0
          }
        }
      }
    };
  }

  onFilterChange(event: Event) {
    const filterValue = (event.target as HTMLSelectElement).value;
    switch (filterValue) {
      case 'detractors':
        this.filteredResponses = this.responses.filter(r => r.score <= 6);
        break;
      case 'passives':
        this.filteredResponses = this.responses.filter(r => r.score == 7 || r.score == 8);
        break;
      case 'promoters':
        this.filteredResponses = this.responses.filter(r => r.score >= 9);
        break;
      default:
        this.filteredResponses = this.responses;
    }
  }
}
