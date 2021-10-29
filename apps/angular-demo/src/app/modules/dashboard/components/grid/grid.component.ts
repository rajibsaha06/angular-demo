import {
  Component,
  EventEmitter,
  Input,
  Output,
  ViewChild,
} from '@angular/core';
import { Table } from 'primeng/table';
import { Students } from '../../models/dashboard.interface';

@Component({
  selector: 'demo-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.scss'],
})
export class GridComponent {
  @Input() data: Students[] = [];
  @Input() loader: boolean = false;
  rows = 6;
  rowsPerPageOptions = [6, 12, 24, 48];
  @ViewChild('studentTable') studentTable: Table | undefined;
  @Output() viewRow: EventEmitter<Students> = new EventEmitter<Students>();

  /**
   * View Row
   * @param item Students
   * @returns void
   */
  view(item: Students): void {
    this.viewRow.emit(item);
  }

  /**
   * Table Filter
   * @param $event
   * @returns void
   */
  applyFilterGlobal($event: any): void {
    this.studentTable.filterGlobal(
      ($event.target as HTMLInputElement).value,
      'contains'
    );
  }
}
