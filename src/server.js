//servidor
const express =require('express')
const server = express()

const {pageLanding, pagestudy, pagegiveclasses,saveClasses} = require('./pages')
 

// configurar nunjucks
const nunjucks = require('nunjucks')
nunjucks.configure('src/view', {
    express:server,
    noCache: true,
})

server
// receber  os dados do req.body
.use(express.urlencoded({extended: true}))

.use(express.static("public"))

.get("/", pageLanding)
.get("/study",pagestudy) 
.get("/give-classes",pagegiveclasses)
.post("/save-classes", saveClasses)
.listen(5500) 