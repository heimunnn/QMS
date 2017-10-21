$(document).ready(function() {
	//Load first
	var currentStore = 1;
	retrieveStore(currentStore);

	
	var ajax_call =  function() {
		if(currentStore == 11)
			currentStore = 1;
		else
			currentStore = currentStore + 1;
		
		retrieveStore(currentStore);
		
		
	}
	 setInterval(ajax_call, 8000);
	
	
	function retrieveStore(storeId)
	{		
		$.ajax ({
		  type:'post',
		  url:'/QMS/php/retrieve.php',
		  data: {storeId: storeId},
		  dataType: "json",
		  success:function(response){
			//alert(response.length);
			for(i = 0; i < response.length; i++)
			{
				
				$('#store'+storeId).children('.row').children('.imageContainer').children('center').children('.queueNumber'+i).text(response[i].queueNumber);
				$('#store'+storeId+'QueueNumber'+i).val(response[i].queueNumber);
				if(response[i].status == 'TRUE')
				{
					// Make the Box flash or highlight background
					$('#store'+storeId+ '.queueNumber'+i).effect( "pulsate", {times:5}, 3000 );
				}
			 }
	    }
	 });
	 
	 hideStore(storeId);
	 
	}
		
	function hideStore(storeId)
	{
		for(var i = 1; i < 12; i++)
		{
			if(storeId == i)
			{
				$('#store'+i).show();
			}
			else
			{
				$('#store'+i).hide();
			}
		}
	}
	
	
	
	
	
	
	
  });
