// import {
//   axios
// } from 'axios'

export const state = () => ({
  // books: [],
  books: {
    highestrated: {}
  },
  view: "",
  bookSynopsis: true
})

export const getters = {
  highestrated: state => state.highestrated,
  isTrending: (state) => {

  }
}

export const actions = {
  async getBook({
    commit
  }, id) {
    await this.$axios.get(process.env.baseUrl + '/books/show?id=' + id).then((res) => {
      // console.log()
      commit('SHOW', res.data.book)
    })
    await this.$axios.get(process.env.baseUrl + "/books/bookview?id=" + id).then((res) => {
      // console.log(res.data);
      commit('BOOK_VIEW', res.data)
    })
  },
  async addBook({
    commit
  }, book) {
    await this.$axios.post(process.env.baseUrl + '/books/add', {
      title: book.title,
      genres: book.genres,
      synopsis: book.synopsis,
      price: book.price,
      tags: book.tags,
      cover: book.cover,
      published: book.published,
      author: book.userId
    }).then((response) => {
      commit('ALL', response)
    })

    // commit('add', book)
  },
  async editBook({
    commit
  }) {

  },
  async deleteBook({
    commit
  }) {

  },
  async allBooks({
    commit
  }) {
    const book = await this.$axios.get(process.env.baseUrl + '/homepage/highestrated')
    // console.log(book.data);
    commit('HIGHEST_RATED', book.data)


    // console.log(state.books)
  }
}

export const mutations = {
  ADD(state, book) {
    state.books.push(book)
  },
  HIGHEST_RATED(state, books) {
    state.books.highestrated = books
  },
  SHOW(state, book) {
    state.book = book
  },
  EDIT() {

  },
  UPDATE() {

  },
  DELETE() {

  },
  BOOK_VIEW(state, view) {
    state.view = view
  }

}
