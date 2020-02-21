listApp.service('listAjax',function($http,rootSite){
	//service pour switcher entre mode connécté et mode visiteur > en mode visiteur on utilise le storage et non la BDD 
	
	this.storageFunction = function(){}
	
	this.http= function(url,method,params,success,error,forceHttp,storageCall){
			var connected = $('#currentUserIdent').val();
			if(connected!="00" || forceHttp=="TRUE"){
				$http({
			        url: url,
			        method: method,
			        headers: {'Content-Type': 'application/x-www-form-urlencoded'},
			        data: $.param(params)
			    }).success(success).error(error);	
			}
			else{
				//sessionStorage.setItem("couleur","vert")
					this.storageFunction();
			}
	}
})

listApp.controller('homeController',['$scope','filterFilter','$http','$location','rootSite','rootSite2','listAjax',function($scope,filterFilter,$http,$location,rootSite,rootSite2,listAjax){

	$http.defaults.headers.post["Content-Type"] = "application/x-www-form-urlencoded";
	
	
	$scope.userIdent="00";
	$scope.baseList=[];//liste des actions référencées
	$scope.todos=[];//liste des actions de la liste courante 
	$scope.blackList=[];//liste des actions de la liste courante 
 	$scope.autoCompleteList = [];// liste filtrée pou avoir la liste des actions de référence SANS les actions déja dans la liste 
	$scope.placeholder='Chargement...';
	$scope.statusFilter="";
	$scope.newtodo="";
	
	$scope.keyPress = function(keyCode){
	 	//quand on valide l'ajout d'une action ave la touche enter on lance la fonction d ajout
	   if(keyCode==13){
	   		$scope.addTodo();
	   }
	}
 	$('body').scrollTop(0);
 	$scope.rootUrl = rootSite2;
	// charger la black liste des mots interdits
	$http.get(rootSite+'/phpTools/action_list_black.php').success(function(data){
		$scope.blackList=data;
	});
	//
	$http.get(rootSite+'/phpTools/getUserId.php').success(function(data){
		$scope.userIdent=data;
		console.log('INIT 1 > '+$scope.userIdent);
	});
	
	//charger la liste des actions de références pour l'auto complete 
	$scope.loadBaseList = function(){
		
			listAjax.storageFunction=function(){
				console.log('storageFunction !!!! ');
				if(sessionStorage.getItem("userList")==null || sessionStorage.getItem("userList")==""){
					sessionStorage.setItem("userList",'[]');
				}
				//sessionStorage.setItem("userList",'[{"id":"1","txt":"Regarder les oiseaux","fav":"0","done":"0"},{"id":"2","txt":"Hello","fav":"1","done":"0"},{"id":"5","txt":"Course de voiture","fav":"1","done":"0"},{"id":"4","txt":"Sauter en parachute","fav":"0","done":"1"},{"id":"6","txt":"Chasser","fav":"0","done":"1"},{"id":"3","txt":"Rougir","fav":"0","done":"1"}]');
				
				var getInfos = sessionStorage.getItem("userList");	
				$scope.todos=jQuery.parseJSON(getInfos);
			
				$scope.placeholder='Ajouter une nouvelle tache';
				$scope.baseListUpToDate($scope.baseList,$scope.todos);
				
			};
			
			listAjax.http(//CHARGEMENT BASE ACTIONS 
				rootSite+'/phpTools/action_list_base.php',
				"GET",
				{},
				function(data) {
					
						console.log('CHARGEMENT BASE ACTIONS OK1 ');
						
						$scope.baseList=data;
						$scope.baseListUpToDate($scope.baseList,$scope.todos);
						
						listAjax.http(//CHARGEMENT LISTE UTILISATEUR 
							rootSite+'/phpTools/action_get_user_list.php',
							"GET",
							{},
							function(data2) {
								if(data2!="00"){
								    console.log('CHARGEMENT USER LISTE OK2 ')
									$scope.todos=data2;
									$scope.baseListUpToDate($scope.baseList,$scope.todos);
										
								}
								$scope.placeholder='Ajouter une nouvelle tache';
								
							},function(data, status) {
							    console.log('ERROR GET USER ACTION LIST')
							},
							"FALSE"
						);
				
				},function(data, status) {
				    	console.log('ERROR GET ACTIONS BASE')
				},
				'TRUE'//force http call pour récupérer la base actions
			);
	}
	//
	$scope.loadBaseList();
	//
	if($location.path()==''){$location.path('/');}
	
		$scope.location=$location;
		$scope.$watch('location.path()',function(path){
			
			console.log('wetch > path  > '+path)
			$scope.statusFilter=
				(path=='/active') ? {done:false}:
				(path=='/done') ? {done:true}:
				"";
	})
	//
    $scope.baseListUpToDate = function(myArrayA,myArrayB) {
		// on veux la liste des actions qui ne sont PAS dans la liste courante 
		console.log('baseListUpToDate');
		$scope.autoCompleteList=getCrossTableValues(myArrayA,myArrayB);
		console.table($scope.autoCompleteList);
	}
	//
    $scope.autoCompleteFilter = function(item) {
    	var retour="";
    	if(arrayObjectIndexOf($scope.todos,item)!=-1){
    		retour = false;
    	}
    	else{
    		retour=item;
    	}
        return retour;
    };
	//
	$scope.autoCompleteShow = function(name){
		//on affiche la liste uniquement quand 
		// il y a une recherche de faite ou un seul element dans la liste et qu'il ne correspond pas à la recherche
		var vue = false;
		var list = $('#autoCompleteResults li');
		
			if($scope.newtodo != "" && list.length>0 ){
					vue=true;
					if(list.length<=1 && list.eq(0).length>=0){
					//if(list.length>=0){
						var lastInfo = list.eq(0).html().trim();
							if($scope.newtodo==lastInfo){
								vue=false;
							}
							else{
								vue=true;
							}
					}
				}
				else{
					vue=false;
				}
			return vue;
	}
	//
	$scope.autoCompleteSelect = function(name){
			$scope.newtodo=name;
			$scope.addTodo(name);
	}
	//
	$scope.$watch('todos',function(index){
		$scope.remaining = filterFilter($scope.todos,{done:false}).length;
	},true);
	//
	$scope.removeTodo = function(id){
		
		console.log(rootSite+'/phpTools/action_remove.php?actionId='+id);
		
			listAjax.storageFunction=function(){
				console.log('REMOVE ACTION STORAGE !!!');
						var index=getPosElementById($scope.todos,id)
						var value =	$scope.todos[index];
						//ajouter a la liste autocomplete
						var posElement = getPosElementById($scope.autoCompleteList,id);
						console.log('AJOUT ELEMENT TO AUTOCOMPLETELIST > pos > '+posElement+' id > '+value.id)
						if(posElement==-1){
							$scope.autoCompleteList.push({
									id:value.id,
									txt:value.txt
								});
						}
						//supprimer de la liste
						$scope.todos.splice(index,1);
						
			}
		listAjax.http(//CHARGEMENT BASE ACTIONS 
				rootSite+'/phpTools/action_remove.php',
				"POST",
				{actionId:id},
				function(data) {
						console.log('REMOVE ACTION OK');

						if(data==1){
							var index=getPosElementById($scope.todos,id)
							var value =	$scope.todos[index];
							//ajouter a la liste autocomplete
							var posElement = getPosElementById($scope.autoCompleteList,id);
							console.log('AJOUT ELEMENT TO AUTOCOMPLETELIST > pos > '+posElement+' id > '+value.id)
							if(posElement==-1){
								$scope.autoCompleteList.push({
										id:value.id,
										txt:value.txt
									});
							}
							//supprimer de la liste
							$scope.todos.splice(index,1);
						}
						else{
							 console.log('ERROR REMOVE ACTION > '+data);
							
						}
				
				},function(data, status) {
				    	console.log('ERROR REMOVE ACTION '+status)
				},
				'FALSE'//force http call pour récupérer la base actions
			);
	};
	//
	$scope.actionFavChange = function(actionId){
		
		var statusFav ='0';
		var index = getPosElementById($scope.todos,actionId);
		if($scope.todos[index].fav=='0'){
			statusFav='1';
		}
		else{
			statusFav='0';
		}
		//
		console.log(rootSite+'/phpTools/action_fav.php?actionId='+actionId+'&status='+statusFav)
		//
		$http({
	        url: rootSite+'/phpTools/action_fav.php',
	        method: "POST",
	        headers: {'Content-Type': 'application/x-www-form-urlencoded'},
	        data: $.param({actionId:actionId,status:statusFav})
	    }).success(function(data, status, headers, config) {
	    	
	    	if(data==1){
				console.log('ADD CHANGE FAV ACTION OK index ? > '+index);
				$scope.todos[index].fav=statusFav;
	    	}
	    	else{
				console.log('ERROR CHANGE FAV ACTION > '+data)
	    		
	    	}
			
		}).error(function(data, status, headers, config) {
		    console.log('ERROR CHANGE FAV ACTION '+status)
		});					
	
	}
	//
	$scope.actionStatusChange = function(actionId){
		
		var statusA ='0';
		var index = getPosElementById($scope.todos,actionId);
		if($scope.todos[index].done=='0'){
			statusA='1';
		}
		else{
			statusA='0';
		}
		//
		//console.log(rootSite+'/phpTools/action_done.php?actionId='+actionId+'&status='+statusA)
		//
		$http({
	        url: rootSite+'/phpTools/action_done.php',
	        method: "POST",
	        headers: {'Content-Type': 'application/x-www-form-urlencoded'},
	        data: $.param({actionId:actionId,status:statusA})
	    }).success(function(data, status, headers, config) {
	    	
	    	if(data==1){
				console.log('ADD CHANGE STATUS ACTION OK index ? > '+index);
				$scope.todos[index].done=statusA;
	    	}
	    	else{
				console.log('ERROR CHANGE STATUS ACTION > '+data)
	    		
	    	}
			
		}).error(function(data, status, headers, config) {
		    console.log('ERROR CHANGE STATUS ACTION '+status)
		});					
	
	}
	$scope.addTodo = function(){
		
		//on découpe le texte de la nouvelle action > si il n'y a rien dans la blackliste on continue
		var newTodoValues =$('#new-todo').val().split(/'| /);
		var blackListeMode = false;
		$.each(newTodoValues,function(index,value){
				$.each($scope.blackList,function(index1,value1){
					var valueA = value.toLowerCase();
					var valueB = value1.txt.toLowerCase();
					
					if(valueA==valueB){// si un des mots est présent dans la black liste on le note
						blackListeMode=true;
					}
				})
		});
		
		if(blackListeMode==false){
			/*
			> ajouter l'action à la base action Retour > recupérer l'id de la nouvelle action 
				> si l'action existe deja on recupere sont id
			> ajouter l'action à la base utilisateur pour la rattacher a l utilisateur courant 
			*/
			//si le nouvel element n est pas deja dans la liste on l ajoute 
			if(arrayObjectIndexOf($scope.todos,$scope.newtodo)==-1){
				
				//on minimise le texte et on met une majusctule a la 1 ere lettre
				var actionId =0;
				var actionCathId =0;
				var newAction = $scope.newtodo.toLowerCase();
				newAction = newAction.substr(0,1).toUpperCase()+newAction.substr(1);
				$scope.newtodo="";	
					//console.log(rootSite+'/phpTools/action_add_base.php?actionTxt='+newAction);			
				
				listAjax.storageFunction=function(){
					console.log('storageFunction ADD !!!! actionID ? > '+actionId);
					// ON RECHARGE LA LISTE DE BASE DES ACTIONS ET LA LISTE DE L UTILISATEUR COURANT
					
						$scope.todos.push({
							id:actionId,
							cathId:newAction,
							txt:newAction,
							fav:'0',
							done:false
						});
					//supprimer l'action dans la liste autocomplete apres ajout 	
					var posElement = getPosElementById($scope.autoCompleteList,actionId);
					if(posElement!=-1){
						console.log('SUPPRIMER AUTOCOMPLETE POS > '+posElement)
							$scope.autoCompleteList.splice(posElement,1);
					}
					console.log('SAVE TO STORAGE NEW ACTION ')
					sessionStorage.setItem("userList",JSON.stringify($scope.todos));
				};
				
				////////////////////////////////////////
				
				listAjax.http(//CHARGEMENT BASE ACTIONS 
					rootSite+'/phpTools/action_add_base.php',
					"POST",
					{actionTxt:newAction},
					function(data) {
									
							if(data!=0){
								var recupIdents = data.split(';');
								actionId=recupIdents[0];
								actionCathId=recupIdents[1];
					      		console.log('AJOUT ACTION BASE OK2  actionCathId > '+actionCathId+" actionId > "+actionId);
					      		
					      		listAjax.http(//CHARGEMENT BASE ACTIONS 
									rootSite+'/phpTools/action_add.php',
									"POST",
									{actionId:actionId},
									function(data) {
											console.log('ADD TO TO USER LIST ');
											//$scope.loadBaseList();
											// ON RECHARGE LA LISTE DE BASE DES ACTIONS ET LA LISTE DE L UTILISATEUR COURANT
											$scope.todos.push({
												id:actionId,
												cathId:actionCathId,
												txt:newAction,
												fav:'0',
												done:false
											});
										//supprimer l'action dans la liste autocomplete apres ajout 	
										var posElement = getPosElementById($scope.autoCompleteList,actionId);
										if(posElement!=-1){
											console.log('SUPPRIMER AUTOCOMPLETE POS > '+posElement)
												$scope.autoCompleteList.splice(posElement,1);
										}
									
									},function(data, status) {
										 console.log('ERROR ADD ACTION '+status)
									},
									'FALSE'//force http call pour récupérer la base actions
								);
							}	
						else{
							console.log('ERROR ADD ACTION BASE > 0')
						}
							
					},function(data, status) {
					    	console.log('ERROR GET ACTIONS BASE')
					},
					'TRUE'//force http call pour récupérer la base actions
				);
			
					
			}
			else{
				$scope.newtodo="";
				alert('Action déja présente dans votre liste');
			}
			
		}
		else{
			$scope.newtodo="";
			alert('Votre Action comporte un ou plusieurs mots interdits');
		}
	};

}]);



listApp.controller('topActionsController',['$scope','rootSite2',function($scope,rootSite2){
	console.log('topActionsController');
	$scope.rootUrl=rootSite2;
}]);
listApp.controller('topActionsPageController',['$scope','rootSite2',function($scope,rootSite2){
	console.log('topActionsPageController');
	$scope.rootUrl=rootSite2;
}]);
listApp.controller('actionPageEventController',['$scope','rootSite2',function($scope,rootSite2){
	console.log('actionPageEventController');
	$scope.rootUrl=rootSite2;
}]);

listApp.run(function($rootScope){
	//quand la liste des evenement est finie de chargée, on regarde si il y a le meme nombre d'element apres un readMore > si oui > on masque le btn readmore
  var nbrEvent1=$('.events-table tr').length;	
  $rootScope.$on("$includeContentLoaded", function(event, templateName){
    
		var nbrEvent2=$('.events-table tr').length;
  		if(nbrEvent1==nbrEvent2){
  			$('.btnReadMore').hide();
  		}
  		nbrEvent1=$('.events-table tr').length;
  });
});
		
		
listApp.controller('actionPageController',['$scope','rootSite','rootSite2','$http',function($scope,rootSite,rootSite2,$http){
	console.log('actionPageController (liste evenements) ');
	$scope.rootUrl=rootSite2;
	
	var myUrl =  document.location.href.split('/');
    $scope.actionId=myUrl[myUrl.length-1];
    var limite=5;
    console.log('actionId ? '+$scope.actionId);
    console.log('LIMITE ? '+limite);
    console.log('URL ? '+rootSite+"views/eventsList.php?id="+$scope.actionId+'&limite='+limite);
    $scope.listUrl=rootSite+"/phpTools/view_eventsList.php?id="+$scope.actionId+"&limite="+limite;
  	
  	
  	$http.get(rootSite+'/phpTools/getActionNameById.php?actionId='+$scope.actionId)
  	.success(function(data){ 
  		$scope.actionName=data;
  	});
  	
  	if($('.events-table tr').length<=0){
  		$('.btnReadMore').hide();
  	}
  	
  	$scope.readMore = function(){
  		
  		limite =Number(limite)+5;
  		console.log('readMore'+rootSite+"/phpTools/view_eventsList.php?id="+$scope.actionId+"&limite="+limite);
  		$scope.listUrl=rootSite+"/phpTools/view_eventsList.php?id="+$scope.actionId+"&limite="+limite;
  	}
  	 
}]);
listApp.controller('createEventController',['$scope','rootSite','rootSite2',function($scope,rootSite,rootSite2){
/*	console.log('createEventController');
	$scope.rootUrl=rootSite2;
	
	$scope.actionId=$.urlParam('actionId');
    console.log('URL ? '+$scope.actionId);
	
	//selectionner la bonne catégorie d'action pour le nouvel evenement rapport a ton ID ! 
	
	$scope.listUrl=rootSite+"phpTools/view_createEvent.php?id="+$scope.actionId;	
	$('document').ready(function(){
		
		setTimeout(function(){
			
			console.log('READY');
			
			var ident = $scope.actionId;
			$.each($('.event-categories select option'),function(index,value){
				var currentOption = $(this).html().replace(/[^0-9]/g, '');
				if(parseInt(ident)==parseInt(currentOption)){
					$('.event-categories select option').eq(index).attr('selected','selected');
				}
			
			})
			//
			$(".em-date-end").datepicker({dateFormat: 'dd/mm/yy'});
			$(".em-date-start").datepicker({dateFormat: 'dd/mm/yy'});
		},1000)
	})*/
  	
  	
}]);
listApp.controller('notifsController',function(){
	console.log('notifsController');
});
listApp.controller('favsController',function(){
	console.log('favsController');
});
listApp.directive('autoCorrector', function() {

	return {
		restrict:"A",
    	link: function(scope, elem, attrs) {
				elem.bind('keyup', function (e) {
					var value= elem.val().replace(/[~@#%^*_|+\-=?;:",.<>\{\}\[\]\\\/]/gi, '');
					elem.val(value);
				});
			}
	}
});

listApp.directive('keyFocus', function() {
  return {
    restrict: 'A',
    link: function(scope, elem, attrs) {
      elem.bind('keyup', function (e) {
        // up arrow
        if (e.keyCode == 13) {
            $(':focus').blur();
        }
      });
    }
  };
});


