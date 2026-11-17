
function init() {
  ['engineDisp', 'engineRpm', 'boostPsi', 'vePct'].forEach(id => {
    document.getElementById(id).addEventListener('change', calc);
    document.getElementById(id).addEventListener('input', calc);
  });
  calc();
}

function calc() {
  const liters = parseFloat(document.getElementById('engineDisp').value)||2.5;
  const rpm = parseFloat(document.getElementById('engineRpm').value)||7000;
  const boost = parseFloat(document.getElementById('boostPsi').value)||20;
  const ve = parseFloat(document.getElementById('vePct').value)||0.92;

  // Displacement in cubic inches = liters * 61.0237
  const cuIn = liters * 61.0237;

  // Naturally aspirated CFM = (CID * RPM * VE) / 3456 (4-stroke)
  const naCfm = (cuIn * rpm * ve) / 3456;

  // Pressure ratio = (Atmospheric 14.7 + Boost) / 14.7
  const pr = (14.7 + boost) / 14.7;

  // Boosted CFM = naCfm * PR
  const boostedCfm = naCfm * pr;

  // Mass airflow (lbs/min) = CFM * 0.069 (air density factor)
  const massFlow = boostedCfm * 0.069;
  const estimatedHp = Math.round(massFlow * 10.3);

  document.getElementById('turboMassFlow').textContent = massFlow.toFixed(1);
  document.getElementById('hpPotential').textContent = `Estimated Flywheel Power: ≈ ${estimatedHp - 20}–${estimatedHp + 20} HP`;
  document.getElementById('pressureRatio').textContent = `${pr.toFixed(2)} : 1`;
  document.getElementById('turboCfm').textContent = `${Math.round(boostedCfm)} CFM`;
  document.getElementById('naCfm').textContent = `${Math.round(naCfm)} CFM`;
}
window.addEventListener('DOMContentLoaded', init);
