const Book = require('../models/book')

exports.getBooks = async (req, res) => {
  const userId = req.session.userId
  try {
    const books = await Book.findAll({ where: { userId } })
    res.render('livros/books-list', { books })
  } catch (err) {
    console.log(err)
    res.status(500).send('Erro ao recuperar livros.')
  }
}

exports.getReadBooks = async (req, res) => {
  const userId = req.session.userId
  try {
    const books = await Book.findAll({ where: { userId, read: true } })
    res.render('livros/lidos-book', { books }) // Renderizando livros lidos
  } catch (err) {
    console.log(err)
    res.status(500).send('Erro ao recuperar livros lidos.')
  }
}

exports.addBook = async (req, res) => {
  const { title, author, description, year, genre, read } = req.body
  const userId = req.session.userId

  try {
    await Book.create({
      title,
      author,
      description,
      year,
      genre,
      read: read === 'on' ? true : false,
      userId
    })
    res.redirect('/books') // Redireciona para a lista de livros
  } catch (err) {
    console.log(err)
    res.status(500).send('Erro ao adicionar livro')
  }
}

exports.editBookForm = async (req, res) => {
  const { id } = req.params
  const userId = req.session.userId

  try {
    const book = await Book.findOne({ where: { id, userId } })
    if (!book) {
      return res.status(404).send('Livro não encontrado.')
    }
    res.render('livros/edit-book', { book }) // Renderiza o formulário de edição
  } catch (err) {
    console.log(err)
    res.status(500).send('Erro ao recuperar livro para edição')
  }
}

exports.editBook = async (req, res) => {
  const { id } = req.params
  const { title, author, description, year, genre, read } = req.body
  const userId = req.session.userId

  try {
    const book = await Book.findOne({ where: { id, userId } })
    if (!book) {
      return res.status(404).send('Livro não encontrado.')
    }

    await book.update({
      title,
      author,
      description,
      year,
      genre,
      read: read === 'on' ? true : false
    })

    res.redirect(`/books/${id}`) // Redireciona para a página do livro
  } catch (err) {
    console.log(err)
    res.status(500).send('Erro ao atualizar livro')
  }
}

exports.viewBook = async (req, res) => {
  const { id } = req.params
  const userId = req.session.userId

  try {
    const book = await Book.findOne({ where: { id, userId } })
    if (!book) {
      return res.status(404).send('Livro não encontrado')
    }
    res.render('livros/view-book', { book }) // Renderiza os detalhes do livro
  } catch (err) {
    console.log(err)
    res.status(500).send('Erro ao visualizar livro')
  }
}

exports.markRead = async (req, res) => {
  const { id } = req.params
  const userId = req.session.userId

  try {
    const book = await Book.findOne({ where: { id, userId } })
    if (!book) {
      return res.status(404).send('Livro não encontrado')
    }

    await book.update({
      read: !book.read // Alterna entre lido e não lido
    })

    res.redirect(`/books/${id}`)
  } catch (err) {
    console.log(err)
    res.status(500).send('Erro ao marcar livro como lido')
  }
}

exports.deleteBook = async (req, res) => {
  const { id } = req.params
  const userId = req.session.userId

  try {
    const book = await Book.findOne({ where: { id, userId } })
    if (!book) {
      return res.status(404).send('Livro não encontrado')
    }

    await book.destroy() // Deleta o livro
    res.redirect('/books')
  } catch (err) {
    console.log(err)
    res.status(500).send('Erro ao deletar livro')
  }
}
