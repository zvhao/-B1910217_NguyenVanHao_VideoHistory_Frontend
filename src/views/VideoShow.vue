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
          <img @click="goToChannel(account.username)" class="w-100 cursor-pointer" src="../../src/assets/img/play.png" alt="" srcset="">
        </div>
        <div class="col-5">
          <h4><span class="cursor-pointer" @click="goToChannel(account.username)">{{ account.username }}</span></h4>
          <h5>{{ account.fullname }}</h5>
        </div>
        <div class="col d-flex align-items-center">
          <button v-if="ownVideo" @click="goToVideoEdit(video.slug)" class="btn btn-dark">
            Chỉnh sửa
          </button>
          
        </div>
      </div>

      <div class="p-1">
        <strong class="">{{ video.fullname }}</strong>
      </div>
      <div class="box-content-show p-4 rounded border border-primary">
        <div class="pb-1">
          <p class=" m-0">{{ video.createdAt }}</p>
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
  </div>
</template>

<script>
import VideoService from "@/services/video.service";
import AccountService from "@/services/account.service";
import $ from "jquery";
export default {
  props: {
    slug: { type: String, required: true },
  },
  data() {
    return {
      video: {},
      ownVideo: false,
      account: {},
    };
  },
  computed: {},

  methods: {
    
    async onOwnVideo() {
      try {
        if (
          this.video.accountId ||
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
        } else {
          // console.log("false");
          this.ownVideo = false;
        }
      } catch (error) {
        console.log(error);
      }
    },
    async getVideo(slug) {
      try {
        this.video = await VideoService.get(slug);
        if (this.video.accountId) {
          // console.log(this.video.accountId);
          try {
            this.account = await AccountService.findAccountById(
              this.video.accountId
            );
            // console.log(this.account);
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
  },
  created() {
    this.getVideo(this.slug);
  },
  mounted() {
    this.onOwnVideo();
    this.setHeightVideo();
  },
};
</script>

<style scope>

</style>