import { Component } from '@angular/core';
import { NavbarComponent } from "../shared/components/navbar/navbar.component";
import { FooterComponent } from "../shared/components/footer/footer.component";

@Component({
  selector: 'app-cart',
  imports: [NavbarComponent, FooterComponent],
  templateUrl: './cart.component.html',
})
export class CartComponent {}
