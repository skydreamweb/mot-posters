<template>
  <q-page class="flex">
    <div class="text-h2 q-mx-auto q-my-lg">All albums</div>
      <div>
    <q-list class="flex" bordered padding>
      <q-item v-ripple v-if="albums.length > 0">
        <div class="container row">
          <div
            v-for="album in albums"
            :key="album.albumId"
            class="albums col-3 albums-list"
          >
            <div class="inner">
              <div>
                <h3>
                  Album name: <span v-if="!isEditName">{{ album.name }}</span
                  ><span v-else><input type="text" v-model="album.name"/></span>
                </h3>

                <button v-if="!isEditName" @click="isEditName = !isEditName">
                  Edit album name
                </button>
                <button v-else @click="editNameHandler">
                  Save Album Name
                </button>
              </div>
            </div>

            <!-- Posters -->
            <h3>Posters list</h3>
            <q-list class="flex" bordered padding>
              <q-item v-ripple v-if="album.posters.length > 0">
                <div class="container row">
                  <div
                    v-for="poster in album.posters"
                    :key="poster.posterId"
                    class="images col-3 poster-list"
                  >
                    <q-checkbox
                      indeterminate-value="false"
                      v-model="checkedPosterIds"
                      :val="poster.posterId"
                      @click.native="checkHandler()"
                    />
                    <div class="inner">
                      <img :src="poster.imgSrc" />
                      <div class="lable">
                        <label>{{ poster.title }}</label>
                        <label>{{ poster.subtitle }}</label>
                      </div>
                    </div>
                    <div class="text">
                      <div class="button">
                        <button
                          class=""
                          separator
                          @click="editPosterHandler(album.albumId)"
                        >
                          Edit
                        </button>
                        <button
                          @click="deletePosterHandler(album, poster.posterId)"
                          class=""
                          separator
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </q-item>
              <q-item v-else>No posters found</q-item>

              <q-separator spaced />
            </q-list>
            <!-- End posters -->

            <div class="text">
              <div class="button">
                <button
                  class=""
                  separator
                  @click="deleteAlbumHandler(album.albumId)"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      </q-item>
      <q-item v-else>No posters found</q-item>

      <q-separator spaced />
    </q-list>
  </div>
  </q-page>
</template>

<script>
export default {
  // test
  name: "Albums",
  data() {
    return {
      albums: [],
      posters: [],
      checkedPosterIds: [],
      isEditName: false
    };
  },
  methods: {
    editNameHandler() {
      this.$q.localStorage.remove("albums");
      this.$q.localStorage.set("albums", JSON.stringify(this.albums));
      this.isEditName = !this.isEditName;
    },
    checkHandler() {
      console.log(this.checkedPosterIds);
      let selectedImages = this.posters.filter(poster =>
        this.checkedPosterIds.includes(poster.posterId)
      );
      // send all checked posters
      this.$emit("posterChecked", selectedImages);
    },

    deleteAlbumHandler(albumId) {
      if (confirm("Are you sure that you want to delete selected album/s?")) {
        // remove selected albums
        this.albums = this.albums.filter(album => album.albumId !== albumId);

        // update in localstorage
        this.$q.localStorage.remove("albums");
        this.$q.localStorage.set("albums", JSON.stringify(this.albums));
      }
    },
    deletePosterHandler(album, posterId) {
      if (
        confirm(
          `Are you sure that you want to remove this poster from ${album.name}?`
        )
      ) {
        // remove poster
        this.albums.forEach(album => {
          if (album.albumId === album.albumId) {
            album.posters = album.posters.filter(
              poster => poster.posterId !== posterId
            );
          }
        });
        console.log(this.albums);

        // save change to local storage
        this.$q.localStorage.remove("albums");
        this.$q.localStorage.set("albums", JSON.stringify(this.albums));
      }
    },
    editPosterHandler(posterId) {
      this.$router.push({ name: "edit-poster", params: { posterId } });
    }
  },
  mounted() {
    let albums = JSON.parse(this.$q.localStorage.getItem("albums"))
      ? JSON.parse(this.$q.localStorage.getItem("albums"))
      : [];
    if (albums.length > 0) {
      albums.forEach(album => {
        this.albums = albums;
      });
    }
    let posters = JSON.parse(this.$q.localStorage.getItem("posters"))
      ? JSON.parse(this.$q.localStorage.getItem("posters"))
      : [];
    if (posters.length > 0) {
      posters.forEach(poster => {
        this.posters = posters;
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.albums {
  width: 100%;
  height: auto;
  border: 1px solid black;
}
.poster-list {
  border: 1px solid black;
  padding: 5px;
}
.poster-list img {
  width: 100%;
  height: auto;
}
.lable {
  position: absolute;
  background-color: tomato;
  width: 24%;
  margin-top: -4rem;
  height: 50px;
}
.lable {
  position: absolute;
  display: grid;
}
</style>
