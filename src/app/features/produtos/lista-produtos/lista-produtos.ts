import { Component, effect, signal } from '@angular/core';
import { Produto } from '../produto/produto';
import { computed } from '@angular/core';
import { PrecoFormatadoPipe } from '../../../shared/pipes/preco-formatado-pipe';
import { UpperCasePipe } from '@angular/common';
import { produtosService } from '../../../core/services/produto.service';
import { inject } from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import { CarrinhoFacade } from '../../../core/facades/carrinho.facade';

@Component({
  selector: 'app-lista-produtos',
  imports: [Produto, PrecoFormatadoPipe, UpperCasePipe, MatButtonModule, MatCardModule],
  templateUrl: './lista-produtos.html',
  styleUrl: './lista-produtos.css',
})
export class ListaProdutos {

  //!remover a lista de produtos, dados carregados via API Fakestoreapi
 produtos = signal < { nome: string; preco: number } []> ([]);
 //? criar estado de carregamento, 
 // ** true: requisição em andamento, exibir indicador no template
 //! false: esconder indicador e exibir lista de produtos 
 carregando = signal(true);

 erro = signal <string | null> (null)

//?============= MÉTODO HTTP (API) FOI MODIFICADO PARA (ProdutoService) =================

//! criar o método para a requisição dos produtos
carregarProdutos(){

  this.carregando.set(true);//! Ativa Loading
  this.erro.set(null)//? Limpa o erro anterior

  this.produtoService.buscarProdutos().subscribe({
        next: (dados) => {
          const produtos = this.produtoService.transformarProdutos(dados);
          this.produtos.set(produtos);
          this.carregando.set(false);
        },
        error: (erro) => {
          console.error('Erro ao carregar os Produtos: ', erro);
          this.erro.set('Erro ao carregar Produtos. Verifique sua conexão e tente novamente.');
          this.carregando.set(false);
        },
  });
}

//? ================= MÉTODOS EXISTENTES Ñ ALTERAR =====================

  exibirProduto(nome: string) {
    //console.log('Produto selecionado: ', nome);
    this.produtoSelecionado.set(nome);
  }

  adicionarProduto() { 
    this.produtos.update((listaAtual) => [
      ...listaAtual, { nome: 'Processador Core I5 14550FS', preco: 2500.00 },
    ]);
  }
  totalProdutos = computed(() => this.produtos().length);

  valorTotal = computed(() => {
    return this.produtos().reduce
    ((total, item) => total + item.preco, 0);
  });
substituirProduto() {
    this.produtos.set([
      {nome: 'Teclado', preco: 40.00},
       {nome: 'Mouse', preco: 10.00},
        {nome: 'Monitor', preco: 100.00},
         {nome: 'Desktop', preco: 500.00},
          {nome: 'Headset', preco: 25.00 },
    ]);
  }

  //! injetar httpClient dentro de constructor, reestruturar constructor!!!
  constructor(){

    //! Carregar a API
    this.carregarProdutos();

    //! effects continuam iguais
  effect(() => {
    console.log('Lista de Produtos Alterados: ', this.produtos());

  });
  effect(() =>{
    console.log('Valor Total Atualizados: ', this.valorTotal());

  });
  effect(() => {
    if (typeof document !== 'undefined') {
      document.title = `(${this.totalProdutos()}) Minha Loja`;

    }
  });
 }
 
 produtoSelecionado = signal <string | null > (null);
 
 adicionarAoCarrinho(produto: {nome: string; preco: number}){
    this.carrinhoFacade.adiconarProdutoCarrinho(produto);
  }

//? ================ INJECT ====================
private produtoService = inject (produtosService);
public carrinhoFacade = inject (CarrinhoFacade);

quantidadeCarrinho = this.carrinhoFacade.quantidadeCarrinho;
totalCarrinho = this.carrinhoFacade.totalCarrinho;
}
       