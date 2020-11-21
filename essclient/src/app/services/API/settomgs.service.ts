import { APIService } from './API.service';
import { APIRepository } from './API-repository';
import { Injectable } from '@angular/core';
import { ISettings } from 'src/app/models/ISettings';
import { map } from 'rxjs/operators';

export interface IUpdateSettings {
    maxServicesInDay: number;
    maxAvailabilityDays: number;
}

@Injectable({
    providedIn: 'root'
})
export class SettingService extends APIRepository<ISettings> {
    public settings: ISettings;

    constructor (public _API: APIService) {
        super(_API, 'Settings');
    }

    public fetchSettings(): Promise<ISettings> {
        return this._API.get<ISettings>(`${this.className}/Get`).pipe(
            map((settings: ISettings) => {
              this.settings = settings;
              return settings;
          })
        ).toPromise();
    }

    public updateSettings(request: IUpdateSettings): Promise<ISettings> {
        return this._API.put<ISettings>(`${this.className}/Update`, request).pipe(
            map((settings: ISettings) => {
              this.settings = settings;
              return settings;
          })
        ).toPromise();
    }
}
