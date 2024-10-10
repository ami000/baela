import { Notification } from "../../utils/types";

export const mockData = {
    analysisReport: {
        title: "Analysis Report",
        message: "Awesome! You've broken ground in a new topic!",
        experience: "Your experience working within design teams and building complex operational systems. This showcase your ability to adapt to an existing design system.",
        studyRecommendation: {
            title: "Study Recommendation",
            content: "Create a personalized study plan that aligns with your learning style and goals.Break down your study sessions into manageable chunks to avoid burnout.Regularly review and adjust your plan to ensure it remains effective.",
            text: "We recommend that this bla bla bla. This will help you gain mastery over scores and subject matter definition. This is not the final copy."
        },
        performance: {
            averageTimeSpentOnQuestion: {
                label: "AVERAGE TIME SPENT ON QUESTION",
                value: "2mins 45sec",
                comment: "While this is okay for new topics, need to work on this time to bring it under 2min.."
            },
            accuracyLevel: {
                label: "ACCURACY LEVEL",
                value: "67%",
                comment: "While this is okay for new topics, need to work on this time to bring it under 2min."
            }
        }
    }
};


export const mockNotifications: Notification[] = [
    {
        id: '1',
        title: "Hey It's study time!",
        timestamp: 'Thursday 3:15pm',
        subject: 'Combinations and Factoria',
        subjectCategory: 'Statistics & Probability',
        description: 'This study was recommended due to the error bla bla bla and how you can manage the questions and how you study it again',
        questionCount: 20,
        seen: false,
    },
    {
        id: '2',
        title: "Hey It's study time!",
        timestamp: 'Thursday 4:30pm',
        subject: 'Linear Algebra',
        subjectCategory: 'Mathematics',
        description: 'Brush up on your matrix operations and vector spaces Brush up on your matrix operations and vector spaces ',
        questionCount: 15,
        seen: false
    },
    {
        id: '3',
        title: "Hey It's study time!",
        timestamp: 'Thursday 4:30pm',
        subject: 'Linear Algebra',
        subjectCategory: 'Mathematics',
        description: 'Brush up on your matrix operations and vector spaces Brush up on your matrix operations and vector spaces ',
        questionCount: 15,
        seen: false
    },
];