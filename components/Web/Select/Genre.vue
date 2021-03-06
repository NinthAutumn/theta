<template>
  <div class="genre-select">
    <div class="genre-select__container">
      <div class="genre-select__input" v-text="placeholder||'ジャンル'" @click.stop="toggleModal"></div>
      <div class="genre-select__modal" v-if="modal" v-click-outside="toggleModal">
        <div
          class="genre-select__option"
          :class="{'genre-select__option--selected':genre.selected}"
          v-for="(genre,index) in genres"
          :key="genre.id"
          @click="selectGenreHandler(genre,index)"
          v-text="genre.name"
        ></div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  props: {
    value: {
      type: Array
    },
    limit: Number,
    disabled: {
      type: [Object, Array, String],
      default: () => ({ name: "" })
    },
    placeholder: String
  },
  data() {
    return {
      modal: false,
      selected_list: [],
      genre_list: []
    };
  },
  methods: {
    ...mapActions({
      fetchGenres: "book/fetchAllGenres"
    }),
    toggleModal() {
      this.modal = !this.modal;
    },
    selectGenreHandler(genre, index) {
      const { id, name, selected } = genre;
      if (this.disabled.name === name) {
        return;
      }
      const news = {
        name: genre.name,
        selected: !genre.selected,
        id: genre.id
      };
      this.$store.commit("book/SELECT_GENRE", {
        index,
        genre: news
      });
      let selected_list = this.genres.filter(genre => {
        return genre.selected;
      });
      this.$emit("input", selected_list);
      this.$emit("selected");
    },
    genreWatch(genre, index) {
      this.selected_list.forEach(selected => {
        if (genre.name === selected.name) {
          const news = {
            name: genre.name,
            selected: !genre.selected,
            id: genre.id
          };
          this.$store.commit("book/SELECT_GENRE", {
            index,
            genre: news
          });
          selected.id = genre.id;
        }
      });
    }
  },

  computed: {
    ...mapGetters({
      genres: "book/getGenres"
    })
  },
  watch: {
    genres() {
      if (this.selected_list.length < 1) return;
      this.genres.forEach(this.genreWatch);
      this.selected_list = [];
    }
  },
  async created() {
    await this.fetchGenres();
  },
  destroyed() {
    this.$store.commit("book/REMOVE_GENRES");
  },
  async mounted() {
    if (this.value.length > 0) {
      this.value.forEach(genre => {
        this.selected_list.push({ name: genre.name });
      });
    }
    if (this.selected_list.length > 0) {
      this.$emit("input", this.selected_list);
    }
  }
};
</script>

<style lang="scss">
.genre-select {
  $self: &;
  &__container {
    position: relative;
    #{$self}__input {
      color: rgb(80, 80, 80);
      padding: 0.5rem 2rem;
      font-size: 1.4rem;
      box-shadow: 1px 1px 5px #ececec;
      user-select: none;
      &:hover {
        cursor: pointer;
        background-color: rgb(241, 241, 241);
      }
    }
    #{$self}__modal {
      box-shadow: 0 7px 14px 0 rgba(60, 66, 87, 0.1),
        0 3px 6px 0 rgba(0, 0, 0, 0.07);
      width: 40rem;
      top: 0;
      border-radius: 0.5rem;
      right: 0;
      background-color: #fff;
      z-index: 11;
      position: absolute;
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      padding: 1rem 0;
      #{$self}__option {
        font-size: 1.4rem;
        padding: 1rem 0rem;
        &:hover {
          cursor: pointer;
          color: #f4648a;
        }
        text-align: center;
        user-select: none;
        &--selected {
          color: #f4648a;
        }
      }
    }
  }
}
</style>
