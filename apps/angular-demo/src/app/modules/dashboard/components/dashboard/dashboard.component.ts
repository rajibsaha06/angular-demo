import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, of, Subscription } from 'rxjs';
import { catchError, finalize } from 'rxjs/operators';
import { Students } from '../../models/dashboard.interface';
import { DashboardService } from '../../services/dashboard.service';
import { DialogService } from 'primeng/dynamicdialog';
import { CrudComponent } from '../crud/crud.component';

@Component({
  selector: 'demo-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  providers: [DialogService],
})
export class DashboardComponent implements OnInit, OnDestroy {
  students$: Observable<Students[]> | undefined;
  loader: boolean = false;
  private subscription: Subscription = new Subscription();

  constructor(
    private dashboardService: DashboardService,
    public dialogService: DialogService
  ) {}

  ngOnInit(): void {
    this.getStudents();
  }

  /**
   * Get Students
   * @param none
   * @returns Students[].
   */
  private getStudents(): void {
    this.loader = true;
    this.students$ = this.dashboardService.getStudents().pipe(
      finalize(() => (this.loader = false)),
      catchError((err: any) => of([]))
    );
  }

  /**
   * Open dialog
   * @param item Students
   * @returns void
   */
  openDialog(item: Students): void {
    const ref = this.dialogService.open(CrudComponent, {
      data: item,
      width: '80%',
      header: 'Edit',
      contentStyle: { 'overflow-y': 'auto', 'overflow-x': 'hidden' },
      baseZIndex: 10000,
    });

    this.subscription.add(
      ref.onClose.subscribe((res) => {
        this.getStudents();
      })
    );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
