import { Component, inject, signal } from '@angular/core';

@Component({
  selector: 'app-favoritos',
  imports: [],
  templateUrl: './favoritos.html',
  styleUrl: './favoritos.css',
})
export class Favoritos {
  favoritos = signal<string[]>([]);

  adicionarProdutos () {
    this.favoritos 
  }


}
