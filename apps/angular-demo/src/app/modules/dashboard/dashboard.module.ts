import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GridComponent } from './components/grid/grid.component';
import { CrudComponent } from './components/crud/crud.component';
import { RouterModule } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { TableModule } from 'primeng/table';
import { InputTextModule } from 'primeng/inputtext';

@NgModule({
  declarations: [GridComponent, CrudComponent, DashboardComponent],
  imports: [
    CommonModule,
    TableModule,
    InputTextModule,
    RouterModule.forChild([
      {
        path: '',
        component: DashboardComponent,
        pathMatch: 'full',
      },
    ]),
  ],
})
export class DashboardModule {}
