import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';


import { provideHttpClient, withFetch } from '@angular/common/http';
import { withInterceptors } from '@angular/common/http';
import { httpInterceptorFn } from './core/interceptor/http.interceptor';


import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    provideClientHydration(),
    provideHttpClient(withFetch(),
    withInterceptors([httpInterceptorFn])),
  ],
};
//import provideHttpClient