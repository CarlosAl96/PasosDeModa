import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-filter-accordion',
  templateUrl: './filter-accordion.component.html',
  styleUrls: ['./filter-accordion.component.scss'],
})
export class FilterAccordionComponent implements OnInit {
  @Output() handleSelectedGender = new EventEmitter<string[]>();
  @Output() handleSelectedSortType = new EventEmitter<string>();

  sortBy: string = '';
  gender: string = '';
  size: string = '';
  selectedGender: string[] = [];

  sizes: string[] = [
    'H 5 / M 6.5',
    'H 5.5 / M 7',
    'H 6 / M 7.5',
    'H 6.5 / M 8',
    'H 7 / M 8.5',
    'H 7.5 / M 9',
    'H 8 / M 9.5',
    'H 8.5 / M 10',
    'H 9 / M 10.5',
    'H 9.5 / M 11',
    'H 10 / M 12.5',
    'H 10.5 / M 13',
    'H 11 / M 13.5',
  ];

  ngOnInit(): void {}

  handleGender(): void {
    this.handleSelectedGender.emit(this.selectedGender);
  }

  handleSort(): void {
    this.handleSelectedSortType.emit(this.sortBy);
  }
}
