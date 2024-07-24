const fetchFiles = async () => {
    const response = await fetch('./api/readFiles');
    const files = await response.json();

    return files.userFiles;
};

document.addEventListener('DOMContentLoaded', async () => {

    // Check if user is authenticated. Function is from authorization.js
    if (checkUserAuth()){
        try{
            const files = await fetchFiles();

            console.log(files)

            files.forEach(file => {
                const node = document.createElement('div');
                node.className = 'fileName';
                const textnode = document.createTextNode(file);
                node.appendChild(textnode);
                document.getElementById('fileExplorer').appendChild(node);
              });
        }
        catch(err){
            console.error(err);
        }
    }
});