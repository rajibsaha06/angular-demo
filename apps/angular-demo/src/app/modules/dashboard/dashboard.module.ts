import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GridComponent } from './components/grid/grid.component';
import { CrudComponent } from './components/crud/crud.component';
import { RouterModule } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { TableModule } from 'primeng/table';
import { InputTextModule } from 'primeng/inputtext';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MessageService } from 'primeng/api';

@NgModule({
  declarations: [GridComponent, CrudComponent, DashboardComponent],
  imports: [
    CommonModule,
    TableModule,
    InputTextModule,
    DialogModule,
    FormsModule,
    ReactiveFormsModule,
    ButtonModule,
    ToastModule,
    RouterModule.forChild([
      {
        path: '',
        component: DashboardComponent,
        pathMatch: 'full',
      },
    ]),
  ],
  providers: [MessageService],
  entryComponents: [CrudComponent],
})
export class DashboardModule {}
