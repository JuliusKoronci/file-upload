<?php

namespace App\Controller;

use App\Entity\Document;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\Filesystem\Filesystem;
use Symfony\Component\HttpFoundation\File\UploadedFile;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

/**
 * Class DocumentController
 *
 * handle Document CRUD
 *
 * @package App\Controller
 */
class DocumentController extends Controller
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

    /**
     * Upload a file
     *
     * @Route("/upload", name="upload", methods={"POST"})
     * @throws \Symfony\Component\HttpFoundation\File\Exception\FileException
     * @throws \LogicException
     * @throws \Exception
     */
    public function upload(Request $request): Response
    {
        /** @var UploadedFile $postedFile */
        $postedFile = $request->files->get('file');
        $targetDir = $this->getFilePath();

        //@TODO move out into service and handle exceptions
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
        $document = $this->getDoctrine()->getRepository(Document::class)->findOneBy(['slug' => $slug]);
        if (!$document instanceof Document) {
            return $this->json([], 409);
        }

        $fileSystem = new Filesystem();
        $fileSystem->remove([
            $document->getUploadDir() . DIRECTORY_SEPARATOR . $document->getTempName()
        ]);
        $fileSystem->remove([$document->getUploadDir()]);

        $this->getDoctrine()->getManager()->remove($document);
        $this->getDoctrine()->getManager()->flush();
        return $this->json([], 204);
    }

    /**
     * Get file target directory, create it if doesn't exist
     *
     * @return string
     * @throws \Exception
     */
    private function getFilePath(): string
    {
        /**
         * Random folder name to avoid accidental name collision
         */
        $dirName = $random = md5(random_bytes(100));
        $targetDir = $this->get('kernel')->getProjectDir() . DIRECTORY_SEPARATOR . 'uploads' . DIRECTORY_SEPARATOR . $dirName;

        // @TODO handle exceptions
        $fileSystem = new Filesystem();
        $fileSystem->mkdir($targetDir);

        return $targetDir;
    }
}
