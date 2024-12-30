import { Component, EventEmitter, Output, signal } from '@angular/core';
import { SidebarComponent } from "../sidebar/sidebar.component";

@Component({
  selector: 'app-products-layout',
  imports: [SidebarComponent],
  templateUrl: './products-layout.component.html',
})
export class ProductsLayoutComponent {
  @Output() searchTermChange: EventEmitter<string> = new EventEmitter<string>();

  /**
   * Maneja el evento de cambio de entrada de búsqueda.
   *
   * Este método se activa cuando el usuario escribe en el campo de entrada de búsqueda.
   * Extrae el valor de entrada y lo emite a través del emisor de eventos `searchTermChange`.
   *
   * @param event - El evento de cambio de entrada.
   */
  onSearchChange(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    const value = inputElement?.value ?? '';
    this.searchTermChange.emit(value);
  }

  preventFormSubmit(event: Event) {
    event.preventDefault();
  }
}
