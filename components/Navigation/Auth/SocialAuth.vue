<template>
  <div class="social-auth">
    <div class="social-auth__header text--center text--large flex-row flex--align flex--center">
      <v-img style="margin-right:1rem;" width="2rem" max-width="3rem" :src="'/icon.png'"></v-img>ノーブル
    </div>

    <ul class="social-auth__list flex-column flex--center flex--align">
      <li
        v-ripple
        class="social-auth__item flex-row flex--align flex--between"
        :class="`social-auth__item--${social.value}`"
        v-for="social in social_auth"
        :key="social.value"
        @click="socialLogin(social.value)"
      >
        <fa
          v-if="social.value !== 'google'"
          class="social-auth__icon"
          :icon="{prefix:social.pref, iconName:social.icon}"
        ></fa>
        <svg-icon class="social-auth__icon social-auth__icon--google" name="google" v-else></svg-icon>
        <div class="social-auth__key">{{social.key}}</div>
      </li>
    </ul>
    <div class="social-auth__create-account">
      アカウントを持っていない?
      <br />
      <span @click="changeStep">サインアップ!</span>
    </div>
  </div>
</template>

<script>
import { mapActions, mapMutations, mapGetters } from "vuex";
export default {
  data: function() {
    return {
      social_auth: [
        {
          key: "グーグルでログイン",
          value: "google",
          icon: "google",
          pref: "fab"
        },
        {
          key: "ツイッターでログイン",
          value: "twitter",
          icon: "twitter",
          pref: "fab"
        },
        {
          key: "フェースブックでログイン",
          value: "facebook",
          icon: "facebook",
          pref: "fab"
        },
        {
          key: "メールアドレスでログイン",
          value: "local",
          icon: "envelope",
          pref: "fas"
        }
      ],
      info: {
        token: "",
        value: ""
      },
      params: {
        client_id: ""
      },
      alert: null,
      loading: false,
      google_loading: false,
      google_ready: false
    };
  },
  computed: {
    ...mapGetters({
      user: "auth/getUser"
    })
  },
  methods: {
    ...mapMutations({
      setAuth: "auth/SET_AUTH_PATH"
    }),
    ...mapActions({
      auth: "auth/socialAuth",
      fetchComments: "comment/fetchCommentList",
      fetchReviews: "review/showAll",
      checkIsReviewed: "review/fetchIsReviewed"
    }),
    loginRefresh() {
      if (!this.user.username && this.user) {
        this.$store.commit("auth/TOGGLE_USERNAME_MODAL");
      }
      this.$store.commit("LOGIN_FALSE");
      this.$emit("loginAction");
      this.$nuxt.refresh();
    },
    async facebookAuth(res) {
      if (res.authResponse) {
        await this.auth({
          token: res.authResponse.accessToken,
          strategy: "facebook"
        });
        this.loginRefresh();
        this.checkRoute();
      } else {
        this.$toast.show(`フェースブックのログインに失敗しました`, {
          theme: "toasted-primary",
          position: "top-right",
          duration: 1000,
          icon: "extension"
        });
      }
    },
    async socialLogin(value) {
      switch (value) {
        case "local":
          return this.$store.commit("SET_AUTH_PAGE", 1);
          break;
        case "facebook":
          try {
            window.FB.login(this.facebookAuth, {
              scope: "public_profile,email"
            });
          } catch (error) {
            this.$toast.show(`フェースブックのログインに失敗しました`, {
              theme: "toasted-primary",
              position: "top-right",
              duration: 1000,
              icon: "extension"
            });
          }

          break;
        case "google":
          await this.google_submit();
          break;
        case "twitter":
          this.$storage.setUniversal("path", this.$route.path);
          const { data } = await this.$axios.get("/v2/auth/social/twitter/url");
          window.location = data.url;
          break;
        default:
          break;
      }
    },
    async changeStep() {
      this.$store.commit("SET_AUTH_PAGE", 2);
    },
    async checkRoute() {
      if (this.$route.name === "books-id-chaptersId") {
        await this.fetchComments({
          chapterId: this.$route.params.chaptersId,
          sortBy: 0,
          page: 1,
          limit: 10,
          direction: 0
        });
      }
      if (this.$route.name === "books-id") {
        await this.fetchReviews({
          bookId: this.$route.params.id,
          page: 1,
          limit: 10,
          type: 0
        });
        await this.checkIsReviewed({ bookId: this.$route.params.id });
      }
    },
    async google_submit() {
      try {
        await window.google_auth2.signIn().then(async val => {
          await this.auth({
            token: val.Zi.access_token,
            strategy: "google"
          });
        });

        this.loginRefresh();
        this.checkRoute();
      } catch (error) {}
    }
  }
};
</script>

<style lang="scss">
.social-auth {
  $self: &;
  width: 100%;
  height: 90%;
  padding: 3rem;
  &__header {
    margin-bottom: 2rem;
    font-weight: bold;
  }
  &__list {
    @media screen and (max-width: 450px) {
      #{$self}__item {
        padding: 1.25rem 3rem !important;
        min-width: 30rem !important;
      }
    }
    @media screen and (max-width: 320px) {
      #{$self}__item {
        padding: 1.25rem 2.8rem !important;
        min-width: 28rem !important;
      }
    }

    #{$self}__item {
      background-color: #fff;
      font-size: 1.6rem;
      padding: 1.25rem 4rem;
      // display:flex;
      min-width: 35rem;
      max-width: 50rem;
      border: 0px solid;
      margin-bottom: 1.5rem;
      border-radius: 0.5rem;
      transition: box-shadow 150ms ease;
      user-select: none;
      box-shadow: 0 2px 5px 0 rgba(60, 66, 87, 0.1),
        0 1px 1px 0 rgba(0, 0, 0, 0.07);

      transition: box-shadow 150ms ease;
      &:hover {
        box-shadow: 0 7px 14px 0 rgba(60, 66, 87, 0.1),
          0 3px 6px 0 rgba(0, 0, 0, 0.07);
        cursor: pointer;
        transition: box-shadow 150ms ease;
      }
      &:active,
      &:focus {
        box-shadow: 0 7px 14px 0 rgba(60, 66, 87, 0.1),
          0 3px 6px 0 rgba(0, 0, 0, 0.07);
        transition: box-shadow 150ms ease;
      }
      &--facebook {
        color: #4065b4;
        border-color: rgb(247, 247, 247);
      }
      &--google {
        border-color: rgb(247, 247, 247);

        &__key {
          color: black;
        }
      }
      &--local {
        color: $primary;
      }
      &--twitter {
        color: #059ff5;
        // background-color: rgb(182, 182, 182);
        // box-shadow: none;
        &:hover {
          cursor: pointer;
          // box-shadow: 0 2px 5px 0 rgba(60, 66, 87, 0.1),
          //   0 1px 1px 0 rgba(0, 0, 0, 0.07);
        }
      }
      #{$self}__icon {
        // margin-right: 3rem;
        font-size: 2rem;
        &--google {
          width: 2.2rem;
          height: 2.2rem;
        }
      }

      #{$self}__key {
        width: 20rem;
        font-weight: bold;
        font-size: 1.6rem;
        justify-self: right;
      }
      &:hover {
      }
    }
  }
  &__create-account {
    text-align: center;
    font-size: 1.4rem;
    margin-top: 2rem;
    margin-bottom: 1rem;
    font-weight: bold;
    // color: ;
    span {
      font-size: 1.4rem;
      color: $secondary;
      font-weight: bold;
      &:hover {
        cursor: pointer;
      }
    }
  }
}
</style>
