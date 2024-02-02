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
  HostListener,
} from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { DataGridColumnDirective } from './datagrid.column-def.directive';

@Directive({
  selector: '[datagrid]',
})
export class DatagridDirective<T> implements AfterContentInit, OnDestroy {
  private readonly DEFAULT_CSS = {
    table: 'min-w-full divide-y divide-gray-300',
    th: 'px-3 py-3.5 text-left text-sm font-semibold text-gray-900',
    thFirst:
      'py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6 lg:pl-8',
    tbody: 'divide-y divide-gray-200',
    td: 'whitespace-nowrap px-3 py-4 text-sm text-gray-500',
    tdFirst:
      'whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6 lg:pl-8',
    tdLast:
      'relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-0',
  };
  private readonly TABLE_TAG_NAME = 'table';

  private _data: T[] = [];
  private _dataSubscription!: Subscription | null;
  private _ready = false;
  private _columns: DataGridColumnDirective[] = [];

  private get isHostElementTable(): boolean {
    return this._container.nativeElement.tagName === 'TABLE';
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
    private _container: ElementRef,
    private _renderer: Renderer2,
    private readonly _viewContainer: ViewContainerRef
  ) {
    // Intentionally blank
  }

  ngAfterContentInit(): void {
    this._columns = this.columns.toArray();
    this._ready = true;
    this.renderTable();
    this.adjustTableHeight();
    this.ready.emit();
  }

  ngOnDestroy(): void {
    this.clearDataSubscription();
  }

  @HostListener('window:resize')
  onWindowResize() {
    this.adjustTableHeight();
  }

  private addDataRows(tbody: HTMLTableSectionElement) {
    const keys = Object.keys(this._data[0] as object);
    const columns = this._columns;

    // Render data rows
    this._data.forEach(item => {
      const row = this._renderer.createElement('tr');
      keys.forEach((key, idx) => {
        let rowCell: HTMLTableCellElement;
        const colDef = columns.find(def => def.columnDef === key);
        if (colDef?.cellTemplate) {
          // Render cellDef template including the <td> element
          const view = this._viewContainer.createEmbeddedView(
            colDef.cellTemplate,
            { $implicit: item }
          );
          const rootNode = view.rootNodes[0] as HTMLElement;
          if (rootNode.tagName !== 'TD') {
            rowCell = rootNode as HTMLTableCellElement;
          } else {
            rowCell = this._renderer.createElement('td');
            this._renderer.appendChild(rowCell, rootNode);
          }
        } else {
          // Basic <td> element for fallback
          rowCell = this._renderer.createElement('td');
          const value = item[key as keyof T] as string;
          this._renderer.appendChild(rowCell, this._renderer.createText(value));
        }
        if (rowCell.classList.length === 0) {
          const css =
            idx === 0 ? this.DEFAULT_CSS.tdFirst : this.DEFAULT_CSS.td;
          rowCell.classList.add(...css.split(' '));
        }
        this._renderer.appendChild(row, rowCell);
      });
      this._renderer.appendChild(tbody, row);
    });
  }

  private adjustTableHeight(): void {
    // Timeout to ensure calculation happens after DOM has been updated
    setTimeout(() => {
      console.log('resizing');
      const parentHeight =
        this._container.nativeElement.parentElement.clientHeight;
      const tableHeight = this._container.nativeElement.clientHeight;

      // Calculate the desired height. Customize this logic as necessary.
      const desiredHeight = parentHeight; // Example: You might subtract header/footer heights if known.

      if (tableHeight > parentHeight) {
        this._renderer.setStyle(
          this._container.nativeElement,
          'height',
          `${desiredHeight}px`
        );
        this._renderer.setStyle(
          this._container.nativeElement,
          'overflow',
          'auto'
        );
      } else {
        // If the content is less than the parent height, you might want to reset/customize the style
        this._renderer.removeStyle(this._container.nativeElement, 'height');
        this._renderer.removeStyle(this._container.nativeElement, 'overflow');
      }
    });
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

    const table: HTMLTableElement = this.isHostElementTable
      ? this._container.nativeElement
      : this._renderer.createElement(this.TABLE_TAG_NAME);

    this.initializeTable(table);
    this.initializeTableHeading(table);
    this.initializeTableBody(table);

    if (!this.isHostElementTable) {
      this._renderer.appendChild(this._container.nativeElement, table);
    }
  }

  private initializeTable(table: HTMLTableElement) {
    this._renderer.setProperty(table, 'innerHTML', '');
    if (table.classList.length === 0) {
      table.classList.add(...this.DEFAULT_CSS.table.split(' '));
    }
  }

  private initializeTableBody(table: HTMLTableElement) {
    const tbody = this._renderer.createElement('tbody');
    this.addDataRows(tbody);
    this._renderer.appendChild(table, tbody);
  }

  private initializeTableHeading(table: HTMLTableElement) {
    const thead = this._renderer.createElement('thead');

    if (this._data?.length > 0) {
      const keys = Object.keys(this._data[0] as object);
      const headerRow = this._renderer.createElement('tr');
      keys.forEach((key, idx) => {
        const columnHeader = this.initializeColumnHeader(key, idx);
        this._renderer.appendChild(headerRow, columnHeader);
      });
      this._renderer.appendChild(thead, headerRow);
    }

    this._renderer.appendChild(table, thead);
  }

  private initializeColumnHeader(
    key: string,
    idx: number
  ): HTMLTableCellElement {
    const columns = this._columns;
    const column = columns.find(def => def.columnDef === key);
    let columnHeader: HTMLTableCellElement;
    if (column?.headerTemplate) {
      // Render colHeader template
      const view = column.headerTemplate.createEmbeddedView(null);
      const rootNode = view.rootNodes[0] as HTMLElement;
      if (rootNode.tagName !== 'TH') {
        columnHeader = this._renderer.createElement(
          'th'
        ) as HTMLTableCellElement;
        this._renderer.appendChild(columnHeader, rootNode);
      } else {
        columnHeader = rootNode as HTMLTableCellElement;
      }
    } else {
      // Basic <th> element
      columnHeader = this._renderer.createElement('th');
      this._renderer.appendChild(columnHeader, this._renderer.createText(key));
    }
    if (columnHeader.classList.length === 0) {
      const css = idx === 0 ? this.DEFAULT_CSS.thFirst : this.DEFAULT_CSS.th;
      columnHeader.classList.add(...css.split(' '));
    }
    return columnHeader;
  }
}
