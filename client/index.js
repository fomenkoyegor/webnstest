// import $ from 'jquery';
// import 'bootstrap';


import {usersService} from "./js/service";
import {BehaviorSubject} from 'rxjs';
import {appendTo, createEl, addClass} from './js/dom';

const tBodyUsers = document.getElementById('tbody-users');
const formCreate = document.getElementById('form-create');
const users$ = new BehaviorSubject([]);

class User {
    constructor(first_name, second_name, email, id,edit={first_name: false,second_name: false,email: false}) {
        this.first_name = first_name;
        this.second_name = second_name;
        this.email = email;
        this.id = id;
        this.edit = {};
        this.edit.first_name = edit.first_name
        // console.log(edit)
    }
}

const createTextFiled = text => {
    const span = createEl('span');
    span.textContent = text;
    return span;
};


const updateUser = user=>{
    let users = users$.value;
    users = users.map(u=>u.id===user.id ? user : u);
    users$.next(users);
};

const createEditBlock = (user,type) => {
    const span = createEl('span');
    const btnEdit = createEl('button');
    addClass(btnEdit, 'btn btn-secondary');
    btnEdit.textContent = 'edit';
    btnEdit.addEventListener('click',e=>{
        const updUser = user;
        updUser.edit[type] = !updUser.edit[type];
        updateUser(updUser);
    });
    appendTo(btnEdit, span);
    return span;
};

const renderUser = (user, index) => {
    const {first_name, second_name, email, id, edit} = user;
    const tr = createEl('tr');

    const thId = createEl('th');
    appendTo(createTextFiled(index + 1), thId);


    const tdFirstName = createEl('td');
    console.log(edit)
    if(edit.first_name){

    }else{
        appendTo(createTextFiled(first_name), tdFirstName);
        appendTo(createEditBlock(user,'first_name'), tdFirstName);
    }



    const tdSecondName = createEl('td');
    appendTo(createTextFiled(second_name), tdSecondName);


    const tdEmail = createEl('td');
    appendTo(createTextFiled(email), tdEmail);


    const tdControls = createEl('td');

    const btnDel = createEl('button');
    addClass(btnDel, 'btn  btn-danger');
    btnDel.textContent = 'del';
    btnDel.addEventListener('click', function (e) {
        usersService.delete(id).then(res => {
            addClass(tr, 'hide');
            let users = users$.value;
            users = users.filter(user => user.id !== res.id);
            tr.addEventListener('animationend', e => {
                users$.next(users);
            });

        })
    });
    appendTo(btnDel, tdControls);


    appendTo(thId, tr);
    appendTo(tdFirstName, tr);
    appendTo(tdSecondName, tr);
    appendTo(tdEmail, tr);
    appendTo(tdControls, tr);

    appendTo(tr, tBodyUsers);
};

const renderUsers = (users = []) => {
    tBodyUsers.innerHTML = '';
    users.map((user, index) => {
        renderUser(new User(
            user.first_name,
            user.second_name,
            user.email,
            user.id,
        ), index)
    })
};

users$.subscribe(users => renderUsers(users));

usersService.getAll().then(users => users$.next(users));


formCreate.addEventListener('submit', function (e) {
    e.preventDefault();
    const user = new User(
        this.elements.first_name.value,
        this.elements.second_name.value,
        this.elements.email.value,
    );
    usersService.create(user)
        .then(res => {
            const users = users$.value;
            users.unshift(res);
            users$.next(users)
        })
});


