document.addEventListener('DOMContentLoaded', function() {
    const stateSelect = document.getElementById('state-select');
    const dataTable = document.getElementById('data-body');

    // Fetch state names from the server
    fetch('/states')
        .then(response => response.json())
        .then(data => {
            data.forEach(state => {
                const option = document.createElement('option');
                option.value = state;
                option.textContent = state;
                stateSelect.appendChild(option);
            });
        });

    // Event listener for state select change
    stateSelect.addEventListener('change', function() {
        const selectedState = stateSelect.value;
        if (selectedState) {
            // Fetch data for the selected state
            fetch(`/state_data?state=${selectedState}`)
                .then(response => response.json())
                .then(data => {
                    // Clear existing data
                    dataTable.innerHTML = '';

                    // Populate the table with fetched data
                    if (data.length > 0) {
                        const rowData = data[0]; // Access the first element of the array
                        const tr = document.createElement('tr');
                        tr.innerHTML = `
                            <td>${rowData['STATE_And_UNION_TERRITORY']}</td>
                            <td>${rowData['TOTAL_VACCINATION_DOSES']}</td>
                            <td>${rowData['DOSE1']}</td>
                            <td>${rowData['DOSE2']}</td>
                            <td>${rowData['Males_Vaccinated']}</td>
                            <td>${rowData['Females_Vaccinated']}</td>
                        `;
                        dataTable.appendChild(tr);
                    }
                });
        }
    });

    // Function to handle the click event on the download link
    document.getElementById('download-btn').addEventListener('click', function(event) {
        // Prevent default action (opening the link)
        event.preventDefault();
        
        // Create a new anchor element
        const link = document.createElement('a');
        link.href = 'https://drive.google.com/uc?id=1cZuVxpW6d-aiOWmve2fmIH126_tJR0y6'; // Update the href to point to the correct route
        
        // Trigger a click event on the anchor element
        link.click();
    });

    // Function to handle the click event on the "Total Males Vaccinated" link
    document.getElementById('males-vaccinated-link').addEventListener('click', function(event) {
        event.preventDefault();
        showPopup('/males_vaccinated', 'Total Males Vaccinated in India');
    });

    // Function to handle the click event on the "Total Females Vaccinated" link
    document.getElementById('females-vaccinated-link').addEventListener('click', function(event) {
        event.preventDefault();
        showPopup('/females_vaccinated', 'Total Females Vaccinated in India');
    });

    // Function to show popup alert with data
    function showPopup(url, message) {
        fetch(url)
            .then(response => response.text())
            .then(data => {
                window.alert(`${message} = ${data}`);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }
});
