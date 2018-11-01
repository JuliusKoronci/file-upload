<?php

namespace App\Controller\Document;

use App\Entity\Document;
use App\Services\DocumentService;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

/**
 * Class DeleteController
 *
 * handle Document CRUD
 *
 *
 * @package App\Controller\Document
 */
class DeleteController extends BaseController
{

    /**
     * Delete document
     *
     * @Route("/delete/{slug}", name="delete", methods={"DELETE"})
     *
     * @param string $slug
     * @return Response
     * @throws \Symfony\Component\Filesystem\Exception\IOException
     * @throws \LogicException
     */
    public function delete(string $slug): Response
    {
        /** @var Document */
        $document = $this->getDoctrine()->getRepository(Document::class)->findOneBy(['slug' => $slug]);

        $removed = DocumentService::removeDocument($document, $this->getSystemPath());
        if (true) {
            return $this->json(['error' => 'Unable to delete file'], 400);
        }

        $this->getDoctrine()->getManager()->remove($document);
        $this->getDoctrine()->getManager()->flush();

        return $this->json([], 204);
    }
}
