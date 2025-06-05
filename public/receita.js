document.addEventListener('DOMContentLoaded', () => {
    const cameraBtn = document.getElementById('btn-camera');
    const micBtn = document.getElementById('btn-mic');
    const backBtn = document.getElementById('btn-back');
    const chatSend = document.getElementById('chat-send');
    const chatInput = document.getElementById('chat-input');
    const chatMessages = document.querySelector('.chat-messages');
  
    let cameraOn = true;
    let micOn = true;
  
    cameraBtn.addEventListener('click', () => {
      cameraOn = !cameraOn;
      cameraBtn.textContent = cameraOn ? 'Desligar Câmera' : 'Ligar Câmera';
      // Aqui você vai futuramente desligar a câmera com plugin
    });
  
    micBtn.addEventListener('click', () => {
      micOn = !micOn;
      micBtn.textContent = micOn ? 'Mutar Microfone' : 'Ativar Microfone';
      // Aqui futuramente vai mutar/desmutar o microfone
    });
  
    backBtn.addEventListener('click', () => {
      window.location.href = 'index.html'; // Volta pro menu principal
    });
  
    chatSend.addEventListener('click', sendMessage);
    chatInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') sendMessage();
    });
  
    function sendMessage() {
      const text = chatInput.value.trim();
      if (text === '') return;
  
      const msg = document.createElement('div');
      msg.className = 'chat-message';
      msg.textContent = text;
  
      chatMessages.appendChild(msg);
      chatInput.value = '';
      chatMessages.scrollTop = chatMessages.scrollHeight;
    }
  });

  // Captura de vídeo da câmera
document.addEventListener('DOMContentLoaded', () => {
  const cameraBtn = document.getElementById('btn-camera');
  const micBtn = document.getElementById('btn-mic');
  const backBtn = document.getElementById('btn-back');
  const chatSend = document.getElementById('chat-send');
  const chatInput = document.getElementById('chat-input');
  const chatMessages = document.querySelector('.chat-messages');
  const myCamera = document.querySelector('.my-camera');

  let cameraStream = null;
  let cameraOn = true;
  let micOn = true;

  // Função para ligar a câmera
  async function startCamera() {
    try {
      cameraStream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
      const video = document.createElement('video');
      video.autoplay = true;
      video.playsInline = true;
      video.srcObject = cameraStream;
      video.style.width = '100%';
      video.style.height = '100%';

      myCamera.innerHTML = ''; // Limpa qualquer conteúdo anterior
      myCamera.appendChild(video);
    } catch (err) {
      console.error('Erro ao acessar a câmera:', err);
    }
  }

  // Liga a câmera ao carregar
  startCamera();

  // Alternar câmera
  cameraBtn.addEventListener('click', () => {
    if (!cameraStream) return;

    cameraOn = !cameraOn;
    cameraBtn.textContent = cameraOn ? 'Desligar Câmera' : 'Ligar Câmera';

    const videoTrack = cameraStream.getVideoTracks()[0];
    videoTrack.enabled = cameraOn;
  });

  // Alternar microfone
  micBtn.addEventListener('click', () => {
    if (!cameraStream) return;

    micOn = !micOn;
    micBtn.textContent = micOn ? 'Mutar Microfone' : 'Ativar Microfone';

    const audioTrack = cameraStream.getAudioTracks()[0];
    audioTrack.enabled = micOn;
  });

  // Voltar ao menu
  backBtn.addEventListener('click', () => {
    window.location.href = 'index.html';
  });

  // Chat
  chatSend.addEventListener('click', sendMessage);
  chatInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') sendMessage();
  });

  function sendMessage() {
    const text = chatInput.value.trim();
    if (text === '') return;

    const msg = document.createElement('div');
    msg.className = 'chat-message';
    msg.textContent = text;

    chatMessages.appendChild(msg);
    chatInput.value = '';
    chatMessages.scrollTop = chatMessages.scrollHeight;
  }
});


  