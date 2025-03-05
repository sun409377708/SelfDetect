// 原型展示页面脚本

// 在页面加载完成后初始化原型展示
document.addEventListener('DOMContentLoaded', function() {
    // 初始化所有屏幕
    initTestScreen();
    initResultScreen();
    initHistoryScreen();
});

// 创建原型状态栏
function createPrototypeStatusBar() {
    const statusBar = document.createElement('div');
    statusBar.className = 'prototype-status-bar';
    
    // 时间
    const timeElement = document.createElement('div');
    timeElement.className = 'status-time';
    timeElement.textContent = '10:56';
    
    // 网络状态
    const networkElement = document.createElement('div');
    networkElement.className = 'status-network';
    networkElement.textContent = '网络信号····';
    
    // 电池状态
    const batteryElement = document.createElement('div');
    batteryElement.className = 'status-battery';
    batteryElement.textContent = '85%';
    
    statusBar.appendChild(timeElement);
    statusBar.appendChild(networkElement);
    statusBar.appendChild(batteryElement);
    
    return statusBar;
}

// 初始化测试屏幕
function initTestScreen() {
    const testScreen = document.getElementById('test-screen');
    
    // 创建状态栏
    const statusBar = createPrototypeStatusBar();
    testScreen.appendChild(statusBar);
    
    // 心率仪表盘
    const heartMonitor = document.createElement('div');
    heartMonitor.className = 'heart-monitor';
    
    // 外圈进度条
    const progressRing = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    progressRing.className = 'progress-ring';
    progressRing.setAttribute('viewBox', '0 0 100 100');
    
    const circleBg = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
    circleBg.className = 'bg';
    circleBg.setAttribute('cx', '50');
    circleBg.setAttribute('cy', '50');
    circleBg.setAttribute('r', '45');
    
    const circleProgress = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
    circleProgress.className = 'progress';
    circleProgress.setAttribute('cx', '50');
    circleProgress.setAttribute('cy', '50');
    circleProgress.setAttribute('r', '45');
    const circumference = 2 * Math.PI * 45;
    circleProgress.style.strokeDasharray = `${circumference} ${circumference}`;
    // 设置进度为30%
    circleProgress.style.strokeDashoffset = circumference - (circumference * 0.3);
    
    progressRing.appendChild(circleBg);
    progressRing.appendChild(circleProgress);
    heartMonitor.appendChild(progressRing);
    
    // 内圈
    const innerCircle = document.createElement('div');
    innerCircle.className = 'inner-circle';
    heartMonitor.appendChild(innerCircle);
    
    // 心脏图标
    const heartIcon = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    heartIcon.className = 'heart-icon beating';
    heartIcon.setAttribute('viewBox', '0 0 24 24');
    heartIcon.innerHTML = '<path fill="currentColor" d="M12,21.35L10.55,20.03C5.4,15.36 2,12.27 2,8.5C2,5.41 4.42,3 7.5,3C9.24,3 10.91,3.81 12,5.08C13.09,3.81 14.76,3 16.5,3C19.58,3 22,5.41 22,8.5C22,12.27 18.6,15.36 13.45,20.03L12,21.35Z"/>';
    innerCircle.appendChild(heartIcon);
    
    // 心电图波形
    const ecgWave = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    ecgWave.className = 'ecg-wave';
    ecgWave.setAttribute('viewBox', '0 0 300 100');
    ecgWave.innerHTML = '<path class="ecg-line" d="M0,50 L30,50 L45,20 L60,80 L75,30 L90,70 L105,50 L120,50 L150,50 L165,20 L180,80 L195,30 L210,70 L225,50 L240,50 L270,50 L285,20 L300,80"/>';
    innerCircle.appendChild(ecgWave);
    
    testScreen.appendChild(heartMonitor);
    
    // 测试步骤提示
    const testStep = document.createElement('div');
    testStep.className = 'test-step';
    testStep.textContent = '第2步 测量中';
    testScreen.appendChild(testStep);
    
    // 健康建议文字
    const healthTip = document.createElement('div');
    healthTip.className = 'health-tip';
    healthTip.textContent = '正在测量您的心率，请保持手指稳定并保持安静。';
    testScreen.appendChild(healthTip);
    
    // 测试中按钮
    const startBtn = document.createElement('button');
    startBtn.className = 'btn';
    startBtn.textContent = '测试中...';
    startBtn.disabled = true;
    testScreen.appendChild(startBtn);
}

// 初始化结果屏幕
function initResultScreen() {
    const resultScreen = document.getElementById('result-screen');
    
    // 创建状态栏
    const statusBar = createPrototypeStatusBar();
    resultScreen.appendChild(statusBar);
    
    // 返回按钮
    const backBtn = document.createElement('button');
    backBtn.className = 'back-btn';
    backBtn.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 12H5M12 19l-7-7 7-7"/></svg> 返回';
    resultScreen.appendChild(backBtn);
    
    // 心脏图标和心电图波形
    const heartContainer = document.createElement('div');
    heartContainer.className = 'result-heart-container';
    
    const heartIcon = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    heartIcon.className = 'result-heart-icon';
    heartIcon.setAttribute('viewBox', '0 0 24 24');
    heartIcon.innerHTML = '<path fill="currentColor" d="M12,21.35L10.55,20.03C5.4,15.36 2,12.27 2,8.5C2,5.41 4.42,3 7.5,3C9.24,3 10.91,3.81 12,5.08C13.09,3.81 14.76,3 16.5,3C19.58,3 22,5.41 22,8.5C22,12.27 18.6,15.36 13.45,20.03L12,21.35Z"/>';
    
    const ecgWave = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    ecgWave.className = 'result-ecg-wave';
    ecgWave.setAttribute('viewBox', '0 0 300 100');
    ecgWave.innerHTML = '<path class="ecg-line" d="M0,50 L30,50 L45,20 L60,80 L75,30 L90,70 L105,50 L120,50 L150,50 L165,20 L180,80 L195,30 L210,70 L225,50 L240,50 L270,50 L285,20 L300,80"/>';
    
    heartContainer.appendChild(heartIcon);
    heartContainer.appendChild(ecgWave);
    resultScreen.appendChild(heartContainer);
    
    // 心率数字显示
    const heartRateDisplay = document.createElement('div');
    heartRateDisplay.className = 'heart-rate-display';
    
    const heartRateValue = document.createElement('div');
    heartRateValue.className = 'heart-rate-value';
    heartRateValue.innerHTML = `<span id="heart-rate-number" class="animated-number">72</span><span class="heart-rate-unit">bpm</span>`;
    heartRateDisplay.appendChild(heartRateValue);
    
    // 健康状态
    const healthStatus = document.createElement('div');
    healthStatus.className = 'health-status status-normal';
    healthStatus.textContent = '正常';
    heartRateDisplay.appendChild(healthStatus);
    
    resultScreen.appendChild(heartRateDisplay);
    
    // 健康建议
    const healthAdvice = document.createElement('div');
    healthAdvice.className = 'health-advice';
    healthAdvice.textContent = '心率正常，请继续保持良好的生活习惯。';
    resultScreen.appendChild(healthAdvice);
    
    // 历史记录链接
    const historyLink = document.createElement('a');
    historyLink.className = 'history-link';
    historyLink.href = 'javascript:void(0);';
    historyLink.innerHTML = '查看历史记录 <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>';
    resultScreen.appendChild(historyLink);
    
    // 再次测试按钮
    const retestBtn = document.createElement('button');
    retestBtn.className = 'btn';
    retestBtn.textContent = '再次测试';
    resultScreen.appendChild(retestBtn);
}

// 初始化历史屏幕
function initHistoryScreen() {
    const historyScreen = document.getElementById('history-screen');
    
    // 创建状态栏
    const statusBar = createPrototypeStatusBar();
    historyScreen.appendChild(statusBar);
    
    // 页面头部
    const historyHeader = document.createElement('div');
    historyHeader.className = 'history-header';
    
    // 返回按钮
    const backBtn = document.createElement('button');
    backBtn.className = 'back-btn';
    backBtn.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 12H5M12 19l-7-7 7-7"/></svg> 返回';
    
    // 标题
    const historyTitle = document.createElement('div');
    historyTitle.className = 'history-title';
    historyTitle.textContent = '历史记录';
    
    // 导出按钮
    const exportBtn = document.createElement('button');
    exportBtn.className = 'export-btn';
    exportBtn.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M17 8l-5-5-5 5M12 3v12"/></svg> 导出';
    
    historyHeader.appendChild(backBtn);
    historyHeader.appendChild(historyTitle);
    historyHeader.appendChild(exportBtn);
    historyScreen.appendChild(historyHeader);
    
    // 趋势图
    const chartContainer = document.createElement('div');
    chartContainer.className = 'chart-container';
    chartContainer.innerHTML = '<canvas id="prototype-heart-rate-chart" width="300" height="200"></canvas>';
    historyScreen.appendChild(chartContainer);
    
    // 初始化图表
    initPrototypeChart();
    
    // 历史记录列表
    const historyList = document.createElement('div');
    historyList.className = 'history-list';
    
    // 创建模拟历史数据
    const mockHistoryData = [
        { date: '2025-03-05 10:30', heartRate: 72, status: '正常', statusClass: 'status-normal' },
        { date: '2025-03-04 15:45', heartRate: 85, status: '偏高', statusClass: 'status-high' },
        { date: '2025-03-03 08:20', heartRate: 68, status: '正常', statusClass: 'status-normal' },
        { date: '2025-03-02 19:10', heartRate: 95, status: '偏高', statusClass: 'status-high' }
    ];
    
    // 添加历史记录
    mockHistoryData.forEach(record => {
        const historyItem = document.createElement('div');
        historyItem.className = 'history-item';
        
        const itemLeft = document.createElement('div');
        itemLeft.className = 'history-item-left';
        
        const itemDate = document.createElement('div');
        itemDate.className = 'history-item-date';
        itemDate.textContent = record.date;
        
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
    
    historyScreen.appendChild(historyList);
}

// 初始化原型图表
function initPrototypeChart() {
    const canvas = document.getElementById('prototype-heart-rate-chart');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    
    // 模拟数据
    const labels = ['3/2', '3/3', '3/4', '3/5'];
    const data = [95, 68, 85, 72];
    
    // 设置背景
    ctx.fillStyle = '#1e1e1e';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // 绘制Y轴
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.1)';
    ctx.beginPath();
    ctx.moveTo(40, 20);
    ctx.lineTo(40, 180);
    ctx.stroke();
    
    // 绘制X轴
    ctx.beginPath();
    ctx.moveTo(40, 180);
    ctx.lineTo(280, 180);
    ctx.stroke();
    
    // 绘制Y轴刻度
    ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
    ctx.font = '10px Arial';
    ctx.textAlign = 'right';
    for (let i = 0; i <= 4; i++) {
        const y = 20 + (160 / 4) * i;
        const value = 100 - (40 / 4) * i;
        ctx.fillText(Math.round(value), 35, y + 3);
        
        // 绘制网格线
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.1)';
        ctx.beginPath();
        ctx.moveTo(40, y);
        ctx.lineTo(280, y);
        ctx.stroke();
    }
    
    // 绘制X轴标签
    ctx.textAlign = 'center';
    const step = 240 / (labels.length - 1);
    for (let i = 0; i < labels.length; i++) {
        const x = 40 + step * i;
        ctx.fillText(labels[i], x, 195);
    }
    
    // 绘制数据线
    ctx.strokeStyle = 'rgba(255, 64, 129, 1)';
    ctx.lineWidth = 2;
    ctx.beginPath();
    for (let i = 0; i < data.length; i++) {
        const x = 40 + (240 / (data.length - 1)) * i;
        const y = 180 - ((data[i] - 60) / 40) * 160;
        if (i === 0) {
            ctx.moveTo(x, y);
        } else {
            ctx.lineTo(x, y);
        }
    }
    ctx.stroke();
    
    // 绘制数据点
    ctx.fillStyle = 'rgba(255, 64, 129, 1)';
    for (let i = 0; i < data.length; i++) {
        const x = 40 + (240 / (data.length - 1)) * i;
        const y = 180 - ((data[i] - 60) / 40) * 160;
        ctx.beginPath();
        ctx.arc(x, y, 4, 0, Math.PI * 2);
        ctx.fill();
        
        // 绘制白色边框
        ctx.strokeStyle = '#fff';
        ctx.lineWidth = 1;
        ctx.stroke();
    }
}
