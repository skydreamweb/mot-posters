<template>
  <div>
    <div class="text-h2 text-center q-my-lg">
      {{ editPoster ? "Edit" : "Create" }} poster
    </div>
    <div class="box">
      <img
        :src="
          editPoster ? editPoster.imgSrc : imagePoster ? imagePoster.src : ''
        "
        alt=""
      />
    </div>
    <div class="lable">
      <label for="checkbox">{{ title }}</label>
      <label for="checkbox">{{ subtitle }}</label>
    </div>

    <div class="text q-mb-xl">
      <div class="flex row custom-width">
        <q-input
          class="col-5"
          outlined
          type="text"
          v-model="title"
          placeholder="Please enter title"
        />
        <q-input
          class="col-5"
          outlined
          type="text"
          name="subtitle"
          placeholder="Please enter subtitle"
          v-model="subtitle"
        />
        <q-btn class="col-2" color="primary" @click="submitPosterHandler(imagePoster)" >{{ editPoster ? "Edit" : "Save" }} poster </q-btn>
      </div>
      <q-dialog v-model="noActive">
        <q-card>
          <q-card-section>
            <div class="text-h6">Done</div>
          </q-card-section>

          <q-card-section class="q-pt-none">
            Poster has been created!
          </q-card-section>

          <q-card-actions align="right">
            <q-btn flat label="OK" color="primary" v-close-popup />
          </q-card-actions>
        </q-card>
      </q-dialog>
    </div>
  </div>
</template>

<script>
export default {
  name: "PosterCreator",
  data() {
    return {
      noActive: false,
      title: this.editPoster ? this.editPoster.title : "",
      subtitle: this.editPoster ? this.editPoster.subtitle : "",
      images: [],
      src: ""
    };
  },
  props: {
    imagePoster: {
      type: Object,
      required: false
    },
    editPoster: {
      type: Object,
      required: false
    }
  },
  methods: {
    submitPosterHandler(img) {
      if (!img && !this.editPoster) {
        return alert("Please select image first!");
      }
      // set unique poster id
      let posters = JSON.parse(this.$q.localStorage.getItem("posters"))
        ? JSON.parse(this.$q.localStorage.getItem("posters"))
        : [];

      // edit poster
      if (this.editPoster) {
        posters.forEach(poster => {
          if (Number(poster.posterId) === Number(this.editPoster.posterId)) {
            poster.title = this.title;
            poster.subtitle = this.subtitle;
          }
        });
      } else {
        // add new poster
        let posterId = 1;

        if (posters && posters.length > 0) {
          posterId = Number(posters[posters.length - 1].posterId) + 1;
        }
        console.log(img);
        const poster = {
          posterId,
          title: this.title,
          subtitle: this.subtitle,
          imageId: img.imageId,
          imgSrc: img.src
        };
        posters.push(poster);
      }

      // save posters in localStorage
      this.$q.localStorage.set("posters", JSON.stringify(posters));
      this.noActive = true;

      // reset data
      this.title = "";
      this.subtitle = "";
      this.images = [];

      // go to create album page
      // this.$router.push("/create");
    }
  }
};
</script>

<style lang="scss" scoped>
.custom-width {
  width: 600px;
  margin: 0 auto;
}
.box {
  margin: 0 auto;
}
.box img {
  width: 596px;
  height: 400px;
}
.lable {
  width: 100%;
  height: 120px;
  border: black;
  background-color: black;
  display: grid;
  margin: 0 auto;
  text-align: center;
  font-size: 1.5rem;
  max-width: 600px;
  color: white;
}
.box {
  width: 600px;
  height: 400px;
  border: 2px solid black;
}
.lable label {
    display: inline-flex;
    justify-content: center;
    align-items: center;
}
</style>
