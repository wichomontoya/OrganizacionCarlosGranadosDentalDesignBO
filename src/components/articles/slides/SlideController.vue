<template>
  <article class="" style="border-top:1px solid indigo;margin-top:10px">
    <h3 style="margin-top:30px">Slides</h3>
    <div
      style="margin: 20px 0;">
      <v-container v-if="mySlides.length>0">
        <v-data-table :headers="myHeaders" :items="mySlides" hide-actions item-key="name" style="overflow-x:hidden !important;border:1.5px solid #d4cfed;border-radius:6px;" >

          <template slot="items" slot-scope="props">

            <tr style="padding:0px !important;cursor:zoom-in" >
              <td @click="editMySlide(props.item,props.index)" style="text-align:center;width:100%;">{{ props.item.languages[0].title}}</td>
            </tr>

          </template>

        </v-data-table>
      </v-container>
      <p v-else>Este artículo no tiene slides</p>
    </div>
    <div class="" style="text-align: right; margin-top: 50px;">
      <v-btn
        @click="isCreatingSlide=true"
        color="deep-purple darken-4"
        style="color: #fff">Crear Slide</v-btn>
    </div>

    <slide-form
      v-if="isCreatingSlide"
      :myActualSlide="actualSlide"
      @close="isCreatingSlide=false;actualSlide={};actualSlideIndex=null"
      @save="addSlide"
      @delete="removeSlide"></slide-form>
  </article>
</template>

<script>
import SlideForm from './SlideForm.vue'
export default {
  data(){
    return{
      actualSlide:{},
      actualSlideIndex:null,
      isCreatingSlide:false,
      myHeaders: [
        {
          text: 'Listado de slides del artículo',
          align: 'left',
          value: 'name',
          sortable:false,
        }
      ],
      mySlides:[],
    }
  },
  props: ['slides'],
  mounted(){
    console.log("PROBANDO ")
    console.log(this.slides)
    this.mySlides=this.slides;
  },
  methods:{
    addSlide(slide){

      this.$emit('save',slide,this.actualSlideIndex);
      this.isCreatingSlide=false;
      this.actualSlide={};
      this.actualSlideIndex=null;
      this.mySlides=this.slides;
    },
    editMySlide(slide,pos){
      this.actualSlide=slide;
      this.actualSlideIndex=pos;
      this.isCreatingSlide=true;
    },
    removeSlide(slide){
      this.mySlides.splice(this.mySlides.indexOf(slide), 1)
      console.log("current Slides");
      console.log(this.mySlides);
      this.isCreatingSlide=false;
      this.actualSlide={};
      this.actualSlideIndex=null
    }
  },
  components:{
    SlideForm
  },

}
</script>
<style>
  .table__overflow{
    overflow-x: hidden !important;
  }
</style>
