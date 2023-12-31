"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = (0, express_1.Router)();
let todos = [];
router.get('/', (req, res, next) => {
    res.status(200).json({ todos: todos });
});
router.post('/todo', (req, res, next) => {
    const newTodo = {
        id: new Date().toISOString(),
        text: req.body.text
    };
    todos.push(newTodo);
    return res.status(201).json({ message: 'added todo', todo: newTodo, todos: todos });
});
router.put('/todo/:todoID', (req, res, next) => {
    const tid = req.params.todoID;
    const todoIndex = todos.findIndex(todoItem => todoItem.id === tid);
    if (todoIndex >= 0) {
        todos[todoIndex] = { id: todos[todoIndex].id, text: req.body.text };
        return res.status(200).json({ message: 'updated todo', todos: todos });
    }
    res.status(404).json({ message: "could not find " });
});
router.delete('/todo/:todoID', (req, res, next) => {
    todos = todos.filter(todoItem => todoItem.id !== req.params.todoID);
    return res.status(200).json({ message: 'deleted todo', todos: todos });
});
exports.default = router;
