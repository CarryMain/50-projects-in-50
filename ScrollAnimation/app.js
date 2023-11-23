const boxes = document.querySelectorAll('.box');

window.addEventListener('scroll', checkBoxes);

checkBoxes();


function checkBoxes() {
    const trigger = window.innerHeight / 5 * 4;

    boxes.forEach(item => {
        const boxTop = item.getBoundingClientRect().top

        if(boxTop < trigger) {
            item.classList.add('show')
        } else {
            item.classList.remove('show');
        }
    })
}