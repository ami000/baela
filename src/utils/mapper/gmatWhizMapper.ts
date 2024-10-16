import { TemplateId } from "../constants";

const convertToMinutesAndSeconds = (time: string) => {
    const minutes = time.slice(0, -2) || '0';
    const seconds = time.slice(-2);
    return `${minutes}:${seconds.padStart(2, '0')}`;
};

const parseQuestions = (text: string, template: string) => {
    const data = text.split("\n").filter(x => x.split(" ")?.[0]?.length === 1)
    const parsedData = data.map(entry => {
        const parts = entry.split(" ");
        const serial = parts[0];
        const difficulty = parts[1] === "Below" ? "Below " + parts.splice(2, 1)[0] : parts[1];
        const time_taken = parts[3].includes(":") ? parts[3] : convertToMinutesAndSeconds(parts[3]);
        const iscorrect = parts[parts.length - 1].includes("M:S") || parts[parts.length - 1].includes("MS");

        return {
            serial: Number(serial),
            difficulty,
            time_taken,
            error_template_id: template,
            Solution: !iscorrect ? "Incorrect" : "Correct"
        };
    });
    return parsedData
}

export const gmatWhizMapper = (textStrArr: string[], template: TemplateId) => {
    return textStrArr.reduce((arr: any[], textStr) => {
        return [...arr, ...parseQuestions(textStr, template)]
    }, [])
}