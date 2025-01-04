let drugs = [];

// Load drugs from localStorage
if (localStorage.getItem('drugs')) {
  drugs = JSON.parse(localStorage.getItem('drugs'));
  renderDrugs();
}

// Form submission
document.getElementById('drugForm').addEventListener('submit', function (e) {
  e.preventDefault();
  const drugName = document.getElementById('drugName').value;
  const drugQuantity = document.getElementById('drugQuantity').value;
  const drugPrice = document.getElementById('drugPrice').value;

  const newDrug = {
    id: Date.now(),
    name: drugName,
    quantity: drugQuantity,
    price: drugPrice,
    outOfStock: false,
  };

  drugs.push(newDrug);
  saveDrugs();
  renderDrugs();
  e.target.reset();
});

// Render drugs in the table
function renderDrugs() {
  const drugList = document.getElementById('drugList');
  drugList.innerHTML = drugs
    .map(
      (drug) => `
      <tr>
        <td>${drug.name}</td>
        <td>
          <span id="quantity-${drug.id}">${drug.quantity}</span>
          <input type="number" id="editQuantity-${drug.id}" value="${drug.quantity}" class="form-control d-none" style="width: 80px;">
        </td>
        <td>Rs ${drug.price}</td>
        <td>
          <button class="btn btn-sm ${
            drug.outOfStock ? 'btn-out-of-stock' : 'btn-success'
          }" onclick="toggleOutOfStock(${drug.id})">
            ${drug.outOfStock ? 'Out of Stock' : 'In Stock'}
          </button>
        </td>
        <td>
          <button class="btn btn-sm btn-warning" onclick="editQuantity(${drug.id})">Edit Quantity</button>
          <button class="btn btn-sm btn-danger" onclick="deleteDrug(${drug.id})">Delete</button>
        </td>
      </tr>
    `
    )
    .join('');
}

// Toggle out of stock status
function toggleOutOfStock(id) {
  const drug = drugs.find((drug) => drug.id === id);
  drug.outOfStock = !drug.outOfStock;
  saveDrugs();
  renderDrugs();
}

// Edit quantity
function editQuantity(id) {
  const quantitySpan = document.getElementById(`quantity-${id}`);
  const quantityInput = document.getElementById(`editQuantity-${id}`);

  if (quantitySpan.classList.contains('d-none')) {
    // Save the updated quantity
    const drug = drugs.find((drug) => drug.id === id);
    drug.quantity = quantityInput.value;
    saveDrugs();
    renderDrugs();
  } else {
    // Show the input field
    quantitySpan.classList.add('d-none');
    quantityInput.classList.remove('d-none');
  }
}

// Delete drug
function deleteDrug(id) {
  drugs = drugs.filter((drug) => drug.id !== id);
  saveDrugs();
  renderDrugs();
}

// Save drugs to localStorage
function saveDrugs() {
  localStorage.setItem('drugs', JSON.stringify(drugs));
}
