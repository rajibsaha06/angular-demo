import { Component, OnDestroy } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Subscription } from 'rxjs';
import { WeatherService } from '../../services/weather.service';

@Component({
  selector: 'demo-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.scss'],
})
export class WeatherComponent implements OnDestroy {
  private subscription: Subscription = new Subscription();
  data: any;
  location: string = '';

  constructor(
    private weatherService: WeatherService,
    private messageService: MessageService
  ) {}

  /**
   * Get Data
   * @param none
   * @returns void
   */
  getData(): void {
    this.subscription.add(
      this.weatherService.getData(this.location).subscribe(
        (res) => {
          if (res) {
            this.data = res;
          }
        },
        (err) => {
          this.messageService.add({
            severity: 'error',
            summary: err,
          });
        }
      )
    );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
