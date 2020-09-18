const express = require("express")
const cors = require('cors')
const {uuid, isUuid} = require("uuidv4") //importando a função uuid de dentro da biblioteca uuidv4

const app = express()

app.use(cors())//vai permitir que qualquer front-end com acesso ao nosso back-end
app.use(express.json()) //fazendo com que o express consiga interpretar um JSON



//MÉTODOS HTTP:
// 
//GET: Buscar informações do back-end
//POST: Criar uma informação no back-end
//PUT: Alterar uma informação no back-end
//DELETE: Deletar uma informação no back-end 

 
/**
 * TIPOS DE PARÂMETROS:
 * 
 * Query Params: Principalmente para filtros e paginação
 * Route Params: Identificar recursos (Atualizar ou deletar)
 * Request Body: Conteúdo na hora de criar ou editar um recurso (JSON)
 */

/**
 * MIDDLEWARE: 
 * 
 * Interceptador de requisições que interrompem totalmente a requisição ou altera dados da requisição.
 */



const projects = []


//middleware
function logRequests(request, response, next){

   const { method, url} = request
   const logLabel = `[${method.toUpperCase()} ${url}]`

   console.time(logLabel)

   next() //Próximo middleware
   console.timeEnd(logLabel)

}



function validateProjectId(request, response, next){
   const { id } = request.params

   if(!isUuid(id)){
      return response.status(400).json({
         error: "Invalid project id"
      })
   }

   return next()
}

app.use(logRequests)
app.use("/projects/:id", validateProjectId) //adicionando esse middleware apenas nas rotas que tem esse formato



app.get('/projects', (request, response) => {

   const {nome} = request.query 

   const results = nome 
    ? projects.filter(project => project.nome.includes(nome))
    : projects;


   return response.json(results)
})








app.post('/projects', (request, response) => {

   const { nome, curso } = request.body

   const project = { id: uuid(), nome, curso } 
   //utilizando a biblioteca uuidv4 para criação de id

   projects.push(project)

   return response.json(project)

})









app.put('/projects/:id', (request, response) => {

   const { id } = request.params
   const { nome, curso } = request.body //conteúdo que eu posso alterar


   const projectIndex = projects.findIndex(project => project.id === id)
   //percorrendo o array projects procurando por um project cujo o id seja igual 
   //ao id que está sendo passado por parâmetro na rota 
   //O findIndex vai retornar a posição do projeto dentro do array

   if(projectIndex < 0){
      return response.status(400).json({
         error: "Project not found."
      })
   }

   const project = {
      id,
      nome,
      curso
   }

   projects[projectIndex] = project 

   return response.json(project)

})



 





app.delete('/projects/:id', (request, response) => {

   const {id} = request.params

   const projectIndex = projects.findIndex(project => project.id === id)
   //percorrendo o array projects procurando por um project cujo o id seja igual 
   //ao id que está sendo passado por parâmetro na rota 
   //O findIndex vai retornar a posição do projeto dentro do array

   if(projectIndex < 0){
      return response.status(400).json({
         error: "Project not found."
      })
   }

   projects.splice(projectIndex, 1)
   // usando o método splice para retirar um dado do array a partir do seu índice
   // no caso, aqui está sendo retirado o índice que foi atribuído a const projectIndex
   // esse 1 como segundo parâmetro, quer dizer que apenas uma posição deverã ser removida


   return response.status(204).send()
})






app.listen(3333, ()=>{
   console.log("🚀 Back-end started!")
})