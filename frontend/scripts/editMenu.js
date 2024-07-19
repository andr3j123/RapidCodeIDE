document.addEventListener('DOMContentLoaded', () => {

    // Undo button

    const editor = document.getElementById('editor');

    let history = [];
    let currentIndex = -1;

    editor.addEventListener('input', () => {
        // Remove future states if any
        history = history.slice(0, currentIndex + 1);
        // Add new state
        history.push(editor.value);
        currentIndex++;

        if (currentIndex > 500){
            history = [];
            currentIndex = -1;
        }
    });


        document.getElementById('undo').addEventListener('click', () => {
            if (currentIndex > 0) {
                currentIndex--;
                editor.value = history[currentIndex];
            }
        });

        // Copy button

        document.getElementById('copy').addEventListener('click', () => {
            navigator.clipboard.writeText(editor.value)
                .catch(err => alert('Unable to copy text!'));
        });

        // Cut button

        document.getElementById('cut').addEventListener('click', () => {
            navigator.clipboard.writeText(editor.value)
                .catch(err => alert('Unable to cut text!'));
            editor.value = '';
        });

        // Paste button 

        document.getElementById('paste').addEventListener('click', () => {
            navigator.clipboard.readText()
                .then(text => {
                    editor.value = text;
                })
                .catch(err => {
                    alert('Unable to paste text!')
                });
        });

        // Find button

        document.getElementById('find').addEventListener('click', () => {
            editor.focus()
        });
});