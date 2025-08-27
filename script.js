let characters = ''

const copyButtonElement = document.querySelector("[data-js-copy]")
const passwordInputElement = document.querySelector("[data-js-password]")
const lengthValueElement = document.querySelector("[data-js-length-value]")
const lengthRangeElement = document.querySelector("[data-js-length]")
const lengthRangeValueElement = lengthRangeElement.value
const checkboxesElement = document.querySelector("[data-js-checkboxes]")
const checkboxLowerElement = document.querySelector("[data-js-lower]")
const checkboxUpperElement = document.querySelector("[data-js-upper]")
const checkboxDigitsElement = document.querySelector("[data-js-digits]")
const checkboxSymbolsElement = document.querySelector("[data-js-symbols]")
const strengthBarElement = document.querySelector("[data-js-strength]")
const strengthBarLabelElement = document.querySelector("[data-js-strength-label]")
const generatePasswordButtonElement = document.querySelector("[data-js-generate]")
const resetSettingsButtonElement = document.querySelector("[data-js-reset]")

const checkboxes = [checkboxLowerElement, checkboxUpperElement, checkboxDigitsElement, checkboxSymbolsElement]

const getCheckboxesStatus = () => {
  return [
    checkboxLowerElement.checked,
    checkboxUpperElement.checked,
    checkboxDigitsElement.checked,
    checkboxSymbolsElement.checked,
  ]
}

const getLengthRangeElement = () => {
  return lengthRangeElement.value
}

const setLengthValue = () => {
  lengthValueElement.textContent = getLengthRangeElement()
}

const generateRandomPassword = () => {
  let password = ''

  if (checkboxLowerElement.checked) {
    characters += 'abcdefghijklmnopqrstuvwxyz'
  }

  if (checkboxUpperElement.checked) {
    characters += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
  }

  if (checkboxDigitsElement.checked) {
    characters += '0123456789'
  }

  if (checkboxSymbolsElement.checked) {
    characters += '!@#$%^&*()-_=+[]{}|;:,.<>?'
  }

  for (let i = 0; i < lengthRangeElement.value; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length)
    password += characters[randomIndex]
  }

  passwordInputElement.value = password
}

const checkingCheckboxes = (checkboxesStatus) => {
  return checkboxesStatus.some(checkboxStatus => {
    return checkboxStatus
  })
}

checkboxesElement.addEventListener("click", (event) => {
  if (event.target.closest("input")) {
    characters = ''
  }
})

const updateRangeBackground = () => {
  const min = lengthRangeElement.min ? lengthRangeElement.min : 0
  const max = lengthRangeElement.max ? lengthRangeElement.max : 100
  const val = lengthRangeElement.value

  const percent = ((val - min) / (max - min)) * 100

  lengthRangeElement.style.background = `linear-gradient(90deg, var(--primary) ${percent}%, var(--stroke) ${percent}%)`
}

lengthRangeElement.addEventListener("input", () => {
  setLengthValue()
  updateRangeBackground()
})

generatePasswordButtonElement.addEventListener("click", () => {
  if (checkingCheckboxes(getCheckboxesStatus())) {
    generateRandomPassword()
  } else {
    passwordInputElement.value = ''
    setTimeout(() => alert("Выберите хотя бы одну опцию!"))
  }
})

resetSettingsButtonElement.addEventListener("click", () => {
  lengthValueElement.textContent = lengthRangeValueElement
  lengthRangeElement.value = lengthRangeValueElement
  passwordInputElement.value = ''
  updateRangeBackground()

  checkboxes.forEach(cb => cb.checked = cb.defaultChecked)
})

copyButtonElement.addEventListener("click", () => {
  if (passwordInputElement.value !== '') {
    passwordInputElement.select()
    document.execCommand("copy")
    alert("Текст скопирован в буфер обмена!")
  } else {
   alert("Пока что копировать нечего!")
  }
})

setLengthValue()
updateRangeBackground()