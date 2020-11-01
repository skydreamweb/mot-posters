<template>
  <q-page class="block">
    <div class="text-h2 text-center q-my-lg">Please upload photo</div>
    <div class="text-subtitle1 text-center">
      Select image to upload up to 512kb
    </div>
    <div
      class="q-gutter-y-md column q-mx-auto q-mt-sm"
      style="max-width: 300px"
    >
      <q-file
        clearable
        multiple
        filled
        color="purple-12"
        v-model="image"
        max-file-size="1048576"
        label="Upload image"
      />
      <q-btn push color="teal" label="Add image" @click="addImage" />
    </div>
    <q-separator spaced inset vertical dark />

    <div class="text-h2 text-center q-my-lg">Uploaded photos</div>
    <div class="row">
    <q-list class="col-6" v-for="img in images" :key="img.imageId" bordered>
      <q-item class="block" clickable v-ripple>
        <q-item-section>
          <img :src="img.src" />
        </q-item-section>
        <q-item-section class="flex">
          <q-btn
            icon="add"
            push
            color="primary"
            label="Poster"
            @click="addPoster"
          />
          <q-btn
            icon="delete"
            push
            color="negative"
            label="Delete"
            @click="deleteImage"
          />
        </q-item-section>
        
      </q-item>
    </q-list>
    </div>

  </q-page>
</template>

<script>
import { getLSData } from "src/helpers/helperFunctions";

export default {
  name: "PageIndex",
  data() {
    return {
      image: null, // q-file v-modal
      images: [] // LocalStorage array
    };
  },
  methods: {
    addImage() {
      // FileReader read the contents of files
      const reader = new FileReader();
      reader.addEventListener("load", () => {
        // Get next ID
        let imageId = 1;
        if (this.images.length > 0) {
          imageId = Number(this.images[this.images.length - 1].imageId) + 1;
        }

        // Push image in state to array
        this.images.push({ imageId, src: reader.result });

        // Place array in localstorage
        this.$q.localStorage.remove("images");
        this.$q.localStorage.set("images", JSON.stringify(this.images));
      });

      // Read images
      reader.readAsDataURL(this.image[0]);

      // Remove image from q-file
      this.image = null;
      console.log(this.images);
    },

    addPoster(){
      console.log("Image to Poster Added");
    },
    deleteImage(){
      console.log("Deleted");
    }
  },
  mounted() {
    // load data from localstorage after reload component
    let images = JSON.parse(this.$q.localStorage.getItem("images"))
      ? JSON.parse(this.$q.localStorage.getItem("images"))
      : [];
    if (images.length > 0) {
      this.images = images;
    }
  }
};
</script>

<style lang="scss" scoped>
img {
  width: 100%;
}
</style>
