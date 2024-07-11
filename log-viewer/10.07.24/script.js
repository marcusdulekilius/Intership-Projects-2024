document.addEventListener('DOMContentLoaded', function () {
    const themeToggleCheckbox = document.getElementById('theme-toggle-checkbox');
    const body = document.body;

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

const logData = [
    { ip: "192.168.1.1", message: "User logged in successfully." },
];

for (let i = 2; i <= 200; i++) {
    logData.push({ ip: `192.168.1.${i}`, message: `Sample message ${i}` });
}

function populateLogTable() {
    const logEntries = document.getElementById('log-entries');
    logData.forEach((entry) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${entry.ip}</td>
            <td>${entry.message}</td>
        `;
        logEntries.appendChild(row);
    });
}

document.addEventListener('DOMContentLoaded', () => {
    populateLogTable();
});


    function displayLogEntries(logs) {
        const logEntriesContainer = document.getElementById('log-entries');
        logEntriesContainer.innerHTML = ''; // Clear existing entries

        logs.forEach(log => {
            const logEntry = document.createElement('div');
            logEntry.className = 'log-entry';
            logEntry.textContent = `IP: ${log.ip}, Message: ${log.message}`;
            logEntriesContainer.appendChild(logEntry);
        });
    }

    function filterLogs() {
        const ipFilter = document.getElementById('ifilter').value.toLowerCase();
        const messageFilter = document.getElementById('mfilter').value.toLowerCase();

        const filteredLogs = logData.filter(log => {
            return log.ip.toLowerCase().includes(ipFilter) && log.message.toLowerCase().includes(messageFilter);
        });

        displayLogEntries(filteredLogs);
    }

    document.getElementById('ifilter').addEventListener('input', filterLogs);
    document.getElementById('mfilter').addEventListener('input', filterLogs);

    displayLogEntries(logData);

    function displayStatistics(data) {
        const ipCounts = data.reduce((acc, log) => {
            acc[log.ip] = (acc[log.ip] || 0) + 1;
            return acc;
        }, {});

        const chartData = {
            labels: Object.keys(ipCounts),
            datasets: [{
                label: 'Message Count',
                data: Object.values(ipCounts),
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1
            }]
        };

        const chartContainer = document.getElementById('stats-chart');
        const ctx = chartContainer.getContext('2d');

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
});
