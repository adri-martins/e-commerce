import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { CarrinhoService } from '../../../core/services/carrinho.service';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-header',
  imports: [MatButtonModule, MatToolbarModule, MatIconModule, RouterLink,],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header {
  nomeLoja = 'ARM Infinity'; //NOME DO e-commerce

  private CarrinhoService = inject(CarrinhoService);
  quantidade = this.CarrinhoService.quantidadeItens;
  private authService = inject(AuthService);
  usuarioLogado = this.authService.usuarioLogado;
  usuarioAtual = this.authService.usuarioAtual;


  sair(){
    this.authService.logout();
  }
}
