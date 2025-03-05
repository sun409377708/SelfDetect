// 心率测试页面脚本
let testInProgress = false;
let testProgress = 0;
let testInterval = null;
let currentStep = 1;
let finalHeartRate = 0;

// 开始心率测试
function startHeartRateTest() {
    if (testInProgress) return;
    
    testInProgress = true;
    testProgress = 0;
    currentStep = 1;
    
    // 获取元素
    const heartIcon = document.querySelector('.heart-icon');
    const progressCircle = document.querySelector('.progress-ring .progress');
    const testStepElement = document.querySelector('.test-step');
    const healthTipElement = document.querySelector('.health-tip');
    const startBtn = document.querySelector('.btn');
    
    // 更新按钮文本
    startBtn.textContent = '测试中…';
    startBtn.disabled = true;
    
    // 添加心脏跳动动画
    heartIcon.classList.add('beating');
    
    // 进度条动画
    const circumference = 2 * Math.PI * 45;
    
    // 步骤提示
    const steps = [
        { text: '第1步 准备', tip: '请将手指轻轻放在手机摄像头上进行测量，保持测量期间手指稳定。' },
        { text: '第2步 测量中', tip: '正在测量您的心率，请保持手指稳定并保持安静。' },
        { text: '第3步 分析中', tip: '正在分析您的心率数据，请稍等…。' },
        { text: '第4步 完成', tip: '测量完成，正在生成报告。' }
    ];
    
    // 更新步骤
    function updateStep(step) {
        currentStep = step;
        testStepElement.textContent = steps[step - 1].text;
        healthTipElement.textContent = steps[step - 1].tip;
        
        // 添加动画
        testStepElement.classList.add('fade-in');
        healthTipElement.classList.add('fade-in');
        
        // 移除动画类名
        setTimeout(() => {
            testStepElement.classList.remove('fade-in');
            healthTipElement.classList.remove('fade-in');
        }, 500);
    }
    
    // 更新进度
    function updateProgress() {
        testProgress += 1;
        const progress = testProgress / 100;
        const offset = circumference - progress * circumference;
        progressCircle.style.strokeDashoffset = offset;
        
        // 更新步骤
        if (testProgress === 10) updateStep(2);
        if (testProgress === 70) updateStep(3);
        if (testProgress === 90) updateStep(4);
        
        // 测试完成
        if (testProgress >= 100) {
            clearInterval(testInterval);
            testInProgress = false;
            
            // 生成随机心率
            finalHeartRate = generateRandomHeartRate();
            
            // 延迟一秒后显示结果页面
            setTimeout(() => {
                showResultPage(finalHeartRate);
            }, 1000);
        }
    }
    
    // 设置定时器更新进度
    testInterval = setInterval(updateProgress, 100); // 10秒完成
    
    // 初始化第一步
    updateStep(1);
}
