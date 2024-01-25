import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SimpleLayoutModule } from '@/core/layout/simple-layout/simple-layout.module';
import { MainLayoutModule } from '@/core/layout/main-layout/main-layout.module';

@NgModule({
  declarations: [],
  imports: [CommonModule, SimpleLayoutModule, MainLayoutModule],
  exports: [SimpleLayoutModule, MainLayoutModule],
})
export class LayoutModule {}
