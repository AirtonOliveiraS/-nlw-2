const Database = require('./database/db')

const {subjects, weekdays,getSubject, convertHourstoMinutes } = require('./utils/formate')
 
function pageLanding(req, res){
    return res.render("index.html")
}
async function pagestudy(req, res){
    const filters = req.query

    if (!filters.subject || !filters.weekday || !filters.time){
        return res.render("study.html", {filters,subjects,weekdays})
    }

        //converter horas em minutos
    const timeToMinutes = convertHourstoMinutes(filters.time)
    const query = `

      SELECT classes.*,proffys.*
      FROM proffys
      JOIN  classes ON(classes.proffy_id = proffy_id)
      WHERE EXISTS(
         SELECT class_shedule.*
         FROM class_shedule
         WHERE class_shedule.class_id = classes.id
         AND class_shedule.weekday = ${filters.weekday}
         AND class_shedule.time_from <= ${timeToMinutes}
         AND class_shedule.time_to > ${timeToMinutes}
   )    
   AND classes.subject = '${filters.subject}'
    
    `

//caso haja erro na consulta do bando de dados
try {
    const db = await Database
    const proffys = await db.all(query)

    proffys.map((proffy)=>{
        proffy.subject = getSubject(proffy.subject)
    })

    return res.render('study.html',{ proffys, subjects, filters, weekdays})

} catch (error) {
    console.log(error)
}    
   
}
function pagegiveclasses(req, res){
   
    return res.render("give-classes.html",{subjects, weekdays})
}

async function saveClasses(req, res){
   const createProffys = require('./database/createProffys')

   const proffyValue = {
       name:req.body.name,
       avatar:req.body.avatar,
       whatsapp:req.body.whatsapp,
       bio:req.body.bio
   }
   
   const classValue = {
       subject:req.body.subject,
       cost:req.body.cost
   }

   const classSheduleValues = req.body.weekday.map((weekday,index)=>{
        return{
            weekday, 
            time_from:convertHourstoMinutes(req.body.time_from[index]), 
            time_to:convertHourstoMinutes(req.body.time_to[index])
        }

   })

    try {
        const db = await  Database
        await createProffys(db,{ proffyValue, classValue, classSheduleValues})
         
     let queryString = "?subject=" + req.body.subject
     queryString += "&weekday=" + req.body.weekday[0]
     queryString += "&time=" + req.body.time_from[0]  

         return res.redirect("/study" + queryString)  
    } catch (error) {
        console.log(error)
    }
   

}

module.exports = {
    pageLanding,
    pagestudy,
    pagegiveclasses,
    saveClasses 
}