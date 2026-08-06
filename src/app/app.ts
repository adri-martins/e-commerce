import { Component, signal } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router';
import { usuarioLogado, login, logout } from './core/auth';
import { Header } from './shared/layout/header/header';
@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Header],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('e-commerce');
  
  usuarioLogado = usuarioLogado;
  login = login;
  logout = logout;
}
//apaguei uma palavra (fix)