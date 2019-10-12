<?php

namespace Entity;

class User extends Entity
{

    public $first_name, $second_name, $email,$created_at,$updated_at;

    public function __construct(
        string $first_name = "",
        string $second_name = "",
        string $email = '',
        string $created_at = '',
        string $updated_at = ''
    )
    {
        $this->first_name = $first_name;
        $this->second_name = $second_name;
        $this->email = $email;
        $this->created_at = $created_at;
        $this->updated_at = $updated_at;
    }

    public static function fromAssocies(array $array): array
    {
        return self::_fromAssocies($array, self::class);
    }
}
