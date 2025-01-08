document.addEventListener('DOMContentLoaded', function () {
  let drugs = [];

  // Load drugs from localStorage
  if (localStorage.getItem('drugs')) {
    drugs = JSON.parse(localStorage.getItem('drugs'));
    console.log('Loaded drugs from localStorage:', drugs);
    renderDrugs();
  }

  // Form submission
  document.getElementById('drugForm').addEventListener('submit', function (e) {
    e.preventDefault();
    const drugName = document.getElementById('drugName').value;
    const drugQuantity = parseInt(document.getElementById('drugQuantity').value);
    const drugPrice = parseFloat(document.getElementById('drugPrice').value);

    // Validate quantity (must be non-negative)
    if (drugQuantity < 0) {
      alert("Quantity cannot be negative. Please enter a valid quantity.");
      return;
    }

    // Validate price (must be non-negative)
    if (drugPrice < 0) {
      alert("Price cannot be negative. Please enter a valid price.");
      return;
    }

    const newDrug = {
      id: Date.now(),
      name: drugName,
      quantity: drugQuantity,
      price: drugPrice,
      outOfStock: false,
    };

    drugs.push(newDrug);
    console.log('Added new drug:', newDrug);
    saveDrugs();
    renderDrugs();
    e.target.reset();
  });

  // Render drugs in the table
  function renderDrugs() {
    console.log('Rendering drugs:', drugs);
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
          <td>${formatPrice(drug.price)}</td>
          <td>
            <button class="btn btn-sm ${
              drug.outOfStock ? 'btn-out-of-stock' : 'btn-success'
            }" onclick="toggleOutOfStock(${drug.id})">
              ${drug.outOfStock ? 'Out of Stock' : 'In Stock'}
            </button>
          </td>
          <td>
            <button class="btn btn-sm btn-warning" onclick="editQuantity(${drug.id})">Edit Quantity</button>
            <button class="btn btn-sm btn-danger" onclick="confirmDelete(${drug.id})">Delete</button>
          </td>
        </tr>
      `
      )
      .join('');
  }

  function saveDrugs() {
    localStorage.setItem('drugs', JSON.stringify(drugs));
    console.log('Saved drugs to localStorage:', drugs);
  }

  function formatPrice(price) {
    return `NPR ${price.toFixed(2)}`;
  }
});
