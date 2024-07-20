document.addEventListener('DOMContentLoaded', () => {

    document.getElementById('changeToRegister').addEventListener('click', () => {
        document.getElementById('logInContainer').style.display = 'none';
        document.getElementById('registerContainer').style.display = 'flex';
    });

    document.getElementById('changeToLogIn').addEventListener('click', () => {
        document.getElementById('logInContainer').style.display = 'flex';
        document.getElementById('registerContainer').style.display = 'none';
    });
});