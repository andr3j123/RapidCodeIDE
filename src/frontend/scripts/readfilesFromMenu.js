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

            files.forEach(file => {
                const fileName = document.createElement('a');
                fileName.className = 'fileName';
                fileName.id = file;
                fileName.href = `javascript:displayContent('${file}')`;
                const textnode = document.createTextNode(file);
                fileName.appendChild(textnode);
                document.getElementById('fileExplorer').appendChild(fileName);
              });
        }
        catch(err){
            console.error(err);
        }
    }
});