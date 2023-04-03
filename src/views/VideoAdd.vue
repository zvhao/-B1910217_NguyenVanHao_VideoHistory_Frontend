<template>
  <div v-if="video" class="page">
    <h4 class="text-center">Thêm video</h4>
    <VideoForm :video="video" @submit:video="addVideo" />
  </div>
</template>

<script>
import VideoForm from "@/components/VideoForm.vue";
import VideoService from "@/services/video.service";
import Swal from "sweetalert2";
export default {
  components: {
    VideoForm,
  },

  data() {
    return {
      video: {},
    };
  },
  methods: {
    async addVideo(data) {
      data.token = $cookies.get("token");
      try {
        this.video = await VideoService.create(data);
        if (this.video.slug) {
          Swal.fire({
            icon: "success",
            title: "Video đã được tạo",
            showConfirmButton: false,
            timer: 1500,
          });
          this.$router.push({
            name: "video.show",
            params: { slug: this.video.slug },
          });
        } else {
          Swal.fire({
            icon: "error",
            title: this.video.messageErr,
            showConfirmButton: true,
          });
        }
      } catch (error) {
        console.log(error);
      }
    },
    denyAccess() {
      if (
        localStorage.getItem("account") == null &&
        $cookies.isKey("token") == false
      ) {
        this.$router.push({
              name: "notfound",
              params: {
                pathMatch: this.$route.path.split("/").slice(1),
              },
              query: this.$route.query,
              hash: this.$route.hash,
            });
      }
    }
  },
  mounted() {
    this.denyAccess()
  }
};
</script>