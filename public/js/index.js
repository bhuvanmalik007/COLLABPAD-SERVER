/*global io*/
/*global Vue*/
var socket= io.connect();

var vm =new Vue({
el: 'body',
  data: {

    textarea:'',
    roomname:''


  },
  ready:function(){
    socket.on('flashget' , function(data){

      vm.textarea=data;


    });
},

watch: {
    'textarea': {
      handler: function (val, oldVal) {
         socket.emit('flashsend',val);
      },
      deep: true
    }
  },

  methods:{
  //   send: function(event){

  //     socket.emit('flashsend',vm.textarea);

  //   console.log(vm.textarea);

  //   },

    sendroom: function(event){

      socket.emit('getroom',vm.roomname);


    }



  }

})
