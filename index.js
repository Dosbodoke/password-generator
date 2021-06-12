function ascii(start, stop) {
  let arr = []
  for (let i = start; i <= stop; i++) {
    arr.push(String.fromCharCode(i))
  }
  return arr
}

const lowerCase = ascii(97, 122)
const upperCase = ascii(65, 90)
const numbers = ascii(48, 57)
const specialCharacter = [..."!@#$%^&*_?<>~"]

const form = document.querySelector('form');

const checkedAscii = {
  lowercase: lowerCase,
  uppercase: upperCase,
  numbers: numbers,
  symbols: specialCharacter,
}

function generatePassword(form) {
  let length = parseInt(form.length.value);
  let checkedElements = form.querySelectorAll('input:checked');
  let characters = []
  for (let i = 0; i < checkedElements.length; i++) {
    characters.push(...(checkedAscii[checkedElements[i].id]))
  };
  let password = ''
  for (let i = 0; i < length; i++) {
    password += (characters[Math.random() * characters.length | 0])
  }
  return password
};

function display(form) {
  document.getElementById('display-text').innerHTML = generatePassword(form)
}

const generateButton = document.getElementById('generate-button');
generateButton.addEventListener('click', () => {display(form)});

// copy the password to the user clipboard
const clipboardButton = document.getElementById('clipboard-button');
clipboardButton.addEventListener('click', () => {
  let text = document.getElementById('display-text').innerHTML
  if (!text) return
  navigator.clipboard.writeText(text);

  // display a message for a vissual confirmation that is copied and
  // set a timer of 3 seconds to return that element to display none
  let clipboardText = document.getElementById('clipboard-text')
  clipboardText.style.display = "block"
  setTimeout(() => {
    clipboardText.style.display = "none"
  }, 3000)
})