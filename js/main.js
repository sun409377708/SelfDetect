// 主脚本
let currentPage = null;
let heartRateHistory = [];

// 页面切换函数
function showPage(pageId) {
    // 隐藏当前页面
    if (currentPage) {
        document.getElementById(currentPage).classList.remove('active');
        document.getElementById(currentPage).classList.add('inactive');
    }
    
    // 显示新页面
    const newPage = document.getElementById(pageId);
    newPage.classList.remove('inactive');
    newPage.classList.add('active');
    currentPage = pageId;
}

// 显示心率测试页面
function showTestPage() {
    // 如果页面已经存在，直接显示
    if (document.getElementById('test-page')) {
        showPage('test-page');
        return;
    }
    
    // 创建页面
    const app = document.getElementById('app');
    const testPage = document.createElement('div');
    testPage.id = 'test-page';
    testPage.className = 'page test-page';
    
    // 状态栏
    const statusBar = createStatusBar();
    testPage.appendChild(statusBar);
    
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
    circleProgress.style.strokeDashoffset = circumference;
    
    progressRing.appendChild(circleBg);
    progressRing.appendChild(circleProgress);
    heartMonitor.appendChild(progressRing);
    
    // 内圈
    const innerCircle = document.createElement('div');
    innerCircle.className = 'inner-circle';
    heartMonitor.appendChild(innerCircle);
    
    // 心脏图标
    const heartIcon = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    heartIcon.className = 'heart-icon';
    heartIcon.setAttribute('viewBox', '0 0 24 24');
    heartIcon.innerHTML = '<path fill="currentColor" d="M12,21.35L10.55,20.03C5.4,15.36 2,12.27 2,8.5C2,5.41 4.42,3 7.5,3C9.24,3 10.91,3.81 12,5.08C13.09,3.81 14.76,3 16.5,3C19.58,3 22,5.41 22,8.5C22,12.27 18.6,15.36 13.45,20.03L12,21.35Z"/>';
    innerCircle.appendChild(heartIcon);
    
    // 心电图波形
    const ecgWave = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    ecgWave.className = 'ecg-wave';
    ecgWave.setAttribute('viewBox', '0 0 300 100');
    ecgWave.innerHTML = '<path class="ecg-line" d="M0,50 L30,50 L45,20 L60,80 L75,30 L90,70 L105,50 L120,50 L150,50 L165,20 L180,80 L195,30 L210,70 L225,50 L240,50 L270,50 L285,20 L300,80"/>';
    innerCircle.appendChild(ecgWave);
    
    testPage.appendChild(heartMonitor);
    
    // 测试步骤提示
    const testStep = document.createElement('div');
    testStep.className = 'test-step';
    testStep.textContent = '第1步 准备';
    testPage.appendChild(testStep);
    
    // 健康建议文字
    const healthTip = document.createElement('div');
    healthTip.className = 'health-tip';
    healthTip.textContent = '请将手指轻轻放在手机摄像头上进行测量，保持测量期间手指稳定。';
    testPage.appendChild(healthTip);
    
    // 开始测试按钮
    const startBtn = document.createElement('button');
    startBtn.className = 'btn';
    startBtn.textContent = '开始测试';
    startBtn.addEventListener('click', startHeartRateTest);
    testPage.appendChild(startBtn);
    
    app.appendChild(testPage);
    showPage('test-page');
}

// 创建状态栏
function createStatusBar() {
    const statusBar = document.createElement('div');
    statusBar.className = 'status-bar';
    
    // 时间
    const timeElement = document.createElement('div');
    timeElement.className = 'status-time';
    updateTime(timeElement);
    setInterval(() => updateTime(timeElement), 60000); // 每分钟更新一次
    
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

// 更新时间
function updateTime(element) {
    const now = new Date();
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    element.textContent = `${hours}:${minutes}`;
}

// 生成随机心率
function generateRandomHeartRate() {
    // 生成一个60-100之间的随机心率
    return Math.floor(Math.random() * 41) + 60;
}

// 生成健康状态
function getHealthStatus(heartRate) {
    if (heartRate < 60) return { text: '心率偏低', class: 'status-low' };
    if (heartRate <= 80) return { text: '正常', class: 'status-normal' };
    if (heartRate <= 100) return { text: '偏高', class: 'status-high' };
    return { text: '过高', class: 'status-very-high' };
}

// 生成健康建议
function getHealthAdvice(heartRate) {
    if (heartRate < 60) return '心率偏低，建议适当运动提高心率。';
    if (heartRate <= 80) return '心率正常，请继续保持良好的生活习惯。';
    if (heartRate <= 100) return '心率偏高，建议适当休息，避免剧烈运动。';
    return '心率过高，请立即休息，如持续过高请就医。';
}

// 保存心率测试记录
function saveHeartRateRecord(heartRate, status) {
    const now = new Date();
    const record = {
        id: Date.now(),
        heartRate: heartRate,
        status: status.text,
        statusClass: status.class,
        date: now.toISOString(),
        formattedDate: `${now.getFullYear()}-${(now.getMonth() + 1).toString().padStart(2, '0')}-${now.getDate().toString().padStart(2, '0')} ${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`,
        advice: getHealthAdvice(heartRate)
    };
    
    heartRateHistory.unshift(record); // 添加到历史记录开头
    
    // 将数据保存到本地存储
    localStorage.setItem('heartRateHistory', JSON.stringify(heartRateHistory));
    
    return record;
}

// 加载历史记录
function loadHeartRateHistory() {
    const savedHistory = localStorage.getItem('heartRateHistory');
    if (savedHistory) {
        heartRateHistory = JSON.parse(savedHistory);
    }
}

// 初始化
document.addEventListener('DOMContentLoaded', function() {
    loadHeartRateHistory();
});
