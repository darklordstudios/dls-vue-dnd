<!-- eslint-disable no-var -->
<!-- eslint-disable @typescript-eslint/no-unused-vars -->

<script setup lang="ts">
import { getCurrentInstance, onMounted } from "vue";
import { RouterLink, RouterView, useRouter } from "vue-router";
import { useAppOptionStore } from "@/stores/app-option";
import { useAppVariableStore, generateVariables } from "@/stores/app-variable";
import { useAuthStore } from "@/stores/auth-store";
/* import { ProgressFinisher, useProgress } from "@marcoschulte/vue3-progress"; */
import AppSidebar from "@/components/app/Sidebar.vue";
import AppHeader from "@/components/app/Header.vue";
import AppTopNav from "@/components/app/TopNav.vue";
import AppFooter from "@/components/app/Footer.vue";
import AppThemePanel from "@/components/app/ThemePanel.vue";
import router from "./router";

const appOption = useAppOptionStore();
const appVariable = useAppVariableStore();
const authStore = useAuthStore();
const internalInstance = getCurrentInstance();

const navrouter = useRouter();

/* const progresses = [] as ProgressFinisher[]; */

function toggleCover(coverClass) {
  appOption.appCoverClass = coverClass;
  if (localStorage) {
    localStorage.appCoverClass = appOption.appCoverClass;
  }
  setCoverClass(appOption.appCoverClass);
}

function setCoverClass(coverClass) {
  var htmlElm = document.querySelector("html");
  for (var x = 0; x < document.documentElement.classList.length; x++) {
    var targetClass = document.documentElement.classList[x];
    if (targetClass.search("bg-cover-") > -1) {
      htmlElm.classList.remove(targetClass);
    }
  }
  htmlElm.classList.add(coverClass);
}

router.beforeEach(async (to, from, next) => {
  console.log("AUTHENTICATED: " + authStore.isAuthenticated);
  
  if (to && to.name == "Home") {
    console.log("Going Home");
    toggleCover("bg-cover-b");
    next();
  } else {
    console.log("TO: " + to.name)
    switch (to.name) {
      case "Login":
        toggleCover("bg-cover-4");
        next();
        break;

      case "Signup":
        toggleCover("bg-cover-5");
        next();
        break;
    
      default:
        toggleCover("bg-cover-a");
        next();
        break;
    }
  }
  
  appOption.appSidebarMobileToggled = false;
  appOption.appSidebarToggled = false;
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;

  var targetElm = [].slice.call(document.querySelectorAll(".app-sidebar .menu-submenu"));
  targetElm.map(function (elm) {
    elm.style.display = "";
  });
});


document.querySelector("body").classList.add("app-init");
</script>

<template>
  <div
    class="app"
    v-bind:class="{
      'app-header-menu-search-toggled': appOption.appHeaderSearchToggled,
      'app-sidebar-toggled':
        appOption.appSidebarToggled && !appOption.appSidebarCollapsed,
      'app-sidebar-collapsed': appOption.appSidebarCollapsed,
      'app-sidebar-mobile-toggled': appOption.appSidebarMobileToggled,
      'app-sidebar-mobile-closed': appOption.appSidebarMobileClosed,
      'app-content-full-height': appOption.appContentFullHeight,
      'app-content-full-width': appOption.appSidebarHide,
      'app-without-sidebar': appOption.appSidebarHide,
      'app-without-header': appOption.appHeaderHide,
      'app-boxed-layout': appOption.appBoxedLayout,
      'app-with-top-nav': appOption.appTopNav,
      'app-footer-fixed': appOption.appFooterFixed,
    }"
  >
    <!-- <vue3-progress-bar /> -->
    <app-header v-if="!appOption.appHeaderHide" />
    <app-top-nav v-if="appOption.appTopNav" />
    <app-sidebar v-if="!appOption.appSidebarHide" />
    <div class="app-content" v-bind:class="appOption.appContentClass">
      <router-view></router-view>
    </div>
    <app-footer v-if="appOption.appFooter" />
    <app-theme-panel />
  </div>
</template>
