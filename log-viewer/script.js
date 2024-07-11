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
    const ipAddresses = [
        "192.168.1.1", "192.168.1.2", "192.168.1.3", "192.168.1.4", "192.168.1.5",
        "192.168.1.6", "192.168.1.7", "192.168.1.8", "192.168.1.9", "192.168.1.10",
        "192.168.1.11", "192.168.1.12", "192.168.1.13", "192.168.1.14", "192.168.1.15"
    ];

    for (let i = 1; i <= 1000; i++) {
        let ipIndex = (i - 1) % 15;
        logData.push({ ip: ipAddresses[ipIndex], message: `Sample message ${i}` });
    }

    function populateLogTable(data) {
        const logEntries = document.getElementById('log-entries');
        logEntries.innerHTML = '';

        const selectedLogCount = parseInt(logCountSelect.value);
        const displayedLogs = data.slice(-selectedLogCount);

        displayedLogs.forEach((entry) => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${entry.ip}</td>
                <td>${entry.message}</td>
            `;
            logEntries.appendChild(row);
        });
    }

    function displayLogEntries(logs) {
        const logEntriesContainer = document.getElementById('log-entries');
        logEntriesContainer.innerHTML = '';

        const selectedLogCount = parseInt(logCountSelect.value);
        const displayedLogs = logs.slice(-selectedLogCount);

        displayedLogs.forEach(log => {
            const logEntry = document.createElement('div');
            logEntry.className = 'log-entry';
            logEntry.textContent = `IP: ${log.ip}, Message: ${log.message}`;
            logEntriesContainer.appendChild(logEntry);
        });
    }

    // Log filtreleme
    function filterLogs() {
        const ipFilter = document.getElementById('ifilter').value.toLowerCase();
        const messageFilter = document.getElementById('mfilter').value.toLowerCase();

        const filteredLogs = logData.filter(log => {
            return log.ip.toLowerCase().includes(ipFilter) && log.message.toLowerCase().includes(messageFilter);
        });

        displayLogEntries(filteredLogs);
        displayStatistics(filteredLogs);
    }

    logCountSelect.addEventListener('change', function () {
        populateLogTable(logData);
        displayStatistics(logData);
    });

    document.getElementById('ifilter').addEventListener('input', filterLogs);
    document.getElementById('mfilter').addEventListener('input', filterLogs);

    populateLogTable(logData);
    displayStatistics(logData);

    // İstatistikleri gösterme
    function displayStatistics(data) {
        const ipCounts = data.reduce((acc, log) => {
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

        // İstatistik grafiğini oluşturma
        new Chart(ctx, {
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

        populateLogTable(logData);
        displayStatistics(logData);
});