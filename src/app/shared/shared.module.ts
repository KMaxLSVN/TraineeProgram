import { NgModule } from '@angular/core';
import { MaterialModule } from './ui/material/material.module';
import { SearchPipe } from './pipes/search.pipe';

@NgModule({
    imports: [ MaterialModule ],
    exports: [ MaterialModule, SearchPipe ],
    declarations: [SearchPipe],
    providers: [],
})

export class SharedModule { }