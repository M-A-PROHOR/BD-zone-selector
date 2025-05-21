document.addEventListener("DOMContentLoaded", function () {
  const districtSelect = document.getElementById("district");
  const upazillaSelect = document.getElementById("upazilla");
  const resetBtn = document.getElementById("resetBtn");

  // Load districts when page loads
  fetchDistricts();

  // Event listeners for select changes
  districtSelect.addEventListener("change", function () {
    if (this.value) {
      fetchUpazillas(this.value);
    } else {
      resetUpazilla();
    }
  });

  // Reset button
  resetBtn.addEventListener("click", function () {
    resetAll();
  });

  // Fetch districts from API
  function fetchDistricts() {
    fetch("https://sohojapi.vercel.app/api/districts")
      .then((response) => response.json())
      .then((data) => {
        populateSelect(districtSelect, data);
      })
      .catch((error) => console.error("Error fetching districts:", error));
  }

  // Fetch upazillas from API based on district
  function fetchUpazillas(districtId) {
    upazillaSelect.disabled = false;
    fetch(`https://sohojapi.vercel.app/api/upzilas/${districtId}`)
      .then((response) => response.json())
      .then((data) => {
        populateSelect(upazillaSelect, data);
      })
      .catch((error) => console.error("Error fetching upazillas:", error));
  }

  // Populate select dropdown with options
  function populateSelect(selectElement, data) {
    // Clear existing options except the first one
    while (selectElement.options.length > 1) {
      selectElement.remove(1);
    }

    // Add new options
    data.forEach((item) => {
      const option = document.createElement("option");
      option.value = item.id;

      // Create option text with both English and Bengali names
      if (item.bn_name) {
        option.textContent = `${item.name} / ${item.bn_name}`;
      } else {
        option.textContent = item.name;
      }

      selectElement.appendChild(option);
    });
  }

  // Reset upazilla select
  function resetUpazilla() {
    upazillaSelect.innerHTML = '<option value="">Select Upazilla</option>';
    upazillaSelect.disabled = true;
  }

  // Reset all selects
  function resetAll() {
    districtSelect.value = "";
    resetUpazilla();
  }
});
