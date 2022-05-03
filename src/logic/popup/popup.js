const dialog = document.querySelector('dialog');
const form = dialog.querySelector('form');

dialog.addEventListener('click', () => {
    dialog.style.display = "none";
});

form.addEventListener('click', (e) => {
    e.stopPropagation();
})