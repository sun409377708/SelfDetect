// 导航条联系脚本

// 当前测试类型（心率测试或视力测试）
let currentTestType = 'heart-rate';

// 初始化导航条
function initNavigation() {
    // 创建导航条
    const navBar = document.createElement('div');
    navBar.className = 'nav-bar';
    
    const navContainer = document.createElement('div');
    navContainer.className = 'nav-container';
    
    // 心率测试选项
    const heartRateNav = document.createElement('a');
    heartRateNav.className = 'nav-item active';
    heartRateNav.id = 'heart-rate-nav';
    heartRateNav.href = 'javascript:void(0);';
    heartRateNav.textContent = '心率测试';
    heartRateNav.addEventListener('click', () => switchTestType('heart-rate'));
    
    // 视力测试选项
    const visionNav = document.createElement('a');
    visionNav.className = 'nav-item';
    visionNav.id = 'vision-nav';
    visionNav.href = 'javascript:void(0);';
    visionNav.textContent = '视力测试';
    visionNav.addEventListener('click', () => switchTestType('vision'));
    
    navContainer.appendChild(heartRateNav);
    navContainer.appendChild(visionNav);
    navBar.appendChild(navContainer);
    
    // 添加到文档中
    document.body.insertBefore(navBar, document.body.firstChild);
}

// 切换测试类型
function switchTestType(testType) {
    // 更新当前测试类型
    currentTestType = testType;
    
    // 更新导航选项的活动状态
    document.getElementById('heart-rate-nav').classList.toggle('active', testType === 'heart-rate');
    document.getElementById('vision-nav').classList.toggle('active', testType === 'vision');
    
    // 切换显示内容
    if (testType === 'heart-rate') {
        document.querySelector('.heart-rate-container').style.display = 'block';
        document.querySelector('.vision-container').style.display = 'none';
    } else if (testType === 'vision') {
        document.querySelector('.heart-rate-container').style.display = 'none';
        document.querySelector('.vision-container').style.display = 'block';
        
        // 直接显示所有视力测试页面，不显示选择页面
        const visionTestSelection = document.getElementById('vision-test-selection');
        if (visionTestSelection) {
            visionTestSelection.style.display = 'none';
        }
        
        // 显示所有视力测试页面
        const testPages = document.querySelectorAll('.vision-test-page');
        testPages.forEach(page => {
            page.style.display = 'block';
        });
    }
}

// 视力测试选项页面
function initVisionTestSelection() {
    // 获取视力测试选项页面
    const visionTestSelection = document.getElementById('vision-test-selection');
    if (!visionTestSelection) return;
    
    // 获取返回主页面按钮
    const backToMainButton = document.getElementById('vision-back-to-main');
    if (backToMainButton) {
        backToMainButton.addEventListener('click', function() {
            // 隐藏视力测试选项页面
            visionTestSelection.style.display = 'none';
            
            // 显示心率测试页面
            const heartRateContainer = document.querySelector('.heart-rate-container');
            if (heartRateContainer) {
                heartRateContainer.style.display = 'block';
            }
            
            // 隐藏视力测试容器
            const visionContainer = document.querySelector('.vision-container');
            if (visionContainer) {
                visionContainer.style.display = 'none';
            }
        });
    }
    
    // 获取所有测试选项
    const testOptions = visionTestSelection.querySelectorAll('.vision-test-option');
    
    // 为每个测试选项添加点击事件
    testOptions.forEach(option => {
        option.addEventListener('click', function() {
            // 获取测试类型
            const testType = this.getAttribute('data-test');
            
            // 隐藏视力测试选项页面
            visionTestSelection.style.display = 'none';
            
            // 显示对应的测试页面
            switch (testType) {
                case 'e-test':
                    // 显示E视力测试页面
                    const eTestPage = document.querySelector('#vision-e-screen .vision-test-page');
                    if (eTestPage) eTestPage.style.display = 'block';
                    break;
                case 'color-blind-test':
                    // 显示色盲测试页面
                    const colorBlindPage = document.querySelector('#color-blind-screen .vision-test-page');
                    if (colorBlindPage) colorBlindPage.style.display = 'block';
                    break;
                case 'astigmatism-test':
                    // 显示散光测试页面
                    const astigmatismPage = document.querySelector('#astigmatism-screen .vision-test-page');
                    if (astigmatismPage) astigmatismPage.style.display = 'block';
                    break;
                case 'color-sensitivity-test':
                    // 显示色敏感测试页面
                    const colorSensitivityPage = document.querySelector('#color-sensitivity-screen .vision-test-page');
                    if (colorSensitivityPage) colorSensitivityPage.style.display = 'block';
                    break;
            }
        });
    });
}

// 初始化所有测试页面
function initAllTests() {
    // 视力测试初始化已经移到vision.js中
    // 初始化视力测试选项页面，但不会显示
    initVisionTestSelection();
}

// 在页面加载完成后初始化导航条和所有测试
document.addEventListener('DOMContentLoaded', function() {
    initNavigation();
    initAllTests();
});
