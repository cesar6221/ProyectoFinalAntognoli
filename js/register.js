const signupForm = document.querySelector('#signupForm')
signupForm.addEventListener('submit', (e)=>{
    e.preventDefault()
    const name = document.querySelector('#name').value
    const direction = document.querySelector('#direction').value
    const email = document.querySelector('#email').value
    const password = document.querySelector('#password').value

    const Users = JSON.parse(localStorage.getItem('users')) || []
    const isUserRegistered = Users.find(user => user.email === email)
    if(isUserRegistered){
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'El usuario ya está registrado!'
        });
        return;
    }

    Users.push({name: name, email: email, password: password})
    localStorage.setItem('users', JSON.stringify(Users))
    Swal.fire({
        icon: 'success',
        title: 'Registro Exitoso',
        text: '¡Registro exitoso!'
    }).then(() => {
        window.location.href = 'login.html';
    });
})