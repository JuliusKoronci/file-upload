<?php

namespace App\Controller\Document;

use App\Entity\Document;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

/**
 * Class ListController
 *
 * handle Document CRUD
 *
 *
 * @package App\Controller\Document
 */
class ListController extends BaseController
{
    /**
     * List all documents
     *
     * @Route("/documents", name="documents", methods={"GET"})
     * @throws \LogicException
     * @throws \InvalidArgumentException
     */
    public function index(): Response
    {
        $documents = $this->getDoctrine()->getRepository(Document::class)->findAll();

        return new Response($this->get('jms_serializer')->serialize($documents, 'json'));
    }
}
