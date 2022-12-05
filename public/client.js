const socket = io()
const id = window.location.pathname.slice(1);

const msgSetAudio = new Audio(`/msgSendAudio.mp3`);
const msgGetAudio = new Audio('/msgGetAudio.mp3');

let name = localStorage.getItem('name');
let textarea = document.querySelector('#textarea');
let messageArea = document.querySelector('.message__area');
let optionsMenu = document.getElementById('options__menu');
let joinSection = document.getElementById('join__section');
let joinChatId = document.getElementById('join_chat_id');

while (!name) {
    name = prompt('Please enter your name: ')
    localStorage.setItem('name',name)
}

// textarea.addEventListener('keyup', (e) => {
//     if(e.key === 'Enter') {
//         sendMessage(e.target.value)
//         msgSetAudio.play();
//     }
// })

function sendMessageBtn(){
    const msgContent = textarea.value;
    sendMessage(msgContent);
    msgSetAudio.play();
}

function sendMessage(message) {
    let msg = {
        user: name,
     	id : id ,
        message: message.trim()
    }
    // Append 
    appendMessage(msg, 'outgoing')
    textarea.value = ''
    scrollToBottom()

    // Send to server 
    socket.emit(id, msg)

}

function appendMessage(msg, type) {
    let mainDiv = document.createElement('div')
    let className = type
    mainDiv.classList.add(className, 'message')

    let markup = `
        <h4>${msg.user}</h4>
        <p>${msg.message}</p>
    `
    mainDiv.innerHTML = markup
    messageArea.appendChild(mainDiv)
}

// Recieve messages 
socket.on(id, (msg) => {
    appendMessage(msg, 'incoming')
    msgGetAudio.play();
    scrollToBottom()
})

function scrollToBottom() {
    messageArea.scrollTop = messageArea.scrollHeight
}


// utils

function openOptionsMenu(e){
    if(optionsMenu.classList.contains('hidden')){
        optionsMenu.classList.remove('hidden');
    } else{
        optionsMenu.classList.add('hidden');
    }
}

function openJoinModal(){
    if(joinSection.classList.contains('hidden')){
        joinSection.classList.remove('hidden');
    } else{
        joinSection.classList.add('hidden');
    }
}

// options funcs

function joinChat(){
    window.location.replace(`${window.location.origin}/${joinChatId.value}`)
}