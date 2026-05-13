import { ApplicationConfig, provideZonelessChangeDetection, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { LucideAngularModule, Server, Monitor, ShieldCheck, Activity, Layers, Send, User, Bot, Shield, ChevronLeft } from 'lucide-angular';

import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZonelessChangeDetection(),
    provideRouter(routes),
    provideHttpClient(),
    importProvidersFrom(LucideAngularModule.pick({ Server, Monitor, ShieldCheck, Activity, Layers, Send, User, Bot, Shield, ChevronLeft }))
  ]
};
