// 心率结果页面脚本

// 显示心率结果页面
function showResultPage(heartRate) {
    // 如果页面已经存在，更新数据并显示
    if (document.getElementById('result-page')) {
        updateResultPage(heartRate);
        showPage('result-page');
        return;
    }
    
    // 创建页面
    const app = document.getElementById('app');
    const resultPage = document.createElement('div');
    resultPage.id = 'result-page';
    resultPage.className = 'page result-page';
    
    // 状态栏
    const statusBar = createStatusBar();
    resultPage.appendChild(statusBar);
    
    // 返回按钮
    const backBtn = document.createElement('button');
    backBtn.className = 'back-btn';
    backBtn.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 12H5M12 19l-7-7 7-7"/></svg> 返回测试';
    backBtn.addEventListener('click', () => showTestPage());
    resultPage.appendChild(backBtn);
    
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
    resultPage.appendChild(heartContainer);
    
    // 心率数字显示
    const heartRateDisplay = document.createElement('div');
    heartRateDisplay.className = 'heart-rate-display';
    
    const heartRateValue = document.createElement('div');
    heartRateValue.className = 'heart-rate-value';
    heartRateValue.innerHTML = `<span id="heart-rate-number" class="animated-number">${heartRate}</span><span class="heart-rate-unit">bpm</span>`;
    heartRateDisplay.appendChild(heartRateValue);
    
    // 健康状态
    const healthStatus = document.createElement('div');
    healthStatus.id = 'health-status';
    healthStatus.className = 'health-status';
    const status = getHealthStatus(heartRate);
    healthStatus.textContent = status.text;
    healthStatus.classList.add(status.class);
    heartRateDisplay.appendChild(healthStatus);
    
    resultPage.appendChild(heartRateDisplay);
    
    // 健康建议
    const healthAdvice = document.createElement('div');
    healthAdvice.id = 'health-advice';
    healthAdvice.className = 'health-advice';
    healthAdvice.textContent = getHealthAdvice(heartRate);
    resultPage.appendChild(healthAdvice);
    
    // 历史记录链接
    const historyLink = document.createElement('a');
    historyLink.className = 'history-link';
    historyLink.href = 'javascript:void(0);';
    historyLink.innerHTML = '查看历史记录 <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>';
    historyLink.addEventListener('click', () => {
        showHistoryPage();
    });
    resultPage.appendChild(historyLink);
    
    // 再次测试按钮
    const retestBtn = document.createElement('button');
    retestBtn.className = 'btn';
    retestBtn.textContent = '再次测试';
    retestBtn.addEventListener('click', () => {
        showTestPage();
        setTimeout(() => {
            startHeartRateTest();
        }, 500);
    });
    resultPage.appendChild(retestBtn);
    
    app.appendChild(resultPage);
    
    // 保存记录
    saveHeartRateRecord(heartRate, status);
    
    showPage('result-page');
    animateHeartRateNumber(heartRate);
}

// 更新结果页面
function updateResultPage(heartRate) {
    const heartRateNumber = document.getElementById('heart-rate-number');
    const healthStatus = document.getElementById('health-status');
    const healthAdvice = document.getElementById('health-advice');
    
    // 更新心率数字
    heartRateNumber.textContent = heartRate;
    heartRateNumber.classList.add('animated-number');
    setTimeout(() => {
        heartRateNumber.classList.remove('animated-number');
    }, 500);
    
    // 更新健康状态
    const status = getHealthStatus(heartRate);
    healthStatus.textContent = status.text;
    healthStatus.className = 'health-status';
    healthStatus.classList.add(status.class);
    
    // 更新健康建议
    healthAdvice.textContent = getHealthAdvice(heartRate);
    
    // 保存记录
    saveHeartRateRecord(heartRate, status);
}

// 心率数字动画效果
function animateHeartRateNumber(targetValue) {
    const heartRateNumber = document.getElementById('heart-rate-number');
    let startValue = 0;
    const duration = 1500; // 1.5秒
    const startTime = performance.now();
    
    function updateNumber(currentTime) {
        const elapsedTime = currentTime - startTime;
        const progress = Math.min(elapsedTime / duration, 1);
        
        // 使用缓动函数使动画更自然
        const easedProgress = easeOutQuart(progress);
        
        const currentValue = Math.floor(startValue + easedProgress * (targetValue - startValue));
        heartRateNumber.textContent = currentValue;
        
        if (progress < 1) {
            requestAnimationFrame(updateNumber);
        } else {
            heartRateNumber.textContent = targetValue;
        }
    }
    
    requestAnimationFrame(updateNumber);
}

// 缓动函数
function easeOutQuart(x) {
    return 1 - Math.pow(1 - x, 4);
}
