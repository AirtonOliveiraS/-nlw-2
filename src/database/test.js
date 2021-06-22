const Database = require('./db')
const createProffys = require('./createProffys')


Database.then(async (db)=>{
    proffyValue = {
        name:"Diego Fernandes",
         avatar:"https://avatars2.githubusercontent.com/u/2254731?s=460&amp;u=0ba16a79456c2f250e7579cb388fa18c5c2d7d65&amp;v=4" ,
         whatsapp:"90028922",
        bio:"Entusiasta das melhores tecnologias de química avançada.Apaixonado por explodir coisas em laboratório e por mudar a vida das pessoas através de experiências. Mais de 200.000 pessoas já passaram por uma das minhas explosões",
        
    }
    classValue = {
        subject: 1, 
        cost:"20",
       
    }

    classSheduleValues  = [
        {
            weekday:1, 
            time_from:720, 
            time_to:1220
    },
    {
        weekday:0, 
        time_from:520, 
        time_to:1220
      }
   ]
   // await createProffys(db,{ proffyValue, classValue, classSheduleValues }) 

   // consultar dados inseridos
   // todos os proffys
  const selectedProffys =  await db.all("SELECT * FROM proffys")

  // consultar as classes de determinado professor
  //e trazer junto os dados do professor

  const selectClassesAndProffys = await db.all(`
   SELECT classes.*,proffys.*
   FROM proffys
   JOIN  classes ON(classes.proffy_id = proffy_id)
   WHERE classes.proffy_id = 1;
  `)
  //console.log(selectClassesAndProffys )

  const selectClassesShedules  = await db.all(`
  SELECT class_shedule.*
  FROM class_shedule
  WHERE class_shedule.class_id = 1
  AND class_shedule.weekday = "0"
  AND class_shedule.time_from <= "520"
  AND class_shedule.time_to >"520"
  `)

  //console.log(selectClassesShedules)
})