import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { registerLicense } from "@syncfusion/ej2-base";
import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

registerLicense("ORg4AjUWIQA/Gnt2VVhiQlFadVlJVXxBYVF2R2FJeVRwcV9EZEwxOX1dQl9hSXlTf0RrWH5fdH1XT2A=");

if (environment.production) {
  enableProdMode();
}
enableProdMode();
platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
