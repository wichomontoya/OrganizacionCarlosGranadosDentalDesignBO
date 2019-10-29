<template>
  <article class="">
    <h3>Pozos</h3>
    <v-flex xs12>
      <v-select
          :items="clients"
          v-model="client_selected"
          label="Selecciona el cliente"
          item-text="attributes.name"
        ></v-select>
    </v-flex>
    <div
      style="margin: 20px 0;"
      v-for="(pit, index) in pits"
      v-if="pits.length > 0">
      <p><b>{{pit.attributes.name}}</b></p>
      <v-data-table
        :headers="headers"
        :items="pit.attributes.properties"
        hide-actions
        class="elevation-1">
        <template slot="items" slot-scope="props">
          <td class="text-xs-center">{{ props.item.section }}</td>
          <td class="text-xs-center">{{ props.item.report_number }}</td>
          <td class="text-xs-center">{{ props.item.md_ft }}</td>
          <td class="text-xs-center">{{ props.item.tvd_ft }}</td>
          <td class="text-xs-center">{{ props.item.fl_temp_f }}</td>
          <td class="text-xs-center">{{ props.item.density_ppg }}</td>
          <td class="text-xs-center">{{ props.item.funn_visc_seq__qt }}</td>
          <td class="text-xs-center">{{ props.item.pv_cp }}</td>
          <td class="text-xs-center">{{ props.item.yp }}</td>
          <td class="text-xs-center">{{ props.item.prop_10_s }}</td>
          <td class="text-xs-center">{{ props.item.prop_10_m }}</td>
          <td class="text-xs-center">{{ props.item.prop_30_m }}</td>
          <td class="text-xs-center">{{ props.item.api_ml__30_min }}</td>
          <td class="text-xs-center">{{ props.item.hthp_ml__30_min }}</td>
          <td class="text-xs-center">{{ props.item.cake_api }}</td>
          <td class="text-xs-center">{{ props.item.cake_hthp }}</td>
          <td class="text-xs-center">{{ props.item.temp_f }}</td>
          <td class="text-xs-center">{{ props.item.ph }}</td>
          <td class="text-xs-center">{{ props.item.pm_ml }}</td>
          <td class="text-xs-center">{{ props.item.pf_ml }}</td>
          <td class="text-xs-center">{{ props.item.mf_ml }}</td>
          <td class="text-xs-center">{{ props.item.cl_mg__l }}</td>
          <td class="text-xs-center">{{ props.item.total_hardness_mg__l }}</td>
          <td class="text-xs-center">{{ props.item.mbt_ppb_eq }}</td>
          <td class="text-xs-center">{{ props.item.sand_porcent_by_vol }}</td>
          <td class="text-xs-center">{{ props.item.corr_solid }}</td>
          <td class="text-xs-center">{{ props.item.lgs }}</td>
          <td class="text-xs-center">{{ props.item.nap_base }}</td>
          <td class="text-xs-center">{{ props.item.water }}</td>
          <td class="text-xs-center">{{ props.item.prop_600 }}</td>
          <td class="text-xs-center">{{ props.item.prop_300 }}</td>
          <td class="text-xs-center">{{ props.item.prop_200 }}</td>
          <td class="text-xs-center">{{ props.item.prop_100 }}</td>
          <td class="text-xs-center">{{ props.item.prop_6 }}</td>
          <td class="text-xs-center">{{ props.item.prop_3 }}</td>
          <td class="text-xs-center">{{ props.item.n_hb }}</td>
          <td class="text-xs-center">{{ props.item.k_hb_ibfs_potency_n__100ft2 }}</td>
          <td class="text-xs-center">{{ props.item.tau_0_lbs__100ft2 }}</td>
          <td class="text-xs-center">{{ props.item.excess_total_limd_ibm__bbl }}</td>
        </template>
      </v-data-table>
    </div>





  </article>
</template>

<script>

export default {
  data(){
    return{
      clients: [],
      client_selected: null,
      pits: [],
      headers: [
        {text: 'Sección', value: 'section'},
        {text: 'Reporte No.', value: 'report_number'},
        {text: 'MD ft', value: 'md_ft'},
        {text: 'TVD ft', value: 'tvd_ft'},
        {text: 'FL Temp F', value: 'fl_temp_f'},
        {text: 'Density ppg', value: 'density_ppg'},
        {text: 'Funn Visc sec/qt', value: 'funn_visc_seq__qt'},
        {text: 'PV cp', value: 'pv_cp'},
        {text: 'YP', value: 'yp'},
        {text: '10S', value: 'prop_10_s'},
        {text: '10M', value: 'prop_10_m'},
        {text: '30M', value: 'prop_30_m'},
        {text: 'API mL/30min', value: 'api_ml__30_min'},
        {text: 'HTHP mL/30min', value: 'hthp_ml__30_min'},
        {text: 'Cake API', value: 'cake_api'},
        {text: 'Cake HTHP', value: 'cake_hthp'},
        {text: 'Temp F', value: 'temp_f'},
        {text: 'pH', value: 'ph'},
        {text: 'Pm mL', value: 'pm_ml'},
        {text: 'Pf mL', value: 'pf_ml'},
        {text: 'Mf mL', value: 'mf_ml'},
        {text: 'CL mg', value: 'cl_mg__l'},
        {text: 'Total Hardness mg', value: 'total_hardness_mg__l'},
        {text: 'MBT ppb eq', value: 'mbt_ppb_eq'},
        {text: 'Sand % vol', value: 'sand_porcent_by_vol'},
        {text: 'Corr Solid', value: 'corr_solid'},
        {text: 'LGS', value: 'lgs'},
        {text: 'NAP Base', value: 'nap_base'},
        {text: 'Water', value: 'water'},
        {text: '600', value: 'prop_600'},
        {text: '300', value: 'prop_300'},
        {text: '200', value: 'prop_200'},
        {text: '100', value: 'prop_100'},
        {text: '6', value: 'prop_6'},
        {text: '3', value: 'prop_3'},
        {text: 'n (HB)', value: 'n_hb'},
        {text: 'K (HB)', value: 'k_hb_ibfs_potency_n__100ft2'},
        {text: 'Tau 0 lbd/100ft2', value: 'tau_0_lbs__100ft2'},
        {text: 'Excess (Total)', value: 'excess_total_limd_ibm__bbl'}
      ],

    }
  },
  watch:{
    client_selected(){
      console.log(this.client_selected);
      this.findPits(this.client_selected.id)
    }
  },
  mounted(){
    this.findClients()
    // this.findPits()
  },
  methods:{
    findClients(){
      try {
        this.$http.get('clients/',
        ).then(function(response){
          this.clients = response.body.data
          console.log("Congrats");
          console.log(response);
        },function(response){
          console.log("Error");
          console.log(response);
        })
      } catch (e) {
        console.log("Error");
        console.log(e);
      }
    },
    findPits(id){
      try {
        this.$http.get('find_by_client',{
          params: {
            client_id: id
          }
        }
        ).then(function(response){
          this.pits = response.body.data
          console.log("Congrats");
          console.log(response);
        },function(response){
          console.log("Error");
          console.log(response);
        })
      } catch (e) {
        console.log("Error");
        console.log(e);
      }
    }
  }
}
</script>

<style lang="css">
</style>
