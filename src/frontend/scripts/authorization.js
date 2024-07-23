let username = '';

const checkUserAuth = async () => {
    let user = await fetch('./api/sessionData');
    user = await user.json();

    username = user.username;
    
    if (user.userId !== null && user.userId !== undefined) {
        return true;
    }

    return false;
};

document.addEventListener('DOMContentLoaded', async () => {
    const isAuthenticated = await checkUserAuth();
    if (isAuthenticated) {
        document.getElementById('logInBtn').style.display = 'none';
        document.getElementById('logOutBtn').style.display = 'block';
        document.getElementById('folderName').innerHTML = username;
    } else {
        document.getElementById('logInBtn').style.display = 'block';
        document.getElementById('logOutBtn').style.display = 'none';
        document.getElementById('fileExplorer').style.display = 'none';
        document.getElementById('textEditor').style.width = '100vw';
    }
});