const express = require('express')
const router = express.Router()
const isAuthenticated = require('../middlewares/authMiddleware') // Verifique se o middleware está correto
const bookController = require('../controllers/bookController')

router.get('/books', isAuthenticated, bookController.getBooks) // Usa o controlador para renderizar os livros
router.get('/books/lidos-book', isAuthenticated, bookController.getReadBooks)
router.get('/books/add-book', isAuthenticated, (req, res) => {
  res.render('livros/add-book') // Renderiza o formulário de adicionar livro
})
router.post('/books', isAuthenticated, bookController.addBook) // Adiciona um novo livro
router.get('/books/edit/:id', isAuthenticated, bookController.editBookForm) // Renders the edit form
router.post('/books/edit/:id', isAuthenticated, bookController.editBook) // Edita um livro

router.get('/books/:id', isAuthenticated, bookController.viewBook) // Renders book details

router.post('/books/mark-read/:id', isAuthenticated, bookController.markRead) // Marca como lido
router.post('/books/delete/:id', isAuthenticated, bookController.deleteBook) // Deleta um livro

module.exports = router
