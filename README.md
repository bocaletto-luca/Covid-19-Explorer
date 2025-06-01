# COVID-19 Tracker 🌍🦠

**Author:** Bocaletto Luca  
**License:** GNU GPL v3

![HTML](https://img.shields.io/badge/HTML5-E34F26?style=flat-square&logo=html5&logoColor=white)  
![CSS](https://img.shields.io/badge/CSS3-1572B6?style=flat-square&logo=css3&logoColor=white)  
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat-square&logo=javascript&logoColor=black)  
![API](https://img.shields.io/badge/API-disease.sh%20API-9cf?style=flat-square&logo=api)  
![Chart.js](https://img.shields.io/badge/Chart.js-FF6384?style=flat-square&logo=chartdotjs)

---

## Overview 🚀

**COVID-19 Tracker** is a responsive web application that delivers up-to-date statistics on COVID-19 cases at both a global and regional level. Leveraging the [disease.sh API](https://disease.sh/docs/), the app shows key metrics such as total cases, deaths, recoveries, active cases, and critical cases. It enhances data presentation with an interactive bar chart powered by Chart.js for an intuitive visualization experience.

---

## Features 💡

- **Global Statistics:**  
  View worldwide data—displayed in a clean card layout—that includes total cases, deaths, recoveries, active cases, and critical cases, along with the latest update time.

- **Regional Insights:**  
  Use an interactive dropdown to select a country and instantly access detailed regional COVID-19 statistics—complete with today’s new cases and deaths.

- **Dynamic Charting:**  
  A responsive Chart.js bar chart graphically represents key global metrics, making large datasets easier to understand at a glance.

- **Data Refresh:**  
  Refresh both global and regional data on demand with dedicated buttons, ensuring the information stays current.

---

## How It Works 🔧

1. **Data Fetching:**  
   Upon load, the application retrieves global COVID-19 data from `https://disease.sh/v3/covid-19/all` and country-specific data from `https://disease.sh/v3/covid-19/countries`.

2. **Display & Visualization:**  
   Global data is presented via informative stat cards and a bar chart, while regional data is shown dynamically when you select a country from the populated dropdown list.

3. **Interactivity:**  
   The interface allows you to refresh data both globally and for the selected country, ensuring that the most accurate information is always displayed.

---

## Technologies Used 🔥

- **Frontend:** HTML5, CSS3, Vanilla JavaScript  
- **API:** [disease.sh API](https://disease.sh/docs/)  
- **Charting Library:** [Chart.js](https://www.chartjs.org/)

---

## Installation & Usage ⚙️

1. **Clone or Download:**  
   Obtain the source code from the repository.

2. **Open the Application:**  
   Open the `index.html` file in your preferred web browser.

3. **Interact:**  
   - The application automatically loads global COVID-19 statistics and populates the country selection dropdown.
   - Click on **Refresh Global Data** to update global statistics.
   - Select a country to view its detailed COVID-19 stats, and refresh the regional data when needed.

---

## Contributing 🤝

Contributions are highly encouraged! Please fork the repository, implement any improvements or fixes, and submit a pull request. For issues or suggestions, feel free to open an issue on the project's GitHub page.

---

## License 📄

This project is licensed under the GNU GPL v3 License.
