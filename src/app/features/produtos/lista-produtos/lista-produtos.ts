import { Component, signal, Signal, } from '@angular/core';
import { Produto } from '../produto/produto';
import { computed } from '@angular/core';
import { compileHmrUpdateCallback } from '@angular/compiler';
import { PrecoFormatadoPipe } from '../../../shared/pipes/preco-formatado-pipe';
import { effect } from '@angular/core';
import e from 'express';

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
    //console.log ('Produto Selecionado: ', nome);
    this.produtoSelecionado.set(nome);
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
  constructor(){
    effect(()=> {
  console.log('Lista de Produtos Alterados: ', this.produtos());
    });
    effect(() => {
      console.log('Valor total atualizado: ', this.valorTotal());
    });
    effect(()=> {
  if (typeof document !== 'undefined') {
    document.title = `(${this.totalprodutos()}) Minha Loja`;
  }
    });
  }
  produtoSelecionado = signal<string |null> (null);
  }

//git commit -m "feat(produtos.ts): adicionar effects para atualizar o título da página,atualiza componentes e monitorar alteraçõess"