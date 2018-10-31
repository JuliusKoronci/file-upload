<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;
use Gedmo\Mapping\Annotation as Gedmo;
use Gedmo\Timestampable\Traits\TimestampableEntity;
use JMS\Serializer\Annotation as Serializer;

/**
 * @ORM\Entity(repositoryClass="App\Repository\DocumentRepository")
 */
class Document
{
    /**
     * Hook timestampable behavior
     * updates createdAt, updatedAt fields
     */
    use TimestampableEntity;

    /**
     * @ORM\Id()
     * @ORM\GeneratedValue()
     * @ORM\Column(type="integer")
     */
    private $id;
    /**
     * @var string
     *
     * @ORM\Column(name="name", type="string", length=255)
     */
    private $name;

    /**
     * @Gedmo\Slug(fields={"name","createdAt"})
     * @ORM\Column(length=128, unique=true)
     */
    private $slug;


    /**
     * @var string
     *
     * @ORM\Column(name="temp_name", type="string", length=255)
     * @Serializer\Exclude()
     */
    private $tempName;


    /**
     * @var string
     *
     * @ORM\Column(name="type", type="string", length=255)
     */
    private $type;


    /**
     * @var integer
     *
     * @ORM\Column(name="size", type="integer")
     */
    private $size;


    /**
     * @var string
     *
     * @ORM\Column(name="upload_dir", type="string", length=255)
     * @Serializer\Exclude()
     */
    private $uploadDir;


    public function getId(): ?int
    {
        return $this->id;
    }

    /**
     * @return string
     */
    public function getName(): string
    {
        return $this->name;
    }

    /**
     * @param string $name
     */
    public function setName(string $name): void
    {
        $this->name = $name;
    }

    /**
     * @return mixed
     */
    public function getSlug()
    {
        return $this->slug;
    }

    /**
     * @param mixed $slug
     */
    public function setSlug($slug): void
    {
        $this->slug = $slug;
    }

    /**
     * @return string
     */
    public function getTempName(): string
    {
        return $this->tempName;
    }

    /**
     * @param string $tempName
     */
    public function setTempName(string $tempName): void
    {
        $this->tempName = $tempName;
    }

    /**
     * @return string
     */
    public function getType(): string
    {
        return $this->type;
    }

    /**
     * @param string $type
     */
    public function setType(string $type): void
    {
        $this->type = $type;
    }

    /**
     * @return int
     */
    public function getSize(): int
    {
        return $this->size;
    }

    /**
     * @param int $size
     */
    public function setSize(int $size): void
    {
        $this->size = $size;
    }

    /**
     * @return string
     */
    public function getUploadDir(): string
    {
        return $this->uploadDir;
    }

    /**
     * @param string $uploadDir
     */
    public function setUploadDir(string $uploadDir): void
    {
        $this->uploadDir = $uploadDir;
    }

}
