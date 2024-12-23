<!-- eslint-disable vue/multi-word-component-names -->
<!-- eslint-disable prettier/prettier -->

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { useAppOptionStore } from '@/stores/app-option';
import { RouterLink, RouterView, useRouter } from "vue-router";
import { useAuthStore } from '../stores/auth-store.js'

const appOption = useAppOptionStore();
const authStore = useAuthStore();
const router = useRouter();

onMounted(() => {
  appOption.appSidebarHide = true;
  appOption.appHeaderHide = true;
  appOption.appContentClass = 'p-0';
});

onBeforeUnmount(() => {
  appOption.appSidebarHide = false;
  appOption.appHeaderHide = false;
  appOption.appContentClass = '';
});

const handleLogin = async (event) => {
  try {
    const { email, password } = event.target.elements;
    let e = email.value
    let p = password.value
    const { data, error } = await authStore.login(e, p);
    if (error && error.message == "Email not confirmed") {
      alert("You need to confirm your email. Please check your spam/junk folder.")
      router.replace("/login")
    } else {
      authStore.isAuthenticated = true;
      router.replace("/")
    }
    console.log("LOGIN DATA: " + data)
  } catch (error) {
    alert(error.message)
  }
}
</script>

<template>
	<div class="login">
		<div class="login-content">
			<form v-on:submit.prevent="handleLogin" name="login_form">
				<h1 class="text-center">Sign In</h1>
				<div class="text-inverse text-opacity-50 text-center mb-4">
					For your protection, please verify your identity.
				</div>
				<div class="mb-3">
					<label class="form-label">Email Address <span class="text-danger">*</span></label>
					<input type="text" id="email" class="form-control form-control-lg bg-white bg-opacity-5" value="" placeholder="" />
				</div>
				<div class="mb-3">
					<div class="d-flex">
						<label class="form-label">Password <span class="text-danger">*</span></label>
						<a href="#" class="ms-auto text-inverse text-decoration-none text-opacity-50">Forgot password?</a>
					</div>
					<input type="password" id="password" class="form-control form-control-lg bg-white bg-opacity-5" value="" placeholder="" />
				</div>
				<button type="submit" class="btn btn-outline-theme btn-lg d-block w-100 fw-500 mb-3">Sign In</button>
				<div class="text-center text-inverse text-opacity-50">
					Don't have an account yet? <RouterLink to="/signup">Sign up</RouterLink>.
				</div>
			</form>
		</div>
	</div>
</template>

<!-- <template>
  <div class="row justify-content-center">
    <form @submit.prevent="handleLogin">
      <card class="col-4 mb-3">
        <card-body>
          <div class="row align-items-center">
            <label for="email" class="form-label">Email</label>
            <input type="text" id="email" class="form-control" aria-describedby="emailHelpBlock" />
            <div id="emailHelpBlock" class="form-text">
              Your username is the email you used to signup.
            </div>
          </div>
          <div class="row align-items-center">
            <label for="password" class="form-label">Password</label>
            <input type="password" id="password" class="form-control" aria-describedby="passwordHelpBlock" />
            <div id="passwordHelpBlock" class="form-text">
              Your password must be 8-20 characters long, contain letters and numbers, and
              must not contain spaces or emoji.
            </div>
          </div>
          <div class="row justify-content-center">
            <div class="col-2">
              <input type="submit" class="btn btn-success" value="Login" >
            </div>
            <div class="col-2">
              <router-link to="/signup" class="btn btn-success">Signup</router-link>
            </div>
            <div class="col-2"><button type="button" class="btn btn-secondary">Cancel</button></div>
          </div>
        </card-body>
      </card>
    </form>
  </div>
</template> -->


