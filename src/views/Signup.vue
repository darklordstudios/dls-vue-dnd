<!-- eslint-disable vue/multi-word-component-names -->
<!-- eslint-disable prettier/prettier -->

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { useAppOptionStore } from '@/stores/app-option';
import { RouterLink, RouterView, useRouter } from "vue-router";
import { useAuthStore } from '../stores/auth-store.js'

const authStore = useAuthStore();
const router = useRouter();

const appOption = useAppOptionStore();

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

const handleSignup = async (event) => {
  try {
    // console.log("EVENT: " + event)
    const { email, password, fullname } = event.target.elements;
    const elements = event.target.elements;
    let e = email.value
    let p = password.value
    let f = fullname.value
    console.log("EMAIL: " + e + ", PASSWORD: " + p)
    const { data, error } = await authStore.signup(e, p);
    if (error) console.log(error);
    // alert(data.user.email)
    // update the user profile table
    if (data) {
      console.log("DATA: " + data)
      // router.replace("/")
    }
  } catch (error) {
    alert(error.message)
  }
}
</script>

<template>
	<div class="register">
		<div class="register-content">
			<form v-on:submit.prevent="handleSignup" name="register_form">
				<h1 class="text-center">Sign Up</h1>
				<div class="mb-3">
					<label class="form-label">Name <span class="text-danger">*</span></label>
					<input type="text" id="fullname" class="form-control form-control-lg bg-white bg-opacity-5" placeholder="e.g John Smith" value="" />
				</div>
        <!-- <div class="mb-3">
					<label class="form-label">First Name <span class="text-danger">*</span></label>
					<input type="text" id="firstname" class="form-control form-control-lg bg-white bg-opacity-5" value="" />
				</div>
				<div class="mb-3">
					<label class="form-label">Last Name <span class="text-danger">*</span></label>
					<input type="text" id="lastname" class="form-control form-control-lg bg-white bg-opacity-5" value="" />
				</div> -->
				<div class="mb-3">
					<label class="form-label">Email Address <span class="text-danger">*</span></label>
					<input type="text" id="email" class="form-control form-control-lg bg-white bg-opacity-5" placeholder="username@address.com" value="" />
				</div>
				<div class="mb-3">
					<label class="form-label">Password <span class="text-danger">*</span></label>
					<input type="password" id="password" class="form-control form-control-lg bg-white bg-opacity-5" value="" />
				</div>
				<div class="mb-3">
					<button type="submit" class="btn btn-outline-theme btn-lg d-block w-100">Sign Up</button>
				</div>
				<div class="text-inverse text-opacity-50 text-center">
					Already have an account? <RouterLink to="/login">Sign In</RouterLink>
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
              Your username will be this email you use to signup.
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
          <div class="row align-items-center">
            <label for="firstname" class="form-label">First Name</label>
            <input type="text" id="firstname" class="form-control" />
          </div>
          <div class="row align-items-center mb-3">
            <label for="lastname" class="form-label">Last Name</label>
            <input type="text" id="lastname" class="form-control" />
          </div>
          <div class="row justify-content-center">
            <div class="col-2">
              <input type="submit" class="btn btn-success" value="Sign Up" >
            </div>
            <div class="col-2"><router-link to="/login" class="btn btn-secondary">Cancel</router-link></div>
          </div>
        </card-body>
      </card>
    </form>
  </div>
</template> -->


