<?php

namespace Omegazord\PresentationBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Response;
use GuzzleHttp;
use GuzzleHttp\Client;

class ShowController extends Controller
{
    public function accueilAction()
    {
        $content = $this->get('templating')->render('OmegazordPresentationBundle:Show:accueil.html.twig');
    
        return new Response($content);
    }

    public function cvAction()
    {    
        // récupérer toutes les expériences
        $repository = $this->getDoctrine()->getManager()->getRepository('OmegazordPresentationBundle:Experience');
        $experiences = $repository->findAll();
        
        //récupérer toutes les compétences
        $repositoryCompetences = $this->getDoctrine()->getManager()->getRepository('OmegazordPresentationBundle:Competence');
        
        //trier les compétences par catégories
        $competencesLangage = $repositoryCompetences->findBycategorie('langage');
        $competencesFramework = $repositoryCompetences->findBycategorie('framework');
        $competencesLogiciel = $repositoryCompetences->findBycategorie('logiciel');
        $competencesBibliotheque = $repositoryCompetences->findBycategorie('bibliotheque');
        $competencesAutre = $repositoryCompetences->findBycategorie('autre');

        //préparer le contenu envoyé à la vue
        $content = $this->get('templating')->render('OmegazordPresentationBundle:Show:cv.html.twig',
            array('experiences' => $experiences,
                'competencesLangage' => $competencesLangage,
                'competencesFramework' => $competencesFramework,
                'competencesLogiciel' => $competencesLogiciel,
                'competencesBibliotheque' => $competencesBibliotheque,
                'competencesAutre' => $competencesAutre
            ));
        
        return new Response($content);
    }

    public function creationsAction()
    {
        //récupérer tous les projets
        $repositoryProjets = $this->getDoctrine()->getManager()->getRepository('OmegazordPresentationBundle:Projet');
        
        //trier les projets par catégorie
        $projetsCSharp = $repositoryProjets->findByCategorie('C#');
        $projetsPHP = $repositoryProjets->findByCategorie('PHP');
        $projetsJavascript = $repositoryProjets->findByCategorie('Javascript');
        $projetsHTMLCSS = $repositoryProjets->findByCategorie('HTML/CSS');

        //préparer le contenu envoyé à la vue
        $content = $this->get('templating')->render('OmegazordPresentationBundle:Show:creations.html.twig',
            array('projetsCSharp' => $projetsCSharp,
                'projetsPHP' => $projetsPHP,
                'projetsJavascript' => $projetsJavascript,
                'projetsHTMLCSS' => $projetsHTMLCSS
            ));
        
        return new Response($content);
    }
    
    public function apigithubAction()
    {
        try
        {            
            $erreur = "";
            error_log("Debut execution");
            
            
            //API - récupérer les informations du compte GitHub OmegaZord
            $gitHubUser = null;
            try 
            {
                error_log("Debut récupération compte GitHub");
                $client = new \GuzzleHttp\Client();
                $resUser = $client->request('GET', 'https://api.github.com/users/OmegaZord');
                $gitHubUser = json_decode($resUser->getBody(), true);
                error_log("Fin recuperation compte GitHub");
            }
            catch (\Exception $e)
            {
                error_log("Erreur recuperation compte GitHub: " . $e->getMessage());
                $erreur .=  $e->getMessage();
            }
            
            
            //API - récupérer les informations sur les dépôts GitHub du compte OmegaZord
            $gitHubRepositories = null;
            try 
            {
                error_log("Debut recuperation depots GitHub");
                $client2 = new \GuzzleHttp\Client();
                $resRepositories = $client2->request('GET', 'https://api.github.com/users/OmegaZord/repos');
                $gitHubRepositories = json_decode($resRepositories->getBody(), true);
                error_log("Fin recuperation depots GitHub");
            }
            catch (\Exception $e)
            {
                error_log("Erreur recuperation depots GitHub: " . $e->getMessage());
                $erreur .=  $e->getMessage();
            }
            
            
            //API - Récupérer la liste des régions de France
            $regions = null;
            try 
            {
                error_log("Debut recuperation regions France");
                $client3 = new \GuzzleHttp\Client();
                $resRegions= $client3->request('GET', 'https://geo.api.gouv.fr/regions?fields=nom');
                $regions = json_decode($resRegions->getBody(), true);
                error_log("Fin recuperation regions France");
            }
            catch (\Exception $e)
            {
                error_log("Erreur recuperation regions France: " . $e->getMessage());
                $erreur .=  $e->getMessage();
            }
            
            
            //API - Récupérer les 5 articles les plus populaires dans le sous-domaine Worldnews de Reddit
            $redditTop = null;
            try
            {
                error_log("Debut recuperation worldnews Reddit");
                $client5 = new \GuzzleHttp\Client();
                $resRedditTopWorldNews= $client5->request('GET', 'https://www.reddit.com/r/worldnews/top/.json?limit=5');
                $redditTop = json_decode($resRedditTopWorldNews->getBody(), true);
                error_log("Reddit: " . serialize($redditTop));
                error_log("Fin recuperation worldnews Reddit");
            }
            catch (\Exception $e)
            {
                error_log("Erreur recuperation worldnews Reddit: " . $e->getMessage());
                $erreur .=  $e->getMessage();
            }

            //préparer le contenu envoyé à la vue
            $content = $this->get('templating')->render('OmegazordPresentationBundle:Show:apigithub.html.twig',
                array('gitHubUser' => $gitHubUser,
                    'gitHubRepositories' => $gitHubRepositories,
                    'regions' => $regions,
                    'redditTop' => $redditTop,
                    'erreur' => $erreur
                ));
        }
        catch(\Exception $e)
        {
            error_log("Erreur lors de l'execution: " . $e->getMessage());
            error_log($e->getMessage());
            
            //préparer le contenu envoyé à la vue
            $content = $this->get('templating')->render('OmegazordPresentationBundle:Show:apigithub.html.twig', array('erreur' => $e->getMessage()));
        }
        
        return new Response($content);
    }
    
    public function competencesv2Action()
    {
        $content = $this->get('templating')->render('OmegazordPresentationBundle:Show:competencesv2.html.twig');
        
        return new Response($content);
    }
}
