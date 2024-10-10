export const totalQuery = () => `SELECT count(*) FROM error_logs`

export const performanceQuery = () => `SELECT
SUM(CASE WHEN solution = 'Correct' THEN 1 ELSE 0 END) AS correct,
SUM(CASE WHEN solution = 'Incorrect' THEN 1 ELSE 0 END) AS incorrect,
category AS name
FROM error_logs
GROUP BY name
order by date_attempted desc`;

export const tmtQuery = () => `
WITH TimeInSeconds AS (
    SELECT
        (CAST(SUBSTR(time_taken, 1, INSTR(time_taken, ':') - 1) AS INTEGER) * 60 + 
        CAST(SUBSTR(time_taken, INSTR(time_taken, ':') + 1) AS INTEGER)) AS time_in_seconds,
        CAST(CAST((JULIANDAY(date_attempted) - JULIANDAY((SELECT MIN(date_attempted) FROM error_logs))) / 7 AS INTEGER) + 1 AS TEXT)  AS week,
        category AS name
    FROM error_logs
)
SELECT AVG(time_in_seconds) AS avg,name,week
FROM TimeInSeconds GROUP BY week,name order by week desc limit 10;`;


export const monthsQuery = () => `SELECT
strftime('%Y', date_attempted) AS year,
strftime('%m', date_attempted) AS month
FROM error_logs GROUP BY
year,month order by date_attempted desc`

export const overallQuery = () => `SELECT
strftime('%Y', date_attempted) AS year,
strftime('%m', date_attempted) AS month,
strftime('%d', date_attempted) AS day,
(strftime('%j', date_attempted) - 1) / 7 + 1 AS week_number,
CAST(CAST((JULIANDAY(date_attempted) - JULIANDAY((SELECT MIN(date_attempted) FROM error_logs))) / 7 AS INTEGER) + 1 AS TEXT)  AS name,
SUM(CASE WHEN solution = 'Correct' THEN 1 ELSE 0 END) AS correct,
SUM(CASE WHEN solution = 'Incorrect' THEN 1 ELSE 0 END) AS incorrect
FROM error_logs GROUP BY
name order by date_attempted desc`

export const quantQuery = () => `SELECT
CAST(CAST((JULIANDAY(date_attempted) - JULIANDAY((SELECT MIN(date_attempted) FROM error_logs))) / 7 AS INTEGER) + 1 AS TEXT)  AS name,
SUM(CASE WHEN solution = 'Correct' THEN 1 ELSE 0 END) AS correct,
SUM(CASE WHEN solution = 'Incorrect' THEN 1 ELSE 0 END) AS incorrect
FROM error_logs
where category = 'Problem Solving (PS)'
GROUP BY name
order by date_attempted desc`;

export const diQuery = () => `SELECT
CAST(CAST((JULIANDAY(date_attempted) - JULIANDAY((SELECT MIN(date_attempted) FROM error_logs))) / 7 AS INTEGER) + 1 AS TEXT)  AS name,
SUM(CASE WHEN solution = 'Correct' THEN 1 ELSE 0 END) AS correct,
SUM(CASE WHEN solution = 'Incorrect' THEN 1 ELSE 0 END) AS incorrect
FROM error_logs
where category = 'Multi-Source Reasoning (MSR)' or category = 'Data Sufficiency (DS)' or category = 'Two-part Analysis (TPA)'
GROUP BY name
order by date_attempted desc`;

export const verbalQuery = () => `SELECT
CAST(CAST((JULIANDAY(date_attempted) - JULIANDAY((SELECT MIN(date_attempted) FROM error_logs))) / 7 AS INTEGER) + 1 AS TEXT)  AS name,
SUM(CASE WHEN solution = 'Correct' THEN 1 ELSE 0 END) AS correct,
SUM(CASE WHEN solution = 'Incorrect' THEN 1 ELSE 0 END) AS incorrect
FROM error_logs
where category = 'Critical Reasoning (CR)' or category =  'Reading Comprehension (RC)' or category = 'Sentence Correction (EA only)'
GROUP BY name
order by date_attempted desc`;

export const weekyChartQuery = (month: number, year: string) => `SELECT
strftime('%m', date_attempted) AS month,
strftime('%Y', date_attempted) AS year,
CAST(CAST((JULIANDAY(date_attempted) - JULIANDAY((SELECT MIN(date_attempted) FROM error_logs))) / 7 AS INTEGER) + 1 AS TEXT)  AS name,
SUM(CASE WHEN solution = 'Correct' THEN 1 ELSE 0 END) AS correct,
SUM(CASE WHEN solution = 'Incorrect' THEN 1 ELSE 0 END) AS incorrect
FROM error_logs
where CAST(CAST(STRFTIME('%m', date_attempted) AS INTEGER)  AS TEXT) = '${month}' and strftime('%Y', date_attempted) = '${year}'
GROUP BY name
order by date_attempted`;

export const accuracyChartQuery = (month: number, year: string) => `SELECT 'Correct' AS name,
SUM(CASE WHEN solution = 'Correct' THEN 1 ELSE 0 END) AS value
FROM error_logs
where CAST(CAST(STRFTIME('%m', date_attempted) AS INTEGER)  AS TEXT) = '${month}' and strftime('%Y', date_attempted) = '${year}'
UNION ALL
SELECT 'Incorrect' AS name,
SUM(CASE WHEN solution = 'Incorrect' THEN 1 ELSE 0 END) AS value
FROM error_logs where CAST(CAST(STRFTIME('%m', date_attempted) AS INTEGER)  AS TEXT) = '${month}' and strftime('%Y', date_attempted) = '${year}';`

export const categoryChartQuery = (month: number, year: string) => `SELECT category AS name,
SUM(1) AS value
FROM error_logs
where CAST(CAST(STRFTIME('%m', date_attempted) AS INTEGER)  AS TEXT) = '${month}' and strftime('%Y', date_attempted) = '${year}'
GROUP BY name;`

export const subCategoryChartQuery = (month: number, year: string, cat: string) => `SELECT 'Correct' AS name,
SUM(CASE WHEN solution = 'Correct' THEN 1 ELSE 0 END) AS value
FROM error_logs where
CAST(CAST(STRFTIME('%m', date_attempted) AS INTEGER)  AS TEXT) = '${month}' and
strftime('%Y', date_attempted) = '${year}' and category = '${cat}'
UNION ALL
SELECT 'Incorrect' AS name,
SUM(CASE WHEN solution = 'Incorrect' THEN 1 ELSE 0 END) AS value
FROM error_logs where
CAST(CAST(STRFTIME('%m', date_attempted) AS INTEGER)  AS TEXT) = '${month}' and
strftime('%Y', date_attempted) = '${year}' and category = '${cat}';`

export const lastThreeErrorLogQuery = () => `SELECT * FROM error_logs order by date_attempted desc limit 3;`

export const insertIntoErrorLogTable = () => `INSERT INTO error_logs (
        id, error_template_id, section, category, subcategories, question_type, topic_names, subtopic_names, brief_question_text, link_to_question, bookmarked, solution, guessed, selected_option, date_attempted, time_taken,
        performance, difficulty, question_source, careless_mistake, anxiety, conceptual_gap, time_mismanagement, vocabulary_void, comprehension_error, description, learnings, notes, question_id, user_id)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`