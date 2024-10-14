import { BaseService } from "./base.service";


export class SubscribeService extends BaseService {
    public async subscribe(swData: any) {
        try {
            const { data, status } = await this.httpClient.post("subscribe-worker", swData);

            if (status === 200) {
                return data;
            }
        }
        catch (error) {
        }
    }
}