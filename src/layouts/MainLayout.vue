<template>
  <q-layout view="hHh lpR fFf">
    <q-header elevated class="bg-primary text-white">
      <q-toolbar>
        <q-btn dense flat round icon="menu" @click="left = !left" />

        <q-toolbar-title>
          <q-avatar>
            <img src="https://cdn.quasar.dev/logo/svg/quasar-logo.svg" />
          </q-avatar>
          Motivational posters
        </q-toolbar-title>
      </q-toolbar>
    </q-header>

    <q-drawer v-model="left" side="left" bordered>
      <q-list>
        <q-item-label header class="text-grey-8">
          Navigation
        </q-item-label>
        <EssentialLink
          v-for="link in essentialLinks"
          :key="link.title"
          v-bind="link"
        />
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import EssentialLink from "components/EssentialLink.vue";

const linksData = [
  {
    title: "All Images",
    caption: "Create Posters",
    icon: "photo",
    link: "/"
  },
  {
    title: "All Posters",
    caption: "Create Albums",
    icon: "view_carousel",
    link: "/posters"
  },
  {
    title: "All Albums",
    caption: "View all albums",
    icon: "perm_media",
    link: "/albums"
  }
];

export default {
  name: "MainLayout",
  components: { EssentialLink },
  data() {
    return {
      left: true,
      essentialLinks: linksData
    };
  }
};
</script>
