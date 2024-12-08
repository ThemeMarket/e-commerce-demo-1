import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from '../shared/components/navbar/navbar.component';
import { FooterComponent } from '../shared/components/footer/footer.component';
import { initFlowbite } from 'flowbite';

@Component({
  selector: 'app-home',
  imports: [NavbarComponent, FooterComponent],
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit {
  ngOnInit(): void {
    initFlowbite();
  }
}
