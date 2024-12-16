import { Component, input, OnInit } from '@angular/core';
import { BaseLayoutComponent } from '../shared/components/base-layout/base-layout.component';
import { initFlowbite } from 'flowbite';

@Component({
  selector: 'app-products',
  imports: [BaseLayoutComponent],
  templateUrl: './products.component.html',
})
export class ProductsComponent implements OnInit {
  category = input<string>('');

  ngOnInit(): void {
    initFlowbite();
  }
}
