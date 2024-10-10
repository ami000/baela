import { chunk } from './mapper';
import { SubscribeService } from '../services/subscribe.service';
import { insertIntoErrorLogTable } from './query';
import { LocalDB } from './sql';
import { v4 as uuidv4 } from "uuid";

const subscribeApi = new SubscribeService()

export const regSw = async () => {
    if ('serviceWorker' in navigator) {
        let url = process.env.PUBLIC_URL + '/sw.js';
        const reg = await navigator.serviceWorker.register(url, { scope: '/' });
        return reg;
    }
    throw Error('serviceworker not supported');
}

export const subscribe = async (sub: any) => {
    try {
        await subscribeApi.subscribe(sub)
    } catch (error) {
        console.log("Error", error)
    }
}

export const sendErrorDataToBackend = async (errorData: any, ErrorLogApis: any) => {
    try {
        const chuk = chunk(errorData, 200);
        const jobId = uuidv4()
        await Promise.all(
            chuk.map(async (x) => {
                await ErrorLogApis.SaveErrorLog(
                    x.map((x) => ({ ...x, jobId }))
                );
            })
        );
        await ErrorLogApis.StartSummary(
            jobId
        );
    } catch (error: any) {
        console.log("error", error.message);
    }
};

export const storeDataInLocalSQL = async (data: any[]) => {
    const chunks = chunk(data, 500);
    let i = 0
    for (const chuk of chunks) {
        const query = insertIntoErrorLogTable();
        const insertStmt = LocalDB?.prepare(query);
        // eslint-disable-next-line no-loop-func
        chuk?.forEach((row) => {
            const value = [
                row?.id || i,
                row?.error_template_id,
                row?.section || "",
                row?.category || "",
                row?.subcategories || "",
                row?.question_type || "",
                row?.topic_names || "",
                row?.subtopic_names || "",
                row?.brief_question_text || "",
                row?.link_to_question || "",
                row?.bookmarked || false,
                row?.solution || "",
                row?.guessed || false,
                row?.selected_option || "",
                row?.date_attempted || "",
                row?.time_taken || "",
                row?.performance || false,
                row?.difficulty || 0,
                row?.question_source || "",
                row?.careless_mistake || false,
                row?.anxiety || 0,
                row?.conceptual_gap || false,
                row?.time_mismanagement || false,
                row?.vocabulary_void || false,
                row?.comprehension_error || false,
                row?.description || "",
                row?.learnings || "",
                row?.notes || "",
                row?.question_id || "",
                row?.user_id || "",
            ];
            insertStmt?.run(value);
            i += 1;
        });
        insertStmt?.free();
    }
};

export const getErrorLogDataFromBackend = async (getIdTokenClaims: any, dispatch: any, chartData: any, chartDatas: any, isAuthenticated: any, ErrorLogApis: any) => {
    try {

        let hasMoreData = true;

        while (hasMoreData) {
            const resUserData = await ErrorLogApis.GetErrorLog();
            if (resUserData?.status === "success") {
                storeDataInLocalSQL(resUserData?.data);
                dispatch(
                    chartData({ ...chartDatas, json: resUserData?.data, isAuthenticated })
                );
            }
        }

    } catch (error: any) {
        console.log("error", error.message);
    }
};