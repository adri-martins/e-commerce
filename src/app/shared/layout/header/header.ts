import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatToolbarModule}  from '@angular/material/toolbar';
import { RouterLink, Router } from '@angular/router';
import { UpperCasePipe } from '@angular/common';
import { inject, Injectable} from '@angular/core';
import { AuthFacade } from '../../../core/facades/auth.facade';
import { CarrinhoFacade } from '../../../core/facades/carrinho.facade';


@Component({
  selector: 'app-header',
  imports: [MatToolbarModule, MatButtonModule, MatIconModule, RouterLink, UpperCasePipe ],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header {
  nomeLoja = 'ARMinfinit'; //? nome do ecommerce

  private carrinhoFacade = inject(CarrinhoFacade);
  quantidade = this.carrinhoFacade.quantidadeCarrinho;
  private authFacade = inject(AuthFacade);

  usuarioLogado = this.authFacade.usuarioLogado;
  usuarioAtual = this.authFacade.usuarioAtual;

  private router = inject(Router);

  sair(){
    this.authFacade.sair();
    this.router.navigateByUrl('/login');
  }
  

}