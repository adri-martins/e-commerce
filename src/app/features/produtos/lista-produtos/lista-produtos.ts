import { Component, signal, Signal, } from '@angular/core';
import { Produto } from '../produto/produto';
import { computed } from '@angular/core';
import { compileHmrUpdateCallback } from '@angular/compiler';
import { PrecoFormatadoPipe } from '../../../shared/pipes/preco-formatado-pipe';

@Component({
  selector: 'app-lista-produtos',
  imports: [Produto, PrecoFormatadoPipe],
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
  totalprodutos = computed(() => this.produtos().length);
  valorTotal = computed(() => { return this.produtos().reduce((total, item)=> total + item.preco,0)});

  substituirProdutos (){

    this.produtos.set([
      {nome: 'Arroz Fazenda', preco: 300},
    ]);
  }
  }

//adicinou import (produto), e adiconou função totalprodutos, valor total