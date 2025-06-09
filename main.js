"use strict";

    // Variables to store fetched data
    let globalData = {};
    let countriesData = [];
    let globalChart;

    // Helper: Format numbers with commas
    function formatNumber(num) {
      return num.toLocaleString();
    }

    // Helper: Create a stat card element
    function createCard(title, value) {
      const card = document.createElement('div');
      card.className = 'card';
      const h3 = document.createElement('h3');
      h3.textContent = title;
      const p = document.createElement('p');
      p.textContent = value;
      card.appendChild(h3);
      card.appendChild(p);
      return card;
    }

    // Display Global Statistics in Cards
    function displayGlobalStats(data) {
      const container = document.getElementById('globalStats');
      container.innerHTML = '';
      container.appendChild(createCard('Total Cases', formatNumber(data.cases)));
      container.appendChild(createCard('Total Deaths', formatNumber(data.deaths)));
      container.appendChild(createCard('Total Recovered', formatNumber(data.recovered)));
      container.appendChild(createCard('Active Cases', formatNumber(data.active)));
      container.appendChild(createCard('Critical Cases', formatNumber(data.critical)));
      const updated = new Date(data.updated).toLocaleString();
      container.appendChild(createCard('Last Updated', updated));
      
      // Update the chart with new data
      updateGlobalChart(data);
    }

    // Display Country Statistics in Cards
    function displayCountryStats(data) {
      const container = document.getElementById('countryStats');
      container.innerHTML = '';
      container.appendChild(createCard('Country', data.country));
      container.appendChild(createCard('Total Cases', formatNumber(data.cases)));
      container.appendChild(createCard('Total Deaths', formatNumber(data.deaths)));
      container.appendChild(createCard('Total Recovered', formatNumber(data.recovered)));
      container.appendChild(createCard('Active Cases', formatNumber(data.active)));
      container.appendChild(createCard('Critical Cases', formatNumber(data.critical)));
      container.appendChild(createCard('Cases Today', formatNumber(data.todayCases)));
      container.appendChild(createCard('Deaths Today', formatNumber(data.todayDeaths)));
      const updated = new Date(data.updated).toLocaleString();
      container.appendChild(createCard('Last Updated', updated));
    }

    // Update or create the global chart using Chart.js
    function updateGlobalChart(data) {
      const ctx = document.getElementById('globalChart').getContext('2d');
      const chartData = {
        labels: ["Total Cases", "Deaths", "Recovered", "Active", "Critical"],
        datasets: [{
          label: 'Global COVID-19 Stats',
          data: [data.cases, data.deaths, data.recovered, data.active, data.critical],
          backgroundColor: [
            'rgba(54,162,235,0.7)',
            'rgba(255,99,132,0.7)',
            'rgba(75,192,192,0.7)',
            'rgba(255,206,86,0.7)',
            'rgba(153,102,255,0.7)'
          ],
          borderColor: [
            'rgb(54,162,235)',
            'rgb(255,99,132)',
            'rgb(75,192,192)',
            'rgb(255,206,86)',
            'rgb(153,102,255)'
          ],
          borderWidth: 1
        }]
      };

      if (globalChart) {
        // Update existing chart data
        globalChart.data.datasets[0].data = [data.cases, data.deaths, data.recovered, data.active, data.critical];
        globalChart.update();
      } else {
        globalChart = new Chart(ctx, {
          type: 'bar',
          data: chartData,
          options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
              y: {
                beginAtZero: true,
                ticks: {
                  callback: function(value) { return value.toLocaleString(); }
                }
              }
            }
          }
        });
      }
    }

    // Fetch Global Data from disease.sh API
    function fetchGlobalData() {
      fetch("https://disease.sh/v3/covid-19/all")
        .then(response => response.json())
        .then(data => {
          globalData = data;
          displayGlobalStats(globalData);
        })
        .catch(error => {
          console.error("Error fetching global data:", error);
        });
    }

    // Fetch Countries Data and populate the dropdown
    function fetchCountriesData() {
      fetch("https://disease.sh/v3/covid-19/countries")
        .then(response => response.json())
        .then(data => {
          countriesData = data;
          populateCountrySelect(countriesData);
        })
        .catch(error => {
          console.error("Error fetching countries data:", error);
        });
    }

    // Populate the country select dropdown
    function populateCountrySelect(data) {
      const select = document.getElementById('countrySelect');
      select.innerHTML = '<option value="">Select a country</option>';
      data.sort((a, b) => a.country.localeCompare(b.country));
      data.forEach(countryData => {
        const option = document.createElement('option');
        option.value = countryData.country;
        option.textContent = countryData.country;
        select.appendChild(option);
      });
    }

    // Handle country selection change
    function handleCountrySelection() {
      const select = document.getElementById('countrySelect');
      const selectedCountry = select.value;
      if (!selectedCountry) {
        document.getElementById('countryStats').innerHTML = '';
        document.getElementById('refreshCountry').style.display = "none";
        return;
      }
      const countryData = countriesData.find(item => item.country === selectedCountry);
      if (countryData) {
        displayCountryStats(countryData);
        document.getElementById('refreshCountry').style.display = "inline-block";
      } else {
        document.getElementById('countryStats').textContent = 'Data not available.';
        document.getElementById('refreshCountry').style.display = "none";
      }
    }

    // Refresh data for the selected country by re-fetching from the API
    function refreshCountryData() {
      const select = document.getElementById('countrySelect');
      const selectedCountry = select.value;
      if (!selectedCountry) return;
      fetch(`https://disease.sh/v3/covid-19/countries/${selectedCountry}`)
        .then(response => response.json())
        .then(data => {
          const index = countriesData.findIndex(item => item.country === selectedCountry);
          if (index !== -1) {
            countriesData[index] = data;
          }
          displayCountryStats(data);
        })
        .catch(error => {
          console.error("Error refreshing country data:", error);
        });
    }

    // Attach event listeners
    document.getElementById('refreshGlobal').addEventListener('click', fetchGlobalData);
    document.getElementById('countrySelect').addEventListener('change', handleCountrySelection);
    document.getElementById('refreshCountry').addEventListener('click', refreshCountryData);

    // Initial data fetch
    fetchGlobalData();
    fetchCountriesData();
