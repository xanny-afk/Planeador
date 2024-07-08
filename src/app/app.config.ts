import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideAuth0 } from '@auth0/auth0-angular';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes), 
    provideAnimationsAsync(),
    provideAuth0({
      domain: 'dev-qqblda6kpucu8zqr.us.auth0.com',
      clientId: 'X5OmlOyUWPtkqV4w2EWfP6LiRCBj7Edg',
      authorizationParams: {
        redirect_uri: 'http://localhost:4200/'
      }
    })

  ]
};
