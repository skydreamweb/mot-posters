<template>
  <q-page class="block">
    <div class="text-h2 text-center q-my-lg">Please upload photo</div>
    <div class="text-subtitle1 text-center">Select image to upload up to 512kb</div>
     <div class="q-gutter-y-md column" style="max-width: 300px">
      <q-file clearable filled color="purple-12" v-model="image" max-file-size="512" label="Upload image" />
     </div>
    <button @click="check">Check</button>
  </q-page>
</template>

<script>
export default {
  name: 'PageIndex',
  data() {
    return {
      image: []
    }
  },
  methods: {
    check(){
      console.log(this.image);
    },
    imageUpload(){
      console.log("radi");
    }
  }
}
</script>
