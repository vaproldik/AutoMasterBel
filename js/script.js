/* TICKER */
var ticker = document.getElementById('js-ticker');
if (ticker) {
  var clone = ticker.cloneNode(true);
  ticker.parentNode.appendChild(clone);
}

/* КАЛЬКУЛЯТОР */
var typeOptions = [
  { name: 'Диагностика', price: 25 },
  { name: 'Ремонт подвески', price: 120 },
  { name: 'Ремонт двигателя', price: 850 }
];

var complexityMult = [1, 1.5, 2.2];
var urgencyMult = [1, 1.3, 2];

var selectedType = 0;
var selectedComplexity = 0;
var selectedUrgency = 0;

function updatePrice() {
  var priceEl = document.getElementById('js-calc-price');
  if (!priceEl) return;

  var total = Math.round(
    typeOptions[selectedType].price *
    complexityMult[selectedComplexity] *
    urgencyMult[selectedUrgency]
  );

  priceEl.textContent = total + ' руб';
}

function bindOptions(listId, onSelect) {
  var list = document.getElementById(listId);
  if (!list) return;

  var items = list.querySelectorAll('.calc-option');

  for (var i = 0; i < items.length; i++) {
    (function(index) {
      items[index].addEventListener('click', function() {
        for (var j = 0; j < items.length; j++) {
          items[j].classList.remove('active');
        }
        items[index].classList.add('active');
        onSelect(index);
        updatePrice();
      });
    })(i);
  }
}

bindOptions('js-type', function(i) { selectedType = i; });
bindOptions('js-complexity', function(i) { selectedComplexity = i; });
bindOptions('js-urgency', function(i) { selectedUrgency = i; });

var orderBtn = document.getElementById('js-calc-order');
if (orderBtn) {
  orderBtn.addEventListener('click', function() {
    var total = Math.round(
      typeOptions[selectedType].price *
      complexityMult[selectedComplexity] *
      urgencyMult[selectedUrgency]
    );
    alert('Запись подтверждена!\n' + typeOptions[selectedType].name + ' — ' + total + ' руб');
  });
}

if (document.getElementById('js-calc-price')) {
  updatePrice();
}