<?php


use Entity\User;

class ControllerUsers extends Controller
{
    private static function is_empty()
    {
        foreach (func_get_args() as $arg) {
            if (empty($arg)) return true;
        }
        return false;
    }

    public function action_get()
    {
        $tests_users = [
            [
                'id' => 1,
                'name' => 'vasya'
            ],
            [
                'id' => 2,
                'name' => 'petya'
            ],
        ];
        $users = ModelUser::instance()->getAll();
        echo json_encode($users);
    }

    public function action_create()
    {
        $errors = [];
        try {
            $first_name = @$_POST["first_name"];
            $second_name = @$_POST["second_name"];
            $email = @$_POST["email"];

            $first_name = htmlspecialchars($first_name);
            $second_name = htmlspecialchars($second_name);
            $email = htmlspecialchars($email);

            if (self::is_empty($first_name, $second_name, $email)) throw new Exception("enter all fields");
            $user = new User($first_name, $second_name, $email);
            $id = ModelUser::instance()->add($user);
            echo json_encode([
                'id' => $id,
                'first_name' => $user->first_name,
                'second_name' => $user->second_name,
                'email' => $user->email,
            ]);
        } catch (Exception $e) {
            echo json_encode([
                'message' => $e->getMessage(),
                'errors' => $errors
            ]);
        }
    }

    public function action_user()
    {
        $id = (int)$this->getUriParam("id");
        $user = ModelUser::instance()->getById($id);
        echo json_encode($user);
    }


    public function action_delete()
    {
        $id = (int)$this->getUriParam("id");
        $user = ModelUser::instance()->getById($id);
        ModelUser::instance()->deleteById($id);
        echo json_encode($user);
    }

    public function action_update()
    {

        $errors = [];
        try {
            $id = (int)$this->getUriParam("id");
            $user = ModelUser::instance()->getById($id);

            $first_name = @$_POST["first_name"] ? @$_POST["first_name"] : $user->first_name;
            $second_name = @$_POST["second_name"] ? @$_POST["second_name"] : $user->second_name;
            $email = @$_POST["email"] ? @$_POST["email"] : $user->email;


            $first_name = htmlspecialchars($first_name);
            $second_name = htmlspecialchars($second_name);
            $email = htmlspecialchars($email);

           ModelUser::instance()->updateById($id,[
                'first_name' => $first_name,
                'second_name' => $second_name,
                'email' => $email,
            ]);
           $this->action_user();

        } catch (Exception $e) {
            echo json_encode([
                'message' => $e->getMessage(),
                'errors' => $errors
            ]);
        }
    }


}
