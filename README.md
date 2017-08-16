# i18n in Angular Tutorial

### 1. Choosing a i18n strategy

The [official Angular i18n solution](https://angular.io/guide/i18n) is Enterprise-oriented and built to work with the industry standard translation source file format.

Traditionally, SPA apps use `.json` files for storing/loading reading locale data. [`@ngx-translate`](http://www.ngx-translate.com/) provides an accessible way of achieving that purpose.

Reasons I chose `@ngx-translate` over the official Angular i18n solution:

1. The official Angular i18n solution [forces you](https://angular.io/guide/i18n#angular-and-i18n-template-translation) to build and deploy a separate version of the application for each supported language.
2. `@ngx-translate` [offers a HTTP Loader](https://github.com/ngx-translate/http-loader).
3. `@ngx-translate` offers a [string extractor tool](https://github.com/biesbjerg/ngx-translate-extract) that crawls all project source files and extracts texts marked for translation. In my opinion, this considerabily eases the locale files mainteinance.

> **Note**:
>
> `@ngx-translate` loads the `.json` files dynamically (during runtime) on a per-need basis. This means that when the app first loads, only the default locale file is downloaded. (This means that new locale files will be requested only when the language is changed.)

### 2. Install [`angular-cli`](https://github.com/angular/angular-cli)

    npm i -g @angular/cli


  > **Note**:
  >
  > `npm i -g` is syntactic for `npm install --global`.
### 3. Bootstrap the Angular App

    ng new i18nExample
    cd i18nExample

### 4. Serve the App in the Browser

    ng s


  > **Note**:
  >
  > `ng s` is syntactic for `ng serve`.
### 5. Create a New Component

    ng generate component sayHi

### 6. Install `@ngx-translate`

    npm i -s @ngx-translate/core @ngx-translate/http-loader

  > **Note**:
  >
  > `npm i -s` is syntactic for `npm install --save`.
### 8. Declare `@ngx-translate` in the App's Parent Module

    // app.module.ts

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

### 9. Automatically Extract Texts Marked for Translation


    npm i -g @biesbjerg/ngx-translate-extract
    ngx-translate-extract -i ./src -o ./src/assets/i18n/{de,en}.json --clean --format namespaced-json

### 12. Add `ngx-translate-extract` as a `npm` Script
Since we'll be using the string extractor tool during development, we should add it as a `npm` script:

    // package.json

    // ...

    "scripts": {
      // ...
      "i18n:update": "ngx-translate-extract -i ./src -o ./src/assets/i18n/{de,en}.json --clean --format namespaced-json"
    },

    // ...


Now we can conveniently run:

    npm run i18n:update


### 10. Inject `translate` Into the Main App Component

In order to gain access to the Translation Service, we need to include it into the app:

    // app.component.ts

    // ...
    import { TranslateService } from '@ngx-translate/core';

    // ...

    export class AppComponent {
      // ...

      constructor(translate: TranslateService) {
        translate.setDefaultLang('en');
      }
    }


This is possible because we have previously declared that our `app.module.ts` imports the `TranslateModule`.

### 11. Mark Texts for Translation

`@ngx-translate` offers 3 ways of accessing the Translation Service:
1. TranslateService
2. TranslatePipe
3. TranslateDirective

For more information on these, please consult [the `@ngx-translate` documentation](https://github.com/ngx-translate/core#4-use-the-service-the-pipe-or-the-directive).

For the purpose of this tutorial, we will be using `TranslatePipe`.

Now that we are able to access the Translation Service, let's mark a text for translation using `TranslatePipe`.


    // app.component.html

    <h1>
      {{ "welcome" | translate }}
    </h1>

Reloading the application results in the text `"welcome"` being rendered. That happens because there's no value specified for the `"welcome"` key in our locale files.

Let's add some translation values:

    // src/assets/i18n/en.json

    {
      "welcome": "Welcome!",
      ...
    }


    // src/assets/i18n/de.json

    {
      "welcome": "Willkomen!",
      ...
    }

Reloading the app will reveal the correct text being rendered for the `"welcome"` i18n key.

> **Note**:
>
> Marking more texts for translation and running `npm run i18n:update` will cause new keys to be added to the `.json` files.
>
> In the same manner, removing a text from the template and running `npm run i18n:update` will cause the key to be removed (along with its value) from the `.json` files.

### 12. Switch Languages

`@ngx-translate` provides a helper method for switching languages: [`translate.use()`](https://github.com/ngx-translate/core#methods).

In order to switch the language dynamically, we need to call Translate Service's `use()` method.

In order to do that, we declare a new private property `translate` in `AppComponent`:


    // app.component.ts

    // ...
    import { TranslateService } from '@ngx-translate/core';

    // ...
    export class AppComponent {
      translate: TranslateService; // <-- defining translate as a private property

      switchLanguage = (lang: string) => {  // <-- creating a new method
        this.translate.use(lang); // <-- invoking `use()`
      }

      constructor(translate: TranslateService) {
        this.translate = translate;  // <-- binding the injected `TranslatedService` to the local `translate` property
        translate.setDefaultLang('en');
      }
    }


And in our template, we add two buttons for invoking `switchLanguage()`:


    // app.component.html

    // ...
    <button (click)="switchLanguage('en')">EN</button>
    <button (click)="switchLanguage('de')">DE</button>
    // ...


### 13. Enjoy! 😎

> **Note**: You can find the final version of the code in this tutorial in this repository. 👍
