import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { BaseLayoutComponent } from "../shared/components/base-layout/base-layout.component";

@Component({
  selector: 'app-products',
  imports: [BaseLayoutComponent],
  templateUrl: './products.component.html',
})
export class ProductsComponent implements OnInit {
  private readonly route = inject(ActivatedRoute);
  category: string | null = null;

  ngOnInit(): void {
    this.route.queryParamMap.subscribe({
      next: (params: ParamMap) => {
        this.category = params.get('category');
      },
    });
  }
}
