import { Component, Input, Output, EventEmitter, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormControl } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatAutocompleteModule, MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatOptionModule } from '@angular/material/core';
import { Observable, startWith, map } from 'rxjs';
import { TranslocoModule } from '@ngneat/transloco';

type Option = { id: number; label: string };

@Component({
  selector: 'app-autocomplete-select',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatAutocompleteModule,
    MatOptionModule,
    TranslocoModule
  ],
  templateUrl: './autocomplete-select.component.html'
})
export class AutocompleteSelectComponent implements OnInit, OnChanges {
  @Input() options: Option[] = [];
  @Input() placeholder = '';
  @Input() initialId: number | null = null;

  @Input() control?: FormControl<number | string | null>;

  @Output() selectedId = new EventEmitter<number | null>();

  private internalControl = new FormControl<number | string | null>(null);
  get inputControl(): FormControl<number | string | null> {
    return this.control ?? this.internalControl;
  }

  filteredOptions$!: Observable<Option[]>;

  ngOnInit(): void {
    this.setupFilter();
    if (this.initialId != null && !this.control) {
      this.inputControl.setValue(this.initialId, { emitEvent: false });
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['control'] && !changes['control'].firstChange) {
      this.setupFilter();
    }
  }

  private setupFilter(): void {
    const ctrl = this.inputControl;
    this.filteredOptions$ = ctrl.valueChanges.pipe(
      startWith(ctrl.value ?? ''),
      map(value => {
        const term = typeof value === 'string'
          ? value
          : this.options.find(o => o.id === value)?.label ?? '';
        const q = term.toLowerCase().trim();
        return q
          ? this.options.filter(o => o.label.toLowerCase().includes(q))
          : this.options.slice();
      })
    );
  }

  displayFn = (id: number | null): string =>
    this.options.find(o => o.id === id)?.label ?? '';

  onOptionSelected(event: MatAutocompleteSelectedEvent): void {
    this.selectedId.emit(event.option.value ?? null);
  }
}
