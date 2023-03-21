import { defineStore } from 'pinia'

export const useAccount = defineStore('accountId', {
  state: () => ({
    account: {},
    searchText: "",
  }),
  getters: {
    cleanAccount() {
      if (localStorage.getItem("account") == null && $cookies.isKey("token")) {
        $cookies.remove("token");
      }
      if (localStorage.getItem("account") != null && $cookies.isKey("token") == false)
        localStorage.removeItem("account")
    },

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



  }
})