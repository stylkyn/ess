import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ISettings } from 'src/app/models/ISettings';
import { IUpdateSettings, SettingService } from 'src/app/services/API/settomgs.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {
    isLoading = false;
    settingsForm: FormGroup;

    get settings(): ISettings { return this._settingsService.settings; }
    get maxServicesInDay() { return this.settingsForm.get('maxServicesInDay'); }
    get maxAvailabilityDays() { return this.settingsForm.get('maxAvailabilityDays'); }

    constructor(
        private _fb: FormBuilder,
        private _settingsService: SettingService,
    ) { 
        this.settingsForm = _fb.group({
            maxServicesInDay: [null, Validators.required],
            maxAvailabilityDays: [null, Validators.required],
        });
    }

    save() {
        this.isLoading = true;

        const request: IUpdateSettings = {
            maxServicesInDay:this. maxServicesInDay.value,
            maxAvailabilityDays: this.maxAvailabilityDays.value 
        };
        this._settingsService.updateSettings(request)
            .then((settings: ISettings) => { 
                this.isLoading = false;
                this.settingsForm.patchValue(settings);
            })
            .catch(() => this.isLoading = false);
    }

    ngOnInit() {
        this.isLoading = true;
        this._settingsService.fetchSettings()
            .then((settings: ISettings) => { 
                this.isLoading = false;
                this.settingsForm.patchValue(settings);
            })
            .catch(() => this.isLoading = false);
    }

}
