// ==========================================================================
// BILLIONAIRE BBQ — order flow logic
// ==========================================================================

const bbqBillionaires = [
  { id: 'deff-lamos', name: 'Deff Lamos', img: 'images/bbq/bbq-deff-lamos.png', imgSelected: 'images/bbq/lamos-selected.png',
    worth: '$194B',blurb: 'Fortune from Arenium, a company which delivers products within 50 seconds of someone thinking it.' , equivalent: 'blah blah'},
  { id: 'fark-suckerjurg', name: 'Fark Suckerjurg', img: 'images/bbq/bbq-fark-suckerjurg.png', imgSelected: 'images/bbq/suckerjerg-selected.png',
    worth: '$194B',blurb: 'Fortune from AssZine, a company which uses the dark psychic arts to trap users into their four-tiered pyramid scheme.' , equivalent: 'blah blah', equivalent: 'blah blah'},
  { id: 'felon-busk', name: 'Felon Busk', img: 'images/bbq/bbq-felon-busk.png', imgSelected: 'images/bbq/bbq-deff-lamos-selected.png',
    worth: '$194B',blurb: 'Originally began busking at airport terminals, covering Kid Rock and uninspiring country music. Fortune from an array of companies which began by stealing the ideas of aspiring Nepalian entrepreuners. Known for having personally met Satan, \u2019a Japanese-African\u2019 (his words) under sexual circumstances.', equivalent: 'blah blah'},
  { id: 'garles-coch', name: 'Garles Coch', img: 'images/bbq/bbq-garles-coch.png', imgSelected: 'images/bbq/coch-selected.png',
    worth: '$194B', blurb: 'Known for claiming the Earth is actually a pentagon, each side superimposed with a portrait of Spielbergs ET.', equivalent: 'blah blah'},
  { id: 'kill-mates', name: 'Kill Mates', img: 'images/bbq/bbq-kill-mates.png', imgSelected: 'images/bbq/mates-selected.png',
    worth: '$194B', blurb: 'Fortune from inventing the smart breastpump and known for dumping millions in cash into the Ganga River in India.', equivalent: 'blah blah'},
  { id: 'poopert-kurdom', name: 'Poopert Kurdom', img: 'images/bbq/bbq-poopert-kurdom.png', imgSelected: 'images/bbq/poopert-selected.png',
    worth: '$194B', blurb: 'Fortune from his self-started blog, called the Chronicles of My Body, where he documents and rates various illnesses on his own body.', equivalent: 'blah blah'},
  { id: 'ronald-mumps', name: 'Ronald Mumps', img: 'images/bbq/bbq-ronald-mumps.png', imgSelected: 'images/bbq/mumps-selected.png',
   worth: '$194B', blurb: 'Inherited fortune from his family, convicted magician and now runs a single McDonalds in Idaho.', equivalent: 'blah blah'},
  { id: 'jarry-meddlesome', name: 'Jarry Meddlesome', img: 'images/bbq/bbq-larry-meddlesome.png', imgSelected: 'images/bbq/meddlesome-selected.png',
   worth: '$194B', blurb: 'Fortune from a chain of Peeping Tom bathroom stalls around America, and known for being the first man to inject kitten underbelly fat into his face.', equivalent: 'blah blah'},
  { id: 'ham-faultsman', name: 'Ham Faultsman', img: 'images/bbq/bbq-ham-faultsman.png', imgSelected: 'images/bbq/faultsman-selected.png',
    worth: '$194B', blurb: 'Known as the CEO of OpenWide, a company which inserts a microchip into your hole of choice, incapacitating you and removing the ability to think and act by your own volition.', equivalent: 'blah blah'},
  { id: 'leema-blackhart', name: 'Leema Blackhart', img: 'images/bbq/bbq-leema-blackhart.png', imgSelected: 'images/bbq/leema-selected.png',
    worth: '$194B', blurb: 'Fortune inherited from her father, and doubled by selling repurposed chunks of the planet to countries not in need.', equivalent: 'blah blah'},
  { id: 'kitchard-sacked', name: 'Kitchard Sacked', img: 'images/bbq/bbq-kitchard-sacked.png', imgSelected: 'images/bbq/sacked-selected.png',
    worth: '$194B', blurb: 'Fortune from BiteMe, a company which sells an array of invisible sweets and desserts that taste like a shortened life expectancy and painful overdose.', equivalent: 'blah blah'},
  { id: 'bernard-arnault', name: 'Jauks J\u2019mapelle', img: 'images/bbq/bbq-bernard-arnault.png', imgSelected: 'images/bbq/jauks-selected.png',
    worth: '$194B', blurb: 'Fortune from illegally buying burgeoning footwear companies and dumping the excess inventory into the Milky Way. Known for being the first man to inject baby goat underbelly fat into his face.', equivalent: 'blah blah'},
];

const bbqMeats = [
  { id: 'lamb', name: 'Lamb', src: 'images/bbq/bbq-lamb-option.png'},
  { id: 'beef', name: 'Beef', src: 'images/bbq/bbq-beef-option.png'},
  { id: 'chicken', name: 'Chicken', src: 'images/bbq/bbq-chicken-option.png'},
  { id: 'combo', name: 'Combo', src: 'images/bbq/bbq-combo-option.png'},
];

const bbqKebabs = [
  { id: 'lamb-only', name: 'Lamb', src: 'images/bbq/bbq-lamb-kebab.png'},
  { id: 'lamb-veg', name: 'Lamb w/ Veggies', src: 'images/bbq/bbq-lamb-veg-kebab.png'},
  { id: 'beef-only', name: 'Beef', src: 'images/bbq/bbq-beef-only-kebab.png'},
  { id: 'beef-veg', name: 'Beef w/ Veggies', src: 'images/bbq/bbq-beef-veg-kebab.png'},
  { id: 'chicken-only', name: 'Chicken', src: 'images/bbq/bbq-chicken-only-kebab.png'},
  { id: 'chicken-veg', name: 'Chicken w/ Veggies', src: 'images/bbq/bbq-chicken-veg-kebab.png'},
  { id: 'combo-only', name: 'Combo', src: 'images/bbq/bbq-combo-kebab.png'},
  { id: 'combo-veg', name: 'Combo w. Veggies', src: 'images/bbq/bbq-combo-veg-kebab.png'},
];

const bbqSauces = [
  { id: 'chilli', name: 'Chilli Sauce', src: 'images/bbq/bbq-chilli-sauce-option.png'},
  { id: 'garlic', name: 'Garlic Sauce', src: 'images/bbq/bbq-garlic-sauce-option.png'},
  { id: 'yogurt-herb', name: 'Yogurt Herb Sauce', src: 'images/bbq/bbq-yogurt-herb-sauce-option.png'},
];

const bbqSteps = [
  { key: 'billionaire', title: 'Step 1: Choose Your Billionaire', options: bbqBillionaires, hasInfoPanel: true },
  { key: 'meat', title: 'Step 2: Choose Your Kebab Meat', options: bbqMeats, hasInfoPanel: false },
  { key: 'veg', title: 'Step 3: Choose Your Veg', options: () => getVegOptionsForMeat(bbqSelections.meat), hasInfoPanel: false, wide: true},
  { key: 'sauce', title: 'Step 4: Choose Your Sauce', options: bbqSauces, hasInfoPanel: false },
];

// ---- State -------------------------------------------------------------
let bbqStepIndex = 0;
let bbqSelections = {};

// ---- Open / Close Modal ------------------------------------------------
window.openBBQModal = () => {
  bbqStepIndex = 0;
  bbqSelections = {};
  document.querySelector('.bbq-bill-selection').classList.remove('hidden');
  renderBBQStep();
};

window.hideBBQInfo = (id) => {
  const panel = document.getElementById(`popover-${id}`);
  if (panel) {
    panel.classList.add('hidden');
    panel.classList.remove('flip-left');
  }
};

window.closeBBQModal = () => {
  document.querySelector('.bbq-bill-selection').classList.add('hidden');
};

// for veg options according to meat selection 
function getVegOptionsForMeat(meatId) {
    if (!meatId) return [];
    return bbqKebabs.filter(k => k.id.startsWith(`${meatId}-`));
}
// ---- Render Step -------------------------------------------------------
function renderBBQStep() {
  const step = bbqSteps[bbqStepIndex];
  const stepOptions = typeof step.options === 'function' ? step.options() : step.options;
  const container = document.querySelector('.bbq-bill-selection');

  const optionsHtml = stepOptions.map(opt => {
    const isSelected = bbqSelections[step.key] === opt.id;

    if (step.hasInfoPanel) {
      return `
        <div class="bbq-face-card">
          <div class="bbq-face-wrapper" onmouseover="showBBQInfo('${opt.id}')" onmouseout="hideBBQInfo('${opt.id}')">
            <button class="bbq-option face-only ${isSelected ? 'selected' : ''}" data-id="${opt.id}"
                onclick="selectBBQOption('${step.key}', '${opt.id}')">
                <img src="${isSelected ? opt.imgSelected : opt.img}" alt="${opt.name}">
            </button>
            <div class="bbq-popover-panel hidden" id="popover-${opt.id}">
              <h4 class="bbq-popover-title">${opt.name}</h4>
              <div class="bbq-popover-worth">Net worth: ${opt.worth}</div>
              <p class="bbq-popover-text">${opt.blurb}</p>
              <p class="bbq-popover-equivalent">${opt.equivalent}</p>
            </div>
          </div>
        </div>`;
    }

    return `
      <button class="bbq-option no-image ${isSelected ? 'selected' : ''}" data-id="${opt.id}"
        onclick="selectBBQOption('${step.key}', '${opt.id}')">
        <img src="${opt.src}" alt="${opt.name}">
        <span class="bbq-option-name">${opt.name}</span>
      </button>`;
  }).join('');

  const nextDisabled = bbqSelections[step.key] ? '' : 'disabled';
  const nextLabel = bbqStepIndex === bbqSteps.length - 1 ? 'Place Order' : 'Next';
  const backClass = bbqStepIndex === 0 ? 'is-hidden' : '';

  container.innerHTML = `
    <div class="bbq-modal ${step.wide ? 'bbq-modal-wide' : ''}">
      <div class="bbq-modal-header">
        <h2>${step.title}</h2>
        <button class="bbq-modal-close" onclick="closeBBQModal()">✕</button>
      </div>
      <div class="bbq-modal-body">
        <div class="bbq-selection-scroll">
          <div class="bbq-selection-grid ${step.hasInfoPanel ? 'face-flow' : ''}">
            ${optionsHtml}
          </div>
        </div>
      </div>
      <div class="bbq-modal-footer">
        <button class="bbq-btn ${backClass}" onclick="goBBQBack()">Back</button>
        <button class="bbq-btn primary" id="bbq-next-btn" ${nextDisabled} onclick="goBBQNext()">${nextLabel}</button>
      </div>
    </div>
  `;
}

// ---- Hover Slide-out Info Panel -----------------------------------------
window.showBBQInfo = (id) => {
  const panel = document.getElementById(`popover-${id}`);
  if (!panel) return;
  panel.classList.remove('hidden', 'flip-left');

  const modal = panel.closest('.bbq-modal');
  const panelRect = panel.getBoundingClientRect();
  const modalRect = modal.getBoundingClientRect();

  if (panelRect.right > modalRect.right) {
    panel.classList.add('flip-left');
  }
};

// ---- Selection & Navigation ---------------------------------------------
window.selectBBQOption = (stepKey, id) => {
  bbqSelections[stepKey] = id;
  renderBBQStep();
};

window.goBBQNext = () => {
  if (bbqStepIndex < bbqSteps.length - 1) {
    bbqStepIndex += 1;
    renderBBQStep();
  } else {
    placeBBQOrder();
  }
};

window.goBBQBack = () => {
  if (bbqStepIndex > 0) {
    bbqStepIndex -= 1;
    renderBBQStep();
  }
};

function placeBBQOrder() {
  document.querySelector('.bbq-bill-selection').innerHTML = `
    <div class="bbq-modal">
      <div class="bbq-modal-header">
        <h2>Order Placed</h2>
        <button class="bbq-modal-close" onclick="closeBBQModal()">✕</button>
      </div>
      <div class="bbq-modal-body" style="padding: 24px;">
        <p style="font-family:'Space Mono',monospace; color: #000;">Your ticket is on the grill.</p>
      </div>
    </div>
  `;
}

document.addEventListener('DOMContentLoaded', () => {
  const getStartedBtn = document.querySelector('.get-started');
  if (getStartedBtn) {
    getStartedBtn.addEventListener('click', window.openBBQModal);
  }
});