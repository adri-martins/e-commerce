import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule} from '@angular/material/toolbar';
import { MatIconModule} from '@angular/material/icon';
import { Router, RouterLink } from '@angular/router';
import { inject } from '@angular/core';
import { CarrinhoService } from '../../../core/services/carrinho.service';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-header',
  imports: [MatButtonModule, MatToolbarModule, MatIconModule, RouterLink],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header {
  nomeLoja = 'ARMInfinit'; //nome do e-commerce

  private CarrinhoService = inject(CarrinhoService);
  private authService = inject(AuthService);
  private router = inject(Router)
  usuarioLogado = this.authService.usuarioLogado;
  usuarioAtual = this.authService.usurioAtual;
  quantidade = this.CarrinhoService.quantidadeItens;
 

sair(){
  this.authService.logout();
  this.router.navigateByUrl('/login');
}
}
