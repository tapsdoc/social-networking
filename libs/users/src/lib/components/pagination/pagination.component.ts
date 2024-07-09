import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'lib-pagination',
  standalone: true,
  imports: [
     CommonModule,
    RouterLink,
    RouterLinkActive
  ],
  templateUrl: './pagination.component.html',
  styleUrl: './pagination.component.css',
})
export class PaginationComponent implements OnInit {

  page = 0;
  @Input() pageSize!: number;
  @Input() totalElements!: number;
  
  ngOnInit() {
  }
}
