const displayContent = async (fileName) => {
    const response = await fetch(`./api/openFile/${fileName}`);
    const fileData = await response.json();

    document.getElementById('editor').innerHTML = fileData.content;
};