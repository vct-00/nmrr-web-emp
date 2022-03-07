import { NavBarComponent } from './nav-bar.component';
import { PipesModule } from './../../../../shared/pipes/pipes.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

@NgModule({
  imports: [CommonModule, PipesModule],
  declarations: [NavBarComponent],
  exports: [NavBarComponent],
})
export class NavBarModule {}
