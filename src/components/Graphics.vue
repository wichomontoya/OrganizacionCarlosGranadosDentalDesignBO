<template>
  <article class="" >
    <v-flex xs12>
      <h3 style="margin-bottom: 30px"><b>Selecciona un cliente</b></h3>
      <v-select
          :items="clients"
          v-model="client_selected"
          label="Selecciona el cliente"
          item-text="attributes.name"
      ></v-select>
      <v-flex v-if="client_selected && client_selected.attributes.pits">
        <h3 style="margin-bottom: 30px"><b>Selecciona los pozos a graficar</b></h3>
        <v-checkbox
          v-for="(pit, index) in client_selected.attributes.pits"
          v-model="selected_pits"
          :label="pit.name"
          :value="pit"></v-checkbox>
        <p>Pozos seleccionados: <b>{{ selected_pits.map(function(object){return ' ' + object.name}).toString() }}</b></p>
      </v-flex>
      <v-flex v-if="selected_pits.length > 0">
        <h3 style="margin: 30px 0"><b>Selecciona las propiedades a graficar</b></h3>
        <v-layout row wrap>
          <v-flex xs3 alig-center justify-center v-for="(property, index) in properties">
            <v-checkbox
              v-model="selected_properties"
              :label="property"
              :value="property"></v-checkbox>
          </v-flex>
        </v-layout>
        <p>Propiedades seleccionadas: <b>{{ selected_properties.map(function(object){return ' ' + object}).toString() }}</b></p>
      </v-flex>
    </v-flex>
    <div  v-if="selected_properties.length > 0" class="" style="text-align: right; margin-top: 50px;">
      <v-btn
        @click="findPits(client_selected.id)"
        color="teal darken-1"
        style="color: #fff">Graficar</v-btn>
    </div>
    <v-layout row wrap v-if="charged">
      <v-flex xs6 alig-center justify-center v-for="(property, index) in selected_properties" style="padding: 15px">
        <!-- <vue-plotly :data="ploty_data" :layout="{}" :options="{}" v-if="ploty_data.length > 1"/> -->
        <vue-plotly
           style="margin: 30px 0"

           :data="buildData(property)"
           :layout="{title: 'MD ft vs ' + property,
                     responsive: true,
                     yaxis: { autorange: 'reversed'},
                     height: 1000}"/>
      </v-flex>
    </v-layout>

  </article>
</template>

<script>

export default {
  data(){
    return{
      charged: false,
      clients:[],
      client_selected: null,
      selected_pits: [],
      selected_properties: [],
      ploty_data: [],
      chartOptions: {
        chart: {
          id: 'vuechart-example'
        },
        xaxis: {
          categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998]
          // categories: this.buildCategories(property)
        }
      },
      series: [{
        name: 'Tokyo',
        data: [7.0, 6.9, 9.5, 14.5, 18.2, 21.5, 25.2, 26.5, 23.3, 18.3, 13.9, 9.6]
      }, {
        name: 'New York',
        data: [-0.2, 0.8, 5.7, 11.3, 17.0, 22.0, 24.8, 24.1, 20.1, 14.1, 8.6, 2.5]
      }, {
        name: 'Berlin',
        data: [-0.9, 0.6, 3.5, 8.4, 13.5, 17.0, 18.6, 17.9, 14.3, 9.0, 3.9, 1.0]
      }, {
        name: 'London',
        data: [3.9, 4.2, 5.7, 8.5, 11.9, 15.2, 17.0, 16.6, 14.2, 10.3, 6.6, 4.8]
      }],
      pits: [],
      properties: [
        'section',
        'report_number',
        'md_ft',
        'tvd_ft',
        'fl_temp_f',
        'density_ppg',
        'funn_visc_seq__qt',
        'pv_cp',
        'yp',
        'prop_10_s',
        'prop_10_m',
        'prop_30_m',
        'api_ml__30_min',
        'hthp_ml__30_min',
        'cake_api',
        'cake_hthp',
        'temp_f',
        'ph',
        'pm_ml',
        'pf_ml',
        'mf_ml',
        'cl_mg__l',
        'total_hardness_mg__l',
        'mbt_ppb_eq',
        'sand_porcent_by_vol',
        'corr_solid',
        'lgs',
        'nap_base',
        'water',
        'prop_600',
        'prop_300',
        'prop_200',
        'prop_100',
        'prop_6',
        'prop_3',
        'n_hb',
        'k_hb_ibfs_potency_n__100ft2',
        'tau_0_lbs__100ft2',
        'excess_total_limd_ibm__bbl',
        'pit_id',
      ],

    }
  },
  mounted(){
    this.findClients()
    var trace1 = {
      x: [1, 2, 3, 4, 5, 6, 7, 8],
      y: [10, 15, null, 17, 14, 12, 10, null, 15],
      mode: 'lines+markers',
      connectgaps: true
    };

    var trace2 = {
      x: [1, 2, 3, 4, 5, 6, 7, 8],
      y: [16, null, 13, 10, 8, null, 11, 12],
      mode: 'lines',
      connectgaps: true
    };
    this.ploty_data = [trace1, trace2]
  },
  watch:{
    client_selected(){
      console.log(this.client_selected);
      this.charged = false
      // this.findPits(this.client_selected.id)
    },
    selected_properties(){
      this.charged = false
    },
    selected_pits(){
      this.charged = false
    }
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
    updateCredits: function() {
    	var chart = this.$refs.highcharts.chart;
      chart.credits.update({
        style: {
          color: '#' + (Math.random() * 0xffffff | 0).toString(16)
        }
      });
    },
    buildData(property){
      var data = []
      this.filter_pits.map(function(object){
        let temp = {mode: 'lines+markers',
                    connectgaps: true,
                    name: object.name,
                    y: object.md_ft,
                    // y: object.md_ft.map(function(item){ return item*-1}),
                    x: object[property]}
        data.push(temp)
      })
      return data
    },
    buildCategories(property){
      var categories = this.pits.map(function(object){
        return object[property]
      })
      categories = categories.flat().filter((v, i, a) => a.indexOf(v) === i).filter( a => a != null).sort(function(a, b){return a-b}).map(function(object){ return object})
      console.log(categories);
      return categories
    },
    buildOptions(property){
      var categories = this.buildCategories(property)
      return {
        title: {
          text: 'MD(ft) vs ' + property,
          x: -20 //center
        },
        xAxis: {
          title: {
            text: 'MD(ft)'
          },
          categories: categories
        },
        yAxis: {
          title: {
            text: property
          },
        },
        legend: {
          layout: 'vertical',
          align: 'right',
          verticalAlign: 'middle',
          borderWidth: 0
        },
        series:
        this.pits.map(function(object){
          return {name: object.name,
                  data: object.md_ft}
        })
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
          this.pits = response.body.data.map(function(object){
            let new_object = {
              id: Number(object.id),
              name: object.attributes.name,
              section: object.attributes.properties.map(function(object){return object.section}),
              report_number: object.attributes.properties.map(function(object){return object.report_number}),
              md_ft: object.attributes.properties.map(function(object){return object.md_ft}),
              tvd_ft: object.attributes.properties.map(function(object){return object.tvd_ft}),
              fl_temp_f: object.attributes.properties.map(function(object){return object.fl_temp_f}),
              density_ppg: object.attributes.properties.map(function(object){return object.density_ppg}),
              funn_visc_seq__qt: object.attributes.properties.map(function(object){return object.funn_visc_seq__qt}),
              pv_cp: object.attributes.properties.map(function(object){return object.pv_cp}),
              yp: object.attributes.properties.map(function(object){return object.yp}),
              prop_10_s: object.attributes.properties.map(function(object){return object.prop_10_s}),
              prop_10_m: object.attributes.properties.map(function(object){return object.prop_10_m}),
              prop_30_m: object.attributes.properties.map(function(object){return object.prop_30_m}),
              api_ml__30_min: object.attributes.properties.map(function(object){return object.api_ml__30_min}),
              hthp_ml__30_min: object.attributes.properties.map(function(object){return object.hthp_ml__30_min}),
              cake_api: object.attributes.properties.map(function(object){return object.cake_api}),
              cake_hthp: object.attributes.properties.map(function(object){return object.cake_hthp}),
              temp_f: object.attributes.properties.map(function(object){return object.temp_f}),
              ph: object.attributes.properties.map(function(object){return object.ph}),
              pm_ml: object.attributes.properties.map(function(object){return object.pm_ml}),
              pf_ml: object.attributes.properties.map(function(object){return object.pf_ml}),
              mf_ml: object.attributes.properties.map(function(object){return object.mf_ml}),
              cl_mg__l: object.attributes.properties.map(function(object){return object.cl_mg__l}),
              total_hardness_mg__l: object.attributes.properties.map(function(object){return object.total_hardness_mg__l}),
              mbt_ppb_eq: object.attributes.properties.map(function(object){return object.mbt_ppb_eq}),
              sand_porcent_by_vol: object.attributes.properties.map(function(object){return object.sand_porcent_by_vol}),
              corr_solid: object.attributes.properties.map(function(object){return object.corr_solid}),
              lgs: object.attributes.properties.map(function(object){return object.lgs}),
              nap_base: object.attributes.properties.map(function(object){return object.nap_base}),
              water: object.attributes.properties.map(function(object){return object.water}),
              prop_600: object.attributes.properties.map(function(object){return object.prop_600}),
              prop_300: object.attributes.properties.map(function(object){return object.prop_300}),
              prop_200: object.attributes.properties.map(function(object){return object.prop_200}),
              prop_100: object.attributes.properties.map(function(object){return object.prop_100}),
              prop_6: object.attributes.properties.map(function(object){return object.prop_6}),
              prop_3: object.attributes.properties.map(function(object){return object.prop_3}),
              n_hb: object.attributes.properties.map(function(object){return object.n_hb}),
              k_hb_ibfs_potency_n__100ft2: object.attributes.properties.map(function(object){return object.k_hb_ibfs_potency_n__100ft2}),
              tau_0_lbs__100ft2: object.attributes.properties.map(function(object){return object.tau_0_lbs__100ft2}),
              excess_total_limd_ibm__bbl: object.attributes.properties.map(function(object){return object.excess_total_limd_ibm__bbl})
            }
            return new_object
          })
          console.log("Congrats");
          console.log(response);
          var vm = this
          // console.log(this.pits);
          // console.log(vm.selected_pits);
          // console.log(vm.selected_pits.map(function(object){return object.id}));
          // console.log(this.pits.filter( pit => vm.selected_pits.map(function(object){return object.id}).includes(pit.id)));
          // this.chartOptions.xaxis.categories = this.buildCategories('section')
          this.filter_pits = this.pits.filter( pit => vm.selected_pits.map(function(object){return object.id}).includes(pit.id))
          this.charged = true
          this.series = this.pits.filter( pit => vm.selected_pits.map(function(object){return object.id}).includes(pit.id)).map(function(object){
                          return {name: object.name,
                                  data: object.pm_ml}
                        })
          console.log(this.series);
          // this.charged = true
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
