import $ from 'jquery';
import 'bootstrap';

$.post('/api/users/create',{
    first_name:"re",
    second_name:"we",
    email:"re@re.re",
})
    .then(res=>JSON.parse(res))
    .then(res=>console.log(res));

// $.getJSON('/api/users').then(res=>console.log(res))

console.log($('body'));
