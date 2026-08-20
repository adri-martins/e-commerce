import { Component } from '@angular/core';
import { inject } from '@angular/core';
import { signal } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { FormControl } from '@angular/forms';
import { CarrinhoService } from '../../../core/services/carrinho.service';
import { Validators } from '@angular/forms';
import { AbstractControl } from '@angular/forms';
import { ValidationErrors } from '@angular/forms';
import { CarrinhoFacade } from '../../../core/facades/carrinho.facade';
import { RouterLink } from "@angular/router";
import { Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import { AuthFacade } from '../../../core/facades/auth.facade';
import { PrecoFormatadoPipe } from '../../../shared/pipes/preco-formatado-pipe';
import { ItemCarrinho } from '../../../core/models/item-carrinho';


type pedidoFinalizado = {
  codigo: number;
  cliente: string,
  quantidadeItens: number;
  total: number;
  itens: ItemCarrinho[];
}

@Component({
  selector: 'app-checkout',
  imports: [ReactiveFormsModule, RouterLink, PrecoFormatadoPipe],
  templateUrl: './checkout.html',
  styleUrl: './checkout.css',
})

export class Checkout {
  pedidoFinalizado = signal< pedidoFinalizado | null >(null);
  //compraFinalizada = signal(false);


  CarrinhoFacade = inject(CarrinhoFacade);
  router = inject(Router);
  authFacade = inject(AuthFacade);

  formulario = new FormGroup({
    nome: new FormControl('', [Validators.required, Validators.minLength(3), nomeSemNumeros]),
    email: new FormControl('', [Validators.required, Validators.email]),
    endereco: new FormControl('', [Validators.required, Validators.minLength(5)]),
  });

  finalizar () {
    this.pedidoFinalizado.set(null);
    //this.compraFinalizada.set(false); 
    
    if(this.CarrinhoFacade.carrinhoVazio()){
      console.log('Não é possivel finalizar a compra com o carrinho vazio!');
      return;
    }
    if(this.formulario.invalid){ //se é condição
      console.log('Formulário Invalido!');
      this.formulario.markAllAsTouched();
      return;
    }
    const dados = this.formulario.value;
    const itens = this.CarrinhoFacade.itensCarrinho();
    const total = this.CarrinhoFacade.totalCarrinho();

    const pedido: pedidoFinalizado = {
      codigo: Date.now(),
      cliente: dados.nome ?? '',
      quantidadeItens: itens.length,
      total,
      itens,
    }

    console.log('Compra finalizada com sucesso!');
    console.log('Dados dos formulario: ', dados);
    console.log(' Dados do pedidos: ', pedido);
    
    this.CarrinhoFacade.limparCarrinho();
    this.formulario.reset();
   // this.compraFinalizada.set(true);
    this.pedidoFinalizado.set(pedido);

  }



sair(){
  this.authFacade.sair();
  this.router.navigateByUrl('/login');
}
}

function nomeSemNumeros (control: AbstractControl): ValidationErrors | null {
  const valor = control.value;
  if (!valor) return null;

  if (/\d/.test(valor)){
    return {numeroInvalido: true};
  }
  return null;
}
// novo import e construção dentro de checkout= feat