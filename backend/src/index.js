const express = require("express")
const { request, response } = require("express")

const app = express()
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
 * Route Params:
 * Request Body:
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
   return response.json([
      "Projeto 1",
      "Projeto 2",
      "Projeto 3"
   ])
})

app.put('/projects/:id', (request, response) => {
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