document.addEventListener('DOMContentLoaded', () => {
    
    // File menu

    const toolboxFile = document.getElementById('toolboxFile');
    const fileMenu = document.getElementById('fileMenu');

    toolboxFile.addEventListener('mouseenter', () => {
        fileMenu.style.display = 'block';
    });

    toolboxFile.addEventListener('mouseleave', () => {
        fileMenu.style.display = 'none';
    });

    fileMenu.addEventListener('mouseover', () => {
        fileMenu.style.display = 'block';
    });

    fileMenu.addEventListener('mouseleave', () => {
        fileMenu.style.display = 'none';
    });

    // Edit menu

    const toolboxEdit = document.getElementById('toolboxEdit');
    const editMenu = document.getElementById('editMenu');

    toolboxEdit.addEventListener('mouseenter', () => {
        editMenu.style.display = 'block';
    });
    
    toolboxEdit.addEventListener('mouseleave', () => {
        editMenu.style.display = 'none';
    });

    editMenu.addEventListener('mouseover', () => {
        editMenu.style.display = 'block';
    });

    editMenu.addEventListener('mouseleave', () => {
        editMenu.style.display = 'none';
    });

    // Help menu

    const toolboxHelp = document.getElementById('toolboxHelp');
    const helpMenu = document.getElementById('helpMenu');

    toolboxHelp.addEventListener('mouseenter', () => {
        helpMenu.style.display = 'block';
    });
    
    toolboxHelp.addEventListener('mouseleave', () => {
        helpMenu.style.display = 'none';
    });

    helpMenu.addEventListener('mouseover', () => {
        helpMenu.style.display = 'block';
    });

    helpMenu.addEventListener('mouseleave', () => {
        helpMenu.style.display = 'none';
    });

});