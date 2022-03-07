import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DecodeTokenPipe } from './decode-token.pipe';

@NgModule({
  declarations: [DecodeTokenPipe],
  imports: [CommonModule],
  providers: [DecodeTokenPipe],
  exports: [DecodeTokenPipe],
})
export class PipesModule {}
