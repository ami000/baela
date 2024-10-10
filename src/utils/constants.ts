export const Months = [
    { value: "Jan", id: 1 },
    { value: "Feb", id: 2 },
    { value: "Mar", id: 3 },
    { value: "Apr", id: 4 },
    { value: "May", id: 5 },
    { value: "Jun", id: 6 },
    { value: "Jul", id: 7 },
    { value: "Aug", id: 8 },
    { value: "Sep", id: 9 },
    { value: "Oct", id: 10 },
    { value: "Nov", id: 11 },
    { value: "Dec", id: 12 },
];

export const QuantTopics = ["Problem Solving (PS)"]

export const DiTopics = ['Multi-Source Reasoning (MSR)', 'Data Sufficiency (DS)', 'Two-part Analysis (TPA)']

export const VerbalTopics = ['Critical Reasoning (CR)', 'Reading Comprehension (RC)', 'Sentence Correction (EA only)']

export enum TemplateId {
    GMATClub = 'GMATClub',
    EGMAT = 'e-gmat',
    TESTPREP = 'targetTestPrep',
    GMATWHIZ = 'gmat-whiz'
}

export const DefaultTemplate = {
    error_template_id: '',
    section: 'Section',
    category: 'Category',
    subcategories: 'Subcategories',
    question_type: 'Question Type',
    topic_names: 'Topics',
    subtopic_names: 'Subtopics',
    brief_question_text: 'Brief Question Text',
    link_to_question: 'Link to Question',
    bookmarked: 'Bookmarked',
    solution: "",
    guessed: 'Guessed',
    selected_option: "",
    date_attempted: 'Date',
    time_taken: 'Time taken',
    performance: 'Performance',
    difficulty: 'Difficulty',
    question_source: 'Source',
    careless_mistake: 'Careless Mistake',
    anxiety: 'Anxiety',
    conceptual_gap: 'Conceptual Gap',
    time_mismanagement: 'Time Mismanagement',
    vocabulary_void: 'Vocabulary Void',
    comprehension_error: 'Comprehension Error',
    description: 'Description',
    learnings: 'Learnings',
    notes: 'Notes',
    question_id: '',
    user_id: '',
}


export const GMATClubTemplate: any = {
    category: 'category',
    topic_names: 'topic',
    question_type: "questionType",
    subtopic_names: "subtopic",
    link_to_question: 'Link to question',
    bookmarked: 'Bookmarked',
    solution: "Solution",
    selected_option: 'My Answer',
    date_attempted: 'Date',
    time_taken: 'Time taken',
    difficulty: 'Difficulty',
    question_source: 'Source',
}

export enum SubscriptionStatus {
    Inactive = 'Inactive',
    Active = 'Active',
    Expired = 'Expired'
}

export enum SubscriptionPlane {
    Free = 'Free',
    Premium = "Premium"
}

export enum Modes {
    Light = 'light',
    Dark = "dark"
}

export const ColorPalette = {
    light: {
        pieColorPalette: [
            "#E9AE3D",
            "#EA8934",
            "#27931D",
            "#6156A6",
            "#6D84BF",
            "#B23D75",
        ],
        CartesianGrid: "#DEDEDE",
        topLineCharts: "#4B7D8F",
        weekelyLineCharts: "#EA8934",
        accuracyPieCorrect: "#125167",
        accuracyPieIncorrect: "#EA8934",
        pieFill: "#EFEDEC",
        pieLabels: "#252525",
        pieLabels2: "#125167",
        pieLabels3: "#125167",
        ConnectingLine: "#125167"
    },
    dark: {
        pieColorPalette: [
            "#FAE38E",
            "#FCAC63",
            "#BB86FC",
            "#3700B3",
            "#D0667A",
            "#63FCD7",
            "#6D84BF",
            "#CCD6F6",
        ],
        CartesianGrid: "#252525",
        topLineCharts: "#FCAC63",
        weekelyLineCharts: "#FCAC63",
        accuracyPieCorrect: "#FAE38E",
        accuracyPieIncorrect: "#FCAC63",
        pieFill: "#121212",
        pieLabels: "#FCAC63",
        pieLabels2: "#FFFFFF",
        pieLabels3: "#FCAC63",
        ConnectingLine: "#FCAC63"
    }
}

export const gmatWhizHeaders = [
    { id: "Solution", label: "Solution" },
    { id: "difficulty", label: "Difficulty" },
    { id: "time_taken", label: "Time Taken" },
]
export const eGmatHeaders = [
    { id: "question_type", label: "Question Type" },
    { id: "category", label: "Category" },
    { id: "difficulty", label: "Difficulty" },
    { id: "solution", label: "Solution" },
    { id: "time_taken", label: "Time Taken" },
    { id: "date_attempted", label: "Date Attempted" },
]
export const testPrepHeaders = [
    { id: "question_type", label: "Question Type" },
    { id: "difficulty", label: "Difficulty" },
    { id: "solution", label: "Solution" },
    { id: "time_taken", label: "Time Taken" },
    { id: "date_attempted", label: "Date Attempted" },
]