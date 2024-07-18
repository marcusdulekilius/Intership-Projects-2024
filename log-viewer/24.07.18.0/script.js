document.addEventListener('DOMContentLoaded', function () {
    const themeToggleCheckbox = document.getElementById('theme-toggle-checkbox');
    const body = document.body;
    const downloadCsvButton = document.getElementById('download-csv');
    const logCountSelect = document.getElementById('logsayisi');
    const refresh = document.getElementById('refresh');
    const updateMessage = document.getElementById('update-message');

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
    let updateInterval;
    let lastFetchedData = [];

    function fetchData() {
        fetch('your-api-link')
            .then(response => response.json())
            .then(data => {
                if (JSON.stringify(data) !== JSON.stringify(lastFetchedData)) {
                    logData = data;
                    lastFetchedData = data;
                    const filteredLogs = filterLogs();
                    populateLogTable(filteredLogs);
                    displayStatistics(filteredLogs);
                    displayUpdateMessage();
                }
            })
            .catch(error => console.error('Error fetching data:', error));
    }
    

    function populateLogTable(data) {
        const logEntries = document.getElementById('log-entries');
        logEntries.innerHTML = '';

        const selectedLogCount = parseInt(logCountSelect.value);

        // Newer newer newer
        const sortedLogs = data.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
        const displayedLogs = sortedLogs.slice(0, selectedLogCount);

        displayedLogs.forEach((entry) => {
            const row = document.createElement('div');
            row.classList.add('log-row');
            row.innerHTML = `
                <div class="log-column log-column-ip">${entry.ip}</div>
                <div class="log-column log-column-ts">${new Date(entry.timestamp).toLocaleString()}</div>
                <div class="log-column log-column-msg">${entry.message}</div>
                <div class="log-column log-column-copy">
                <button onclick="copyToClipboard('${entry.message}')">❖</button>
                </div>
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

    refresh.addEventListener('change', function () {
        clearInterval(updateInterval);
        const frequency = parseInt(refresh.value) * 1000;
        if (frequency > 0) {
            updateInterval = setInterval(fetchData, frequency);
            fetchData();
        }
    });

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

        // Hayatı sıfırlamak
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

    function displayUpdateMessage() {
        updateMessage.textContent = 'Veri Güncellendi';
        updateMessage.style.opacity = 0.7;
        setTimeout(() => {
            updateMessage.style.opacity = 0;
        }, 500);
    }

    function downloadCsv(data) {
        const csvContent = "data:text/csv;charset=utf-8,"
            + data.map(e => `${e.ip},${new Date(e.timestamp).toLocaleString()},${e.message}`).join("\n");

        const encodedUri = encodeURI(csvContent);
        const link = document.createElement('a');
        link.setAttribute('href', encodedUri);
        link.setAttribute('download', 'logs.csv');
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }

    downloadCsvButton.addEventListener('click', function (event) {
        event.preventDefault();
        const filteredLogs = filterLogs();
        const selectedLogCount = parseInt(logCountSelect.value);
        const sortedLogs = filteredLogs.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
        const displayedLogs = sortedLogs.slice(0, selectedLogCount);
        downloadCsv(displayedLogs);
    });

    fetchData();
    const initialFrequency = parseInt(refresh.value) * 1000;
    if (initialFrequency > 0) {
        updateInterval = setInterval(fetchData, initialFrequency);
    }
});
