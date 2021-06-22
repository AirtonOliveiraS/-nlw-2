
module.exports = async function(db,{ proffyValue, classValue, classSheduleValues }){
    
   const insertedProffy =  await db.run(`
     INSERT INTO proffys (
        name,
        avatar,
        whatsapp,
        bio
     )VALUES(
        "${proffyValue.name}",
        "${proffyValue.avatar}",
        "${proffyValue.whatsapp}",
        "${proffyValue.bio}"
     );   
   `)
   const proffy_id = insertedProffy.lastID  

   const insertedClass = await db.run(`
        INSERT INTO classes (
            subject,
            cost,
            proffy_id
        ) VALUES(
           "${classValue.subject}",
            "${classValue.cost}",
            "${proffy_id}"
        );
  `)
  const class_id = insertedClass.lastID  

         const insertedAllClassSheduleValues = classSheduleValues.map((classSheduleValue) => {
              return db.run(`
                INSERT INTO class_shedule (
                  class_id,
                  weekday,
                  time_from,
                  time_to
                ) VALUES (
                  "${class_id}",
                  "${classSheduleValue.weekday}",
                  "${classSheduleValue.time_from}",
                  "${classSheduleValue.time_to}"
                );
              `)
            })
          
            await Promise.all(insertedAllClassSheduleValues)
          }