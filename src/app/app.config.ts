import { ApplicationConfig } from "@angular/platform-browser";
import { routes } from "./app.routes"
import { provideRouter } from "@angular/router";
import { provideHttpClient, withInterceptors } from "@angular/common/http";
import { apiInterceptor } from "./core/interceptors/api.interceptor";

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(
      withInterceptors([apiInterceptor])
    ),
  ]
}
