const defaultState = {
  player: {
    name: 'Aventurier',
    hp: 100,
    maxHp: 100,
    energy: 100,
    maxEnergy: 100,
    level: 1,
    xp: 0,
    gold: 50,
    reputation: 0,
    inventory: ['Cape de survivant', 'Nécessaire de camp'],
    journal: ['Tu te réveilles dans les ruines d’un monde qui n’a pas fini de mourir.']
  },
  currentSceneId: 'intro',
  location: 'Aube du Monde',
  day: 1,
  mapUnlocked: false
};

const state = JSON.parse(JSON.stringify(defaultState));

const ui = {
  mainScreen: document.getElementById('mainScreen'),
  gameScreen: document.getElementById('gameScreen'),
  modalContainer: document.getElementById('modalContainer'),
  modalBody: document.getElementById('modalBody'),
  storyTitle: document.getElementById('storyTitle'),
  storyContent: document.getElementById('storyContent'),
  contextText: document.getElementById('contextText'),
  contextBox: document.getElementById('contextBox'),
  storyImage: document.getElementById('storyImage'),
  choicesContainer: document.getElementById('choicesContainer'),
  inventoryList: document.getElementById('inventoryList'),
  location: document.getElementById('location'),
  gameTime: document.getElementById('gameTime'),
  level: document.getElementById('level'),
  exp: document.getElementById('exp'),
  gold: document.getElementById('gold'),
  reputation: document.getElementById('reputation'),
  hpBar: document.getElementById('hpBar'),
  hpText: document.getElementById('hpText'),
  energyBar: document.getElementById('energyBar'),
  energyText: document.getElementById('energyText'),
  charName: document.getElementById('charName')
};

function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}

function saveGame() {
  localStorage.setItem('rpworld_save', JSON.stringify(state));
  showModal('Sauvegarde réussie', [
    'La progression a été enregistrée localement.',
    'Tu peux reprendre ton aventure à tout moment.'
  ]);
}

function loadGame() {
  const saved = localStorage.getItem('rpworld_save');
  if (!saved) {
    showModal('Aucune sauvegarde', ['Aucune partie enregistrée n’a été trouvée.']);
    return;
  }

  const data = JSON.parse(saved);
  Object.assign(state, data);
  renderScene();
  ui.mainScreen.classList.add('hidden');
  ui.gameScreen.classList.remove('hidden');
}

function startNewGame() {
  const fresh = JSON.parse(JSON.stringify(defaultState));
  Object.assign(state, fresh);
  ui.mainScreen.classList.add('hidden');
  ui.gameScreen.classList.remove('hidden');
  renderScene();
}

function mainMenu() {
  ui.gameScreen.classList.add('hidden');
  ui.mainScreen.classList.remove('hidden');
}

function closeModal() {
  ui.modalContainer.classList.add('hidden');
}

function showModal(title, lines = []) {
  ui.modalBody.innerHTML = `
    <div class="modal-section">
      <h3>${title}</h3>
      <ul>
        ${lines.map(line => `<li>${line}</li>`).join('')}
      </ul>
    </div>
  `;
  ui.modalContainer.classList.remove('hidden');
}

function showGuide() {
  showModal('Guide du jeu', [
    'Tu pries pour choisir la bonne route entre risque, récompense et loyauté.',
    'Chaque décision modifie ton énergie, ton or, ton niveau et ta réputation.',
    'Le jeu contient plusieurs arcs, plusieurs fins, et une progression notable.',
    'Regarde aussi l’inventaire et le journal pour suivre tes découvertes.'
  ]);
}

function showSettings() {
  showModal('Paramètres', [
    'Mode futuriste activé.',
    'Résolution optimisée pour bureau et mobile.',
    'Sauvegarde locale automatique dans le navigateur.'
  ]);
}

function showMap() {
  showModal('Carte du monde', [
    'Aube du Monde',
    'Ruines du Réseau',
    'Camp de la Veille',
    'Forêt de cristal',
    'Pont du Ciel',
    'Écho-Cité',
    'Noyau de Renaissance'
  ]);
}

function showInventory() {
  showModal('Inventaire', state.player.inventory.length ? state.player.inventory : ['Aucun objet.']);
}

function showEquipment() {
  showModal('Équipement', [
    'Cape de survivant',
    'Nécessaire de camp',
    'Outils basiques pour la route'
  ]);
}

function showStats() {
  const { hp, maxHp, energy, maxEnergy, level, gold, reputation } = state.player;
  showModal('Statistiques', [
    `Vie: ${hp}/${maxHp}`,
    `Énergie: ${energy}/${maxEnergy}`,
    `Niveau: ${level}`,
    `Or: ${gold}`,
    `Réputation: ${reputation}`
  ]);
}

function showJournal() {
  showModal('Journal', state.player.journal);
}

function applyChoiceChoice(choice) {
  const p = state.player;
  p.hp = clamp(p.hp + (choice.effect.hp || 0), 0, p.maxHp);
  p.energy = clamp(p.energy + (choice.effect.energy || 0), 0, p.maxEnergy);
  p.gold = clamp(p.gold + (choice.effect.gold || 0), 0, 999999);
  p.reputation = clamp(p.reputation + (choice.effect.reputation || 0), -99, 99);
  p.xp += choice.effect.xp || 0;

  if (choice.item && !p.inventory.includes(choice.item)) {
    p.inventory.push(choice.item);
  }

  if (state.player.xp >= 100) {
    state.player.level += 1;
    state.player.xp -= 100;
    state.player.maxHp += 10;
    state.player.maxEnergy += 8;
    state.player.hp = state.player.maxHp;
    state.player.energy = state.player.maxEnergy;
    p.journal.push('Tu as gagné un niveau et amélioré tes capacités.');
  }

  if (choice.next) {
    state.currentSceneId = choice.next;
  }

  state.day += 1;
  renderScene();
}

function renderScene() {
  const scene = window.scenarios[state.currentSceneId];
  if (!scene) return;

  const p = state.player;
  ui.storyTitle.textContent = scene.title;
  ui.storyContent.textContent = scene.story;
  ui.location.textContent = scene.location || state.location;
  ui.gameTime.textContent = `JOUR ${state.day}`;
  ui.charName.textContent = p.name;
  ui.level.textContent = p.level;
  ui.exp.textContent = `${p.xp}/100`;
  ui.gold.textContent = p.gold;
  ui.reputation.textContent = p.reputation;

  if (scene.imageUrl && scene.imageUrl.trim()) {
    ui.storyImage.style.backgroundImage = `url('${scene.imageUrl}')`;
    ui.storyImage.style.backgroundSize = 'cover';
    ui.storyImage.style.backgroundPosition = 'center';
    ui.storyImage.style.backgroundRepeat = 'no-repeat';
  } else if (scene.image) {
    ui.storyImage.style.background = scene.image;
    ui.storyImage.style.backgroundImage = 'none';
  } else {
    ui.storyImage.style.background = 'linear-gradient(135deg, rgba(100, 20, 20, 0.8), rgba(20, 5, 10, 0.95))';
    ui.storyImage.style.backgroundImage = 'none';
  }

  if (scene.context) {
    ui.contextText.textContent = scene.context;
    ui.contextBox.classList.remove('hidden');
  } else {
    ui.contextBox.classList.add('hidden');
  }

  const hpPercent = (p.hp / p.maxHp) * 100;
  const energyPercent = (p.energy / p.maxEnergy) * 100;
  ui.hpBar.style.width = `${hpPercent}%`;
  ui.hpText.textContent = `${p.hp}/${p.maxHp}`;
  ui.energyBar.style.width = `${energyPercent}%`;
  ui.energyText.textContent = `${p.energy}/${p.maxEnergy}`;

  ui.inventoryList.innerHTML = '';
  p.inventory.forEach(item => {
    const div = document.createElement('div');
    div.className = 'inventory-item';
    div.textContent = item;
    ui.inventoryList.appendChild(div);
  });

  ui.choicesContainer.innerHTML = '';
  if (!scene.choices || scene.choices.length === 0) {
    const end = document.createElement('div');
    end.className = 'inventory-item';
    end.textContent = 'Tu as atteint la fin de cette ligne du temps. Le monde a changé autour de toi.';
    ui.choicesContainer.appendChild(end);
    return;
  }

  scene.choices.forEach(choice => {
    const button = document.createElement('button');
    button.className = 'choice-btn';
    button.innerHTML = `<strong>${choice.text}</strong><span>${choice.item ? 'Récompense : ' + choice.item : 'Décision importante'}</span>`;
    button.addEventListener('click', () => applyChoiceChoice(choice));
    ui.choicesContainer.appendChild(button);
  });
}

function init() {
  renderScene();
}

window.addEventListener('DOMContentLoaded', init);
window.startNewGame = startNewGame;
window.loadGame = loadGame;
window.showSettings = showSettings;
window.showGuide = showGuide;
window.showInventory = showInventory;
window.showEquipment = showEquipment;
window.showStats = showStats;
window.showJournal = showJournal;
window.showMap = showMap;
window.saveGame = saveGame;
window.mainMenu = mainMenu;
window.closeModal = closeModal;
