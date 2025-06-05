const mainContainer = document.querySelector('.main-container');
const contentArea = document.getElementById('contentArea');
const backBtn = document.getElementById('back-button');

const homeHTML = `
  <div id="home">
    <h1>NEXT CARD</h1>
    <p class="tagline">Plataforma online de card games</p>
    <div class="button-group">
      <button id="btn-criar">Criar Sala</button>
      <button id="btn-entrar">Entrar em Sala</button>
    </div>
  </div>
`;

const formHTML = (type) => `
  <div id="form-area">
    <h2 id="form-title">${type === 'criar' ? 'Criar Sala' : 'Entrar na Sala'}</h2>
    <form class="formulario">
      <div class="form-group">
        <label for="apelido">Apelido:</label>
        <input type="text" id="apelido" placeholder="Digite seu apelido" required />
      </div>
      <div class="form-group">
        <label for="codigo">Código da Sala:</label>
        <input type="text" id="codigo" placeholder="${type === 'criar' ? 'Crie um código' : 'Insira o código'}" required />
      </div>
      <div class="button-group">
        <a href="room.html" class="btn" id="submit-button">Confirmar</a>
      </div>
    </form>
  </div>
`;

function fadeOut(element, callback) {
  element.style.opacity = 1;
  element.style.transition = 'opacity 0.3s ease';
  element.style.opacity = 0;
  element.addEventListener('transitionend', function handler() {
    element.removeEventListener('transitionend', handler);
    if (callback) callback();
  });
}

function fadeIn(element) {
  element.style.opacity = 0;
  element.style.transition = 'opacity 0.3s ease';
  void element.offsetWidth; // força reflow
  element.style.opacity = 1;
}

// Nova função: anima altura com requestAnimationFrame e easing suave
function animateHeight(fromHeight, toHeight, duration = 300, callback) {
  const startTime = performance.now();

  function easeInOutQuad(t) {
    return t < 0.5 ? 2*t*t : -1 + (4 - 2*t)*t;
  }

  function step(currentTime) {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const easedProgress = easeInOutQuad(progress);
    const currentHeight = fromHeight + (toHeight - fromHeight) * easedProgress;
    mainContainer.style.height = currentHeight + 'px';

    if (progress < 1) {
      requestAnimationFrame(step);
    } else {
      mainContainer.style.height = 'auto'; // reseta altura para auto no final
      if (callback) callback();
    }
  }

  requestAnimationFrame(step);
}

function showForm(type) {
    fadeOut(contentArea, () => {
      // Guarda altura antes da troca
      const fromHeight = contentArea.offsetHeight;
  
      // Troca o conteúdo
      contentArea.innerHTML = formHTML(type);
      backBtn.style.display = 'block';
  
      // Agora pega a altura nova depois da troca
      const toHeight = contentArea.scrollHeight;
  
      // Define a altura inicial do container para a altura antiga antes de animar
      mainContainer.style.height = fromHeight + 'px';
  
      // Anima a altura do container do tamanho antigo pro novo
      animateHeight(fromHeight, toHeight, 300, () => {
        fadeIn(contentArea);
        setupListeners();
      });
    });
  }

  function goBack() {
    fadeOut(contentArea, () => {
      // Guarda altura antes da troca
      const fromHeight = contentArea.offsetHeight;
  
      // Troca o conteúdo
      contentArea.innerHTML = homeHTML;
      backBtn.style.display = 'none';
  
      // Altura nova
      const toHeight = contentArea.scrollHeight;
  
      // Define a altura inicial para a altura antiga antes de animar
      mainContainer.style.height = fromHeight + 'px';
  
      // Anima altura
      animateHeight(fromHeight, toHeight, 300, () => {
        fadeIn(contentArea);
        setupListeners();
      });
    });
  }

function setupListeners() {
  const btnCriar = document.getElementById('btn-criar');
  const btnEntrar = document.getElementById('btn-entrar');

  if (btnCriar) btnCriar.addEventListener('click', () => showForm('criar'));
  if (btnEntrar) btnEntrar.addEventListener('click', () => showForm('entrar'));
}

document.addEventListener('DOMContentLoaded', () => {
  contentArea.innerHTML = homeHTML;
  backBtn.style.display = 'none';
  setupListeners();

  // Ajusta altura inicial
  mainContainer.style.height = contentArea.offsetHeight + 'px';
  setTimeout(() => {
    mainContainer.style.height = 'auto';
  }, 600);
});
