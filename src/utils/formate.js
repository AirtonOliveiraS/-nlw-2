const subjects = [
   
    "Artes",
    "Biologia",
    "Ciências",
    "Educação Fisica",
    "Física",
    "Geografia",
    "História",
    "Matemática",
    "Portugues",
    "Química",

]
const weekdays = [
   
    "Domingo",
    "Segunda-feira",
    "Terça-feira",
    "Quarta-feira",
    "Quinta-feira",
    "Sexta-feira",
    "Sábado",
   
]
//funcionalidades

function getSubject(subjectNumber){
    const position = +subjectNumber -1
    return subjects[position]
}

 function convertHourstoMinutes(time){
    const[hour,minutes] = time.split(":")
    return Number((hour * 60) + minutes)

 }

module.exports = {
    subjects,
    weekdays,
    getSubject,
    convertHourstoMinutes
}