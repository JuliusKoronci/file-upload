<?php

namespace App\Controller;

use App\Entity\Document;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\Filesystem\Filesystem;
use Symfony\Component\HttpFoundation\File\UploadedFile;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class DocumentController extends Controller
{
    /**
     * List all documents
     *
     * @Route("/documents", name="documents", methods={"GET"})
     */
    public function index()
    {
        $documents = $this->getDoctrine()->getRepository(Document::class)->findAll();
        return new Response($this->get('jms_serializer')->serialize($documents, 'json'));
    }

    /**
     * Upload a file
     *
     * @Route("/upload", name="upload", methods={"POST"})
     */
    public function upload(Request $request)
    {
        /** @var UploadedFile $postedFile */
        $postedFile = $request->files->get('file');
        $targetDir = $this->getFilePath();

        $document = new Document();
        $document->setName($postedFile->getClientOriginalName());
        $document->setSize($postedFile->getSize());
        $document->setType($postedFile->getMimeType());
        $document->setTempName($postedFile->getFilename());
        $document->setUploadDir($targetDir);

        $postedFile->move($targetDir);

        $this->getDoctrine()->getManager()->persist($document);
        $this->getDoctrine()->getManager()->flush();

        return $this->json([
            'success' => true,
        ]);
    }

    private function getFilePath()
    {
        $dirName = $random = md5(random_bytes(100));
        $targetDir = $this->get('kernel')->getProjectDir() . DIRECTORY_SEPARATOR . 'uploads' . DIRECTORY_SEPARATOR . $dirName;

        $fileSystem = new Filesystem();
        $fileSystem->mkdir($targetDir);

        return $targetDir;
    }
}
