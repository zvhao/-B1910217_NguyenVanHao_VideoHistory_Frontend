<template>
  <div>
    <div class="form-parent m-auto border border-primary rounded p-4">
      <h4 class="text-center font-weight-bold text-primary">ĐĂNG NHẬP</h4>
      <Form
        @submit="accountLogin"
        :validation-schema="accountFormSchema"
        class=""
      >
        <div class="form-group">
          <label for="username">Username</label>
          <Field name="username" type="text" class="form-control" />
          <ErrorMessage name="username" class="error-feedback" />
      <span class="error-feedback">{{ this.dataLogin.wrongUsername }}</span>

        </div>
        <div class="form-group">
          <label for="password">Mật khẩu</label>
          <Field name="password" type="password" class="form-control" />
          <ErrorMessage name="password" class="error-feedback" />
      <span class="error-feedback">{{ this.dataLogin.wrongPassword }}</span>

        </div>
        <div class="form-group">
          <button class="btn btn-primary w-100">Đăng nhập</button>
        </div>
        <div>
          <span>Bạn chưa đó tài khoản?</span>
          <router-link :to="{ name: 'account.register' }"> Đăng ký</router-link>
        </div>
      </Form>
    </div>
  </div>
</template>
<script>
import * as yup from "yup";
import { Form, Field, ErrorMessage } from "vee-validate";
import AccountService from "@/services/account.service";
import { useStore } from "@/stores/use-store";
export default {
  components: {
    Form,
    Field,
    ErrorMessage,
  },
  data() {
    const accountFormSchema = yup.object().shape({
      username: yup
        .string()
        .required("Username phải có giá trị.")
        .min(5, "Username phải ít nhất 5 ký tự.")
        .max(15, "Username tối đa 15 ký tự."),
      password: yup
        .string()
        .required("Mật khẩu phải có giá trị.")
        .min(8, "Mật khẩu phải ít nhất 8 ký tự.")
        .max(16, "Mật khẩu tối đa 16 ký tự."),
    });
    return {
      accountFormSchema,
      dataLogin: {},
    };
  },
  methods: {
    async accountLogin(data) {
      try {
        this.dataLogin = {};
        this.dataLogin = await AccountService.login(data);

        if (this.dataLogin.data) {
          Swal.fire({
            icon: "success",
            title: "Đăng nhập thành công!",
            showConfirmButton: false,
            timer: 1500,
          });
          this.$router.push({
            name: "videohistory",
          });
          const account = {
            _id: this.dataLogin.data._id,
            username: this.dataLogin.data.username,
            fullname: this.dataLogin.data.fullname,
          };
          localStorage.setItem("account", JSON.stringify(account));
          useStore().onDataLogin(account);
        }
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>
<style scoped>
@import "@/assets/form.css";
.form-parent {
  max-width: 400px;
}
</style>