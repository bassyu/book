export function createSpinner(parent) {
  const spinnerAreaEL = parent.querySelector('.spinner-area');
  const imageEL = document.createElement('img');
  imageEL.alt = 'spinner';
  imageEL.src = '../image/spinner.gif';

  spinnerAreaEL.append(imageEL);
}