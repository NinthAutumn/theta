<template>
  <div class="browse-booklist">
    <ul class="browse-booklist__list">
      <li class="browse-booklist__item" v-for="(book,index) in books" :key="book.id">
        <book-card :index="index" rating :cover="book.cover" :book="book" :type="'search'"></book-card>
      </li>
    </ul>
    <client-only>
      <infinite-loading :identifier="infiniteId" @infinite="infiniteHandler"></infinite-loading>
    </client-only>
  </div>
</template>
<script>
export default {
  props: {
    books: Array,
    trendings: Boolean,
    history: Boolean,
    type: Number,
    category: { type: Array, default: [] },
    direction: [String, Number],
    tags: Array,
    page: Number,
    infiniteId: Number,
    query: String
  },
  components: {
    BookCard: () => import("@/components/Web/Cards/Book/Search")
  },
  methods: {
    async infiniteHandler($state) {
      const genres = this.category
        .filter(val => val.type === "genre")
        .map(val => val.id);
      const tags = this.category
        .filter(val => val.type === "tag")
        .map(val => val.id);
      const books = await this.$store.dispatch("book/browseBooks", {
        type: this.type,
        direction: this.direction,
        genres: genres,
        tags: tags,
        page: this.page,
        limit: 20,
        infinite: true,
        query: this.query
      });
      this.$emit("setPage", this.page + 1);
      // if()
      if (books.length > 0) {
        $state.loaded();
      } else {
        $state.complete();
      }
    }
  }
};
</script>
<style lang="scss">
.browse-booklist {
  $self: &;
  // z-index: -1;
  &__sort {
    .flex-divider {
      height: 100%;
    }
    box-shadow: 1px 1px 5px 0px rgb(233, 233, 233);
    width: 120px;
    height: 30px;
    position: relative;
    color: grey;
    .selected {
      color: rgb(71, 71, 71);
    }
    &__options {
      position: absolute;
      top: -10px;
      width: 100%;
      background-color: #fff;
      box-shadow: 0px 8px 24px rgb(233, 233, 233);
      .disabled {
        color: #f4648a;
        font-size: 13px;
      }
      &__item {
        font-size: 14px;
        height: 30px;
        color: black;
        transition: color 100ms;

        &:hover {
          color: #f4648a;
          transition: color 100ms;
        }
      }
    }
    &:hover {
      cursor: pointer;
      background-color: rgb(245, 245, 245);
      transition: 200ms;
    }
    &__icon {
      margin-right: 5px;
      font-size: 14px;
    }
    &__text {
      font-size: 14px;
    }
  }
  &__list {
    display: grid;
    /* autoprefixer: ignore next; */

    /* autoprefixer: ignore next */
    grid-gap: 1rem;
  }
  @media screen and (max-width: 500px) {
    &__list {
      grid-template-columns: repeat(3, minmax(5rem, 15rem));
    }
  }
  @media screen and (max-width: 1440px) {
    &__list {
      grid-template-columns: repeat(2, minmax(25rem, 100rem));
    }
  }
  @media screen and (min-width: 1500px) {
    &__list {
      grid-template-columns: repeat(3, minmax(25rem, 100rem));
    }
  }
}
</style>
