<?php

namespace Omegazord\PresentationBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;

class DefaultController extends Controller
{
    public function indexAction()
    {
        return $this->render('OmegazordPresentationBundle:Default:index.html.twig');
    }
}
