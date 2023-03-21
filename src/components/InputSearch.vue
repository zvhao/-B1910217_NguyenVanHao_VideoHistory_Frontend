<script>
export default {
  props: {
    modelValue: { type: String, default: "" },
    favorieValue: { type: String, default: ""},
    getAllFavorite: false,
  },
  emits: ["submit", "update:modelValue"],
  methods: {
    updateModelValue(e) {
      this.$emit("update:modelValue", e.target.value);
    },
    submit() {
      this.$emit("submit");
    },
  },
};
</script>

<template>
  <div class="input-group w-50 m-auto">
    <input
      type="text"
      class="form-control"
      placeholder="Nhập thông tin cần tìm"
      :value="modelValue"
      @input="updateModelValue"
      @keyup.enter="submit"
    />
    <!-- <select name="" id="" class="dropdown">
      <option value="" class="btn  dropdown-item" selected>Tất cả</option>
      <option :value="true" class="btn  dropdown-item" >Yêu thích</option>
      <option :value="false" class="btn  dropdown-item" >Không yêu thích</option>
    </select> -->
    <div class="input-group-append">
      <button class="btn btn-outline-secondary" type="button" @click="submit">
        <i class="fas fa-search"></i> Tìm kiếm
      </button>

    </div>
  </div>
</template>