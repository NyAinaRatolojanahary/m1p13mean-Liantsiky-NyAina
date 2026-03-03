import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { routes } from './app/app.routes';
import { provideRouter } from '@angular/router';
import { register } from 'swiper/element/bundle';
import { provideHttpClient } from '@angular/common/http';

register();

bootstrapApplication(AppComponent, {
  providers: [provideRouter(routes), provideHttpClient()]
})
  .catch((err) => console.error(err));
