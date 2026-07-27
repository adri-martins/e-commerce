import { HttpInterceptorFn } from "@angular/common/http";
import { error } from "console";
import { tap } from "rxjs";
import { catchError } from "rxjs";
import { throwError } from "rxjs";

export const httpInterceptorFn: HttpInterceptorFn = (req, next) => {

    //! TOKEN
    const token = 'fake-jwt-token';
    const novaReq = req.clone({
        setHeaders: {
Authorization: `Bearer ${token}`,
    },
});

console.log ('interceptando requisição: ', req.url);
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