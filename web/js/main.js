function testjs()
{
	alert("test");
	$("#testjs").css("background-color", "red");
}

$(document).ready(function(){
	
	// Texte du h2 qui utilise typed.js et qui ne doit pas apparaître sur mobile
	if (!isMobile()) {
		console.log("pas sur mobile");
		 var typed = new Typed("#typed", {
			  //strings: ['Développeur informatique'],
			 stringsElement: '#typed-strings',
			 startDelay: 1000,
			 typeSpeed: 0,
			 
			});
		 var typed = new Typed("#typed2", {
			  //strings: ['Développeur informatique'],
			 stringsElement: '#typed-strings2',
			 startDelay: 1500,
			 loop: true,
			 loopCount: Infinity,
			 typeSpeed: 20,
			});
		 
		 $(".typed-cursor").addClass("hiddenContent");

		}
	else
		{
			console.log("mobile");
			$("#typed-strings").addClass("hiddenContent");
			$("#typed-strings2").addClass("hiddenContent");
			$("h2").html("Développeur Informatique");
		}
	 
	// Mise en place de l'effet déroulant pour les boutons des compétences
   $("#btnContenuFormationAformac").click(function () {
       $("#contenuFormationAformac").slideToggle("slow");
       switchDesignBouton("#btnContenuFormationAformac");
   });
   
   $("#btnContenuProjetsPerso").click(function () {
       $("#contenuProjetsPerso").slideToggle("slow");
       switchDesignBouton("#btnContenuProjetsPerso");
   });
   
   $("#btnContenuDevCAI").click(function () {
       $("#contenuDevCAI").slideToggle("slow");
       switchDesignBouton("#btnContenuDevCAI");
   });
   
   $("#btnContenuStageCAI").click(function () {
       $("#contenuStageCAI").slideToggle("slow");
       switchDesignBouton("#btnContenuStageCAI");
   });
   
   $("#btnContenuFormationAFPA").click(function () {
       $("#contenuFormationAFPA").slideToggle("slow");
       switchDesignBouton("#btnContenuFormationAFPA");
   });
   
   $("#btnContenuPDM").click(function () {
       $("#contenuPDM").slideToggle("slow");
       switchDesignBouton("#btnContenuPDM");
   });
   
   
});

function switchDesignBouton(id)
{
	//A refaire, peut-être sans le foreach mais avec hasclass
	var classList = $(id).attr('class').split(/\s+/);;
	$.each(classList, function(index, item) {
	    if (item === 'btnDetails') {
	    	$(id).removeClass("btnDetails").addClass("btnDetailsClique");
	    	$(id).children( "i" ).removeClass("fa-arrow-circle-o-down").addClass("fa-arrow-circle-o-up");
	    	return false;
	    }
	    else if (item === 'btnDetailsClique') {
	    	$(id).removeClass("btnDetailsClique").addClass("btnDetails");
	    	$(id).children( "i" ).removeClass("fa-arrow-circle-o-up").addClass("fa-arrow-circle-o-down");
	    	return false;
	    }
	});	
}

function displayCV()
{
	/*Code avec la flêche*/
	/*if($("#btnDisplayCV").children("a").hasClass("fa-arrow-down"))
	{
		$("#btnDisplayCV").children("a").removeClass("fa-arrow-down btnDisplayCVUp");
		$("#btnDisplayCV").children("a").addClass("fa-arrow-up btnDisplayCVUp");
	}
	else
	{
		$("#btnDisplayCV").children("a").removeClass("fa-arrow-up btnDisplayCVUp").addClass("fa-arrow-down");
	}*/
	
	if($("#btnDisplayCV").children("a").hasClass("troisPointsDown"))
	{
		$("#btnDisplayCV").children("a").removeClass("troisPointsDown btnDisplayCVUp");
		$("#btnDisplayCV").children("a").addClass("troisPointsUp btnDisplayCVUp");
		$("#btnDisplayCV").children("a").prop('title', 'Voir moins');
	}
	else
	{
		$("#btnDisplayCV").children("a").removeClass("troisPointsUp btnDisplayCVUp").addClass("troisPointsDown");
		$("#btnDisplayCV").children("a").prop('title', 'Voir plus');
	}
	
	
	hideContent("#blocCVPDM");
	hideContent("#blocCVU");
	hideContent("#blocCVBAC");
	
}

function hideContent(id)
{
	if($(id).hasClass("hiddenContent")){
		$(id).removeClass("hiddenContent");
		$(id).addClass("animated pulse");
	}
	else{
		$(id).addClass("hiddenContent");
		$(id).removeClass("animated pulse");
	}
}

function show_api(id_api) {
    if (id_api == "github") {
        $("#blocRegions").hide();
        $("#blocReddit").hide();
        $("#blocGithub").show();
    } else if (id_api == "regions") {
        $("#blocGithub").hide();
        $("#blocReddit").hide();
        $("#blocRegions").show();
    } else if (id_api == "reddit") {
        $("#blocGithub").hide();
        $("#blocRegions").hide();
        $("#blocReddit").show();
    }
}

// Fonction qui retourne true ou false en fonction de si on est sur mobile ou non
function isMobile() {
	return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
	}