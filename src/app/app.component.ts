import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

type Language = 'en' | 'de';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  translate: TranslateService;

  constructor(translate: TranslateService){
    this.translate = translate;
    translate.setDefaultLang('en');
  }

  switchLanguage = (lang: Language) => {
    this.translate.use(lang);
  }
}
