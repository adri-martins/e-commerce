import { Component } from '@angular/core';
import { Produto } from '../produto/produto';

@Component({
  selector: 'app-lista-produtos',
  imports: [Produto],
  templateUrl: './lista-produtos.html',
  styleUrl: './lista-produtos.css',
})
export class ListaProdutos {
  produtos = [
    {nome: 'Teclado', preco:49,}
    {nome: 'Mouse', preco:670},
    {nome: 'Cadeira Gamer', preco:900},
    {nome: 'Monitor', preco:450}
  ];
}