import { Component, signal } from '@angular/core';
//!import { RouterOutlet } from '@angular/router';//remove importação do RouterOutlet no momento! Não esta sendo utilizado
import { Produto } from './components/produto/produto';//Mover os componentes para ser exibido
@Component({
  selector: 'app-root',
  imports: [Produto],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('e-commerce');
}
