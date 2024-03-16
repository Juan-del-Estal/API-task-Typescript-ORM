document.addEventListener('DOMContentLoaded', function() {
  const login = document.getElementById('login-form');
  const signUp = document.getElementById('sign-up-form');
  const hideButtonForm = document.querySelector('.hide-button-form');
  const backButton = document.querySelector('.back-button');

  hideButtonForm.addEventListener('click', () => {
    login.style.display = 'none';
    signUp.style.display = 'block';
    backButton.style.display = 'block';
    hideButtonForm.style.display ='none';
});

  backButton.addEventListener('click', () => {
    login.style.display = 'block';
    signUp.style.display = 'none';
    backButton.style.display = 'none';
    hideButtonForm.style.display ='block';

  })

});


