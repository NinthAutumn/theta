<template>
  <div class="transaction-list" v-loading="loading">
    <header>購入リスト</header>
    <div class="transaction-list__list">
      <div class="transaction-list__item" v-for="(transaction,index) in transactions" :key="index">
        <div class="transaction-list__component transaction-list__component--avatar">
          <v-avatar class="elevation-1" :size="35">
            <!-- :src="`https://storage.googleapis.com/theta-images/${props.item.avatar}`" -->
            <v-img :src="transaction.avatar" :aspect-ratio="1/1.5" max-width="5rem"></v-img>
          </v-avatar>
        </div>
        <div
          class="transaction-list__component transaction-list__component--user"
        >{{transaction.username}}</div>
        <div
          class="transaction-list__component transaction-list__component--title"
        >{{`${transaction.book_title}`}}</div>
        <div
          class="transaction-list__component transaction-list__component--index"
        >{{`第${transaction.index}話`}}</div>
        <div class="transaction-list__component transaction-list__component--currency">
          <Currency
            v-if="!transaction.redeemed"
            color="#8860D0"
            :amount="transaction.amount"
            size="small"
          ></Currency>
          <Currency v-else :amount="transaction.amount" size="small"></Currency>
        </div>
        <div
          class="transaction-list__component transaction-list__component--created-at"
        >{{ $moment(transaction.created_at).startOf('second').fromNow() }}</div>
        <div
          class="transaction-list__component transaction-list__component--redeem transaction-list__component--redeem--true"
          v-if="transaction.redeemed"
        >
          <div class="transaction-list__button transaction-list__button--redeemed">清算済み</div>
        </div>
        <div
          class="transaction-list__component transaction-list__component--redeem transaction-list__component--redeem--false"
          v-else
        >
          <div class="transaction-list__button" @click="openRedeem(transaction.id)">清算する</div>
        </div>
      </div>
      <client-only>
        <infinite-loading :identifier="id" @infinite="infiniteHandler"></infinite-loading>
      </client-only>
      <v-dialog v-model="redeem" max-width="290">
        <v-card>
          <v-card-title class="headline">クラウンコイン化する</v-card-title>
          <v-card-text>選んだ購入履歴をクラウンコイン化することにより、この履歴は清算されたこのになり今月の支払い金から抜くことになります。</v-card-text>
          <v-card-text>*クラウン化した場合取り戻しはできなくなります</v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="red darken-1" flat="flat" @click="redeem = false">キャンセル</v-btn>

            <v-btn color="blue darken-1" flat="flat" @click="redeemTransaction">クラウン化します</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </div>
  </div>
</template>

<script>
import { setTimeout } from "timers";
export default {
  data() {
    return {
      headers: [
        { text: "アバター", value: "avatar", sortable: false },
        { text: "ユーザー", value: "user", sortable: false },
        { text: "タイトル", value: "title", sortable: false },
        { text: "何話", value: "chapter", sortable: false },
        { text: "金額", value: "amount", sortable: false },
        { text: "時間", value: "date", sortable: false },
        { text: "清算", value: "redeem", sortable: false }
      ],
      loading: false,
      page: 2,
      transactionId: "",
      redeem: false,
      id: 0
    };
  },
  computed: {
    transactions() {
      return this.$store.getters["dashboard/getTransactions"];
    }
  },
  methods: {
    async redeemTransaction() {
      try {
        this.$store
          .dispatch("wallet/patchRedeem", {
            transactionId: this.transactionId
          })
          .then(async () => {
            await this.$store.dispatch("dashboard/fetchTransactionList", {
              page: 1,
              limit: 10
            });
            this.page = 2;
            this.id++;
          });

        console.log("here");

        this.redeem = false;
      } catch (error) {
        this.$toast.show("清算に失敗しました", {
          theme: "toasted-primary",
          position: "top-right",
          duration: 1200,
          icon: "extension"
        });
      }
    },
    async openRedeem(id) {
      this.transactionId = id;
      this.redeem = true;
    },
    async infiniteHandler($state) {
      const transaction = await this.$store.dispatch(
        "dashboard/fetchTransactionList",
        {
          page: this.page++,
          infinite: true,
          limit: 10
        }
      );
      if (transaction.length > 0) {
        $state.loaded();
      } else {
        $state.complete();
      }
    }
  },
  components: {
    Currency: () => import("@/components/All/Currency")
  },
  async mounted() {
    this.loading = true;
    await this.$store.dispatch("dashboard/fetchTransactionList", {
      page: 1,
      limit: 10
    });
    this.loading = false;
  }
};
</script>

<style lang="scss">
.transaction-list {
  box-shadow: 0 2px 5px 0 rgba(60, 66, 87, 0.1), 0 1px 1px 0 rgba(0, 0, 0, 0.07);
  border-radius: 0.5rem;
  max-width: 100%;
  $self: &;
  padding: 0.5rem;

  &__list {
    box-shadow: 0px;
    height: 30rem;
    overflow: auto;
  }
  header {
    font-size: 1.6rem;
    font-weight: bold;
    padding: 2rem 1rem;
  }
  tbody {
    height: 10rem;
    overflow: auto;
  }
  .v-card__text {
    font-size: 1.4rem;
  }
  .v-btn__content {
    font-size: 1.4rem;
  }
  &__item {
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    padding: 0.5rem 2rem;
    max-width: 100%;
    height: 5rem;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    &:hover {
      box-shadow: 0 2px 5px 0 rgba(60, 66, 87, 0.1),
        0 1px 1px 0 rgba(0, 0, 0, 0.07);
    }
    #{$self}__avatar {
    }
    #{$self}__component {
      font-size: 1.4rem;
      &--avatar {
        display: flex;
        width: 10%;
      }
      &--user {
        width: 10%;
      }
      &--title {
        width: 50%;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
      }
      &--index {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 15%;
      }
      &--currency {
        text-align: left;
        width: 20%;
      }
      &--created-at {
        width: 15%;
      }
      #{$self}__button {
        padding: 1rem 1.25rem;
        font-size: 1.2rem;
        color: #6772e5;
        background-color: #fff;
        border-radius: 0.4rem;
        transition: 300ms;
        box-shadow: 0 4px 6px rgba(50, 50, 93, 0.11),
          0 1px 3px rgba(0, 0, 0, 0.08);
        &:hover {
          background-color: #6772e5;
          color: white;
          transition: 300ms;
          box-shadow: 0 4px 6px rgba(50, 50, 93, 0.11),
            0 1px 3px rgba(0, 0, 0, 0.08);
          cursor: pointer;
        }
        &--redeemed {
          background-color: #6772e5;
          color: white;

          transition: 300ms;
          box-shadow: 0 4px 6px rgba(50, 50, 93, 0.11),
            0 1px 3px rgba(0, 0, 0, 0.08);
          &:hover {
            cursor: default;
          }
        }
      }
    }
  }
  height: 100%;
  background-color: #fff;
}
</style>
