<template>
  <article class="importer">
    <section>
      <h1>Importador de propiedades</h1>
      <v-form v-model="valid">
        <v-text-field
          v-model="name"
          :rules="nameRules"
          label="Nombre del pozo"
          required
        ></v-text-field>
        <span class="data_card__info--label">Adjuntar información (Formato Excel)</span>
        <div class="trainers__form--photo_container" style="width:max-content">
          <label
            for="excel_input"
            style="
            width: 160px;
            height: 39px;"
            class="trainers__form--photo_button">Examinar</label>
          <input
            id="excel_input"
            type="file"
            @change="excelUpload()"
            name="logo"
            multiple>
            <p class="accessIndex__text--small" style="margin-left:10%" v-if="excelTitle.length<=0" >Debe adjuntar un archivo con formato Excel</p>
        </div>
      </v-form>
      <v-btn @click="saveDocument()">Guardar</v-btn>
    </section>
  </article>
</template>

<script>
export default {
  data(){
    return{
      valid: false,
      name: '',
      usersJson:{},
      excelTitle:'',
      segments:[],
      nameRules: [
        v => !!v || 'El nombre es obligatorio'
      ],
    }
  },
  mounted(){
    var XLSX = require('xlsx');
    console.log(XLSX);
  },
  methods:{
    excelUpload(){
      var fileUpload = document.getElementById("excel_input");
      //Validate whether File is valid Excel file.
      var regex = /^([a-zA-Z0-9\s_\\.\-:])+(.xls|.xlsx|.ods|.xlsm|.xsv|.txt)$/;
      if (regex.test(fileUpload.value.toLowerCase())) {
          var vm=this;
          if (typeof (FileReader) != "undefined") {
              var reader = new FileReader();
              vm.excelTitle=fileUpload.files[0].name;
              //For Browsers other than IE.
              if (reader.readAsBinaryString) {
                  reader.onload = function (e) {
                      vm.usersJson={};
                      vm.ProcessExcelExample(e.target.result);
                  };
                  reader.readAsBinaryString(fileUpload.files[0]);
              } else {
                  //For IE Browser.
                  reader.onload = function (e) {
                      var data = "";
                      var bytes = new Uint8Array(e.target.result);
                      for (var i = 0; i < bytes.byteLength; i++) {
                          data += String.fromCharCode(bytes[i]);
                      }
                      vm.ProcessExcelExample(data);
                  };
                  reader.readAsArrayBuffer(fileUpload.files[0]);
              }
          } else {
              alert("This browser does not support HTML5.");
          }
      } else {
          alert("Por favor subir un archivo de códigos válido (Formato Excel).");
      }
    },
    ProcessExcelExample(data){
      var workbook = XLSX.read(data, {
          type: 'binary'
      });
      var first_worksheet = workbook.Sheets[workbook.SheetNames[0]];
      var data_excel = XLSX.utils.sheet_to_json(first_worksheet, {header:1});
      // console.log("data_excel");
      // console.log(data_excel);
      data_excel.shift()
      this.usersJson = data_excel
      // console.log(this.usersJson);
      /* convert from array of arrays to workbook */
      // var worksheet = XLSX.utils.aoa_to_sheet(data_excel);
      // var new_workbook = XLSX.utils.book_new();
      // XLSX.utils.book_append_sheet(new_workbook, worksheet, "SheetJS");
    },
    saveDocument(){
      var vm = this
      vm.usersJson.map(function(property){
        var object = {
          section: property[0],
          report_number: property[1],
          md_ft: property[2],
          tvd_ft: property[3],
          fl_temp_f: property[4],
          density_ppg: property[5],
          funn_visc_seq__qt: property[6],
          pv_cp: property[7],
          yp: property[8],
          prop_10_s: property[9],
          prop_10_m: property[10],
          prop_30_m: property[11],
          api_ml__30_min: property[12],
          hthp_ml__30_min: property[13],
          cake_api: property[14],
          cake_hthp: property[15],
          temp_f: property[16],
          ph: property[17],
          pm_ml: property[18],
          pf_ml: property[19],
          mf_ml: property[20],
          cl_mg__l: property[21],
          total_hardness_mg__l: property[22],
          mbt_ppb_eq: property[23],
          sand_porcent_by_vol: property[24],
          corr_solid: property[25],
          lgs: property[26],
          nap_base: property[27],
          water: property[28],
          prop_600: property[29],
          prop_300: property[30],
          prop_200: property[31],
          prop_100: property[32],
          prop_6: property[33],
          prop_3: property[34],
          n_hb: property[35],
          k_hb_ibfs_potency_n__100ft2: property[36],
          tau_0_lbs__100ft2: property[37],
          excess_total_limd_ibm__bbl: property[38],
        }
        vm.segments.push(object)
      })
      console.log(vm.segments);
      try {
        this.$http.post('pits/save_document',
        {
          data: {
            attributes:{
              name: this.name,
              client_id: 2,
            },
            properties_attributes: this.segments
          }
        }).then(function(response){
          console.log("Congrats");
          console.log(response);
        },function(response){
          console.log("Error");
          console.log(response);
        })
      } catch (e) {

      }
    }
  }
}
</script>

<style lang="css">
</style>
