import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { StoreData } from './models/store.interface';
import { distinctUntilChanged, map, skipWhile, take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class SharedService {
  private subject = new BehaviorSubject<StoreData>({});
  private data$: Observable<StoreData> = this.subject.asObservable();

  get data(): StoreData {
    return this.subject.getValue();
  }

  constructor() {}

  /**
   * Get Store data
   * @param key string
   * @param value any
   * @returns Observable<any>.
   */
  getData(key: string, value: any = null): Observable<any> {
    if (value && !this.data?.key) {
      this.updateStore(key, value);
    }

    return this.data$.pipe(
      map((value) => value[key]),
      skipWhile((value) => value === undefined),
      distinctUntilChanged()
    );
  }

  /**
   * update store
   * @param key string
   * @param value any
   * @returns void
   */
  updateStore(key: string, value: any): void {
    if (value instanceof Observable) {
      value.pipe(take(1)).subscribe((response) => {
        this.setData(key, response);
        this.subject.next(this.data);
      });
    } else {
      this.setData(key, value);
      this.subject.next(this.data);
    }
  }

  /**
   * set data store
   * @param key string
   * @param value any
   * @returns void
   */
  private setData(key: string, value: any): void {
    let data = this.data;
    data[key] = value;
  }

  /**
   * update grid row
   * @param key string
   * @param value any
   * @returns void
   */
  updateRowStore(key: string, value: any): void {
    if (value instanceof Observable) {
      value.pipe(take(1)).subscribe((response) => {
        this.dataFilter(key, response);
        this.subject.next(this.data);
      });
    } else {
      this.dataFilter(key, value);
      this.subject.next(this.data);
    }
  }

  /**
   * filter store data
   * @param key string
   * @param value any
   * @returns void
   */
  private dataFilter(key: string, value: any): void {
    let data = this.data;
    data[key] = data[key].map((res) => {
      if (res?.id === value?.id) {
        return value;
      } else {
        return res;
      }
    });
  }
}
