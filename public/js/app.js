
const search=document.querySelector('input')
const messageOne=document.getElementById('message-1')
const messageTwo=document.getElementById('message-2')
messageOne.textContent=''
messageTwo.textContent=''
document.querySelector('form').addEventListener('submit',(e)=>{
    e.preventDefault()
    const location=search.value
    // console.log(location)
    messageOne.textContent='Loading...'
    messageTwo.textContent=''
    fetch('http://localhost:3000/weather?address='+location).then((response)=>{
    response.json().then((data)=>{
        if (data.error){
messageOne.textContent=data.error
messageTwo.textContent=''
        }else{
messageOne.textContent=data.location
messageTwo.textContent=data.forecast
        }
    })
})

})