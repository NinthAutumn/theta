<template>
  <div class="book-table">
    <ul class="update-books__date-list">
      <li class="update-books__date-item" v-for="(value, key) in latestBooks" :key="key">
        <div class="update-books__date-title" v-if="value.books.length > 0">{{key.date}}</div>
        <table v-if="value.books.length > 0">
          <thead class="book-table__header">
            <th
              class="book-table__title"
              :class="'book-table__title--' + index"
              v-for="(item, index) in table_headers"
              :key="index"
            >{{item}}</th>
          </thead>
          <tbody>
            <tr v-for="(book, index) in value.books" :key="index">
              <nuxt-link
                v-if="!$device.isMobile"
                tag="td"
                :to="'/browse?genre=' + book.name"
                class="book-table__row-header book-table__row-header--genres"
              >{{book.name}}</nuxt-link>
              <nuxt-link
                tag="td"
                :to="`books/${book? book.id: ''}`"
                class="book-table__row-title"
              >{{book.title}}</nuxt-link>
              <nuxt-link
                tag="td"
                v-if="!$device.isMobile"
                :to="`/books/${book.id}/${book.chapters[0].id}`"
                class="book-table__row-index"
                v-text="`第${book.chapters[0].index}話: ${book.chapters[0].title}`"
              ></nuxt-link>
              <nuxt-link
                tag="td"
                v-else
                :to="`/books/${book.id}/${book.chapters[0].id}`"
                class="book-table__row-index"
                v-text="`第${book.chapters[0].index}話`"
              ></nuxt-link>
              <nuxt-link
                tag="td"
                v-if="!$device.isMobile"
                :to="`/author/${book.pen_name}`"
                class="book-table__row-author"
              >{{book.pen_name}}</nuxt-link>
              <td
                class="book-table__row-header"
              >{{$moment(book.chapters[0].created_at).startOf('second').fromNow()}}</td>
            </tr>
          </tbody>
        </table>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    latestBooks: [Array, Object]
  },
  data() {
    return {
      table_headers: ["ジャンル", "タイトル", "リリーズ", "作者", "時間"]
    };
  },
  created() {
    if (this.$device.isMobile) {
      this.table_headers = ["タイトル", "リリーズ", "時間"];
    }
  }
};
</script>

<style lang="scss">
.book-table {
  $self: &;
  padding: 1rem 0;
  table {
    border-spacing: 0;
    width: 100%;
    margin-bottom: 1.5rem;
    table-layout: fixed;
    tbody {
      tr {
        &:hover {
          cursor: pointer;
        }
      }
      td {
        font-size: 1.6rem;
        padding: 1rem 0.5rem;
        border-bottom: 1px solid grey;
      }
    }
  }

  &__row-header {
    font-size: 1.4rem !important;
    color: #83848f;
    width: 10%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    &--genres {
      &:hover {
        font-size: 1.4rem;
        text-decoration: underline;
      }
    }
  }
  &__row-title {
    width: 45%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    &:hover {
      text-decoration: underline;
    }
  }
  &__row-author {
    width: 10%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    &:hover {
      text-decoration: underline;
    }
  }
  &__row-index {
    width: 25%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    &:hover {
      text-decoration: underline;
    }
  }
  tbody tr:nth-child(even) {
    background: #f9fbff;
  }
  @media screen and (max-width: 400px) {
    &__header {
      #{$self}__title {
        &--0 {
          width: 60% !important;
        }
        &--1 {
          width: 20% !important;
        }
        &--2 {
          width: 20% !important;
        }
      }
    }
  }
  &__header {
    #{$self}__title {
      border-bottom: 1px solid grey;
      font-size: 1.4rem;
      font-weight: normal;

      color: #83848f;

      &--0 {
        width: 10%;
      }
      &--1 {
        width: 45%;
      }
      &--2 {
        width: 25%;
      }
      &--3 {
        width: 10%;
      }
      &--4 {
        width: 10%;
      }
    }
  }
}
</style>
