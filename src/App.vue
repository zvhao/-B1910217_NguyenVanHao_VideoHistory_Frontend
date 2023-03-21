<template>
  <div id="app" class="">
    <AppHeader />
    <div class="m-3 mb-0">
      <!-- <SideBars class="col-2" /> -->
      <router-view class="col" />
    </div>
    <button class="btn btn-primary btn-darkmode" @click="changeDarkmode()">
      <i class="fa-solid fa-circle-half-stroke"></i>
    </button>
  </div>
</template>

<script>
import AppHeader from "@/components/AppHeader.vue";
import SideBars from "@/components/SideBars.vue";
import $ from "jquery";
import { useAccount } from "@/stores/use-account";
import { storeToRefs } from "pinia";
import { boolean } from "yup";
export default {
  components: {
    AppHeader,
    SideBars,
  },
  setup() {
    const store = useAccount();
    // const { dataLogin } = store

    return {
      // checkDarkMode: false,
      ...storeToRefs(store),
      // dataLogin
    };
  },
  computed: {

  },

  methods: {
    log() {
      if (JSON.parse(localStorage.getItem("account")) != null) {
        useAccount().onDataLogin(JSON.parse(localStorage.getItem("account")));
      }
      if (localStorage.getItem("account") == null && $cookies.isKey("token")) {
        $cookies.remove("token");
        console.log("local null, token has");
      }
      if (
        localStorage.getItem("account") != null &&
        $cookies.isKey("token") == false
      ) {
        localStorage.removeItem("account");
        console.log("local null, token has");
      }
      
    },
    logDarkmode() {
      if (
        localStorage.getItem("darkmode") != null &&
        localStorage.getItem("darkmode") == "true"
      ) {
        $("#app").addClass("darkmode");
        // console.log(localStorage.getItem("darkmode"));
      } else {
        $("#app").removeClass("darkmode");
      }
    },
    changeDarkmode() {
      if (localStorage.getItem("darkmode") != null && localStorage.getItem("darkmode") == "true") {
        localStorage.setItem("darkmode", "false")
        this.logDarkmode()
      } else {
        localStorage.setItem("darkmode", "true")
        this.logDarkmode()
      }
    }

  },
  mounted() {
    this.log();
    this.logDarkmode()
  },
};
</script>

<style>
#app {
  min-height: 100vh;
}

.btn-darkmode {
  position: fixed;
  top: 81px;
  right: 0;
}

.darkmode {
  background-color: rgb(0, 0, 0) !important;
  color: white;
}
</style>