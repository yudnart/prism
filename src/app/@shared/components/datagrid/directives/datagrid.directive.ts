/* eslint-disable @angular-eslint/directive-selector */
import {
  Directive,
  Input,
  ElementRef,
  Renderer2,
  ContentChildren,
  QueryList,
  AfterContentInit,
  OnDestroy,
  ViewContainerRef,
  Output,
  EventEmitter,
  Optional,
} from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { DataGridColumnDirective } from './datagrid.column-def.directive';

@Directive({
  selector: '[datagrid]',
})
export class DatagridDirective<T> implements AfterContentInit, OnDestroy {
  private _data: T[] = [];
  private _dataSubscription!: Subscription | null;
  private _ready = false;
  private _columns: DataGridColumnDirective[] = [];

  private get isHostElementTable(): boolean {
    return this._el.nativeElement.tagName === 'TABLE';
  }

  @ContentChildren(DataGridColumnDirective)
  columns!: QueryList<DataGridColumnDirective>;

  @Input() set datasource(source: T[] | Observable<T[]>) {
    this.clearDataSubscription();
    if (source instanceof Observable) {
      this._dataSubscription = source.subscribe(data => {
        this._data = data;
        this.renderTable();
      });
    } else {
      this._data = source;
      this.renderTable();
    }
  }
  @Output()
  @Optional()
  readonly ready = new EventEmitter();

  constructor(
    private _el: ElementRef,
    private _renderer: Renderer2,
    private readonly _viewContainer: ViewContainerRef
  ) {
    // Intentionally blank
  }

  ngAfterContentInit(): void {
    this._columns = this.columns.toArray();
    this._ready = true;
    this.renderTable();
    this.ready.emit();
  }

  ngOnDestroy(): void {
    this.clearDataSubscription();
  }

  private clearDataSubscription(): void {
    if (this._dataSubscription && !this._dataSubscription.closed) {
      this._dataSubscription.unsubscribe();
    }
    this._dataSubscription = null;
  }

  private renderTable(): void {
    if (!this._ready || !this._data.length) {
      return;
    }

    const table = this.isHostElementTable
      ? this._el.nativeElement
      : this._renderer.createElement('table');
    table.classList.add('w-full');

    // Clear existing content
    this._renderer.setProperty(table, 'innerHTML', '');

    const thead = this._renderer.createElement('thead');
    const tbody = this._renderer.createElement('tbody');
    const headerRow = this._renderer.createElement('tr');

    // Identify the keys to be used for columns
    const keys = Object.keys(this._data[0] as object);
    const columns = this._columns;
    // Render headers
    keys.forEach(key => {
      const column = columns.find(def => def.columnDef === key);
      if (column?.headerTemplate) {
        // Render colHeader template
        const view = column.headerTemplate.createEmbeddedView(null);
        view.rootNodes.forEach(node =>
          this._renderer.appendChild(headerRow, node)
        );
      } else {
        // Basic <th> element
        const th = this._renderer.createElement('th');
        this._renderer.appendChild(th, this._renderer.createText(key));
        this._renderer.appendChild(headerRow, th);
      }
    });

    this._renderer.appendChild(thead, headerRow);

    // Render data rows
    this._data.forEach(item => {
      const row = this._renderer.createElement('tr');
      keys.forEach(key => {
        const colDef = columns.find(def => def.columnDef === key);
        if (colDef?.cellTemplate) {
          // Render cellDef template including the <td> element
          const view = this._viewContainer.createEmbeddedView(
            colDef.cellTemplate,
            { $implicit: item }
          );
          view.rootNodes.forEach(node => this._renderer.appendChild(row, node));
        } else {
          // Basic <td> element for fallback
          const td = this._renderer.createElement('td');
          const value = item[key as keyof T] as string;
          this._renderer.appendChild(td, this._renderer.createText(value));
          this._renderer.appendChild(row, td);
        }
      });
      this._renderer.appendChild(tbody, row);
    });

    this._renderer.appendChild(table, thead);
    this._renderer.appendChild(table, tbody);
    if (!this.isHostElementTable) {
      this._renderer.appendChild(this._el.nativeElement, table);
    }
  }
}
