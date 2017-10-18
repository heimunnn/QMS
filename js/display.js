
  $(document).ready(function() {
	//Load first
	$.ajax
	   ({
		  type:'post',
		  url:'retrieve.php',
		  dataType: "json",
		  success:function(response){
			//alert(response.length);
			for(i = 0; i < response.length; i++)
			{
				$('.queueNumber'+i).text(response[i].queueNumber);
				$('#queueNumber'+i).val(response[i].queueNumber);
				if(response[i].status == 'TRUE')
				{
					// Make the Box flash or highlight background
					$("#queueNumber"+i).effect( "pulsate", {times:5}, 3000 );
				}
			 }
	    }
	 });

	//Load every 2minutes;
	var ajax_call =  function() {
	
	$.ajax
	   ({
		  type:'post',
		  url:'retrieve.php',
		  dataType: "json",
		  success:function(response) {
			for(i = 0; i < response.length; i++)
			{
				
				
				// Manipulate and append it to the Queue Board
				if(response[i].new == 'True')
				{
				  new Audio("audio/doorbell-1.wav").play();
				  $.ajax
					   ({
						  type:'post',
						  url:'updateNew.php',
						  dataType: "json",
						  data: {queueNumber: response[i].queueNumber}
					 });
				}
				
				var queueNumber0 = $("#queueNumber0").val();
				var queueNumber1 = $("#queueNumber1").val();
				var queueNumber2 = $("#queueNumber2").val();
				
				var numbers = [queueNumber0, queueNumber1, queueNumber2];				
				removeCompleteNumber(numbers, response)
				
				
				if(response[i].queueNumber != queueNumber0 &&
				   response[i].queueNumber != queueNumber1 &&
				   response[i].queueNumber != queueNumber2 )
				{					
				  $('.queueNumber'+i).text(response[i].queueNumber);	
				  $('#queueNumber'+i).val(response[i].queueNumber);				  
				}

			
				if(response[i].status == 'True')
				{
					// Make the Box flash or highlight background
				   new Audio("audio/doorbell-1.wav").play();
				   $(".queueNumber"+i).effect( "pulsate", {times:5}, 3000 );
				}
			}
			
	    }
		
	 });
	}
	 setInterval(ajax_call, 8000);
	 
	 
	 function diff(a1, a2) 
	 {
		  return a1.concat(a2).filter(function(val, index, arr){
			return arr.indexOf(val) === arr.lastIndexOf(val);
		  });
	 }
	 
	 function removeCompleteNumber(numbers, response)
	 {
		 var array = new Array();
				
		for(q = 0; q < response.length; q++)
		{
			array[q] = response[q].queueNumber;
		}
		
		var diff1 = diff(numbers, array);
		for(var p = 0; p < diff1.length; p++)
		{
		
			if($('#queueNumber0').val() == diff1[p])
			{
				$('.queueNumber0').empty();
				$('#queueNumber0').val("");
				if($('#queueNumber1').val() != null || $('#queueNumber1').val() != "")
				{
					$('.queueNumber0').text($('#queueNumber1').val());
					$('#queueNumber0').val($('#queueNumber1').val());
					$('.queueNumber1').empty();
					$('#queueNumber1').val("");
				}
				if($('#queueNumber2').val() != null || $('#queueNumber2').val() != "")
				{
					$('.queueNumber1').text($('#queueNumber2').val());
					$('#queueNumber1').val($('#queueNumber2').val());
					$('.queueNumber2').empty();
					$('#queueNumber2').val("");
				}
			}
			if($('#queueNumber1').val() == diff1[p])
			{
				$('.queueNumber1').empty();
				$('#queueNumber1').val("");
				if($('#queueNumber2').val() != null || $('#queueNumber2').val() != "")
				{
					$('.queueNumber1').text($('#queueNumber2').val());
					$('#queueNumber1').val($('#queueNumber2').val());
					$('.queueNumber2').empty();
					$('#queueNumber2').val("");
				}
			}
			if($('#queueNumber2').val() == diff1[p] || $('#queueNumber2').text() == "" || $('#queueNumber2').text() == null)
			{
				$('#queueNumber2').val("");
				$('.queueNumber2').empty();
			}
				
		}
	 }
	 
	 
	 function clearHiddenValues()
	 {
		 $('#queueNumber0').val("");
		 $('#queueNumber1').val("");
		 $('#queueNumber2').val("");
	 }
	 
  });