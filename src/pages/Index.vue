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

    <!-- Dialog if no image selected -->
    <q-dialog v-model="alert">
      <q-card>
        <q-card-section>
          <div class="text-h6">No image</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          Please upload image to continue!
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="OK" color="primary" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>

    <q-separator spaced inset vertical dark />

    <div class="text-h2 text-center q-my-lg">Uploaded photos</div>
    <div class="row">
      <q-list class="col-6" v-for="img in images" :key="img.imageId">
        <q-item class="block image-border" clickable v-ripple>
          <q-item-section>
            <img :src="img.src" />
          </q-item-section>
          <q-item-section class="block row text-center">
            <q-btn
              class="col q-ma-sm"
              icon="add"
              push
              color="primary"
              label="Poster"
              @click="addPoster(img)"
            />
            <q-btn
              class="col q-ma-sm"
              icon="delete"
              push
              color="negative"
              label="Delete"
              @click="deleteImage(img.imageId)"
            />
          </q-item-section>
        </q-item>
      </q-list>
    </div>
    <poster-creator></poster-creator>
  </q-page>
</template>

<script>
import { getLSData } from "src/helpers/helperFunctions";
import PosterCreator from "../components/PosterCreator";

export default {
  name: "PageIndex",
  components: {
    PosterCreator
  },
  data() {
    return {
      alert: false,
      image: null, // q-file v-modal
      images: [], // LocalStorage array
      singleImage: null // Images to create poster
    };
  },
  methods: {
    addImage() {
      if (this.image == null) {
        this.alert = true;
        return;
      }
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

    addPoster(img) {
      console.log("Image to Poster Added");
      this.singleImage = img;
    },

    // Delete image
    deleteImage(imageId) {
      // Update images array
      this.images = this.images.filter(image => image.imageId !== imageId);

      // Update localstorage
      localStorage.removeItem("images");
      localStorage.setItem("images", JSON.stringify(this.images));
      console.log("Deleted");
      this.confirm = false;
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
.image-border {
  border-radius: 40px;
  border: 1px solid black;
  padding: 15px;
}
</style>
