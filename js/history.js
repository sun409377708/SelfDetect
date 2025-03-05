// 

// 
function showHistoryPage() {
    // 
    if (document.getElementById('history-page')) {
        updateHistoryPage();
        showPage('history-page');
        return;
    }
    
    // 
    const app = document.getElementById('app');
    const historyPage = document.createElement('div');
    historyPage.id = 'history-page';
    historyPage.className = 'page history-page';
    
    // 
    const statusBar = createStatusBar();
    historyPage.appendChild(statusBar);
    
    // 
    const historyHeader = document.createElement('div');
    historyHeader.className = 'history-header';
    
    // 
    const backBtn = document.createElement('button');
    backBtn.className = 'back-btn';
    backBtn.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 12H5M12 19l-7-7 7-7"/></svg> 返回结果';
    backBtn.addEventListener('click', () => showResultPage(finalHeartRate));
    
    // 
    const historyTitle = document.createElement('div');
    historyTitle.className = 'history-title';
    historyTitle.textContent = '历史记录';
    
    // 
    const exportBtn = document.createElement('button');
    exportBtn.className = 'export-btn';
    exportBtn.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M17 8l-5-5-5 5M12 3v12"/></svg> 导出记录';
    exportBtn.addEventListener('click', exportHeartRateHistory);
    
    historyHeader.appendChild(backBtn);
    historyHeader.appendChild(historyTitle);
    historyHeader.appendChild(exportBtn);
    historyPage.appendChild(historyHeader);
    
    // 
    const chartContainer = document.createElement('div');
    chartContainer.className = 'chart-container';
    chartContainer.innerHTML = '<canvas id="heart-rate-chart"></canvas>';
    historyPage.appendChild(chartContainer);
    
    // 
    const historyList = document.createElement('div');
    historyList.className = 'history-list';
    historyList.id = 'history-list';
    historyPage.appendChild(historyList);
    
    // 
    const detailModal = document.createElement('div');
    detailModal.className = 'detail-modal';
    detailModal.id = 'detail-modal';
    
    const detailContent = document.createElement('div');
    detailContent.className = 'detail-content';
    
    const detailHeader = document.createElement('div');
    detailHeader.className = 'detail-header';
    
    const detailTitle = document.createElement('div');
    detailTitle.className = 'detail-title';
    detailTitle.textContent = '';
    
    const closeBtn = document.createElement('button');
    closeBtn.className = 'close-btn';
    closeBtn.innerHTML = '&times;';
    closeBtn.addEventListener('click', () => {
        document.getElementById('detail-modal').classList.remove('active');
    });
    
    detailHeader.appendChild(detailTitle);
    detailHeader.appendChild(closeBtn);
    
    const detailInfo = document.createElement('div');
    detailInfo.className = 'detail-info';
    detailInfo.id = 'detail-info';
    
    detailContent.appendChild(detailHeader);
    detailContent.appendChild(detailInfo);
    detailModal.appendChild(detailContent);
    
    historyPage.appendChild(detailModal);
    
    app.appendChild(historyPage);
    showPage('history-page');
    
    // 
    updateHistoryList();
    
    // 
    initHeartRateChart();
}

// 
function updateHistoryPage() {
    updateHistoryList();
    updateHeartRateChart();
}

// 
function updateHistoryList() {
    const historyList = document.getElementById('history-list');
    historyList.innerHTML = '';
    
    if (heartRateHistory.length === 0) {
        const noRecords = document.createElement('div');
        noRecords.className = 'no-records';
        noRecords.textContent = '没有记录';
        historyList.appendChild(noRecords);
        return;
    }
    
    // 
    heartRateHistory.forEach(record => {
        const historyItem = document.createElement('div');
        historyItem.className = 'history-item';
        historyItem.dataset.id = record.id;
        historyItem.addEventListener('click', () => showRecordDetail(record));
        
        const itemLeft = document.createElement('div');
        itemLeft.className = 'history-item-left';
        
        const itemDate = document.createElement('div');
        itemDate.className = 'history-item-date';
        itemDate.textContent = record.formattedDate;
        
        const itemRate = document.createElement('div');
        itemRate.className = 'history-item-rate';
        itemRate.innerHTML = `${record.heartRate}<span class="history-item-unit">bpm</span>`;
        
        itemLeft.appendChild(itemDate);
        itemLeft.appendChild(itemRate);
        
        const itemStatus = document.createElement('div');
        itemStatus.className = `history-item-status ${record.statusClass}`;
        itemStatus.textContent = record.status;
        
        historyItem.appendChild(itemLeft);
        historyItem.appendChild(itemStatus);
        
        historyList.appendChild(historyItem);
    });
}

// 
function showRecordDetail(record) {
    const detailModal = document.getElementById('detail-modal');
    const detailInfo = document.getElementById('detail-info');
    
    detailInfo.innerHTML = '';
    
    // 
    const createDetailRow = (label, value) => {
        const row = document.createElement('div');
        row.className = 'detail-row';
        
        const labelElement = document.createElement('div');
        labelElement.className = 'detail-label';
        labelElement.textContent = label;
        
        const valueElement = document.createElement('div');
        valueElement.className = 'detail-value';
        valueElement.textContent = value;
        
        row.appendChild(labelElement);
        row.appendChild(valueElement);
        
        return row;
    };
    
    // 
    detailInfo.appendChild(createDetailRow('记录时间', record.formattedDate));
    detailInfo.appendChild(createDetailRow('心率值', `${record.heartRate} bpm`));
    detailInfo.appendChild(createDetailRow('状态', record.status));
    detailInfo.appendChild(createDetailRow('建议', record.advice));
    
    // 
    detailModal.classList.add('active');
}

// 
function initHeartRateChart() {
    const ctx = document.getElementById('heart-rate-chart').getContext('2d');
    
    // 
    const chartData = prepareChartData();
    
    // 
    window.heartRateChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: chartData.labels,
            datasets: [{
                label: '',
                data: chartData.values,
                backgroundColor: 'rgba(255, 90, 95, 0.2)',
                borderColor: 'rgba(255, 90, 95, 1)',
                borderWidth: 2,
                pointBackgroundColor: 'rgba(255, 90, 95, 1)',
                pointBorderColor: '#fff',
                pointBorderWidth: 1,
                pointRadius: 4,
                pointHoverRadius: 6,
                tension: 0.3
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: {
                    beginAtZero: false,
                    min: 40,
                    max: 120,
                    grid: {
                        color: 'rgba(200, 200, 200, 0.1)'
                    },
                    ticks: {
                        color: '#999',
                        font: {
                            size: 10
                        },
                        callback: function(value) {
                            return value + ' bpm';
                        }
                    }
                },
                x: {
                    grid: {
                        display: false
                    },
                    ticks: {
                        color: '#999',
                        font: {
                            size: 10
                        },
                        maxRotation: 45,
                        minRotation: 45
                    }
                }
            },
            plugins: {
                legend: {
                    display: false
                },
                tooltip: {
                    backgroundColor: 'rgba(0, 0, 0, 0.7)',
                    titleFont: {
                        size: 12
                    },
                    bodyFont: {
                        size: 12
                    },
                    padding: 10,
                    displayColors: false,
                    callbacks: {
                        label: function(context) {
                            return ' bpm';
                        }
                    }
                }
            }
        }
    });
}

// 
function updateHeartRateChart() {
    if (window.heartRateChart) {
        const chartData = prepareChartData();
        window.heartRateChart.data.labels = chartData.labels;
        window.heartRateChart.data.datasets[0].data = chartData.values;
        window.heartRateChart.update();
    } else {
        initHeartRateChart();
    }
}

// 
function prepareChartData() {
    // 
    const recentRecords = heartRateHistory.slice(0, 10).reverse();
    
    const labels = recentRecords.map(record => {
        const date = new Date(record.date);
        return `${date.getMonth() + 1}/${date.getDate()} ${date.getHours()}:${date.getMinutes()}`;
    });
    
    const values = recentRecords.map(record => record.heartRate);
    
    return {
        labels: labels,
        values: values
    };
}

// 
function exportHeartRateHistory() {
    if (heartRateHistory.length === 0) {
        alert('没有记录');
        return;
    }
    
    // 
    let csvContent = ',, ,\n';
    
    heartRateHistory.forEach(record => {
        const row = [
            record.formattedDate,
            record.heartRate + ' bpm',
            record.status,
            record.advice
        ];
        
        // 
        const processedRow = row.map(field => {
            if (field.includes(',')) {
                return `"${field}"`;
            }
            return field;
        });
        
        csvContent += processedRow.join(',') + '\n';
    });
    
    // 
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    
    // 
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `_${new Date().toISOString().slice(0, 10)}.csv`);
    link.style.display = 'none';
    document.body.appendChild(link);
    
    // 
    link.click();
    
    // 
    document.body.removeChild(link);
}
