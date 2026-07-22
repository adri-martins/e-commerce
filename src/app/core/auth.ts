import { signal } from "@angular/core";

//! Define valor inicial do signal usuarioLogado com (false)
export const usuarioLogado = signal (false);

//! define signal ususarioLogado com (true), permite acesso as rotas
export function login(){
    usuarioLogado.set(true);
}

//! Define signal usuarioLogado com (false), bloqueia acesso imediatamente
export function logout(){
    usuarioLogado.set(false);
}


//quandor ler será atualizado e o valor será alterado, se o usuario tiver autorização pode acessae, se não é rejeitado, feat nova função