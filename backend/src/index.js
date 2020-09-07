const express = require("express")
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
 * Query Params: Principalmente para filtos e paginação
 * Route Params: Identificar recursos (Atualizar ou deletar)
 * Request Body: Conteúdo na hora de criar ou editar um recurso (JSON)
 */

app.get('/projects', (request, response) => {

   // Forma comum:
   const query = request.query
   console.log(query)
   console.log(query.nome)
   console.log(query.idade)

   // Utilizando desestruração:
   const {nome, idade} = request.query 
   console.log(nome)
   console.log(idade)


   return response.json([
      "Projeto 1",
      "Projeto 2"
   ])
})





app.post('/projects', (request, response) => {

   // Forma comum:
   const body = request.body
   console.log(body)

   // Utilizando desestruração:
   const {nome} = request.body
   const {curso} = request.body
   console.log(nome)
   console.log(curso)

   return response.json([
      "Projeto 1",
      "Projeto 2",
      "Projeto 3"
   ])
})






app.put('/projects/:id', (request, response) => {

   // Forma comum:
   const params = request.params
   console.log(params)

   // Forma com desestruturação:
   const { id } = request.params
   console.log(id)

   return response.json([
      "Projeto 4",
      "Projeto 2",
      "Projeto 3"
   ])
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