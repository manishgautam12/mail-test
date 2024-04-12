import mysql from "mysql";
export const pool = mysql.createPool({
    connectionLimit: 10,
    host: 'localhost',
    user: 'root',
    password: 'Sarla@#1234',
    database: 'nodejs_project'
});
