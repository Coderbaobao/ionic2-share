import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
//native
import { Storage } from '@ionic/storage';
import { HttpModule,JsonpModule  } from '@angular/http';

import { Pages,  Providers,Pipes, Directives} from './app.imports';

@NgModule({
  declarations: [
    MyApp,
    
    Pages,

    Directives,
     // pipes
    Pipes
  ],
  imports: [
    IonicModule.forRoot(MyApp),
    HttpModule,
    JsonpModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp, 
    Pages
  ],
  providers: [Storage,Providers, { provide: ErrorHandler, useClass: IonicErrorHandler } ]
})
export class AppModule {}
