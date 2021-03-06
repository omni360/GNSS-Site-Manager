import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FrequencyStandardItemComponent } from './frequency-standard-item.component';
import { FrequencyStandardGroupComponent } from './frequency-standard-group.component';
import { FormInputModule } from '../shared/form-input/form-input.module';

@NgModule({
    imports: [CommonModule, FormsModule, ReactiveFormsModule, FormInputModule],
    declarations: [FrequencyStandardItemComponent, FrequencyStandardGroupComponent],
    exports: [FrequencyStandardItemComponent, FrequencyStandardGroupComponent]
})
export class FrequencyStandardModule {
}
