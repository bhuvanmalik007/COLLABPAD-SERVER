/*global io*/
/*global Vue*/


var vm =new Vue({
el: 'body',
  data: {

    textarea:'',
   


  },
  ready:function(){
   
},
watch: {
    'textarea': {
      handler: function (val, oldVal) {
        console.log(val);
        console.log(oldVal);
      },
      deep: true
    }
  },

  methods:{
   


  }

})
