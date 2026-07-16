import { Component, signal, Signal } from '@angular/core';
import { Produto } from '../produto/produto';

@Component({
  selector: 'app-lista-produtos',
  imports: [Produto],
  templateUrl: './lista-produtos.html',
  styleUrl: './lista-produtos.css',
})
export class ListaProdutos {
  produtos = signal([
    {nome:'Teclado', preco: 240},
    {nome:'Mouse', preco: 20},
    {nome:'Cadeira', preco: 450},
    {nome:'Monitor', preco: 349}
  ]);
  exibirProduto (nome: string){
    console.log ('Produto Selecionado: ', nome);
  }
  adicionarProdutos(){
    this.produtos.update(listaAtual => [
      ...listaAtual, {nome:'sony playstation 5', preco:100}
    ]);
  }
}
//atualizou e estruturou o arquivo: refactor