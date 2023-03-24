<template>
  <div>
    <div class="m-auto form-parent border border-primary rounded p-4">
      <p class="text-center font-weight-bold text-primary">ĐĂNG KÝ</p>

      <Form @submit="registerAccount" class="" :validation-schema="accountFormSchema">
        <div class="form-group">
          <label for="username">Username</label>
          <Field name="username" type="text" class="form-control" />
          <ErrorMessage name="username" class="error-feedback" />
          <span class="error-feedback">{{ messageRegister }}</span>
        </div>
        <div class="form-group">
          <label for="fullname">Họ và tên</label>
          <Field name="fullname" type="text" class="form-control" />
          <ErrorMessage name="fullname" class="error-feedback" />
        </div>
        <div class="form-group">
          <label for="password">Mật khẩu</label>
          <Field name="password" type="password" class="form-control" />
          <ErrorMessage name="password" class="error-feedback" />
        </div>
        <div class="form-group">
          <label for="passwordConfirm">Mật lại mật khẩu</label>
          <Field name="passwordConfirm" type="password" class="form-control" />
          <ErrorMessage name="passwordConfirm" class="error-feedback" />
        </div>

        <div class="form-group">
          <button class="btn btn-primary w-100">Đăng ký</button>
        </div>
        <div>
          <span>Bạn đã đó tài khoản?</span>
          <router-link :to="{ name: 'account.login' }"> Đăng nhập</router-link>
        </div>
      </Form>
    </div>
  </div>
</template>
<script>
import * as yup from "yup";
import { Form, Field, ErrorMessage } from "vee-validate";
import AccountService from "@/services/account.service";
export default {
  components: {
    Form,
    Field,
    ErrorMessage,
  },
  data() {
    const accountFormSchema = yup.object({
      username: yup
        .string()
        .required("Username phải có giá trị.")
        .min(5, "Username phải ít nhất 5 ký tự.")
        .max(15, "Username tối đa 15 ký tự."),
      fullname: yup.string().min(5, "Họ tên phải ít nhất 2 ký tự."),
      password: yup
        .string()
        .required("Mật khẩu phải có giá trị.")
        .min(8, "Mật khẩu phải ít nhất 8 ký tự.")
        .max(16, "Mật khẩu tối đa 16 ký tự."),
      passwordConfirm: yup
        .string()
        .required("Mật khẩu phải có giá trị.")
        .min(8, "Mật khẩu phải ít nhất 8 ký tự.")
        .max(16, "Mật khẩu tối đa 16 ký tự."),
    });
    return {
      accountFormSchema,
      account: {},
      messageRegister: ''
    };
  },
  methods: {
    async registerAccount(data) {
      try {
        const checkData = await AccountService.findAccountByUsername(data.username);
        if (checkData == null) {
          this.account = await AccountService.create(data);
          Swal.fire({
            icon: "success",
            title: "Đăng ký tài khoản thành công!",
            text: "Bây giờ bạn có thể đăng nhập",
            showConfirmButton: false,
            timer: 2000,
          });
          this.messageRegister = ""
          this.$router.push({name: 'account.login'})
        } else {
          this.messageRegister = "Username Đã tồn tại";
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