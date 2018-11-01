<?php

namespace App\Controller\Document;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\Filesystem\Filesystem;

/**
 * Class DeleteController
 *
 * handle Document CRUD
 *
 *
 * @package App\Controller\Document
 */
abstract class BaseController extends Controller
{
    /**
     * Get path relative to OS and project location
     *
     * @return string
     * @throws \Symfony\Component\Filesystem\Exception\IOException
     */
    protected function getSystemPath(): string
    {
        $fileSystem = new Filesystem();

        $pathToUploads = $this->get('kernel')->getProjectDir() . DIRECTORY_SEPARATOR . 'uploads';
        if (!$fileSystem->exists($pathToUploads)) {
            $fileSystem->mkdir($pathToUploads, 0750);
        }
        return $pathToUploads;
    }
}
