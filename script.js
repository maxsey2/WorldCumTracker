const cokeCanVolume = 0.355;
const spermPerEjaculationLiters = 0.0037;
const milkBoxVolume = 0.237;
const beerPintVolume = 0.473;
const toothpasteTubeVolume = 0.125; // tube de dentifrice 125 ml
const litersPerSecondAvg = 3.25; // moyenne mondiale estimée

function formatNumber(num) {
  return num.toLocaleString('en-US', { maximumFractionDigits: 0 });
}

function getBaseLiters() {
  const now = new Date();
  const year = now.getUTCFullYear();
  const startOfYear = new Date(Date.UTC(year, 0, 1)); // 1er janvier à minuit UTC
  const secondsElapsed = Math.floor((now - startOfYear) / 1000);
  return secondsElapsed * litersPerSecondAvg;
}

function updateCounter() {
  const baseLiters = getBaseLiters();
  const gallons = baseLiters * 0.264172;

  const cokeCans = baseLiters / cokeCanVolume;
  const tissues = baseLiters / spermPerEjaculationLiters;
  const milkBoxes = baseLiters / milkBoxVolume;
  const beerPints = baseLiters / beerPintVolume;
  const toothpasteTubes = baseLiters / toothpasteTubeVolume;

  const comparisons = [
    { label: '🧻 Used Tissues 💦', value: tissues },
    { label: '🪥 Toothpaste tubes', value: toothpasteTubes },
    { label: '🥛 Milk boxes', value: milkBoxes },
    { label: '🥤 Coke cans', value: cokeCans },
    { label: '🍺 Beer pints', value: beerPints },
  ];

  // Tri du plus petit au plus grand
  comparisons.sort((a, b) => a.value - b.value);

  document.getElementById('liters').textContent = baseLiters.toLocaleString('en-US', { maximumFractionDigits: 0 });
  document.getElementById('gallons').textContent = gallons.toLocaleString('en-US', { maximumFractionDigits: 0 });

  document.getElementById('comparisons').innerHTML = comparisons.map(c => `
    <div class="comparison-item">
      <div class="comparison-label">${c.label}</div>
      <div class="comparison-value">${formatNumber(c.value)}</div>
    </div>
  `).join('');
}

// Mise à jour chaque seconde
setInterval(updateCounter, 1000);
updateCounter();
