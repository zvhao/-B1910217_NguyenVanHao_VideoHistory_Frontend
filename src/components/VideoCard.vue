<template>
  <div class="showPage">
  
    <div class="p-1 d-flex flex-column">
      <iframe
        class="size-video w-75 m-auto"
        :src="'https://www.youtube.com/embed/' + video.videoId"
        title=""
        frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowfullscreen
      ></iframe>
      <div class="p-1">
        <strong class="title-video">{{ video.title }}</strong>
      </div>
    </div>
  </div>
</template>
<script>
import $ from "jquery";
export default {
  data() {
    return {
    };
  },
  props: {
    video: { type: Object, required: true },
  },
  methods: {
    setHeightVideo() {
      var width = $(".size-video").width();
      $(".size-video").height((width * 9) / 16);
    },
  },
  mounted() {
    this.setHeightVideo();
  },
};
</script>
<style>
.title-video {
  font-size: 22px;
}

.size-video {
  width: 100%;
}

</style>
