import { Component, computed, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';


@Component({
  selector: 'app-admin',
  imports: [],
  templateUrl: './admin.html',
  styleUrl: './admin.css',
})
export class Admin {

  private authService = inject(AuthService);
  private router = inject(Router);

  //! simulação - Indicadores
  totalProdutosCadastrados = signal(20);
  pedidiosPendentes = signal(3);
  usuarioCadastrados = signal(8);
 
  usuarioAtual = this.authService.usurioAtual;

  mensagemPerfil = computed(() => {

    const usuario = this.usuarioAtual();
    if(!usuario){
      return('Nenhum usuario Autenticado!');
    }
    return `Usuario autenticado como: ${usuario.perfil}`;
  });
  sair(){
    this.authService.logout();
    this.router.navigateByUrl('/login');
  }
}
//permite fazer leitura 