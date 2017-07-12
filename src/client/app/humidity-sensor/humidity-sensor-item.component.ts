import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AbstractItemComponent } from '../shared/abstract-groups-items/abstract-item.component';
import { DialogService } from '../shared/index';
import { UserAuthService } from '../shared/global/user-auth.service';
import { SiteLogService } from '../shared/site-log/site-log.service';

/**
 * This component represents a single Humidity Sensor.
 */
@Component({
    moduleId: module.id,
    selector: 'humidity-sensor-item',
    templateUrl: 'humidity-sensor-item.component.html',
})
export class HumiditySensorItemComponent extends AbstractItemComponent {

    constructor(protected userAuthService: UserAuthService,
                protected dialogService: DialogService,
                protected siteLogService: SiteLogService,
                protected formBuilder: FormBuilder) {
        super(userAuthService, dialogService, siteLogService);
    }

    getItemName(): string {
        return 'Humidity Sensor';
    }

    /**
     * Return the item form with default values and form controls.
     */
    getItemForm(): FormGroup {
        return this.formBuilder.group({
            id: [null],
            manufacturer: ['', [Validators.required, Validators.maxLength(50)]],
            serialNumber: ['', [Validators.required, Validators.maxLength(50)]],
            dataSamplingInterval: ['', [Validators.maxLength(25)]],
            accuracyPercentRelativeHumidity: ['', [Validators.maxLength(25)]],
            aspiration: ['', [Validators.maxLength(50)]],
            heightDiffToAntenna: ['', [Validators.maxLength(25)]],
            calibrationDate: [''],
            startDate: [''],
            endDate: [''],
            notes: ['', [Validators.maxLength(2000)]],
            objectMap: [''],
        });
    }
}
