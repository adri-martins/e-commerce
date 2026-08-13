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

}
//permite fazer leitura 