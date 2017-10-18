/* ==========================================================================
   main.js
   ========================================================================== */

$(document).ready(function() {
	var arr = [];
  $.ajax
  	   ({
  		  type:'post',
  		  url:'retrieve.php',
  		  dataType: "json",
  		  success:function(response) {
  			// Manipulate and append it to the Queue Board

  			for(i = 0; i < response.length; i++)
  			{
  				$('#queueBox').append('<div id="div'+ response[i].queueNumber +'"><div class="row"><div class="col-xs-7 col-sm-7 col-md-7">' + response[i].queueNumber +  '</div><div class="col-xs-5 col-sm-5 col-md-5"> <img src="images/recall_btn.png" id="recallBtn" onclick="recallNumber('+response[i].queueNumber+')"/></button>' + ' ' + '<img src="images/complete_btn.png" id="deleteBtn" onclick="deleteQueueNumber('+response[i].queueNumber+')"/></div></div></div>');
					arr[i] = response[i].queueNumber;
  			}
  	    }
  	 });

     $(".digits").click(function(){
       var value =  $(this).children('p').children('strong').text();
       var queueNumber = $("#queueNumber");

        if(value == 1)
            queueNumber.append("1");
        if(value == 2)
            queueNumber.append("2");
        if(value == 3)
            queueNumber.append("3");
        if(value == 4)
            queueNumber.append("4");
        if(value == 5)
            queueNumber.append("5");
        if(value == 6)
            queueNumber.append("6");
        if(value == 7)
            queueNumber.append("7");
        if(value == 8)
            queueNumber.append("8");
        if(value == 9)
            queueNumber.append("9");
        if(value == 0)
            queueNumber.append("0");
        if(value == "CLR")
            queueNumber.empty("");
        if(value == "DEL")
            queueNumber.text(queueNumber.text().slice(0, -1));
        });

    $("#submitQueue").click(function() {
			if($('#queueNumber').text() == ""){
				swal("Please enter a number!");
				return;
			}
      var queueNumber = parseInt($('#queueNumber').text());
	  	var counter;
      	if ($("#queueBox > div").length > 5)
        {
        	swal("Please delete previous numbers before entering new numbers!");
			  	return;
        }
				// Validation for entering same number into queuebox
				for(i = 0; i < arr.length; i++)
				{
					if(parseInt(arr[i]) == queueNumber)
					{
						swal("Same number entered!");
						$('#queueNumber').empty();
						return;
					}
					counter = i;
				}

			  //function for adding to DB
				 $.ajax({
					 type: 'POST',
					 url: 'insert.php',
					 dataType: 'json',
					 data: {queueNumber: queueNumber},
					 //if successful, do something
					 success: function(response){
						   counter++;
						   arr[counter] = queueNumber;
						   $('#queueBox').append('<div id="div'+ queueNumber +'"><div class="row"><div class="col-xs-7 col-sm-7 col-md-7">' + queueNumber +  ' </div><div class="col-xs-5 col-sm-5 col-md-5"><img src="images/recall_btn.png" id="recallBtn" onclick="recallNumber('+queueNumber+')"/></button>' + ' ' + '<img src="images/complete_btn.png" id="deleteBtn" onclick="deleteQueueNumber('+queueNumber+')"/> </div></div></div>');
						   $('#queueNumber').empty();
						   swal(response.status);
					}
				});
      });
			//generating stats - Duration to collect food etc;
			$("#generateStats").click(function(){
				window.location.href='Statistics.html';
	 });
	 $("#backBtn").click(function(){
		 window.location.href='index4.html';
	 });
});

// Deleting Queue Number
function deleteQueueNumber(queueNumber){
  jQuery.ajax({
      type:'post',
      url: "complete.php",
      dataType: "json",
      data: {queueNumber: queueNumber},
      success: function(response){
        //Manipulate and remove the selected queueNumber div
        $("#div"+queueNumber).remove();
        swal(response.status);
        }
    });
};

//Recalling Queue Number
function recallNumber(queueNumber){
  jQuery.ajax({
      type:'post',
      url: "recall.php",
      dataType: "json",
      data: {queueNumber: queueNumber},
      success: function(response){
        //Manipulate and remove the selected queueNumber div
        swal(response.status);
        }
	 });
}
