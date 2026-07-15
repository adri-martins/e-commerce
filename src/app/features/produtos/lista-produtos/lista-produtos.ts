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
    {nome:'Teclado', preco: 240},
    {nome:'Mouse', preco: 20},
    {nome:'Cadeira', preco: 450},
    {nome:'Monitor', preco: 349}
  ];
  exibirProduto (nome: string){
    console.log ('Produto Selecionado: ', nome);
  }
}