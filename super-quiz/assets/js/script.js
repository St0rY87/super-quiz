

///////////header
const menuItems = document.querySelectorAll('.header__nav-link_main');
const btnAdaptive = document.querySelector('.btn_adaptive');
const dropDownTest = document.querySelector('.test__select');
const listDropDownItemsTest = document.querySelectorAll('.test__dropdown-item');
const inputTest = document.querySelector('.test__opinion');
const textSelectTest = document.querySelector('.test__select-option');
const adaptiveMenu = document.querySelector('.header__content');
///section test variables
const test = document.querySelector('.test');
const btnsTest = test.querySelectorAll('.btn');
const tabsTest = test.querySelectorAll('.tabs__tab')
const contentsTest = test.querySelectorAll('.test__inner-content');
const contentFirst= test.querySelectorAll('.test__step-1');
const contentSecond = test.querySelectorAll('.test__step-2');
const contentThird = test.querySelectorAll('.test__step-3');
const tabFirst = test.querySelector('.tabs__tab_what');
const tabSecond = test.querySelector('.tabs__tab_like');
const tabThird = test.querySelector('.tabs__tab_thanks');
const checkboxInputs = document.querySelectorAll('.test__options-input');
const radioInputs = document.querySelectorAll('.test__options-input_radio');
// modals
const label = document.querySelector('.form__clip');
const main = document.querySelector('.main');
const overlay = document.querySelector('.overlay');
const btnHeader = document.querySelectorAll('.btn_header-main');
const close = document.querySelector('.cross_questionnaire');
const closeThanks = document.querySelector('.cross_thanks');
const form = document.querySelector('.form__modal');
const sign = document.querySelector('.form__substrate-sign')
const btnForm = document.querySelector('.btn_form')
const inputComment = document.querySelector('.form__modal-comment');
const redPopUp = document.querySelector('.form__file_red');
const modal = document.querySelector('.modal');
const modalThanks = document.querySelector('.modal_thanks');
const btnThanks = modalThanks.querySelector('.btn_form');
const fileSelector = document.querySelector('.form__input-files');
const clipText = document.querySelector('.form__clip-text');



///handle menu of header 
menuItems.forEach(item => {
    item.addEventListener('click', showBottomLine);
})

function showBottomLine() {
    menuItems.forEach(item => {
        if(item.classList.contains('show-bottom-line')) {
            item.classList.remove('show-bottom-line')
        }
    }) 
    this.classList.toggle('show-bottom-line')
}

//show adaptive menu
btnAdaptive.addEventListener('click', toggleMenu);

function toggleMenu() {
    adaptiveMenu.classList.toggle('active-menu');
}

//handle dropdown of test section
dropDownTest.addEventListener('click', toggleDropDownTest);

function inputOpinion(event) {
const data = event.target.innerText;
inputTest.value = data;
textSelectTest.innerHTML = data;
toggleDropDownTest();
listDropDownItemsTest.forEach(elem => {
    elem.removeEventListener('click', inputOpinion);
    })
}

function toggleDropDownTest() {
    document.querySelector('.test__dropdown-list').classList.toggle('test__dropdown-list_active');
    listDropDownItemsTest.forEach(elem => {
        elem.addEventListener('click', inputOpinion);
    })
}


//handle questions of test section
function getTextCheckedInputs() {
    const answer = tabFirst.querySelector('.tabs__tab-answer');
    let text = '';
    checkboxInputs.forEach(input => {
        if(input.checked) {
            text = `${text} ${input.previousElementSibling.innerHTML},`
        }
    })
    answer.innerText = text.slice(0, -1);
}

checkboxInputs.forEach(input => {
    input.addEventListener('click', getTextCheckedInputs);
}) 

function getTextRadioInputs() {
    const answer = tabSecond.querySelector('.tabs__tab-answer');
    let text = '';
    radioInputs.forEach(input => {
        if(input.checked) {
            text = `${text} ${input.nextElementSibling.innerHTML}`
        }
    })
    answer.innerText = text
}

radioInputs.forEach(input => {
    input.addEventListener('click', getTextRadioInputs);
})

function removeAllContents() {
    contentsTest.forEach(content => {
        content.classList.add('none')
    })
}
btnsTest.forEach(btn => {
    btn.addEventListener('click', handleBtn)
})

function handleBackBtnBackTwo() {
    tabFirst.classList.remove('tabs__tab_white');
    tabFirst.classList.remove('border-top-right');
    tabThird.classList.add('none');
    removeAllContents();
    tabSecond.classList.add('none');
    contentFirst.forEach(elem => {
        elem.classList.remove('none');
    })
}
function handleBackBtnBackThree() {
    tabSecond.classList.remove('tabs__tab_white');
    tabSecond.classList.remove('border-right-light');
    tabSecond.classList.add('border-down-right');
    removeAllContents();
    tabThird.classList.add('none');
    contentSecond.forEach(elem => {
    elem.classList.remove('none');
    });
}

function handleBtn(event) {
    if(this.classList.contains('btn_continue-step-1')) {
        tabFirst.classList.add('tabs__tab_white');
        tabFirst.classList.add('border-top-right');
        tabSecond.classList.remove('border-right-light');
        tabSecond.classList.remove('tabs__tab_white');
        tabSecond.classList.add('border-down-right');
        removeAllContents();
        contentSecond.forEach(elem => {
            elem.classList.remove('none');
        })
    }
    
    else if(this.classList.contains('btn_continue-step-2')) {
        tabSecond.classList.add('tabs__tab_white');
        tabSecond.classList.add('border-right-light');
        tabThird.classList.add('border-down-right');
        removeAllContents();
        contentThird.forEach(elem => {
            elem.classList.remove('none');
        })
    }
    else if(this.classList.contains('btn_back-step-2')) {
        handleBackBtnBackTwo()
    }
    else if(this.classList.contains('btn_back-step-3')) {
        handleBackBtnBackThree()
    }
}

tabsTest.forEach(tab => {
    tab.addEventListener('click', handleTabs)
})

function handleTabs() {
    if(this.classList.contains('test__step-1')) {
        handleBackBtnBackTwo()
    }
    else if(this.classList.contains('test__step-2')) {
        handleBackBtnBackThree()
    }
}

//handle modal windows

btnHeader.forEach(btnHeader => {
    btnHeader.addEventListener('click', showModal);
})
close.addEventListener('click', closeModal);
btnThanks.addEventListener('click', closeModal);
closeThanks.addEventListener('click', closeModal);
btnForm.addEventListener('click', checkForm);

function showModal() {
    overlay.classList.add('flex');
    main.classList.add('none');
    adaptiveMenu.classList.remove('active-menu');
}

function closeModal() {
    overlay.classList.remove('flex');
    modal.classList.remove('none');
    main.classList.remove('none');
    modalThanks.classList.add('none');
    form.reset();
    clipText.innerHTML = 'Приложить файлы';
    label.setAttribute('title', 'Выбрать пока не выбрали никаких изображения')

}

form.addEventListener('submit', checkForm);
inputComment.addEventListener('input', handleInputComment);

function checkForm(event) {
    event.preventDefault();
    if (form.comment.value === ''&& !inputComment.classList.contains('form__modal-comment_attention')) {
        sign.classList.add('flex');
        inputComment.classList.add('form__modal-comment_attention');
    }
    else if(form.comment.value === '' && inputComment.classList.contains('form__modal-comment_attention')) {
        redPopUp.classList.remove('none');
    }
    else if(inputComment.value.length > 0) {
        modal.classList.add('none');
        modalThanks.classList.remove('none');
    }
}

function handleInputComment() {
    if(this.value.length !== 0) {
        sign.classList.remove('flex');
        inputComment.classList.remove('form__modal-comment_attention');
        redPopUp.classList.add('none');
    }
    else {
        sign.classList.add('flex');
        inputComment.classList.add('form__modal-comment_attention');
    }
}

fileSelector.addEventListener('change', handleFiles)
function inputTextImages() {
    let names = [];
    for(img of fileSelector.files) {
        names = [...names, img.name]
    }
    const string = names.join(', ');
    clipText.innerHTML = string;
    label.setAttribute('title', `Вы выбрали ${names.length} изображений`)
}

function checkImageSizes() {
    const maxSizeInBytes = 1024 * 1024; // 1 MB
    for(img of fileSelector.files){
        if(img.size > maxSizeInBytes){
            alert(`Файл "${img.name}" размер превышает ограничение в 1 МБ. Пожалуйста, выберите файл меньшего размера.`);
            form.reset();
            clipText.innerHTML = 'Приложить файлы';
            label.setAttribute('title', 'Выбрать пока не выбрали никаких изображения');
            return;
        }
    }
}

function handleFiles() {
    inputTextImages();
    checkImageSizes();
}

//swiper
const swiper = new Swiper(".swiper", {
    slidesPerView: 5,
    slidesPerGroup: 1,
    centeredSlides: false,
    loop: true,
    slideToClickedSlide: true,
    spaceBetween: 10,
    breakpoints: {
        320: {
            slidesPerView: 1.5,
            centeredSlides: true,
        },
        576: {
            slidesPerView: 3,
            centeredSlides: false,
        },
        768: {
            slidesPerView: 4,
        },
        1200: {
            slidesPerView: 5,
        },
    },
      // Navigation arrows
navigation: {
  nextEl: '.swiper-button-next',
  prevEl: '.swiper-button-prev',
},
  });