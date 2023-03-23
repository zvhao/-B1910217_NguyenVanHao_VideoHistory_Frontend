
<template>
  <nav class="app-nav navbar navbar-expand navbar-dark px-4">
    <div class="profile-header navbar-nav">
      <a href="/" class="d-flex nav-item m-0 align-items-center">
        <img
          class="avatar-header nav-link p-0 px-3"
          src="../assets/img/play.png"
          alt=""
        />
        <span class="text-white">Tìm hiểu lịch sử Việt Nam qua video</span>
      </a>
    </div>
    <div class="input-group w-50 m-auto">
      <input
        type="text"
        class="form-control"
        placeholder="Nhập thông tin cần tìm" v-model="searchText"
      />
      <!-- <div class="input-group-append">
        <button class="btn btn-outline-secondary" type="button" @click="submit">
          <i class="fas fa-search"></i> Tìm kiếm
        </button>
      </div> -->
    </div>

    <div class="profile-header navbar-nav">
      <button
        v-if="checkAccount == false"
        class="btn btn-outline-light"
        @click="goToLogin()"
      >
        <i class="fa-solid fa-right-to-bracket"></i>
        Đăng nhập
      </button>
      <div v-else class="d-flex nav-item m-0 dropdown">
        <button
          class="btn btn-outline-light btn-account"
          type="button"
          data-toggle="dropdown"
          aria-expanded="false"
        >
          <i class="fa-solid fa-circle-user"></i>
          {{ checkAccount }}
        </button>
        <div class="dropdown-menu list-profile-header p-0">
          <button class="dropdown-item" @click="goToChannel()">
            <i class="fa-solid fa-id-card-clip"></i> Channel
          </button>
          <button class="dropdown-item" @click="goToAddVideo()" href="#">
            <i class="fa-solid fa-circle-plus"></i>
            Đăng video
          </button>
          <button class="dropdown-item" @click="logout()" href="#">
            <i class="fa-solid fa-right-from-bracket"></i> Đăng xuất
          </button>
        </div>
      </div>
    </div>
  </nav>
</template>
<script>
import { useAccount } from "@/stores/use-account";
import { storeToRefs } from "pinia";
export default {
  props: {
    modelValue: { type: String, default: "" },
    favorieValue: { type: String, default: "" },
    getAllFavorite: false,
    account: {},
  },
  setup() {
    const store = useAccount();
    return {
      searchText: "",
      // checkDarkMode: false,
      ...storeToRefs(store),
    };
  },
  computed: {
    checkAccount() {
      if (Object.keys(this.account).length === 0) {
        return false;
      } else {
        return this.account.username;
      }
    },
  },
  methods: {
    submit(data) {
      useAccount().onSearchText(data);
    },
    goToLogin() {
      if (localStorage.getItem("account") === null)
        this.$router.push({ name: "account.login" });
    },
    goToChannel() {
      if (localStorage.getItem("account") != null) {
        useAccount().onToChannel(this.account.username)
        this.$router.push({
          name: "channel",
          params: { username: this.account.username },
        });
      } else {
        this.$router.push({ name: "notfound" });
      }
    },
    goToAddVideo() {
      this.$router.push({ name: "video.add" });
    },
    async logout() {
      if (localStorage.getItem("account") != null && $cookies.isKey("token")) {
        await localStorage.removeItem("account");
        await $cookies.remove("token");
        useAccount().onDataLogin({});
        Swal.fire({
          icon: "info",
          title: "Bạn đã đăng xuất!",
          showConfirmButton: false,
          timer: 1500,
        });
        this.$router.push({ name: "account.login" });
      } else {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Load lại trang và thử lại sau!",
        });
      }
    },
  },
  mounted() {
    // this.checkIssetDataLogin();
  },
};
</script>

<style>
.avatar-header {
  height: 45px;
  max-width: 100%;
  object-fit: cover;
  object-position: center;
}

.profile-header {
  position: relative;
}

.list-profile-header {
  transform: translateX(-50%);
  top: 110% !important;
  min-width: 0 !important;
  overflow: hidden;
}

.app-nav {
  background: #2026b2;
}
</style>