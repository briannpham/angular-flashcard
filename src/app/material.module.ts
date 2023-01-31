import { NgModule } from "@angular/core";
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
	exports: [
		MatButtonModule,
		MatListModule,
		MatIconModule
	]
})

export class MaterialModule {}