<template>
  <div class="row">
    <div class="col-9">
      <div class="p-1">
        <iframe
          class="size-video"
          width="100%"
          :src="'https://www.youtube.com/embed/' + video.videoId"
          title=""
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowfullscreen
        ></iframe>
      </div>
      <div class="p-1">
        <strong class="title-video">{{ video.title }}</strong>
      </div>
      <div class="p-1 row">
        <div class="col-1 d-flex justify-content-center align-items-center">
          <img
            @click="goToChannel(accountOwn.username)"
            class="w-100 cursor-pointer"
            src="../../src/assets/img/play.png"
            alt=""
            srcset=""
          />
        </div>
        <div class="col-5">
          <h4>
            <span
              class="cursor-pointer"
              @click="goToChannel(accountOwn.username)"
              >{{ accountOwn.username }}</span
            >
          </h4>
          <h5>{{ accountOwn.fullname }}</h5>
        </div>
        <div class="col d-flex align-items-center">
          <div>
            <button
              v-if="favoriteVideo == true"
              @click="changeFavorite()"
              class="btn btn-primary"
            >
              <i class="fa-solid fa-heart-circle-check"></i>
              Đã lưu
            </button>
            <button
              v-if="favoriteVideo == false"
              @click="changeFavorite()"
              class="btn btn-primary"
            >
              <i class="fa-solid fa-heart-circle-xmark"></i>
              Lưu
            </button>
          </div>

          <button
            v-if="ownVideo"
            @click="goToVideoEdit(video.slug)"
            class="btn btn-dark"
          >
            Chỉnh sửa
          </button>
        </div>
      </div>

      <div class="p-1">
        <strong class="">{{ video.fullname }}</strong>
      </div>
      <div class="box-content-show p-4 rounded border border-primary">
        <div class="pb-1">
          <p class="m-0">{{ video.createdAt }}</p>
        </div>
        <div class="pb-1">
          <h5 class="font-weight-bold m-0 pb-1">Mô tả video:</h5>
          <p class="px-3">{{ video.description }}</p>
        </div>
        <div class="">
          <h5 class="font-weight-bold m-0 pb-1">
            Nội dung lịch sử được lấy cảm hứng cho video:
          </h5>
          <p class="px-3">{{ video.content }}</p>
        </div>
      </div>
    </div>
    <div class="col">
      <h4>Video mới nhất</h4>
      <div class="">
        <div class="" v-for="video in videos" :key="video._id">
          <div
            class="row mb-2 cursor-pointer"
            @click="goToVideoShow(video.slug)"
          >
            <p class="col-5 p-0 m-0 d-flex align-items-center">
              <img
                :src="
                  'https://img.youtube.com/vi/' +
                  video.videoId +
                  '/sddefault.jpg'
                "
                class="card-img-top p-0 m-0"
                :alt="video.title"
                :title="video.title"
              />
            </p>
            <div class="col-7 d-flex align-items-center">
              <span class="title-video-right">{{ video.title }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import VideoService from "@/services/video.service";
import AccountService from "@/services/account.service";
import $ from "jquery";
import { useAccount } from "@/stores/use-account";
import { storeToRefs } from "pinia";
export default {
  props: {
    slug: { type: String, required: true },
  },
  setup() {
    const store = useAccount();
    return {
      ...storeToRefs(store),
    };
  },
  data() {
    return {
      video: {},
      ownVideo: false,
      accountOwn: {},
      videos: [],
      dataVideo: null,
      dataAccount: null,
      loggedInAccount: {},
    };
  },
  computed: {},

  watch: {
    slug(value) {
      this.getVideo(value);
    },
  },

  methods: {
    goToVideoShow(slug) {
      this.$router.push({ name: "video.show", params: { slug: slug } });
    },
    async getVideos() {
      try {
        this.videos = await VideoService.getAll();
        return this.videos.sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1));
      } catch (error) {
        console.log(error);
      }
    },
    async getVideo(slug) {
      console.log(this.favoriteVideo);
      try {
        this.video = await VideoService.get(slug);
        if (this.video.accountId) {
          // console.log(this.video.accountId);
          if (this.video.favorites) {
            const arr = this.video.favorites;
            // console.log(this.video.favorites);
            if (localStorage.getItem("account") != null) {
              const id = JSON.parse(localStorage.getItem("account"))._id;
              if (arr.includes(id)) {
                this.favoriteVideo = true;
                console.log("da luu");
              } else {
                this.favoriteVideo = false;
                // console.log("chua luu");
              }
              useAccount().onFavoriteVideo(this.favoriteVideo);
            }
          }
          try {
            this.accountOwn = await AccountService.findAccountById(
              this.video.accountId
            );
          } catch (error) {
            console.log(error);
          }
        } else {
          this.$router.push({ name: "notFound" });
        }
        // console.log(this.video);
      } catch (error) {
        console.log(error);
        // Chuyển sang trang NotFound đồng thời giữ cho URL không đổi
        this.$router.push({
          name: "notfound",
          params: {
            pathMatch: this.$route.path.split("/").slice(1),
          },
          query: this.$route.query,
          hash: this.$route.hash,
        });
      }

      try {
        if (
          this.video.accountId &&
          JSON.parse(localStorage.getItem("account")) != null
        ) {
          if (
            this.video.accountId ==
            JSON.parse(localStorage.getItem("account"))._id
          ) {
            // console.log("true");
            this.ownVideo = true;
          } else {
            // console.log("false");
            this.ownVideo = false;
          }
          // console.log(this.video);
        } else {
          // console.log("false 1");
          this.ownVideo = false;
        }
      } catch (error) {
        console.log(error);
      }
    },

    goToVideoEdit(slug) {
      this.$router.push({ name: "video.edit", params: { slug: slug } });
    },
    goToChannel(username) {
      this.$router.push({ name: "channel", params: { username: username } });
    },

    setHeightVideo() {
      var width = $(".size-video").width();
      $(".size-video").height((width * 9) / 16);
    },
    
    async changeFavorite() {
      if (localStorage.getItem("account") != null && $cookies.isKey("token")) {
        this.loggedInAccount = JSON.parse(localStorage.getItem("account"));
        if (!this.favoriteVideo) {
          try {
            this.dataVideo = await VideoService.addFavorite(
              this.slug,
              this.loggedInAccount
            );
            this.dataAccount = await AccountService.addFavorite(
              this.loggedInAccount._id,
              this.video
            );
            console.log(this.dataVideo.favorites);
            console.log(this.dataAccount.favorites);
            if (this.dataVideo._id && this.dataAccount._id) {
              this.favoriteVideo = !this.favoriteVideo;
              useAccount().onFavoriteVideo(this.favoriteVideo);
              Swal.fire({
                icon: "success",
                title: "Lưu vào mục yêu thích thành công!",
                showConfirmButton: false,
                timer: 1500,
              });
            }
          } catch (error) {
            console.log(error);
          }
        } else {
          try {
            this.dataVideo = await VideoService.removeFavorite(
              this.slug,
              this.loggedInAccount
            );
            this.dataAccount = await AccountService.removeFavorite(
              this.loggedInAccount._id,
              this.video
            );
            console.log(this.dataVideo);
            console.log(this.dataAccount);
            if (this.dataVideo._id && this.dataAccount._id) {
              this.favoriteVideo = !this.favoriteVideo;
              useAccount().onFavoriteVideo(this.favoriteVideo);
              Swal.fire({
                icon: "success",
                title: "Đã xoá khỏi mục yêu thích!",
                showConfirmButton: false,
                timer: 1500,
              });
            }
          } catch (error) {
            console.log(error);
          }
        }
      } else {
        Swal.fire({
          title: "Bạn chưa đăng nhập?",
          text: "Vui lòng đăng nhập và thực hiện lại!",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Đăng nhập!",
          cancelButtonText: "Quay lại",
        }).then((result) => {
          if (result.isConfirmed) {
            this.$router.push({name: 'account.login'})
          }
        });
      }
    },
  },
  created() {
    this.getVideo(this.slug);
  },

  mounted() {
    this.setHeightVideo();
    this.getVideos();
  },
};
</script>

<style scope>
.title-video {
  font-size: 24px;
  font-weight: bold;
  overflow: hidden;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  display: -webkit-box;
}

.title-video-right {
  /* height: 50px; */
  font-size: 16px;
  font-weight: bold;
  overflow: hidden;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;
  display: -webkit-box;
}

.card-img-top {
  border-radius: 10px;
}
</style>