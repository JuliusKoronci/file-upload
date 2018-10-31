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
 * @TODO break down code to more granular structure and skinny controller
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
     * @param Request $request
     * @return Response
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

        $postedFile->move($this->getSystemPath() . DIRECTORY_SEPARATOR . $targetDir);

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
        if (null === $document) {
            return $this->json([
                'error' => 'not in DB',
            ], 404);
        }

        $fileSystem = new Filesystem();
        $fileSystem->remove([
            $this->getSystemPath() . DIRECTORY_SEPARATOR . $document->getUploadDir() . DIRECTORY_SEPARATOR . $document->getTempName()
        ]);
        $fileSystem->remove([$this->getSystemPath() . DIRECTORY_SEPARATOR . $document->getUploadDir()]);

        $this->getDoctrine()->getManager()->remove($document);
        $this->getDoctrine()->getManager()->flush();

        return $this->json([], 204);
    }

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
        $document = $this->getDoctrine()->getRepository(Document::class)->findOneBy(['slug' => $slug]);
        if (null === $document) {
            return $this->json([
                'error' => 'not in DB'
            ], 404);
        }

        $file = $this->getSystemPath() . DIRECTORY_SEPARATOR . $document->getUploadDir() . DIRECTORY_SEPARATOR . $document->getTempName();
        if (!file_exists($file)) {
            dump($file);
            return $this->json([
                'error' => 'not on disk'
            ], 404);
        }
        // Generate response
        $response = new Response();

        $response->setPublic();
        $response->setSharedMaxAge(3600);

        // Set headers
        $response->headers->set('Content-type', mime_content_type($file));//$fileEntity->getType());
        $response->headers->set('Content-length', filesize($file));//$fileEntity->getSize());
        $response->headers->set('Access-Control-Allow-Origin', '*');
        $response->headers->set('Last-Modified', gmdate('D, d M Y H:i:s', filemtime($file)) . ' GMT');
        // Send headers before outputting anything
        $response->sendHeaders();
        $response->setContent(file_get_contents($file));

        return $response;
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
        $targetDir = $this->getSystemPath() . DIRECTORY_SEPARATOR . $dirName;

        // @TODO handle exceptions
        $fileSystem = new Filesystem();
        $fileSystem->mkdir($targetDir);

        return $dirName;
    }

    /**
     * Get path relative to OS and project location
     *
     * @return string
     */
    private function getSystemPath(): string
    {
        return $this->get('kernel')->getProjectDir() . DIRECTORY_SEPARATOR . 'uploads';
    }
}
