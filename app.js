document.addEventListener("DOMContentLoaded", function () {
  const divisionSelect = document.getElementById("division");
  const districtSelect = document.getElementById("district");
  const upazillaSelect = document.getElementById("upazilla");
  const unionSelect = document.getElementById("union");
  const resetBtn = document.getElementById("resetBtn");

  // Load divisions when page loads
  fetchDivisions();

  // Event listeners for select changes
  divisionSelect.addEventListener("change", function () {
    if (this.value) {
      fetchDistricts(this.value);
      resetSelects("district");
    } else {
      resetSelects("division");
    }
  });

  districtSelect.addEventListener("change", function () {
    if (this.value) {
      fetchUpazillas(this.value);
      resetSelects("upazilla");
    } else {
      resetSelects("district");
    }
  });

  upazillaSelect.addEventListener("change", function () {
    if (this.value) {
      fetchUnions(this.value);
      resetSelects("union");
    } else {
      resetSelects("upazilla");
    }
  });

  // Reset button
  resetBtn.addEventListener("click", function () {
    resetAll();
  });

  // Fetch divisions from API
  function fetchDivisions() {
    fetch("  https://sohojapi.vercel.app/api/divisions")
      .then((response) => response.json())
      .then((data) => {
        populateSelect(divisionSelect, data);
      })
      .catch((error) => console.error("Error fetching divisions:", error));
  }

  // Fetch districts from API based on division
  function fetchDistricts(divisionId) {
    districtSelect.disabled = false;
    fetch(`https://sohojapi.vercel.app/api/districts/${divisionId}`)
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
        console.log(data);
        populateSelect(upazillaSelect, data);
      })
      .catch((error) => console.error("Error fetching upazillas:", error));
    console.log(districtId);
  }

  // Fetch unions from API based on upazilla
  function fetchUnions(upazillaId) {
    unionSelect.disabled = false;
    fetch(`  https://sohojapi.vercel.app/api/unions/${upazillaId}`)
      .then((response) => response.json())
      .then((data) => {
        populateSelect(unionSelect, data);
      })
      .catch((error) => console.error("Error fetching unions:", error));
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

  // Reset selects at and below the specified level
  function resetSelects(level) {
    const levels = ["division", "district", "upazilla", "union"];
    const startIndex = levels.indexOf(level) + 1;

    for (let i = startIndex; i < levels.length; i++) {
      const select = document.getElementById(levels[i]);
      select.innerHTML =
        '<option value="">Select ' +
        levels[i].charAt(0).toUpperCase() +
        levels[i].slice(1) +
        "</option>";
      select.disabled = true;
    }
  }

  // Reset all selects
  function resetAll() {
    divisionSelect.value = "";
    resetSelects("division");
  }
});
