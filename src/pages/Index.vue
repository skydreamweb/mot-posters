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
      // Read imagea
      reader.readAsDataURL(this.image[0]);

      // Remove image from q-file
      this.image = null;
    }
  }, mounted(){
     this.images = getLSData("images");
  }
};
</script>
