import { Component } from '@angular/core';
import {UpperCasePipe, CurrencyPipe} from '@angular/common';
import { PrecoFormatadoPipe } from '../../pipes/preco-formatado-pipe';

@Component({
  selector: 'app-produto',
  imports: [UpperCasePipe, PrecoFormatadoPipe],
  templateUrl: './produto.html',
  styleUrl: './produto.css',
})
export class Produto {
  //produto = 'Notebook';
  //preco = 2500;
  //mostrarPreco = true;
  //mostrarProduto = false;
 produtos = [
  {produto:'Monitor',preco: 1000},
  {produto: 'Teclado',preco: 600},
  {produto:'Gabinete',preco: 1200},
  {produto:'Mouse',preco: 350},
  {produto:'Fone',preco: 650}
 ];
}