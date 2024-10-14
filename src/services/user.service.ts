import { BaseService } from "./base.service";


export class UserService extends BaseService {
    public async SaveUser(logIn: any, token: string) {
        try {
            const { data } = await this.httpClient.post("user", logIn, {
                headers:
                    { Authorization: `Bearer ${token}` }
            });

            if (data.status === "success") {
                return data;
            }
        }
        catch (error) {
        }
    }
    public async UpdateUser(userData: any) {
        try {
            const { data, status } = await this.httpClient.put("user", userData);

            if (status === 200) {
                return data;
            }
        }
        catch (error) {
        }
    }
    public async GetUser() {
        try {
            const { data, status } = await this.httpClient.get("user");

            if (status === 200) {
                return data;
            }
        }
        catch (error) {
        }
    }
}