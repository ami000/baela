import { BaseService } from "./base.service";


export class ErrorLogService extends BaseService {
    public async SaveErrorLog(errorData: any) {
        try {
            const { data } = await this.httpClient.post("error-log/log", errorData);

            if (data.status === "success") {
                return data;
            }
        }
        catch (error) {
        }
    }

    public async StartSummary(jobId: string) {
        try {
            const { data } = await this.httpClient.post("error-log/job", { jobId });

            if (data.status === "success") {
                return data;
            }
        }
        catch (error) {
        }
    }

    public async GetSummary(jobId: string) {
        try {
            const { data, status } = await this.httpClient.get(`error-log/job/${jobId}`);

            if (status === 200) {
                return data;
            }
        }
        catch (error) {
        }
    }

    public async GetErrorLog(page?: number, size?: number) {
        try {
            const { data, status } = await this.httpsClient.get(`error-log/log?pageNo=${page}&pageSize=${size}`);
            if (status === 200) {
                return data;
            }
        }
        catch (error) {
            console.error("err", error)
        }
    }
}