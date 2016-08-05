/*global io*/
/*global Vue*/
var socket= io.connect();

var vm =new Vue({
el: 'body',
  data: {

    textarea:'',
    roomname:'',
    cnt:0,


  },
  ready:function(){
    socket.on('flashget' , function(data){
        vm.textarea=data;
    });
},

// watch: {
//     'textarea': {
//       handler: function (val, oldVal) {
//         socket.emit('flashsend',val);
//         vm.cnt=1;
//       },
//       deep: true
//     }
//   },

  methods:{
    send: function(event){

      socket.emit('flashsend',vm.textarea);
       console.log(vm.textarea);

    },

    sendroom: function(event){

      socket.emit('getroom',vm.roomname);


    }


  }

})

//methods:{
//  send: function(event){
//    vm.typecnt++;
//    if(vm.typecnt==2){
//
//      socket.emit('flashsend',vm.textarea);
//      vm.cnt=1;
//      console.log(vm.textarea);
//      vm.typecnt=0
//    }
//
//  }

//ready:function(){
//  socket.on('flashget' , function(data){
//    if(vm.cnt==1){
//      vm.cnt=0;
//    }
//    else{
//      vm.textarea=data;
//    }
//
//
//
//  });
//}
