const express = require("express")
const {uuid} = require("uuidv4") //importando a função uuid de dentro da biblioteca uuidv4
const app = express()

app.use(express.json()) //fazendo com que o express consiga interpretar um JSON



//MÉTODOS HTTP
// 
//GET: Buscar informações do back-end
//POST: Criar uma informação no back-end
//PUT: Alterar uma informação no back-end
//DELETE: Deletar uma informação no back-end 

 
/**
 * TIPOS DE PARÂMETROS
 * 
 * Query Params: Principalmente para filtros e paginação
 * Route Params: Identificar recursos (Atualizar ou deletar)
 * Request Body: Conteúdo na hora de criar ou editar um recurso (JSON)
 */





   const projects = []

app.get('/projects', (request, response) => {

   // // Forma comum:
   // const query = request.query
   // console.log(query)
   // console.log(query.nome)
   // console.log(query.idade)

   // // Utilizando desestruração:
   // const {nome, idade} = request.query 
   // console.log(nome)
   // console.log(idade)


   return response.json(projects)
})





app.post('/projects', (request, response) => {

   // // Forma comum:
   // const body = request.body
   // console.log(body)

   // // Utilizando desestruração:
   // const {nome} = request.body
   // const {curso} = request.body
   // console.log(nome)
   // console.log(curso)

   const { nome, curso } = request.body

   const project = { id: uuid(), nome, curso } //utilizando a biblioteca uuidv4 para criação de id

   projects.push(project)

   return response.json(project)

})






app.put('/projects/:id', (request, response) => {

   const { id } = request.params
   const { nome, curso } = request.body


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
   return response.json([
      "Projeto 2",
      "Projeto 3"
   ])
})






app.listen(3333, ()=>{
   console.log("🚀 Back-end started!")
})