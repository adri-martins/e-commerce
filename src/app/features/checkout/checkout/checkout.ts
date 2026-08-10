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


// novos imports
@Component({
  selector: 'app-checkout',
  imports: [ReactiveFormsModule],
  templateUrl: './checkout.html',
  styleUrl: './checkout.css',
})
export class Checkout {

  CarrinhoService = inject(CarrinhoService);

  formulario = new FormGroup({
    nome: new FormControl('', [Validators.required, Validators.minLength(3), nomeSemNumeros]),
    email: new FormControl('', [Validators.required, Validators.email]),
    endereco: new FormControl('', [Validators.required, Validators.minLength(5)]),
  });

  finalizar (){
    this.compraFinalizada.set(false); //impede que finalize uma compra se o carrinho estiver vazio
    if(this.CarrinhoService.carrinhoVazio()){
      console.log('Não é possivel finalizar a compra com o carrinho vazio!');
      return;
    }
    if(this.formulario.invalid){ //se é condição
      console.log('Formulário Invalido!');
      this.formulario.markAllAsTouched();
      return;
    }
    const dados = this.formulario.value;
    const itens = this.CarrinhoService.itens();
    const total = this.CarrinhoService.totalItens();

    console.log('Compra finalizada com sucesso!');
    console.log('Dados dos formulario: ', dados);
    console.log('Itens do carrinho: ', itens);
    console.log('Total da compra: ', total);

    this.CarrinhoService.limpar();
    this.formulario.reset();
    this.compraFinalizada.set(true);

  }

compraFinalizada = signal(false);
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