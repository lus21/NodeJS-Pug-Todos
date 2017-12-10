const { Router } = require('express');

const todos = Router();

/**
* [{id: number, title: string }]
*/
let id = 0;
const todosArray = [];

//shows all todos, homepage
todos.get('/', (req, res) => {
	res.render('todos/index', {todos: todosArray});
});

//shows add new todo page
todos.get('/new', (req, res) => {
	res.render('todos/new');
});

//add new todo action, redirects homepage
todos.post('/new', (req, res) => {
	const newTodo = {
		id: id++,
		title: req.body.title
	};
	todosArray.push(newTodo);
	res.redirect('/');
});

//shows update todo page
todos.get('/update/:id', (req, res) => {
	const  index = todosArray.findIndex((element) => {
		return element.id == req.params.id;
	});
	if (index>=0) res.render('todos/update', {todo: todosArray[index]});
	res.redirect('/');
});

//update todo action, redirects to homepage
todos.post('/update/:id', (req, res) => {
	const  index = todosArray.findIndex((element) => {
		return element.id == req.params.id;
	}); 
	const updateTitle = req.body.title;
	todosArray[index].title = updateTitle;
	res.redirect('/');
});

//deletes todo(s) by specified id or all depends from id value.redirects to homepage
todos.get('/delete/:id', (req, res) => {
	if (req.params.id === 'all') {
		todosArray.length = 0;
		res.redirect('/');
	}
	const  index = todosArray.findIndex((element) => {
		return element.id == req.params.id;
	}); 
	if (index >= 0) todosArray.splice(index, 1);
	res.redirect('/');
});

module.exports = todos;