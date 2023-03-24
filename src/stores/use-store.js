import { defineStore } from 'pinia'

export const useStore = defineStore('stores', {
  state: () => ({
    account: {},
    searchText: "",
    toChannel: "",
    favoriteVideo: false,
    loggedInAccount: {}

  }),
  getters: {
    cleanAccount() {
      if (localStorage.getItem("account") == null && $cookies.isKey("token")) {
        $cookies.remove("token");
      }
      if (localStorage.getItem("account") != null && $cookies.isKey("token") == false)
        localStorage.removeItem("account")
    },
    onLoggedInAccount() {
      if (localStorage.getItem("account") != null && $cookies.isKey("token")) {
        this.loggedInAccount = JSON.parse(localStorage.getItem("account"))
        console.log(this.loggedInAccount);
      }
    }


  },
  actions: {

    onDataLogin(data) {
      this.account = data
      // if(Object.keys(data).length === 0) {
      // } else {
      // }
    },
    onSearchText(data) {
      this.searchText = data
      // console.log(this.searchText);
    },
    onToChannel(data) {
      this.toChannel = data
    },

    onFavoriteVideo(data) {
      this.favoriteVideo = data
      // console.log(this.favoriteVideo);
    }


  }
})