import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AlertComponent } from './alert/alert.component';
import {PlaceholderDirective} from './placeholder/placeholder.directive';
@NgModule({
  declarations: [
    AlertComponent,
    PlaceholderDirective,
  ],
  imports: [CommonModule],
  exports: [
    AlertComponent,
    CommonModule,
    PlaceholderDirective,
  ],
  entryComponents: [AlertComponent]
})
export class SharedModule {}
