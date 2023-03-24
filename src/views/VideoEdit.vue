<template>
  <div v-if="video" class="page">
    <h4 class="text-center">Hiệu chỉnh Video</h4>
    <VideoForm
      :video="video"
      @submit:video="updateVideo"
      @delete:video="deleteVideo"
    />
  </div>
</template>

<script>
import VideoForm from "@/components/VideoForm.vue";
import VideoService from "@/services/video.service";
export default {
  components: {
    VideoForm,
  },
  props: {
    slug: { type: String, required: true },
  },
  data() {
    return {
      video: null,
      dataUpdate: null,
    };
  },
  methods: {
    async getVideo(slug) {
      try {
        this.video = await VideoService.get(slug);
        if (
          this.video.accountId ||
          JSON.parse(localStorage.getItem("account")) != null
        ) {
          if (
            this.video.accountId ==
            JSON.parse(localStorage.getItem("account"))._id
          ) {
          } else {
            this.$router.push({
              name: "notfound",
              params: {
                pathMatch: this.$route.path.split("/").slice(1),
              },
              query: this.$route.query,
              hash: this.$route.hash,
            });
          }
        } else {
          this.$router.push({
            name: "notfound",
            params: {
              pathMatch: this.$route.path.split("/").slice(1),
            },
            query: this.$route.query,
            hash: this.$route.hash,
          });
        }
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
    async updateVideo(data) {
      try {
        data.token = $cookies.get("token");
        // console.log(data.accountId);
        this.dataUpdate = await VideoService.update(this.video.slug, data);
        if (!this.dataUpdate.errMessage) {
          Swal.fire({
            icon: "success",
            title: "Video được cập nhật thành công.",
            showConfirmButton: false,
            timer: 1500,
          });
          console.log(data);
          this.$router.push({
            name: "video.show",
            params: { slug: this.video.slug },
          });
        } else {
          Swal.fire({
            icon: "error",
            title: this.dataUpdate.errMessage,
            showConfirmButton: false,
            timer: 1500,
          });
          this.$router.push({ name: "videohistory" });
        }
      } catch (error) {
        Swal.fire({
          icon: "error",
          title: "Có lỗi đã xảy ra.",
          showConfirmButton: false,
          timer: 1500,
        });
        console.log(error);
        this.$router.push({ name: "videohistory" });
      }
    },
    async deleteVideo() {
      await Swal.fire({
        title: "Bạn có chắc muốn xoá?",
        text: "Chúng sẽ bị xoá vĩnh viễn!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Tôi muốn xoá!",
        cancelButtonText: "Huỷ bỏ",
      }).then((result) => {
        if (result.isConfirmed) {
          try {
            VideoService.delete(this.video.slug);
            this.$router.push({ name: "videohistory" });
            Swal.fire({
              icon: "success",
              title: "Video đã được xoá",
              showConfirmButton: false,
              timer: 1500,
            });
          } catch (error) {
            console.log(error);
          }
        }
      });
    },
  },
  created() {
    this.getVideo(this.slug);
  },
  mounted() {},
};
</script>