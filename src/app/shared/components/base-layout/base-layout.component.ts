import { Component } from '@angular/core';
import { FooterComponent } from "../footer/footer.component";
import { NavbarComponent } from "../navbar/navbar.component";

@Component({
  selector: 'app-base-layout',
  imports: [FooterComponent, NavbarComponent],
  templateUrl: './base-layout.component.html',
})
export class BaseLayoutComponent {}
