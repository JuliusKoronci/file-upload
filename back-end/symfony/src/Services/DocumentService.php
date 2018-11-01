<?php

namespace App\Services;

use App\Entity\Document;
use Symfony\Component\Filesystem\Filesystem;
use Symfony\Component\HttpFoundation\File\UploadedFile;
use Symfony\Component\HttpFoundation\Response;

final class DocumentService
{
    /**
     * Move an uploaded file to target location and return a hydrated Document entity
     *
     * @param UploadedFile $file
     * @param string $sysPath
     * @return Document
     * @throws \Exception
     */
    public static function handleUploadedFile(UploadedFile $file, string $sysPath): Document
    {
        $targetDir = self::getFilePath($sysPath);

        $document = new Document();
        $document->setName($file->getClientOriginalName());
        $document->setSize($file->getSize());
        $document->setType($file->getMimeType());
        $document->setTempName($file->getFilename());
        $document->setUploadDir($targetDir);

        /**
         * In general it is not a good idea to keep uploaded files on the same server as the application
         * It needs to be uploaded to a separate server dedicated to file keeping but for this purpose we will
         * move it to a folder outside of the web dir
         */
        $file->move($sysPath . DIRECTORY_SEPARATOR . $targetDir);

        return $document;
    }

    /**
     * Remove a document from file system
     *
     * @param Document $document
     * @param string $sysPath
     * @return bool
     */
    public static function removeDocument(Document $document, string $sysPath): bool
    {
        if (null === $document) {
            return false;
        }

        try {
            $fileSystem = new Filesystem();
            $fileSystem->remove([
                $sysPath . DIRECTORY_SEPARATOR . $document->getUploadDir() . DIRECTORY_SEPARATOR . $document->getTempName()
            ]);
            $fileSystem->remove([$sysPath . DIRECTORY_SEPARATOR . $document->getUploadDir()]);
            return true;
        } catch (\Exception $e) {
            return false;
        }
    }

    /**
     * Generate correct repsone for downloading a document
     *
     * @param Document $document
     * @param string $sysPath
     * @return Response
     * @throws \Exception
     */
    public static function createDocumentResponse(Document $document, string $sysPath): Response
    {
        if (null === $document) {
            throw new \Exception('Missing document');
        }
        $file = $sysPath . DIRECTORY_SEPARATOR . $document->getUploadDir() . DIRECTORY_SEPARATOR . $document->getTempName();
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
     * Create a folder path to store a document in
     *
     * @param string $sysPath
     * @return string
     * @throws \Exception
     */
    private static function getFilePath(string $sysPath): string
    {
        $fileSystem = new Filesystem();
        /**
         * Random folder name to avoid accidental name collision
         */
        $dirName = $random = md5(random_bytes(100));
        $targetDir = $sysPath . DIRECTORY_SEPARATOR . $dirName;

        $fileSystem->mkdir($targetDir, 0750);

        return $dirName;
    }
}