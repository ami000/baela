import { TemplateId } from "../constants";

const parseQuestions = (text: string, template: string) => {
    const lines = text.split('\n');
    const questionSets = lines.reduce((reduced: any[], each: string) => {
        if (each.includes("@ Question") || each.includes("© Question")) {
            reduced.push([each])
            return reduced
        }
        reduced[reduced.length - 1].push(each);
        return reduced;
    }, [])
    const parsed = questionSets.map(each => {
        let question: Record<string, string> = {}
        const longestSet = each.reduce((set: any, str: string, ind: number) => {
            if (/\b\d+%\s?[RnANr].*/.test(str)) {
                return { text: str, index: ind }
            }
            return set;
        }, { text: "", index: 1 })
        const str = longestSet.text;
        const timePattern = /(\d{1,2}:\d{2})/g;
        const difficultyPattern = /\b(MEDIUM|EASY|HARD|medium|easy|hard)\b/;
        const times = str.match(timePattern);
        const timeTaken = times && times[0] ? times[0] : null;
        const avgTimeTaken = times && times[1] ? times[1] : null;
        const difficultyMatch = str.match(difficultyPattern);
        const difficulty = difficultyMatch ? difficultyMatch[0] : null;
        const ques = str.replace(timePattern, "").replace(difficultyPattern, "").replace(/O \d+% [RnAN]/g, "").trim();
        question = {
            time_taken: timeTaken,
            error_template_id: template,
            date_attempted: new Date().toISOString(),
            avgTimeTaken,
            question: ques + each?.slice(longestSet.index + 1)?.join(" "),
            difficulty
        };
        const [, ...cat] = each?.[0]?.split(/Question/)?.[1]?.trim()?.split(" ");
        question.solution = each?.[0]?.trim()?.startsWith("@") ? "Correct" : "Incorrect";
        question.question_type = cat.join(" ")
        return question
    })
    return parsed;
}

export const targetTestPrepMapper = (textStrArr: string[], template: TemplateId) => {
    return textStrArr.reduce((arr: any[], textStr) => {
        return [...arr, ...parseQuestions(textStr, template)]
    }, [])
}