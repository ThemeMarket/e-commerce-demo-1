import { Component, OnInit } from '@angular/core';
import { initFlowbite } from 'flowbite';
import { BaseLayoutComponent } from '../shared/components/base-layout/base-layout.component';

@Component({
  selector: 'app-cart',
  imports: [BaseLayoutComponent],
  templateUrl: './cart.component.html',
})
export class CartComponent implements OnInit {
  ngOnInit(): void {
    initFlowbite();
  }
}
