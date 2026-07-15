import { Component, Input, Output } from '@angular/core';
import {UpperCasePipe, CurrencyPipe} from '@angular/common';
import { PrecoFormatadoPipe } from '../../pipes/preco-formatado-pipe';
import { ListaProdutos } from '../../components/lista-produtos/lista-produtos';
// adcionei os components input, output 14.07

@Component({
  selector: 'app-produto',
  imports: [UpperCasePipe, PrecoFormatadoPipe],
  templateUrl: './produto.html',
  styleUrl: './produto.css',
})
export class Produto {
  @Input() nome: string = '';
  @Input() preco: number = 0;
 
}
