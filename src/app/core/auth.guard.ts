import { CanActivateFn } from "@angular/router";
import { inject } from "@angular/core";
import { Router } from "@angular/router";
import { AuthFacade } from "./facades/auth.facade";


export const authGuard: CanActivateFn = () => {
   const router= inject(Router);
   const authFacade = inject(AuthFacade);

   if(authFacade.usuarioLogado()){
      return true;
   }
   return router.createUrlTree(['/login']);
   
}
//SE O USUARIO TIVER AUTENTICADO O MESMO TERÁ ACESSO PARA A RORA