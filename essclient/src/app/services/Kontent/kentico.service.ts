import { Injectable } from '@angular/core';
import { DeliveryClient, ItemResponses, ContentItem } from '@kentico/kontent-delivery';

const kenticoProjectId = '36107421-3b2e-0040-e827-d9b6abdacdfa';

@Injectable({
  providedIn: 'root'
})
export class KenticoService {
  private static instance: KenticoService;
  private _clientInstance: DeliveryClient = null;

  public get getInstance() {
    if (!KenticoService.instance) {
        KenticoService.instance = new KenticoService();
    }
    return KenticoService.instance;
  }

  constructor() {
    this.initClient(kenticoProjectId);
  }

  // get kentico data methods

  public async getItem(langCode: string, codename: string): Promise<ItemResponses.ViewContentItemResponse<ContentItem>> {
    const result = await this.getClient()
        .item(codename)
        .languageParameter(langCode)
        .depthParameter(5)
        .toPromise();

    return result;
  }

  // Initial kentico methods

  private initClient(kenticoCloudProjectId: string): void {
    if (this._clientInstance != null) {
        return;
    }

    this._clientInstance = new DeliveryClient({
        projectId: kenticoCloudProjectId,
        typeResolvers: []
    });
}

  private getClient(): DeliveryClient {
    if (this._clientInstance == null) {
        throw new Error('KenticoService is not initiated!!');
    }

    return this._clientInstance;
  }


}
