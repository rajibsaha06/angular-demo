import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Subscription } from 'rxjs';
import { Students } from '../../models/dashboard.interface';
import { DashboardService } from '../../services/dashboard.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'demo-crud',
  templateUrl: './crud.component.html',
  styleUrls: ['./crud.component.scss'],
})
export class CrudComponent implements OnInit {
  studentForm: FormGroup;
  data: Students;
  private subscription: Subscription = new Subscription();

  constructor(
    private ref: DynamicDialogRef,
    private dynamicDialogConfig: DynamicDialogConfig,
    private fb: FormBuilder,
    private dashboardService: DashboardService,
    private messageService: MessageService
  ) {
    this.data = this.dynamicDialogConfig?.data;
  }

  ngOnInit(): void {
    this.studentForm = this.setUpForm(this.data);
  }

  /**
   * Set Up Form
   * @param data Students
   * @returns FormGroup.
   */
  private setUpForm(data: Students = null): FormGroup {
    return this.fb.group({
      id: [data?.id],
      name: [data?.name || '', [Validators.required]],
      class: [data?.class || '', [Validators.required]],
      age: [data?.age || 0, [Validators.required]],
      address: [data?.address || '', [Validators.required]],
      city: [data?.city || '', [Validators.required]],
      phone: [data?.phone || '', [Validators.required]],
      country: [data?.country || '', [Validators.required]],
    });
  }

  /**
   * Check Form has required
   * @param field string
   * @returns void
   */
  checkFieldIsRequiredError(field: string): boolean {
    return (
      (this.studentForm.get(field)?.hasError('required') ||
        this.studentForm.get(field)?.hasError('pattern')) &&
      this.studentForm.get(field)?.touched
    );
  }

  /**
   * Submit data
   * @param none
   * @returns void
   */
  onSubmit(): void {
    this.studentForm.markAllAsTouched();
    if (this.studentForm.valid) {
      this.subscription.add(
        this.dashboardService.setStudent(this.studentForm.value).subscribe(
          (data) => {
            if (data?.id) {
              this.getToaster('success', 'Saved Successfully');
            } else {
              this.getToaster('error', 'Error');
            }
            this.ref.close();
          },
          (err) => {
            this.getToaster('error', err);
            this.ref.close();
          }
        )
      );
    }
  }

  getToaster(severity: string, msg: string) {
    this.messageService.add({
      severity: severity,
      summary: msg,
    });
  }
}
