import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { ToolbarModule } from '@core/toolbar/toolbar.module';
import { NotFoundModule } from '@core/not-found/not-found.module';
import { HomeModule } from '@home/home.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
    ToolbarModule,
    NotFoundModule,
    HomeModule,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
