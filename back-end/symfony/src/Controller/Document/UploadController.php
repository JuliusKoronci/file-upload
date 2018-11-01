<?php

namespace App\Controller\Document;

use App\Services\DocumentService;
use Symfony\Component\HttpFoundation\File\UploadedFile;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

/**
 * Class UploadController
 *
 * handle Document CRUD
 *
 *
 * @package App\Controller\Document
 */
class UploadController extends BaseController
{
    /**
     * Upload a file
     *
     * @Route("/upload", name="upload", methods={"POST"})
     * @param Request $request
     * @return Response
     * @throws \Exception
     */
    public function upload(Request $request): Response
    {
        /** @var UploadedFile $postedFile */
        $postedFile = $request->files->get('file');
        try {
            $document = DocumentService::handleUploadedFile($postedFile, $this->getSystemPath());
        } catch (\Exception $exception) {
            return $this->json(['error' => 'Unable to save document'], 400);
        }

        $this->getDoctrine()->getManager()->persist($document);
        $this->getDoctrine()->getManager()->flush();

        return new Response($this->get('jms_serializer')->serialize($document, 'json'));
    }
}
