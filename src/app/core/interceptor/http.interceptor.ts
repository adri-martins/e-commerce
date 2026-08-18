import { HttpInterceptorFn } from "@angular/common/http";
import { error } from "console";
import { tap } from "rxjs";
import { catchError } from "rxjs";
import { throwError } from "rxjs";
import { inject } from "@angular/core";
import { AuthFacade } from "../facades/auth.facade";

export const httpInterceptorFn: HttpInterceptorFn = (req, next) => { 

const authFacade = inject(AuthFacade);

    //!    NOVO METODO TOKEN
    const token = authFacade.obterToken();
    //! requisição de LOG
    console.log ('Requisição: ', req.url);
    //! TOKEN
    const novaReq = token ?
    req.clone({
        setHeaders: {
            Authorization: `Bearer ${token}`
        },
    }):req;
//! NOVA REQUISIÇÃO + RESPOSTA DE LOG

return next(novaReq).pipe(
    tap({
        next: (event) => console.log('RESPONSE:', event),
        error: (error) => console.error('ERRO:', error)
    }),
    catchError((error) => {
    console.error('ERRO GLOBAL:', error);

    if (error.status === 401) {
        console.warn ('não autorizado!');
    }
    if (error.status ===500) {
        console.warn ('erro interno do servidor!');
    }
    return throwError(() =>error);
    }),
);
};

//criou 27.07