document.addEventListener('DOMContentLoaded', function () {
    const themeToggleCheckbox = document.getElementById('theme-toggle-checkbox');
    const body = document.body;
    const logCountSelect = document.getElementById('logsayisi');

    themeToggleCheckbox.addEventListener('change', function () {
        if (themeToggleCheckbox.checked) {
            // Dark
            body.classList.remove('light-theme');
            body.classList.add('dark-theme');
        } else {
            // Light
            body.classList.remove('dark-theme');
            body.classList.add('light-theme');
        }
    });

    body.classList.add('light-theme');

    let logData = [];

    // Fetch data from API
    fetch('YOUR_API_LINK')
        .then(response => response.json())
        .then(data => {
            logData = data;
            populateLogTable(logData);
            displayStatistics(logData);
        })
        .catch(error => console.error('Error fetching data:', error));

    function populateLogTable(data) {
        const logEntries = document.getElementById('log-entries');
        logEntries.innerHTML = '';

        const selectedLogCount = parseInt(logCountSelect.value);

        // Newer newer newer
        const sortedLogs = data.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
        const displayedLogs = sortedLogs.slice(0, selectedLogCount);

        displayedLogs.forEach((entry) => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${entry.ip}</td>
                <td>${new Date(entry.timestamp).toLocaleString()}</td>
                <td>${entry.message}</td>
            `;
            logEntries.appendChild(row);
        });
    }

    function filterLogs() {
        const ipFilter = document.getElementById('ifilter').value.toLowerCase();
        const messageFilter = document.getElementById('mfilter').value.toLowerCase();

        return logData.filter(log => {
            return log.ip.toLowerCase().includes(ipFilter) && log.message.toLowerCase().includes(messageFilter);
        });
    }

    logCountSelect.addEventListener('change', function () {
        const filteredLogs = filterLogs();
        populateLogTable(filteredLogs);
        displayStatistics(filteredLogs);
    });

    document.getElementById('ifilter').addEventListener('input', function () {
        const filteredLogs = filterLogs();
        populateLogTable(filteredLogs);
        displayStatistics(filteredLogs);
    });

    document.getElementById('mfilter').addEventListener('input', function () {
        const filteredLogs = filterLogs();
        populateLogTable(filteredLogs);
        displayStatistics(filteredLogs);
    });

    // Statistics
    function displayStatistics(data) {
        const selectedLogCount = parseInt(logCountSelect.value);

        // New's always better
        const sortedLogs = data.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
        const displayedLogs = sortedLogs.slice(0, selectedLogCount);

        const ipCounts = displayedLogs.reduce((acc, log) => {
            acc[log.ip] = (acc[log.ip] || 0) + 1;
            return acc;
        }, {});

        const chartData = {
            labels: Object.keys(ipCounts),
            datasets: [{
                label: 'IP Bar',
                data: Object.values(ipCounts),
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 2
            }]
        };

        const chartContainer = document.getElementById('stats-chart');
        const ctx = chartContainer.getContext('2d');

        // Sil baştan başlamak gerek bazen
        if (window.chartInstance) {
            window.chartInstance.destroy();
        }

        // Hayaaatııı sıfırlamaaak
        window.chartInstance = new Chart(ctx, {
            type: 'bar',
            data: chartData,
            options: {
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });
    }
});
