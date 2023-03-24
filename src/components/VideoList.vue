<template>
  <div class="mt-4">
    <div class="row">
      <div
        class="col-sm-6 col-lg-3 p-2"
        v-for="(video, index) in videos"
        :key="video._id"
        :class="{ active: index === activeIndex }"
      >
        <div class="">
          <p
            class="p-0 m-0 card-frame-img"
            v-on:mouseover="mouseover(index)"
            v-on:mouseleave="mouseleave(index)"
          >
            <img
              :src="
                'https://img.youtube.com/vi/' + video.videoId + '/sddefault.jpg'
              "
              class="card-img-top rounded p-0 m-0"
              :alt="video.title"
              :title="video.title"
            />
            <span
              class="hover-fast-view w-100 h-100 rounded d-none justify-content-center align-items-center"
            >
              <button
                @click="
                  updateActiveIndex(index);
                  gotoTop();
                "
                class="btn btn-outline-light"
              >
                Xem nhanh
              </button>
            </span>
          </p>
          <div class="card-body pt-0">
            <span class="title-video mb-2">{{ video.title }}</span>

            <button @click="goToVideoShow(video.slug)" class="btn btn-sm btn-primary">
              Xem chi tiết
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
    };
  },
  props: {
    videos: { type: Array, default: [] },
    activeIndex: { type: Number, default: -1 },
  },
  emits: ["update:activeIndex"],
  methods: {
    updateActiveIndex(index) {
      this.$emit("update:activeIndex", index);
    },
    goToVideoShow(slug) {
      this.$router.push({ name: "video.show", params: { slug: slug } });
    },
    gotoTop() {
      window.scrollTo(0, top);
    },
    mouseover(index) {
      // this.$('.hover-fast-view')
      const itemHover = $(".hover-fast-view")[index];
      $(itemHover).removeClass("d-none");
      $(itemHover).addClass("d-flex");
    },
    mouseleave(index) {
      const itemHover = $(".hover-fast-view")[index];
      $(itemHover).removeClass("d-flex");
      $(itemHover).addClass("d-none");
    },
  },
  mounted() {
    // this.sortedArrayByCreateAt();
  },
};
</script>

<style scoped>
.title-video {
  min-height: 54px;
  font-size: 18px;
  font-weight: bold;
  overflow: hidden;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  display: -webkit-box;
}

.card-frame-img {
  position: relative;
}

.hover-fast-view {
  background: #000000cb;
  position: absolute;
  left: 0;
  top: 0;
}
</style>