<template>
  <article class="">
    <apexchart v-if="pits.length > 0" width="100%" type="line" :options="chartOptions" :series="series"></apexchart>
    <Highcharts
      :ref="'highcharts_' + index"
      :options="buildOptions(property)"
      v-for="(property, index) in properties"/>
  </article>
</template>

<script>
export default {
  data(){
    return{
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
    this.findPits()
  },
  methods:{
    updateCredits: function() {
    	var chart = this.$refs.highcharts.chart;
      chart.credits.update({
        style: {
          color: '#' + (Math.random() * 0xffffff | 0).toString(16)
        }
      });
    },
    buildCategories(property){
      var categories = this.pits.map(function(object){
        return object.md_ft
      })
      // console.log("categories");
      // console.log(categories.flat().filter((v, i, a) => a.indexOf(v) === i).filter( a => a != null).sort(function(a, b){return a-b}).map(function(object){ return object.toString()}));
      // categories = categories.flat().filter( a => a != null).sort(function(a, b){return a-b})
      categories = categories.flat().filter((v, i, a) => a.indexOf(v) === i).filter( a => a != null).sort(function(a, b){return a-b}).map(function(object){ return object.toString()})
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
          // categories: ['0', '1000', '2000', '3000', '4000', '5000', '6000', '7000', '8000', '9000', '10000', '11000']
        },
        yAxis: {
          title: {
            text: property
          },
          // plotLines: [{
          //   value: 0,
          //   width: 1,
          //   color: '#808080'
          // }]
        },
        legend: {
          layout: 'vertical',
          align: 'right',
          verticalAlign: 'middle',
          borderWidth: 0
        },
        series:
        // [{
        //   name: 'Tokyo',
        //   data: [7.0, 6.9, 9.5, 14.5, 18.2, 21.5, 25.2, 26.5, 23.3, 18.3, 13.9, 9.6]
        // }, {
        //   name: 'New York',
        //   data: [-0.2, 0.8, 5.7, 11.3, 17.0, 22.0, 24.8, 24.1, 20.1, 14.1, 8.6, 2.5]
        // }, {
        //   name: 'Berlin',
        //   data: [-0.9, 0.6, 3.5, 8.4, 13.5, 17.0, 18.6, 17.9, 14.3, 9.0, 3.9, 1.0]
        // }, {
        //   name: 'London',
        //   data: [3.9, 4.2, 5.7, 8.5, 11.9, 15.2, 17.0, 16.6, 14.2, 10.3, 6.6, 4.8]
        // }]
        this.pits.map(function(object){
          return {name: object.name,
                  data: object[property]}
        })
      }
    },
    findPits(){
      try {
        this.$http.get('pits/',
        ).then(function(response){
          this.pits = response.body.data.map(function(object){
            let new_object = {
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
          console.log(this.pits);
          // this.buildCategories()

          this.chartOptions.xaxis.categories = this.buildCategories('section')
          this.series = this.pits.map(function(object){
                          return {name: object.name,
                                  data: object.pm_ml}
                        })
          console.log(this.series);
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
