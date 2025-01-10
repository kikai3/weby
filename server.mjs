import mysql from 'mysql2';
import express from 'express';
import cors from 'cors';

const server = express();
const port = process.env.PORT || 8000;
server.use(express.json());
server.use(cors());
server.listen(port, ()=>{
    console.log(`Server running on port ${port}`);
});

const database = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'kayladb'
});

database.connect((err)=>{
    err ? console.error("Database not connected") : console.log("Database connected...");
});

// Create task
server.post('/create-task', (req,res) =>(!req.body.taskName || !req.body.taskDescription ? res.status(400).json({message: 'Missing task description or task name.'}) : database.query('INSERT INTO tasks (taskName, taskDescription) VALUES (?,?)',[req.body.taskName, req.body.taskDescription], (err) => res.status(err ? 500 : 200).json({message : err ? 'Server error' : 'Task created!'}))));
// Update task
server.put('/update-task/:taskID', (req,res) => (!req.body.taskName || !req.body.taskDescription ? res.status(400).json({message: 'Missing task description or task name.'}) : database.query('UPDATE tasks SET taskName = ? , taskDescription = ? WHERE taskID = ?', [req.body.taskName, req.body.taskDescription, req.params.taskID], (err)=> res.status(err ? 500 : 200).json({message: err ? 'Server error' : 'Task Updated!'}))));
// Delete task
server.delete('/delete-task/:taskID', (req, res) => (!req.params.taskID ? res.status(400).json({message: 'Missing task ID'}) : database.query('DELETE FROM tasks WHERE taskID = ?', [req.params.taskID], (err)=> res.status(err ? 500 : 200).json({message: err ? 'Server error' : 'Task Deleted!'} ) )));
// View task
server.get('/view-task/:taskID', (req, res) => (req.params.taskID ? database.query('SELECT * FROM tasks WHERE taskID = ?', [req.params.taskID], (err, result) => res.status(err ? 500 : result.length ? 200 : 404).json(err ? { message: 'Server error' } : result.length ? result[0] : { message: 'Task not found' })) : res.status(400).json({ message: 'Missing ID' })));
// View all tasks
server.get('/view-all-tasks', (req,res) => database.query('SELECT * FROM tasks', (err,result) => res.status(err ? 500 : result.length ? 200 : 404).json(err ? {message : 'Server error'} : result.length ? result : {message : 'No tasks found'})));


server.post('/add-finished-task', (req, res) => (!req.body.finishedTaskName || !req.body.finishedTaskDescription || !req.body.finishedCreatedTime) ? res.status(400).json({ message: 'Please fill it all' }) : database.query('INSERT INTO finished_tasks (finishedTaskName, finishedTaskDescription, finishedTaskCreatedTime) VALUES (?,?,?)', [req.body.finishedTaskName, req.body.finishedTaskDescription, req.body.finishedCreatedTime], (err) => res.status(err ? 500 : 200).json({ message: err ? 'Server error' : 'Task marked as finished' })));

// Existing endpoint to view all finished tasks
server.get('/view-all-finished-tasks', (req, res) => {
    database.query('SELECT * FROM finished_tasks', (err, result) =>
        res.status(err ? 500 : result.length ? 200 : 404).json(err ? { message: 'Server error' } : result.length ? result : { message: 'No finished tasks found' })
    );
});
server.delete('/delete-finished-task/:taskID', (req, res) => (!req.params.taskID ? res.status(400).json({message: 'Missing task ID'}) : database.query('DELETE FROM tasks WHERE taskID = ?', [req.params.taskID], (err)=> res.status(err ? 500 : 200).json({message: err ? 'Server error' : 'Task Marked done!'} ) )));


