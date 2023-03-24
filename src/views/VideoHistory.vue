<template>
  <div class="page w-100 m-0 row">
    <div class="mt-3 col-12">
      <div v-if="activeVideo">
        <VideoCard class="m-auto" :video="activeVideo" />
      </div>
    </div>
    <div class="mt-3 col-12">
      <h4>
        Danh sách video tìm hiểu lịch sử
        <i class="fa-solid fa-video"></i>
        <span class="pl-3">có {{ filteredVideosCount }} video</span>
        <button class="btn btn-primary ml-5" @click="refreshList()">
          <i class="fas fa-redo"></i> Làm mới
        </button>
        <button
          class="ml-4 btn"
          @click="checkFavorite"
          :class="isFavorite ? 'btn-primary' : 'btn-outline-primary'"
        >
          Yêu thích
        </button>
      </h4>
      <VideoList
        v-if="filteredVideosCount > 0"
        :videos="filteredVideos"
        v-model:activeIndex="activeIndex"
      />
      <h3 v-else class="text-center mt-5">Không có video nào.</h3>
    </div>
  </div>
</template>
<script>
import VideoCard from "@/components/VideoCard.vue";
import VideoList from "@/components/VideoList.vue";
import VideoService from "@/services/video.service";
import AccountService from "@/services/account.service";
import Swal from "sweetalert2";
import { useStore } from "@/stores/use-store";
import { storeToRefs } from "pinia";

export default {
  components: {
    VideoCard,
    VideoList,
  },
  data() {
    return {
      videos: [],
      activeIndex: -1,
      searchText: "",
      isFavorite: false,
      loggedInAccount: {},
    };
  },
  setup() {
    const store = useStore();
    return {
      ...storeToRefs(store),
    };
  },
  watch: {
    // Giám sát các thay đổi của biến searchText.
    // Bỏ chọn phần tử đang được chọn trong danh sách.
    searchText() {
      this.activeIndex = -1;
    },
  },
  computed: {
    // Trả về các video có chứa thông tin cần tìm kiếm.
    filteredVideos() {
      if (!this.searchText) return this.videos;
      return this.videos.filter((_video, index) => {
        return this.videoStrings(_video).includes(
          this.searchText.toLowerCase()
        );
      });
    },
    activeVideo() {
      if (this.activeIndex < 0) return null;
      return this.filteredVideos[this.activeIndex];
    },
    filteredVideosCount() {
      return this.filteredVideos.length;
    },
  },
  methods: {
    // Chuyển các đối tượng video thành chuỗi để tiện cho tìm kiếm.
    videoStrings(_video) {
      const { title, description, content } = _video;
      return `${title?.toLowerCase()} ${description?.toLowerCase()} ${content?.toLowerCase()}`;
    },
    checkFavorite() {
      this.isFavorite = !this.isFavorite;
      console.log(this.isFavorite);
      this.refreshList();
    },
    async retrieveVideos() {
      if (this.isFavorite) {
        try {
          if (
            localStorage.getItem("account") != null &&
            $cookies.isKey("token")
          ) {
            const accountId = JSON.parse(localStorage.getItem("account"))._id;
            const listVideo = await AccountService.findAccountById(accountId);
            if (listVideo.favorites) {
              this.videos = [];
              listVideo.favorites.forEach(async (element) => {
                try {
                  const video = await VideoService.getById(element);
                  if (video._id) {
                    this.videos.push(video);
                  }
                } catch (error) {
                  console.log(error);
                }
              });
              return this.videos.sort((a, b) =>
                a.createdAt < b.createdAt ? 1 : -1
              );
            }
          } else {
            this.videos = [];

          }
        } catch (error) {
          console.log(error);
        }
      } else {
        try {
          this.videos = await VideoService.getAll();
          return this.videos.sort((a, b) =>
            a.createdAt < b.createdAt ? 1 : -1
          );
        } catch (error) {
          console.log(error);
        }
      }
    },

    refreshList() {
      this.retrieveVideos();
      this.searchText = "";
      this.activeIndex = -1;
    },
    removeAllVideos() {
      Swal.fire({
        title: "Bạn có chắc sẽ xoá tất cả?",
        text: "Bạn không thể hoàn tác!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Tôi đồng ý!",
        cancelButtonText: "Huỷ bỏ",
      }).then((result) => {
        if (result.isConfirmed) {
          try {
            VideoService.deleteAll();
            this.refreshList();
            Swal.fire({
              icon: "success",
              title: "Đã xoá tất cả video",
              showConfirmButton: false,
              timer: 1500,
            });
          } catch (error) {
            console.log(error);
          }
        }
      });
    },
    goToAddVideo() {
      this.$router.push({ name: "video.add" });
    },

  },
  mounted() {
    this.refreshList();
  },
};
</script>

<style scoped>
.page {
  text-align: left;
}
</style>