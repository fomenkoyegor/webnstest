<?php

use Entity\User;

class ModelUser extends Model
{
    private static $instance = null;

    protected function __construct()
    {
        parent::__construct();
    }

    public static function instance(): self
    {
        return self::$instance ? self::$instance : self::$instance = new self();
    }

    public function getAll()
    {
        return User::fromAssocies($this->db->users->desc()->all());
    }

    public function add(User $user): int
    {
        return $this->db->users->insert([
            'first_name' => $user->first_name,
            'second_name' => $user->second_name,
            'email' => $user->email,
        ]);
    }

    public function getById(int $id): User
    {
        $user = new User();
        $user->fromAssoc($this->db->users->getElementById($id));
        return $user;
    }

    public function deleteById(int $id): void
    {
        $this->db->users->deleteById($id);
    }

    public function updateById(int $id,array $fields):void
    {
        $this->db->users->updateById($id,$fields);
    }
}
