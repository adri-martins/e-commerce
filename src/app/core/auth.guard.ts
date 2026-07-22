import { CanActivateFn } from "@angular/router";
import { usuarioLogado } from "./auth";
export const authGuard: CanActivateFn = () => {
   return usuarioLogado();
};
//SE O USUARIO TIVER AUTENTICADO O MESMO TERÁ ACESSO PARA A RORA