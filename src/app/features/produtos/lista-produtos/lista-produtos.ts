import { Component, signal, Signal, } from '@angular/core';
import { Produto } from '../produto/produto';
import { computed } from '@angular/core';
import { compileHmrUpdateCallback } from '@angular/compiler';
import { PrecoFormatadoPipe } from '../../../shared/pipes/preco-formatado-pipe';
import { effect } from '@angular/core';
import e from 'express';
import { UpperCasePipe } from '@angular/common';
import { produtosService } from '../produto/produto.service';
import { inject } from '@angular/core';

@Component({
  selector: 'app-lista-produtos',
  imports: [Produto, PrecoFormatadoPipe, UpperCasePipe],
  templateUrl: './lista-produtos.html',
  styleUrl: './lista-produtos.css',
})
export class ListaProdutos {
  //!remover a lista de produtos, dados carregados via API fakestoreapi
  produtos = signal<{ nome: string; preco: number }[]>([]);
// ? criar estado de carregamneto,
// ** true: requisição em andamento, exibir indicador no template
//! false: esconder indicador e exibir a 

  carregando = signal(true);

  //! criar o método para a requisição dos produtos
  carregarProdutos(){
      this.carregando.set(true);

      this.produtosService.buscarProdutos().subscribe({
        next: (dados) => {
          const produtos = this.produtosService.transformarProdutos(dados);
          this.produtos.set(produtos);
          this.carregando.set(false);
        },
        error: (erro) => {
          console.error('Erro ao carregar os Produtos:, ', erro);
          this.carregando.set(false);
        },
      });
    }
  
  exibirProduto (nome: string){
    console.log ('Produto Selecionado: ', nome);
    this.produtoSelecionado.set(nome);
  }

  adicionarProduto(){
    this.produtos.update(listaAtual => [
      ...listaAtual, {nome:'processador Intel core i5 ', preco:646}
    ]);
  }
  totalprodutos = computed(() => this.produtos().length);
  valorTotal = computed(() => { return this.produtos().reduce((total, item)=> total + item.preco,0)});
  

  substituirProdutos (){

    this.produtos.set([
      {nome: 'Teclado', preco: 40},
      {nome: 'mouse', preco: 10},
      {nome: 'Monitor', preco: 100},
      {nome: 'Destop', preco: 500},
      {nome: 'Headset', preco: 25}
    ]);
}

  //! injetar httpClient dentro de constructor, restruturar constructor!!!
  constructor(){ 

    //! carregar a API
    this.carregarProdutos();

    //! effect continuam iguais
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
  //metodo http (api) foi modificado para (produtosService)
  produtoSelecionado = signal<string |null> (null);
  carrinho = signal <{ nome: string; preco: number }[]>([]);
  adicionarAocarrinho(produto:{nome:string; preco: number}){
    this.carrinho.update(listaAtual =>[
      ...listaAtual,produto])};
  
      quantidadeCarrinho = computed(() => this.carrinho().length);
      
      totalCarrinho = computed(()=> {
        return this.carrinho().reduce((total, item) =>
      total + item.preco,0);
      });
  // inject
  private produtosService = inject(produtosService);
    }

//git commit -m "feat(produtos.ts): adicionar effects para atualizar o título da página,atualiza componentes e monitorar alterações"