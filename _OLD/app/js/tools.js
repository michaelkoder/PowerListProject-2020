
function arrayObjectIndexOf(arr, obj){
    for(var i = 0; i < arr.length; i++){
        if(angular.equals(arr[i].txt, obj)){
            return i;
        }
    }
    return -1;
}

function identGenerator(source){
	var bigId=-1;
	$.each(source,function(index,value){
	    if(bigId<value.id){
	      bigId=value.id}
	    })
	return bigId+1
}

function getCrossTableValues(myArrayA,myArrayB){
	
		var arrayA = myArrayA;
		var arrayB = myArrayB;
		var newArray = myArrayA;

		$.each(arrayB,function(index,value){
				$.each(arrayA,function(index2,value2){
					if(value2){
						//console.log(+value.id+' > '+value.txt+' - '+value2.id+' > '+value2.txt);
						if(value.id == value2.id ){
					    		newArray.splice(index2,1);
					    	}
					}
				})
		})
	return newArray;
}

$.urlParam = function(name){
    var results = new RegExp('[\?&]' + name + '=([^&#]*)').exec(window.location.href);
    
    if (results===null){
       return null;
    }
    else{
       return results[1] || 0;
    }
}

function shareFacebook(){
	
	  FB.ui({
	    method: 'share',
	    mobile_iframe: true,
        title: 'your_title',  // The same than name in feed method
        picture: 'http://jaipeurdelavion.com/wp-content/uploads/2015/07/peur-avion.jpg',  
        caption: 'your_caption',  
        description: 'your_description',
	    href: 'http://justdolist.com/',
	  }, function(response){});

}


function getPosElementById(liste,id){
	var pos=-1;
	$.each(liste,function(index,value){
	    if(Number(id)==Number(value.id))
          {
	        pos=index
          }
	    });
     return pos
}