var listApp = angular.module('listApp',['autofocus','ngRoute']);


// https://www.youtube.com/watch?v=E1NIJjTYq6U
// http://todomvc.com/
// http://css2sass.herokuapp.com/



$('document').ready(function(){
	
   $('.intro-text').html('POWER LIST<br /><span>Réalisez vos projets à plusieurs ! </span>');
   //$('.header-content-wrap').height(($(window).height()-150)+'px');
   //notifMenu favMenu
   if($('.mega-notifMenu .bulleNotif').length<=0){
		$('.mega-notifMenu').append('<div class="bulleNotif">10</div>');
	}
   if($('.mega-favMenu .bulleNotif').length<=0){
		$('.mega-favMenu').append('<div class="bulleNotif">10</div>');
	}
});



$('document').resize(function(){
   //$('.header-content-wrap').height(($(window).height()-150)+'px');
});
/*
ajouter un actionId dans la liste princpale pour avoir un ID de reference propre avec la liste des actions de ref ? 
*/
listApp.constant("rootSite","https://"+document.location.host+document.location.pathname+"wp-content/themes/zerif-lite-child/app/");
listApp.constant("rootSite2","https://"+document.location.host+document.location.pathname);

listApp.config(function($routeProvider,rootSite){

	$routeProvider
		.when('/home',{
			templateUrl:rootSite+'views/home.html',
			controller:'homeController'
		})
		.when('/notifications',{
			templateUrl:rootSite+'views/notifications.html',
			controller:'notifsController'
		})
		.when('/favoris',{
			templateUrl:rootSite+'views/favoris.html',
			controller:'favsController'
		})
		.when('/topActions',{
			templateUrl:rootSite+'views/topActions.html',
			controller:'topActionsController'
		})
		.when('/topActionsPage',{
			templateUrl:rootSite+'views/topActionsPage.html',
			controller:'topActionsPageController'
		})
		.when('/actionPage/:id',{
			templateUrl:rootSite+'views/actionPage.html',
			controller:'actionPageController'
		})
		.when('/actionPageEvent',{
			templateUrl:rootSite+'views/actionPageEvent.html',
			controller:'actionPageEventController'
		})
		.when('/createEventPage',{
			templateUrl:rootSite+'views/createEventPage.html',
			controller:'createEventController'
		})
		.when('/active',{
			templateUrl:rootSite+'views/home.html',
			controller:function($scope){
				console.log('active');
			},
			reloadOnSearch: false
		})
		.when('/done',{
			templateUrl:'views/home.html',
			controller:function($scope){
				console.log('done');
			},
			reloadOnSearch: false
		})
		.when('/all',{
			templateUrl:'views/home.html',
			controller:function($scope){
				console.log('all');
			},
			reloadOnSearch: false
		})
		.otherwise({
			redirectTo:'/home'
		})

});



