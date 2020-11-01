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
        v-model="allImages"
        max-file-size="1048576"
        label="Upload image"
        @change="imageUpload"
      />
       <q-btn push color="teal" label="Add image" @click="addImage" />
    </div>
    <button @click="check">Check</button>
  </q-page>
</template>

<script>
export default {
  name: "PageIndex",
  data() {
    return {
      allImages: []
    };
  },
  methods: {
    check() {
      console.log(this.image);
    },
    imageUpload() {
      console.log("radi");
    },
    addImage(event){
      const reader = new FileReader();

      reader.addEventListener("click", () => {

        // Create unique name and id
        let imageId = 1;
        let images = JSON.parse(this.$q.localStorage.getItem("images"));

        // random number for id
        if (images && images.length > 0) {
          imageId = Number(images[images.length - 1].imageId) + 1;
        }
        console.log(this.allImages);

        // push image in state to array
        this.allImages.push({ imageId, src: reader.result });
        
        // place array in localstorage
        this.$q.localStorage.set("images", JSON.stringify(this.allImages));
      });
      reader.readAsDataURL(event.target.files[0]);
      console.log("Added");
    }
  }
};
</script>
