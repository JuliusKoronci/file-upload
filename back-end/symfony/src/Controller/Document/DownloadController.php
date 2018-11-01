<?php

namespace App\Controller\Document;

use App\Entity\Document;
use App\Services\DocumentService;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

/**
 * Class DownloadController
 *
 * handle Document CRUD
 *
 *
 * @package App\Controller\Document
 */
class DownloadController extends BaseController
{

    /**
     * Download a document
     *
     * @Route("/download/{slug}", name="download", methods={"GET"})
     * @param string $slug
     * @return Response
     * @throws \InvalidArgumentException
     * @throws \UnexpectedValueException
     * @throws \LogicException
     */
    public function download(string $slug): Response
    {
        /** @var Document $document */
        $document = $this->getDoctrine()->getRepository(Document::class)->findOneBy(['slug' => $slug]);

        try {
            $response = DocumentService::createDocumentResponse($document, $this->getSystemPath());
        } catch (\Exception $exception) {
            return $this->json(['error' => 'Unexpected error while retrieving file'], 400);
        }
        return $response;
    }
}
