$(document).ready(function(){
   $("#regBtn").click(function(){
       $.ajax({
         type : 'GET',
         url : '/register',
         success: function(data){
           $("#regDiv").html(data);
         }
       });
   });

   $("#loginBtn").click(function(){
       $.ajax({
         type : 'GET',
         url : '/login',
         success: function(data){
           $("#loginDiv").html(data);
         }
       });
   });
  $("#saleBtn").click(function(){
       $.ajax({
         type : 'GET',
         url : '/sales1',
         success: function(data){
           $("#saleDiv").html(data);
         }
       });
   });
       //=====Sales Form Request=============================================
   $("#saleForm").click(function(){
     var uname  = $("#uname").val();
     var land_id = $("#land_id").val();
     var saleData ={'name': uname,'Land_id': land_id};
     $.ajax({
         type : 'POST',
         url : '/demo1',
         data : saleData,
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
//=====Register Form=============================================
   $("#regForm").click(function(){
     var uname  = $("#uname").val();
     var upass = $("#upass").val();
     var regData ={'name': uname,'pass':upass};
       $.ajax({
         type : 'POST',
         url : '/regiterToDb',
         data : regData,
         success: function(data){
         $("#mainDiv").html(data);
         }
       });
   });
//Save profile Data================================================
$('#saveBtn').click(function(){
  var email = $("#email").val();
  var phone = $("#phone").val();
  var aadhaar = $("#aadhaar").val();


  var name = $("#name").val();
  var pass = $("#pass").val();
  var profileData = {'email':email,'phone':phone,'aadhaar':aadhaar,'name' : name,'pass' : pass};
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