
//   var idleTime = 0;
//   $(document).ready(function () {
//     alert("test");
//     console.log("inside fun");
//       //Increment the idle time counter every minute.
//       var idleInterval = setInterval(timerIncrement, 5000); // 5 seconds
  
//       //Zero the idle timer on mouse movement
//       $(this).mousemove(function (e) {
//           idleTime = 0;
//       });
//       //Zero the idle timer on key press
//       $(this).keypress(function (e) {
//           idleTime = 0;
//       });
//   });
  
//   function timerIncrement() {
//       idleTime = idleTime + 1;
//       if (idleTime > 5) { // 5 seconds
//         $(".bg-cover.bg-1").removeClass("bg-1").addClass("bg-2");
//       }
//   }

// window.onload = test;

// function test(){
//     alert("test");

// }