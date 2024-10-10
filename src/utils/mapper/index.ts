import { GMATClubTemplate, TemplateId } from "../constants";
import { Category, Mapper } from "../gmatMapper";
import { e_gmatMapper } from "./e-gmatMapper";
import { gmatWhizMapper } from "./gmatWhizMapper";
import { targetTestPrepMapper } from "./targetTestPrepMapper";

export const chunk = (arr: any[], size: number) =>
    Array.from({ length: Math.ceil((arr?.length || 0) / size) }, (v, i) =>
        arr.slice(i * size, i * size + size)
    );

export const errorMapper = (jsonData: any, templateId: TemplateId) => {
    let mappedJson: any = {}
    switch (templateId) {
        case TemplateId.GMATClub: {
            jsonData = jsonData.map((questionData: any) => {

                // Determine category and question type
                for (const cat of Category) {
                    for (const qType in Mapper[cat]) {
                        if (questionData["Forum name"].toLowerCase().includes(qType.toLowerCase())) {
                            questionData.category = cat;
                            questionData.questionType = qType;
                            break;
                        }
                    }
                    if (questionData.category) break;
                }

                // Determine topic and subtopic
                if (questionData.category && questionData.questionType) {
                    const topicData = Mapper[questionData.category][questionData.questionType];
                    const tempTopic = questionData?.["Topic name"]?.split(",")[0].trim()

                    for (const topic of topicData) {

                        if (!!topic?.subtopics?.length) {
                            let sub = topic?.subtopics?.find((x: any) => x?.toLowerCase().includes(tempTopic?.toLowerCase()))
                            if (sub) {
                                questionData.topic = topic.name;
                                questionData.subtopic = sub;
                            } else if (topic?.name?.toLowerCase().includes(tempTopic?.toLowerCase())) {
                                questionData.topic = topic?.name;
                                questionData.subtopic = "N/A";
                            }
                        } else if (typeof topic === "string" && topic?.toLowerCase().includes(tempTopic?.toLowerCase())) {
                            questionData.topic = topic;
                            questionData.subtopic = "N/A";
                        }
                    }
                }

                return questionData;
            });
            const issue: any = []
            jsonData.forEach((e: any) => {
                if (!e?.category && !issue.includes(e?.["Forum name"])) issue.push(e?.["Forum name"])
            });
            console.log(issue)
            mappedJson = jsonData.map((row: any) => {
                let mappedRow: any = {};
                Object.keys(GMATClubTemplate).forEach((field: string) => {
                    if (["date_attempted"].includes(field)) {
                        mappedRow[field] = new Date(row[GMATClubTemplate[field]]).toISOString()
                    } else {
                        mappedRow[field] = row[GMATClubTemplate[field]]
                    }
                })
                mappedRow.error_template_id = templateId;
                return mappedRow;
            })
            break;
        }
        case TemplateId.EGMAT: {
            const data = e_gmatMapper(jsonData, templateId)
            console.log("data", data)
            return data;
        }
        case TemplateId.TESTPREP: {
            const data = targetTestPrepMapper(jsonData, templateId)
            console.log("data", data)
            return data;
        }
        case TemplateId.GMATWHIZ: {
            const data = gmatWhizMapper(jsonData, templateId)
            return data;
        }
        default: {
            console.log("templateId not found")
        }
    }
    return mappedJson;
}

export const convertDbResultToJson = (data: any, name: string) => {
    if (data.length > 0) {
        const jsonResult = data[0].values.map((row: any) => {
            let rowObject: any = {};
            data[0].columns.forEach((column: any, index: any) => {
                rowObject[column] = row[index];
            });
            return rowObject;
        });
        return jsonResult
    }
};

export const urlBase64ToUint8Array = (base64String: string): Uint8Array => {
    const padding = '='.repeat((4 - (base64String.length % 4)) % 4);
    const base64 = (base64String + padding)
        // eslint-disable-next-line no-useless-escape
        .replace(/\-/g, '+')
        .replace(/_/g, '/');

    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);

    for (let i = 0; i < rawData.length; ++i) {
        outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
}