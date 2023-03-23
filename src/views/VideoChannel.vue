<template>
  <div class="page row">
    <div class="col-3"></div>
    <div class="col-9 channel-profile row w-100">
      <!-- <div class="col-2">
        <button class="btn btn-sm btn-primary mr-5" @click="refreshList()">
          <i class="fas fa-redo"></i> Làm mới
        </button>
      </div> -->
      <div class="col-2 d-flex align-items-center justify-content-end">
        <img
          class="w-50"
          src="../../src/assets/img/play.png"
          alt=""
          srcset=""
        />
      </div>
      <div class="col">
        <h3>
          <strong>{{ channel.username }}</strong>
        </h3>
        <h4>{{ channel.fullname }}</h4>
      </div>
    </div>
    <div class="mt-3 col-12">
      <div v-if="activeVideo">
        <VideoCard :video="activeVideo" />
      </div>
    </div>
    <div class="mt-3 col-12">
      <h4>
        <span class="px-3"
          >Channel đã đăng {{ filteredVideosCount }} video</span
        >
        <i class="fa-solid fa-video"></i>
        <button class="btn btn-primary ml-5" @click="refreshList()">
          <i class="fas fa-redo"></i> Làm mới
        </button>
        
      </h4>
      <VideoList
        v-if="filteredVideosCount > 0"
        :videos="filteredVideos"
        v-model:activeIndex="activeIndex"
      />
      <p v-else>Không có video nào.</p>
    </div>
  </div>
</template>
<script>
import VideoCard from "@/components/VideoCard.vue";
import InputSearch from "@/components/InputSearch.vue";
import VideoList from "@/components/VideoList.vue";
import VideoService from "@/services/video.service";
import AccountService from "@/services/account.service";
import Swal from "sweetalert2";
import { useAccount } from "@/stores/use-account";
import { storeToRefs } from "pinia";
export default {
  components: {
    VideoCard,
    InputSearch,
    VideoList,
  },
  props: {
    username: "",
  },
  data() {
    return {
      videos: [],
      activeIndex: -1,
      searchText: "",
      isFavorite: false,
      channel: {},
    };
  },
  setup() {
    const store = useAccount();
    return {
      ...storeToRefs(store),
    };
  },
  watch: {
    username(value) {
      // console.log(value);
      this.refreshList();
    },
    // Giám sát các thay đổi của biến searchText.
    // Bỏ chọn phần tử đang được chọn trong danh sách.
    searchText() {
      this.activeIndex = -1;
    },
  },
  computed: {
    // Chuyển các đối tượng video thành chuỗi để tiện cho tìm kiếm.
    videoStrings() {
      return this.videos.map((video) => {
        const { title, description, content } = video;
        return [
          title.toLowerCase(),
          description.toLowerCase(),
          content.toLowerCase(),
        ].join("");
      });
    },
    // Trả về các video có chứa thông tin cần tìm kiếm.
    filteredVideos() {
      if (!this.searchText) return this.videos;
      return this.videos.filter((_video, index) =>
        this.videoStrings[index].includes(this.searchText)
      );
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
    checkFavorite() {
      this.isFavorite = !this.isFavorite;
      console.log(this.isFavorite);
      this.refreshList();
    },
    async retrieveVideos() {
      try {
        this.channel = await AccountService.findAccountByUsername(
          this.username
        );
        if (this.channel._id) {
          this.videos = await VideoService.getChannel(this.channel._id);
          return this.videos.sort((a, b) =>
            a.createdAt < b.createdAt ? 1 : -1
          );
        }
      } catch (error) {
        console.log(error);
      }
    },

    refreshList() {
      this.retrieveVideos();
      this.activeIndex = -1;
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