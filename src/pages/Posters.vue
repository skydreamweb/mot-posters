<template>
  <q-page>
    <div class="text-h2 text-center q-mx-auto q-my-lg">Create album</div>
    <p class="text-center">Please select images and then enter album</p>
    <div class="albums">
      <div>
        <q-input
          outlined
          rounded
          class="input-width q-mx-auto"
          type="text"
          placeholder="Enter album name"
          v-model="albumName"
        />
        <q-btn color="secondary q-mt-sm" rounded @click="createAlbumHandler">Create album</q-btn>
      </div>
      <q-list class="flex row" padding>
        <q-separator spaced />

        <template v-if="albums.length > 0">
          <q-item class="block col-3 bordered q-ma-sm" v-ripple v-for="album in albums" :key="album.albumId">
            <q-item-section>
              <q-item-label class="text-h4 text-center">{{ album.name }}</q-item-label>
            </q-item-section>
            <q-item-section side top>
              <q-btn color="negative" rounded @click="deleteAlbumHandler(album.albumId)">Delete</q-btn>
            </q-item-section>
          </q-item>
          </template
        >
        <q-item v-else>No albums found.</q-item>

        <q-separator spaced />
      </q-list>
      <q-separator spaced />
      <list-posters :checkedIds="selectedPosters.length > 0 ? selectedPosters.map(poster => poster.posterId) : []" v-on:posterChecked="posterCheckedHandler"></list-posters>
    </div>
  </q-page>
</template>

<script>
import ListPosters from "../components/ListPosters";
export default {
  name: "Posters",
  components: {
    ListPosters
  },
  data() {
    return {
      albums: [],
      albumName: "",
      selectedPosters: []
    };
  },
  methods: {
    posterCheckedHandler(checkedPosters) {
      this.selectedPosters = checkedPosters;
      console.log(checkedPosters);
    },
    createAlbumHandler() {
      if (this.selectedPosters.length === 0) {
        this.$q.dialog({
            title: "Please select images first"
        });
        return;
      }
      // Set unique album ID
      let albumId = 1;
      let albums = JSON.parse(this.$q.localStorage.getItem("albums"))
        ? JSON.parse(this.$q.localStorage.getItem("albums"))
        : [];
      if (albums && albums.length > 0) {
        albumId = Number(albums[albums.length - 1].albumId) + 1;
      }

      // Create new album
      const album = {
        albumId,
        name: this.albumName,
        posters: this.selectedPosters
      };

      this.albums.push(album);

      // Update in localstorage
      this.$q.localStorage.remove("albums");
      this.$q.localStorage.set("albums", JSON.stringify(this.albums));

      // Reset data
      this.selectedPosters = [];
      this.albumName = "";
    },
    deleteAlbumHandler(albumId) {
        this.$q.dialog({
            title: "Album has been deleted"
        });
        // Remove selected albums
        this.albums = this.albums.filter(album => album.albumId !== albumId);

        // Update in localstorage
        this.$q.localStorage.remove("albums");
        this.$q.localStorage.set("albums", JSON.stringify(this.albums));
    }
  },
  mounted() {
    let albums = JSON.parse(this.$q.localStorage.getItem("albums"))
      ? JSON.parse(this.$q.localStorage.getItem("albums"))
      : [];

    if (albums.length > 0) {
      this.albums = albums;
    }
  }
};
</script>

<style lang="scss" scoped>
.bordered {
    border: 1px solid black;
    border-radius: 10px;
}
.input-width {
  max-width: 400px;
}
.albums {
  display: block;
  margin: 0 auto;
  text-align: center;
}
</style>
