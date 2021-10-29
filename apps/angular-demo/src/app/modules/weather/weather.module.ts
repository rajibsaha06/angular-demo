import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WeatherComponent } from './components/weather/weather.component';
import { RouterModule } from '@angular/router';
import { MessageService } from 'primeng/api';
import { InputTextModule } from 'primeng/inputtext';
import { ToastModule } from 'primeng/toast';
import { ButtonModule } from 'primeng/button';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [WeatherComponent],
  imports: [
    CommonModule,
    ToastModule,
    InputTextModule,
    ButtonModule,
    FormsModule,
    RouterModule.forChild([
      {
        path: '',
        component: WeatherComponent,
        pathMatch: 'full',
      },
    ]),
  ],
  providers: [MessageService],
})
export class WeatherModule {}
