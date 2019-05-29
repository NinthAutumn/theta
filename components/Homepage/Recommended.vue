<template>
  <div class="recommendation-books" :class="{'recommendation-books--mobile': $device.isMobile}">
    <div class="recommendation-books__list">
      <nuxt-link
        tag="div"
        :to="'/books/' + book.id"
        class="recommendation-books__item"
        v-for="book in books"
        :key="book.id"
      >
        <div class="recommendation-books__cover">
          <!-- :src="`https://storage.googleapis.com/theta-images/${book.cover}`" -->
          <v-img
            :src="book.cover"
            :aspect-ratio="1/1.5"
            max-width="14rem"
            min-width="12rem"
            alt="Book cover"
            style="border-radius: 0.4rem;  "
          ></v-img>
        </div>
        <div class="recommendation-books__meta">
          <div class="recommendation-books__rating" v-if="!$device.isMobile">
            <v-rating color="#FF6452" readonly size="20" half-increments :value="+book.rating"></v-rating>
          </div>
          <div class="recommendation-books__title">
            <p v-line-clamp="2" v-text="book.title"></p>
            <!-- <p v-line-clamp="{lines:1,text: book.title}"></p> -->
            <!-- <v-clamp autoresize :max-lines="100"></v-clamp> -->
          </div>
          <div class="recommendation-books__author" v-if="!$device.isMobile">
            <!-- {{book.}} -->
            今期ち完治
          </div>
          <div class="recommendation-books__info" v-if="!$device.isMobile">
            <div class="recommendation-books__genre">
              <fa class="recommendation-books__icon" icon="th-large"></fa>
              <p>空想学</p>
            </div>
            <div class="recommendation-books__chapter-list">
              <fa class="recommendation-books__icon" icon="eye"></fa>
              <p>123話</p>
            </div>
          </div>
        </div>
      </nuxt-link>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  components: {},
  computed: {
    ...mapGetters({
      books: "analytic/getRecommended"
    })
  }
};
</script>

<style lang="scss">
.recommendation-books {
  display: flex;
  $self: &;
  &--mobile {
    #{$self}__list {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      /* autoprefixer: ignore next */
      grid-gap: 1rem;
      padding: 0;
      #{$self}__item {
        margin: 0;
        flex-direction: column;
        #{$self}__cover {
          margin: 0;
        }
      }
      #{$self}__info {
        display: none;
      }
      #{$self}__author {
        margin: 0;
      }
      #{$self}__title {
        font-size: 1.5rem;
        word-break: break-all;
        p {
          word-break: break-all;
        }
        margin: 0;
      }
      #{$self}__rating {
        margin: 0;
      }
      #{$self}__meta {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        padding: 0;
      }
    }

    // padding-right: 2rem;
  }
  &__list {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    /* autoprefixer: ignore next */
    grid-gap: 1.5rem;
    padding-right: 2rem;
    #{$self}__item {
      display: flex;
      // transform: scale(1);
      transition: transform 200ms ease-out;
      // align-items: center;
      &:hover {
        cursor: pointer;
        // transform: scale(1.05);
        transition: transform 200ms ease-out;
      }
      &:focus,
      &:active {
        // transform: scale(0.95);
        transition: transform 200ms ease-out;
      }
      #{$self}__cover {
        margin-right: 2rem;
      }
      #{$self}__meta {
        padding: 1rem 0;
      }
      #{$self}__title {
        margin-bottom: 1rem;
        font-size: 1.6rem;
        word-break: break-all;
        // max-height: 4rem;
        // max-height: 4rem;
        span {
          font-size: 1.6rem;
          // word-break: break-all;
        }
        p {
          // font-size: 1.6rem;
          // word-break: break-all;
        }
        // overflow: hidden;
      }
      #{$self}__author {
        margin-bottom: 2rem;
        font-size: 1.4rem;
      }
      #{$self}__rating {
        // margin: 1.5rem 0;
        margin-bottom: 1rem;
        .v-icon {
          padding: 0px;
        }
      }
      #{$self}__icon {
        color: #68b2ff;
        margin-right: 1rem;
      }
      #{$self}__genre {
        display: flex;
        font-size: 1.2rem;
        align-items: center;
        margin-bottom: 0.5rem;

        p {
          color: black;
          font-size: 1.2rem;
        }
      }
      #{$self}__chapter-list {
        display: flex;
        font-size: 1.2rem;
        align-items: center;
        p {
          font-size: 1.2rem;
        }
      }
    }
  }

  .v-icon {
  }
  .v-icon--link {
  }
}
</style>