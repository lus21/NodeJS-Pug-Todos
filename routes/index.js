module.exports = function(app){
	app.use('/', require('./todos.routes'));
	app.use('/users', require('./users.routes'));
};