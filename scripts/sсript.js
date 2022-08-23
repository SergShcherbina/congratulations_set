const buttonMan = document.querySelector('.header__button-gender_men');
const buttonWoman = document.querySelector('.header__button-gender_women');
const body = document.body;

const chengeToMan = () => {
    if(!body.classList.contains('man')){
        body.classList.add('man');
        body.classList.remove('woman');
    }
    
};
const chengeToWoman = () => {
    if(!body.classList.contains('woman')){
        body.classList.add('woman');
        body.classList.remove('man');
    }
};

buttonMan.addEventListener('click', chengeToMan);

buttonWoman.addEventListener('click', chengeToWoman);


//второй вариант
/* const chengeToGender = (gender) => {
    body.className = gender;
}

buttonMan.addEventListener('click', () => {
    chengeToGender('man')
});

buttonWoman.addEventListener('click', () => {
    chengeToGender('woman')
}); */