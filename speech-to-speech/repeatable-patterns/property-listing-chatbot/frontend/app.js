const API_URL = 'http://localhost:8000';
const chatInput = document.getElementById('chatInput');
const sendBtn = document.getElementById('send');
const micBtn = document.getElementById('mic');
const messages = document.getElementById('messages');
const audioEl = document.getElementById('audio');

function addMessage(text, cls) {
  const div = document.createElement('div');
  div.className = `msg ${cls}`;
  div.textContent = text;
  messages.appendChild(div);
  messages.scrollTop = messages.scrollHeight;
}

sendBtn.onclick = async () => {
  const text = chatInput.value.trim();
  if (!text) return;
  addMessage(text, 'user');
  chatInput.value = '';
  const res = await fetch(`${API_URL}/chat`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ text })
  });
  const data = await res.json();
  if (data.answer) addMessage(data.answer, 'bot');
  if (data.audio) {
    audioEl.src = `data:audio/wav;base64,${data.audio}`;
    audioEl.play();
  }
};

let mediaRecorder;
let audioChunks = [];

micBtn.onclick = async () => {
  if (!mediaRecorder || mediaRecorder.state === 'inactive') {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    mediaRecorder = new MediaRecorder(stream);
    mediaRecorder.ondataavailable = e => audioChunks.push(e.data);
    mediaRecorder.onstop = async () => {
      const blob = new Blob(audioChunks, { type: 'audio/webm' });
      audioChunks = [];
      const res = await fetch(`${API_URL}/voice`, {
        method: 'POST',
        headers: { 'Content-Type': 'audio/webm' },
        body: blob
      });
      const data = await res.json();
      if (data.transcript) addMessage(data.transcript, 'user');
      if (data.answer) addMessage(data.answer, 'bot');
      if (data.audio) {
        audioEl.src = `data:audio/wav;base64,${data.audio}`;
        audioEl.play();
      }
    };
    mediaRecorder.start();
    micBtn.textContent = 'Stop';
  } else {
    mediaRecorder.stop();
    micBtn.textContent = '🎙️';
  }
};
