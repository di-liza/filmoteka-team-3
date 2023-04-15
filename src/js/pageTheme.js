const checkbox = document.querySelector('.checkbox');

const handleCheckbox = () => {
    document.body.classList.toggle("dark");
    if (document.body.classList.contains('dark')) {
        localStorage.setItem('theme', 'dark')
    } else{
        localStorage.removeItem('theme', 'dark')
    }
}

if (localStorage.getItem('theme', 'dark')) {
    document.body.classList.toggle("dark");
    checkbox.checked = true;
}

checkbox.addEventListener("change", handleCheckbox)