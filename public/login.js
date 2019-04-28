``
$(document).ready(function(){
   /*$("#regBtn").click(function(){
       $.ajax({
         type : 'GET',
         url : '/register',
         success: function(data){
           $("#regDiv").html(data);
         }
       });
   });
*/

 //paybutton  checking
  $("#payform").click(function(){
     var landidd  = $("#land").val();
    
     var cancelData ={'landidd':landidd};
       $.ajax({
         type : 'POST',
         url : '/paycheck',
         data:cancelData,
         success: function(data){
           $("#payyDiv").html(data);
         }
       });
   });

//notary login=======================
  $("#notloginBtn").click(function(){
        $.ajax({
          type : 'GET',
          url : '/notlog',
          success: function(data){
            $("#notloginDiv").html(data);
          }
      });
  
    });
  //pay price button=================
    $("#opayBtn").click(function(){
       $.ajax({
         type : 'GET',
         url : '/opay',
         success: function(data){
           $("#opayDiv").html(data);
         }
       });
   });
//add buyer button==============
  $("#addBtn").click(function(){
       $.ajax({
         type : 'GET',
         url : '/buyer',
         success: function(data){
           $("#addDiv").html(data);
         }
       });
   });

    $("#pBtn").click(function(){
       $.ajax({
         type : 'GET',
         url : '/pay',
         success: function(data){
           $("#payDiv").html(data);
         }
       });
   });

 // $("#publicBtn").click(function(){
 //        $.ajax({
 //          type : 'GET',
 //          url : '/public',
 //          success: function(data){
 //            $("#publicDiv").html(data);
 //          }
 //      });
  
 //    });

 $("#alrdBtn").click(function(){
        $.ajax({
          type : 'GET',
          url : '/already',
          success: function(data){
            $("#viewDiv").html(data);
          }
      });
  
    });
  $("#yetBtn").click(function(){
        $.ajax({
          type : 'GET',
          url : '/yet',
          success: function(data){
            $("#publicDiv").html(data);
          }
      });
  
    });

   $("#usrBtn").click(function(){
        $.ajax({
          type : 'GET',
          url : '/userr',
          success: function(data){
            //changed
            $("#homeDiv").html(data);
          }
      });
  
    });
   $("#notBtn").click(function(){
        $.ajax({
          type : 'GET',
          url : '/nota',
          success: function(data){
            //changed
            $("#homeDiv").html(data);
          }
      });
  
    });
   $("#loginBtn").click(function(){
        $.ajax({
          type : 'GET',
          url : '/login',
          success: function(data){
            //changed
            $("#mainDiv").html(data);
          }
      });
   //window.location="login"
    });

  $("#sellBtn").click(function(){
     var landid  = $("#landid").val();
    
     var sellData ={'landid':landid};
       $.ajax({
         type : 'POST',
         url : '/gemo',
        data:  sellData,
         success: function(data){
           $("#saleDiv").html(data);
         }
       });
   });
  //cancel button checking
  $("#cancelBtn").click(function(){
     var landidd  = $("#landidd").val();
    
     var cancelData ={'landidd':landidd};
       $.ajax({
         type : 'POST',
         url : '/cancel',
         data:cancelData,
         success: function(data){
           $("#cancelDiv").html(data);
         }
       });
   });

    //cancel button checking
  $("#yetaddform").click(function(){
     var landidd  = $("#aname").val();
    
     var cancelData ={'landidd':landidd};
       $.ajax({
         type : 'POST',
         url : '/approveb',
         data:cancelData,
         success: function(data){
           $("#yetaddDiv").html(data);
         }
       });
   });


  //add button 
  $("#addform").click(function(){
     var buyername =$('#bname').val();
     var landidd  = $("#bid").val();
   
     var addData ={'buyername':buyername,'landidd':landidd};
       $.ajax({
         type : 'POST',
         url : '/addb',
         data: addData,
         success: function(data){
           $("#addDiv").html(data);
         }
       });
   });

  $("#viewBtn").click(function(){
       $.ajax({
         type : 'GET',
         url : '/view1',
         success: function(data){
           $("#viewDiv").html(data);
         }
       });
   });
    //==============change price===================================
    $("#changepriceBtn").click(function(){
       $.ajax({
         type : 'GET',
         url : '/changep',
         success: function(data){
         $("#changeprice").html(data);
         }
       });
   });

  //===changeform==================================
  $("#changeForm").click(function(){
     var price  = $("#price").val();
     var landid  = $("#land").val();
     var viewData ={'price':price,'landid':landid};
     $.ajax({
         type : 'POST',
         url : '/changeprice',
         data : viewData,
         success: function(data){
         $("#changeprice").html(data);
         }
       });

   });
       //=====Sales Form Request=============================================
   $("#viewForm").click(function(){
     var aadhaar  = $("#aadhaar").val();
    
     var viewData ={'Aadhaarno':aadhaar};
     $.ajax({
         type : 'POST',
         url : '/demo1',
         data : viewData,
         success: function(data){
         $("#mainDiv").html(data);
         }
       });

   });
   //=====Login Form Request=============================================
   $("#loginForm").click(function(){
     var uname  = $("#uname").val();
     var upass = $("#upass").val();
     var loginData ={'name': uname,'pass':upass};
     $.ajax({
         type : 'POST',
         url : '/demo',
         data : loginData,
         success: function(data){
         $("#mainDiv").html(data);
         }
       });

   });
   //========Notary Login Form request=================
   $("#notloginForm").click(function(){
     var uuname  = $("#unname").val();
     var uupass = $("#unpass").val();
     var notloginData ={'name': uuname,'pass':uupass};
     $.ajax({
         type : 'POST',
         url : '/notaryy',
         data : notloginData,
         success: function(data){
         $("#notloginDiv").html(data);
         }
       });

   });
 //Register Form=============================================
   $("#regBtn").click(function(){
       $.ajax({
         type : 'GET',
         url : '/regiterToDb',
         /*data : regData,*/
         success: function(data){
          //changed
         $("#mainDiv").html(data);
         }
       });
   });
//Save profile Data================================================
$('#saveBtn').click(function(){
  var email = $("#email").val();
  var phone = $("#phone").val();
  var aadhaar = $("#aadhaar").val();
  var pass = $("#upass").val();
  var profileData = {'email':email,'phone':phone,'aadhaar':aadhaar,'pass' : pass};
  $.ajax({
    type : 'POST',
    url : '/completeprofile',
    data : profileData,
    success : function(data){
       $("#mainDiv").html(data);
    }
  });
});
});


