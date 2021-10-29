import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, finalize } from 'rxjs/operators';
import { Students } from '../../models/dashboard.interface';
import { DashboardService } from '../../services/dashboard.service';

@Component({
  selector: 'demo-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  students$: Observable<Students[]> | undefined;
  loader: boolean = false;

  constructor(private dashboardService: DashboardService) {}

  ngOnInit(): void {
    this.getStudents();
  }

  /**
   * Get Students
   * @param none
   * @returns Students[].
   */
  getStudents(): void {
    this.loader = true;
    this.students$ = this.dashboardService.getStudents().pipe(
      finalize(() => (this.loader = false)),
      catchError((err: any) => of([]))
    );
  }
}
