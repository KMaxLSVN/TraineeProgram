import { NgModule } from '@angular/core';
import { MaterialModule } from './ui/material/material.module';

@NgModule({
    imports: [ MaterialModule ],
    exports: [ MaterialModule ],
    declarations: [],
    providers: [],
})

export class SharedModule { }