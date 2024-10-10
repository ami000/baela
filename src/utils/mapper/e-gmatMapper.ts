import { TemplateId } from "../constants";

enum SubjectLevels {
    E = "555-605",
    EM = "605-655",
    M = "655-705"
}

const parseEachArr = (jsonData: any[], templateId: TemplateId) => {
    return jsonData.map((entry: string[]) => {
        if (entry.length < 2) return null;
        const [serial, code, ...subjectAndTopic] = entry;
        subjectAndTopic.pop()
        const timeTaken = subjectAndTopic.pop();
        const isCorrect = subjectAndTopic.pop() === '[]';
        const level = subjectAndTopic.pop();
        const topic = subjectAndTopic.join(' ');

        return {
            serial: Number(serial),
            question_type: topic,
            category: code,
            difficulty: SubjectLevels[level as keyof typeof SubjectLevels] || level,
            solution: isCorrect ? "Correct" : "Incorrect",
            time_taken: timeTaken,
            error_template_id: templateId,
            date_attempted: new Date().toISOString()
        };
    }).filter((x: any) => !!x)
};

export const e_gmatMapper = (textStrArr: string[], template: TemplateId) => {
    return textStrArr.reduce((arr: any[], textStr) => {
        const splittedData = textStr.split("\n").map(x => x.split(" ")).filter(x => !isNaN(Number(x?.[0])))
        return [...arr, ...parseEachArr(splittedData, template)]
    }, []).filter((x: any, index: number, self) => {
        return index === self.findIndex(y => y.serial === x.serial && y.category === x.category)
    })
}