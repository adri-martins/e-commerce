import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-acesso-negado',
  imports: [RouterLink],
  templateUrl: './acesso-negado.html',
  styleUrl: './acesso-negado.css',
})
export class AcessoNegado {
  private authService = inject(AuthService); //! teste em produção
  sair = this.authService.logout(); //! teste em produção
}
