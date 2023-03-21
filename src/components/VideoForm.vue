<template>
  <Form @submit="submitVideo" :validation-schema="videoFormSchema" class="col-lg-8 col-sm-10 m-auto">
    <div class="form-group">
      <label for="title">Tiêu đề</label>
      <Field
        name="title"
        type="text"
        class="form-control "
        v-model="videoLocal.title"
      />
      <ErrorMessage name="title" class="error-feedback" />
    </div>
    <div class="form-group">
      <label for="videoid">videoID</label>
      <Field
        name="videoid"
        type="text"
        class="form-control "
        v-model="videoLocal.videoId"
      />
      <ErrorMessage name="videoid" class="error-feedback" />
      <iframe v-if="videoLocal.videoId"
          class="mt-2 d-block"
          width="25%"
          :src="'https://www.youtube.com/embed/' + videoLocal.videoId"
          title=""
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowfullscreen
        ></iframe>
    </div>
    <div class="form-group">
      <label for="description">Mô tả video</label>
      <textarea

        name="description"
        type="text"
        class="form-control"
        v-model="videoLocal.description"
      ></textarea>
      <ErrorMessage name="description" class="error-feedback" />
    </div>
    <div class="form-group">
      <label for="content">Nội dung lịch sử được lấy cảm hứng cho video</label>
      <textarea
        name="content"
        type="text"
        class="form-control"
        v-model="videoLocal.content" rows="4"
      ></textarea>
      <ErrorMessage name="content" class="error-feedback" />
    </div>
    <div class="form-group">
      <button class="btn btn-primary w-100">Lưu</button>
      <button
        v-if="videoLocal._id"
        type="button"
        class="mt-2 btn btn-danger"
        @click="deleteVideo"
      >
        Xóa
      </button>
    </div>
  </Form>
</template>
<script>
import * as yup from "yup";
import { Form, Field, ErrorMessage } from "vee-validate";
export default {
  components: {
    Form,
    Field,
    ErrorMessage,
  },
  emits: ["submit:video", "delete:video"],
  props: {
    video: { type: Object, required: true },
  },
  data() {
    const videoFormSchema = yup.object().shape({
      title: yup
        .string()
        .required("Tiêu đề phải có giá trị.")
        .min(2, "Tiêu đề phải ít nhất 2 ký tự."),
      videoid: yup.string().required("VideoID phải có giá trị."),
    });
    return {
      // Chúng ta sẽ không muốn hiệu chỉnh props, nên tạo biến cục bộ
      // videoLocal để liên kết với các input trên form
      videoLocal: this.video,
      videoFormSchema,
    };
  },
  methods: {
    submitVideo() {
      this.$emit("submit:video", this.videoLocal);
    },
    deleteVideo() {
      this.$emit("delete:video", this.videoLocal.id);
    },
  },
};
</script>
<style scoped>
@import "@/assets/form.css";
</style>