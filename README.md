# i18n in Angular Tutorial

1. angular i18n (https://angular.io/guide/i18n) vs. @ngx-translate (http://www.ngx-translate.com/)
2. install angular-cli
    ```
    npm install -g @angular/cli
    ```
3. bootstrap app:
    ```
    ng new i18nExample
    ```
4. Serve the app in the browser:
    ```
    ng serve
    ```
5. create new component:
    ```
    ng generate component sayHi
    ```
6. Install @ngx-translate:
    ```
    npm i --save-dev @ngx-translate/core @ngx-translate/http-loader
    ```
8. Declare @ngx-translate in app.module.ts
    ```
    import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
    import { TranslateHttpLoader } from '@ngx-translate/http-loader';
    import { HttpClientModule, HttpClient } from '@angular/common/http';

    // ...

    export const createTranslateLoader = (http: HttpClient) => {
      return new TranslateHttpLoader(http, './assets/i18n/', '.json');
    };

    // ...

    imports: [
      // ...
      HttpClientModule,
      TranslateModule.forRoot({
        loader: { 
          provide: TranslateLoader,
          useFactory: createTranslateLoader,
          deps: [HttpClient]
        }
      })
    ]
    ```
9. ngx-translate-extract:
    ```
    npm install @biesbjerg/ngx-translate-extract
    ngx-translate-extract -i ./src -o ./src/assets/i18n/{de,en}.json --clean --format namespaced-json
    ```
10. Inject `translate` as a AppComponent private property:
```
import { TranslateService } from '@ngx-translate/core';

// ...

constructor(translate: TranslateService) {
  translate.setDefaultLang('en');
}
```
11. Mark text for translation: `{{ … | translate }}`
12. Add `ngx-translate-extract` as an npm script
13. Enjoy! 😎
