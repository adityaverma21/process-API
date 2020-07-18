const Form1 = document.querySelector('#create-form')
const Form2 = document.querySelector('#get-form')
const proc = document.querySelector('#proc')
const key = document.querySelector('#key')
const val = document.querySelector('#value')
const messageOne = document.querySelector('#messageOne')
const search = document.querySelector('#process')
const messageTwo = document.querySelector('#messageTwo')

Form1.addEventListener('submit', (e) => {
    e.preventDefault()
    const process = proc.value
    const keyValue = key.value
    const value = val.value

    fetch('/setEnv/'+process+'/'+keyValue+'/'+value, {
        method: 'POST'
      })
      .then(response => response.json())
      .then(result => {
        messageOne.textContent = JSON.stringify(result)
      })
      .catch(error => {
        console.error('Error:', error)
      })
})

Form2.addEventListener('submit', (e) => {
    e.preventDefault()
    const process = search.value

    messageTwo.textContent = 'Loading..'

    fetch('/getEnv/' + process)
        .then(response => response.json())
        .then(data => messageTwo.textContent = JSON.stringify(data));
})
