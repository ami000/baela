export const Category = ["Quantitative Reasoning", "Verbal Reasoning", "Data Insights"]

export const Questiontypes = ["Problem Solving", "Critical Reasoning", "Reading Comprehension", "Sentence Correction", "Data Sufficiency", "Graphics Interpretation", "Graphs and Tables", "Table Analysis", "Two-Part Analysis", "Multi-Source Reasoning"]
export const Topics = [
    "Word Problems",
    "Arithmetic and Algebra",
    "Number Theory",
    "Statistics and Combinations",
    "Word Problems",
    "Arithmetic",
    "Algebra"
]
export const SubTopics = [
    "Distance/Rate Problems",
    "Mixture Problems",
    "Overlapping Sets",
    "Word Problems",
    "Work/Rate Problems",
    "Absolute Values/Modulus",
    "Algebra",
    "Arithmetic",
    "Functions and Custom Characters",
    "Fractions/Ratios/Decimals",
    "Fractions and Ratios",
    "Inequalities",
    "Min/Max Problems",
    "Must or Could be True Questions",
    "Exponents/Powers",
    "Percent and Interest Problems",
    "Roots",
    "Sequences",
    "Divisibility/Multiples/Factors",
    "Multiples and Factors",
    "Number Properties",
    "Remainders",
    "Combinations",
    "Probability",
    "Statistics and Sets Problems",
    "Distance and Speed Problems",
    "Geometry",
    "Mixture Problems",
    "Overlapping Sets",
    "Word Problems",
    "Work/Rate Problems",
    "Combinations",
    "Probability",
    "Statistics and Sets Problems",
    "Percent and Interest Problems",
    "Min/Max Problems",
    "Non Math Related",
    "Non-Math Related",
    "Math Related",
    "Arithmetic",
    "Roots",
    "Sequences",
    "Number Properties",
    "Absolute Values/Modulus",
    "Algebra",
    "Inequalities",
    "Exponents/Powers",
    "Functions and Custom Characters",
    "Remainders",
    "Humanities",
    "Social Science",
    "Short Passage",
    "Long Passage"
]
export const Mapper: any = {
    "Quantitative Reasoning": {
        "Problem Solving": [
            {
                "name": "Word Problems",
                "subtopics": [
                    "Distance/Rate Problems",
                    "Distance and Speed Problems",
                    "Geometry",
                    "Mixture Problems",
                    "Overlapping Sets",
                    "Word Problems",
                    "Work/Rate Problems"
                ]
            },
            {
                "name": "Arithmetic and Algebra",
                "subtopics": [
                    "Absolute Values/Modulus",
                    "Algebra",
                    "Arithmetic",
                    "Functions and Custom Characters",
                    "Fractions/Ratios/Decimals",
                    "Fractions and Ratios",
                    "Inequalities",
                    "Min/Max Problems",
                    "Must or Could be True Questions",
                    "Exponents/Powers",
                    "Percent and Interest Problems",
                    "Roots",
                    "Sequences"
                ]
            },
            {
                "name": "Number Theory",
                "subtopics": [
                    "Divisibility/Multiples/Factors",
                    "Multiples and Factors",
                    "Number Properties",
                    "Remainders"
                ]
            },
            {
                "name": "Statistics and Combinations",
                "subtopics": [
                    "Combinations",
                    "Probability",
                    "Statistics and Sets Problems"
                ]
            }
        ]
    },
    "Verbal Reasoning": {
        "Critical Reasoning": [
            "Assumption",
            "Additional Evidence",
            "Bold Face CR",
            "Cause and Effect",
            "Complete the Passage",
            "Conclusion",
            "Evaluate Argument",
            "Except",
            "Inference",
            "Logical Flaw",
            "Method of Reasoning",
            "Must be True",
            "Numbers",
            "Resolve Paradox",
            "Similar Reasoning",
            "Strengthen",
            "Weaken"
        ],
        "Reading Comprehension": [
            "Main Idea questions",
            "Specific detail questions",
            "Inference & Reasoning questions",
            "Vocabulary-related questions (based on the context)",
            "Humanities",
            "Social Science",
            "Short Passage",
            "Long Passage"
        ],
        "Sentence Correction": ["Grammatical/Rhetorical Construction"]
    },
    "Data Insights": {
        "Data Sufficiency": [
            {
                "name": "Word Problems",
                "subtopics": [
                    "Distance/Rate Problems",
                    "Distance and Speed Problems",
                    "Geometry",
                    "Mixture Problems",
                    "Overlapping Sets",
                    "Word Problems",
                    "Work/Rate Problems",
                    "Combinations",
                    "Probability",
                    "Statistics and Sets Problems",
                    "Percent and Interest Problems",
                    "Min/Max Problems",
                    "Non Math Related",
                    "Non-Math Related"
                ]
            },
            {
                "name": "Arithmetic",
                "subtopics": [
                    "Arithmetic",
                    "Fractions/Ratios/Decimals",
                    "Fractions and Ratios",
                    "Roots",
                    "Sequences",
                    "Divisibility/Multiples/Factors",
                    "Multiples and Factors",
                    "Number Properties"
                ]
            },
            {
                "name": "Algebra",
                "subtopics": [
                    "Absolute Values/Modulus",
                    "Algebra",
                    "Inequalities",
                    "Exponents/Powers",
                    "Functions and Custom Characters",
                    "Remainders"
                ]
            }
        ],
        "Graphics Interpretation": [],
        "Graphs and Tables": ["Graphs"],
        "Table Analysis": [],
        "Two-Part Analysis": ["Math Related", "Non-Math Related"],
        "Multi-Source Reasoning": []
    }
}