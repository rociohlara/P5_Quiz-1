const Sequelize = require('sequelize');

const options = {	logging: false, operatorsAliases: false};
const sequelize = new Sequelize("sqlite:quizzes.sqlite", options);

const quiz = sequelize.define(	//defino el modelo de datos
	'quiz',
	{ question: {
		type: Sequelize.STRING,
		unique: { msg: "Ya existe esta pregunta"},
		validate: {notEmpty: {msg: "La pregunta no puede estar vacia"}}
	},
	  answer:{
	  	type: Sequelize.STRING,
	  	validate: {notEmpty: {msg: "La pregunta no puede estar vacia"}}
	  }
});

sequelize.sync().then(() => sequelize.models.quiz.count()).then((count) => {	//sincronizo, en la base de datos existen datos? sino los creo
	if (!count){
		return sequelize.models.quiz.bulkCreate([
					{ question: 'Capital de España', answer: 'Madrid'},
					{ question: 'Capital de Francia', answer: 'Paris'},
					{ question: 'Capital de Italia', answer: 'Roma'},
					{ question: 'Capital de Rusia', answer: 'Moscu'}
				]);
			}
})
.catch( err => {
	console.log(error);
});

module.exports = sequelize;