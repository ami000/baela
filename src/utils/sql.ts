import SQLite from 'react-native-sqlite-storage';

// Enable debugging and database logging (optional)
SQLite.DEBUG(true);
SQLite.enablePromise(true);

interface ILocalDB extends SQLite.SQLiteDatabase {
    exec?: any
}

export let LocalDB: ILocalDB;

// Open or create the database
export const initializeDatabase = async () => {
    try {
        LocalDB = await SQLite.openDatabase({ name: 'localDB', location: 'default' });

        // Create the table if it doesn't exist
        await LocalDB.executeSql(`
      CREATE TABLE IF NOT EXISTS error_logs (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        error_template_id TEXT NOT NULL,
        section TEXT,
        category TEXT,
        subcategories TEXT,
        question_type TEXT,
        topic_names TEXT,
        subtopic_names TEXT,
        brief_question_text TEXT,
        link_to_question TEXT,
        bookmarked BOOLEAN,
        guessed BOOLEAN,
        date_attempted DATE,
        time_taken TEXT,
        performance BOOLEAN,
        difficulty TEXT,
        question_source TEXT,
        careless_mistake BOOLEAN,
        anxiety INTEGER,
        conceptual_gap BOOLEAN,
        time_mismanagement BOOLEAN,
        vocabulary_void BOOLEAN,
        comprehension_error BOOLEAN,
        description TEXT,
        learnings TEXT,
        notes TEXT,
        question_id TEXT,
        user_id TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        solution TEXT,
        selected_option TEXT
      );
    `);
        LocalDB.exec = LocalDB.executeSql
    } catch (error) {
        console.error("Error initializing database:", error);
    }
};
