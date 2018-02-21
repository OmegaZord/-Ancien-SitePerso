$(document).ready(function(){
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