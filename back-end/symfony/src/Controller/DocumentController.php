<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Annotation\Route;

class DocumentController extends AbstractController
{
    /**
     * @Route("/documents", name="documents")
     */
    public function index()
    {
        return new JsonResponse([
            [
                'link' => 'http://www.my-awesome-link.com',
                'mime' => 'png',
                'slug' => 'my-awesome-link1',
                'title' => 'Cool pic 2',
            ],
            [
                'link' => 'http://www.my-awesome-link.com',
                'mime' => 'npg',
                'slug' => 'my-awesome-link',
                'title' => 'Cool pic 3',
            ],
            [
                'link' => 'http://www.my-awesome-link.com',
                'mime' => 'cgi',
                'slug' => 'my-awesome-link3',
                'title' => 'Cool pic 1',
            ],
        ]);
    }
}
