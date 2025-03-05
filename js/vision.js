// 视力测试相关脚本

// 页面加载完成后初始化视力测试页面
document.addEventListener('DOMContentLoaded', function() {
    // 初始化视力测试（E字）页面
    initETest();
    
    // 初始化色盲测试页面
    initColorBlindTest();
    
    // 初始化散光测试页面
    initAstigmatismTest();
    
    // 初始化颜色敏感度测试页面
    initColorSensitivityTest();
});

// 初始化视力测试（E字）页面
function initETest() {
    const screenElement = document.getElementById('vision-e-screen');
    if (!screenElement) return;
    
    // 创建视力测试页面容器
    const visionTestPage = document.createElement('div');
    visionTestPage.className = 'vision-test-page';
    
    // 添加页面内容
    visionTestPage.innerHTML = `
        <div class="vision-test-header">
            <button class="back-btn">返回</button>
            <h2 class="vision-test-title">视力测试</h2>
        </div>
        <div class="vision-test-content" id="vision-e-content">
            <div class="e-test-letter" style="font-size: 100px;">E</div>
            <div class="e-test-controls-container">
                <button class="vision-test-button" id="start-e-test">开始测试</button>
                <div class="e-test-controls" style="display: none;">
                    <button class="e-test-control-btn" data-direction="up">上</button>
                    <button class="e-test-control-btn" data-direction="right">右</button>
                    <button class="e-test-control-btn" data-direction="down">下</button>
                    <button class="e-test-control-btn" data-direction="left">左</button>
                </div>
            </div>
            <div class="vision-test-result" style="display: none;">
                <div class="vision-test-result-title">测试结果</div>
                <div class="vision-test-result-score">视力分数：<span id="vision-score">5.0</span></div>
                <div class="vision-test-result-advice">您的视力正常，建议继续保持良好的视力习惯。</div>
            </div>
        </div>
    `;
    
    // 添加到页面中
    screenElement.appendChild(visionTestPage);
    
    // 获取元素
    const startButton = visionTestPage.querySelector('#start-e-test');
    const eTestLetter = visionTestPage.querySelector('.e-test-letter');
    const controlsDiv = visionTestPage.querySelector('.e-test-controls');
    const resultDiv = visionTestPage.querySelector('.vision-test-result');
    const visionScoreSpan = visionTestPage.querySelector('#vision-score');
    const controlButtons = visionTestPage.querySelectorAll('.e-test-control-btn');
    const backButton = visionTestPage.querySelector('.back-btn');
    
    // 测试数据
    let currentLevel = 0;
    let correctAnswers = 0;
    let totalQuestions = 0;
    const maxLevels = 8;
    const directions = ['up', 'right', 'down', 'left'];
    const fontSizes = [100, 80, 60, 40, 30, 20, 15, 10];
    let currentDirection = '';
    
    // 开始测试
    startButton.addEventListener('click', function() {
        startButton.style.display = 'none';
        controlsDiv.style.display = 'grid';
        resultDiv.style.display = 'none';
        
        // 重置数据
        currentLevel = 0;
        correctAnswers = 0;
        totalQuestions = 0;
        
        // 开始下一关
        startNextLevel();
    });
    
    // 开始下一关
    function startNextLevel() {
        if (currentLevel >= maxLevels) {
            // 测试结束
            endTest();
            return;
        }
        
        // 设置字体大小
        eTestLetter.style.fontSize = fontSizes[currentLevel] + 'px';
        
        // 随机选择方向
        const randomIndex = Math.floor(Math.random() * directions.length);
        currentDirection = directions[randomIndex];
        
        // 旋转E字
        rotateELetter(currentDirection);
        
        totalQuestions++;
    }
    
    // 旋转E字
    function rotateELetter(direction) {
        let rotation = 0;
        
        switch(direction) {
            case 'up':
                rotation = 0;
                break;
            case 'right':
                rotation = 90;
                break;
            case 'down':
                rotation = 180;
                break;
            case 'left':
                rotation = 270;
                break;
        }
        
        eTestLetter.style.transform = `rotate(${rotation}deg)`;
        eTestLetter.style.transition = 'transform 0.5s ease';
    }
    
    // 方向按钮点击事件
    controlButtons.forEach(button => {
        button.addEventListener('click', function() {
            const selectedDirection = this.getAttribute('data-direction');
            
            if (selectedDirection === currentDirection) {
                correctAnswers++;
            }
            
            currentLevel++;
            startNextLevel();
        });
    });
    
    // 测试结束
    function endTest() {
        controlsDiv.style.display = 'none';
        resultDiv.style.display = 'block';
        startButton.style.display = 'block';
        startButton.textContent = '重新测试';
        
        // 计算分数
        const accuracy = correctAnswers / totalQuestions;
        let visionScore = 4.0 + (accuracy * 1.0);
        visionScore = Math.round(visionScore * 10) / 10;
        
        // 显示分数
        visionScoreSpan.textContent = visionScore.toFixed(1);
        
        // 更新建议
        const adviceElement = resultDiv.querySelector('.vision-test-result-advice');
        if (visionScore >= 4.8) {
            adviceElement.textContent = '您的视力正常，建议继续保持良好的视力习惯。';
        } else if (visionScore >= 4.0) {
            adviceElement.textContent = '您的视力较好，建议继续保持良好的视力习惯。';
        } else {
            adviceElement.textContent = '您的视力较差，建议进行视力训练或咨询医生。';
        }
        
        // 重置字体大小和方向
        eTestLetter.style.fontSize = '100px';
        eTestLetter.style.transform = 'rotate(0deg)';
    }
}

// 初始化色盲测试页面
function initColorBlindTest() {
    const screenElement = document.getElementById('color-blind-screen');
    if (!screenElement) return;
    
    // 创建色盲测试页面容器
    const colorBlindTestPage = document.createElement('div');
    colorBlindTestPage.className = 'vision-test-page';
    
    // 添加页面内容
    colorBlindTestPage.innerHTML = `
        <div class="vision-test-header">
            <button class="back-btn">返回</button>
            <h2 class="vision-test-title">色盲测试</h2>
        </div>
        <div class="vision-test-content" id="color-blind-content">
            <div class="color-blind-image" id="color-blind-image"></div>
            <div class="color-blind-question">您在图片中看到的是什么数字？</div>
            <button class="vision-test-button" id="start-color-blind-test">开始测试</button>
            <div class="color-blind-options" style="display: none;">
                <button class="color-blind-option-btn" data-value="1">1</button>
                <button class="color-blind-option-btn" data-value="2">2</button>
                <button class="color-blind-option-btn" data-value="3">3</button>
                <button class="color-blind-option-btn" data-value="4">4</button>
                <button class="color-blind-option-btn" data-value="5">5</button>
                <button class="color-blind-option-btn" data-value="6">6</button>
                <button class="color-blind-option-btn" data-value="7">7</button>
                <button class="color-blind-option-btn" data-value="8">8</button>
                <button class="color-blind-option-btn" data-value="9">9</button>
                <button class="color-blind-option-btn" data-value="0">没有数字</button>
            </div>
            <div class="vision-test-result" style="display: none;">
                <div class="vision-test-result-title">测试结果</div>
                <div class="vision-test-result-score">正确率：<span id="color-blind-score">0%</span></div>
                <div class="vision-test-result-advice">您的色盲情况正常，建议继续保持良好的视力习惯。</div>
            </div>
        </div>
    `;
    
    // 添加到页面中
    screenElement.appendChild(colorBlindTestPage);
    
    // 获取元素
    const startButton = colorBlindTestPage.querySelector('#start-color-blind-test');
    const colorBlindImage = colorBlindTestPage.querySelector('#color-blind-image');
    const optionsDiv = colorBlindTestPage.querySelector('.color-blind-options');
    const resultDiv = colorBlindTestPage.querySelector('.vision-test-result');
    const scoreSpan = colorBlindTestPage.querySelector('#color-blind-score');
    const optionButtons = colorBlindTestPage.querySelectorAll('.color-blind-option-btn');
    const backButton = colorBlindTestPage.querySelector('.back-btn');
    const questionDiv = colorBlindTestPage.querySelector('.color-blind-question');
    
    // 测试数据
    let currentTest = 0;
    let correctAnswers = 0;
    let totalTests = 0;
    const maxTests = 8; // 增加测试数量
    
    // 测试图片数组 - 使用本地图片
    const testImages = [
        { url: 'images/cb12.gif', answer: '12' },
        { url: 'images/cb8.gif', answer: '8' },
        { url: 'images/cb6.gif', answer: '6' },
        { url: 'images/cb29.gif', answer: '29' },
        { url: 'images/cb5.gif', answer: '5' },
        { url: 'images/cb3.gif', answer: '3' },
        { url: 'images/cb15.gif', answer: '15' },
        { url: 'images/cb42.gif', answer: '42' }
    ];
    
    // 当前答案
    let currentAnswer = '';
    
    // 默认显示第一张图片
    colorBlindImage.style.backgroundImage = `url(${testImages[0].url})`;
    
    // 开始测试
    startButton.addEventListener('click', function() {
        startButton.style.display = 'none';
        optionsDiv.style.display = 'flex';
        resultDiv.style.display = 'none';
        
        // 重置数据
        currentTest = 0;
        correctAnswers = 0;
        totalTests = 0;
        
        // 开始下一关
        startNextTest();
    });
    
    // 开始下一关
    function startNextTest() {
        if (currentTest >= maxTests) {
            // 测试结束
            endTest();
            return;
        }
        
        // 设置图片
        const test = testImages[currentTest];
        colorBlindImage.style.backgroundImage = `url(${test.url})`;
        currentAnswer = test.answer;
        
        // 更新问题
        if (test.answer.length === 1) {
            questionDiv.textContent = '您在图片中看到的是什么数字？';
        } else {
            questionDiv.textContent = '您在图片中看到的是什么数字？（输入两位数字）';
        }
        
        totalTests++;
    }
    
    // 选项按钮点击事件
    optionButtons.forEach(button => {
        button.addEventListener('click', function() {
            const selectedValue = this.getAttribute('data-value');
            
            // 检查答案
            if (currentAnswer.startsWith(selectedValue) || (selectedValue === '0' && currentAnswer === '')) {
                correctAnswers++;
            }
            
            currentTest++;
            startNextTest();
        });
    });
    
    // 测试结束
    function endTest() {
        optionsDiv.style.display = 'none';
        resultDiv.style.display = 'block';
        startButton.style.display = 'block';
        startButton.textContent = '重新测试';
        
        // 显示默认图片
        colorBlindImage.style.backgroundImage = `url(${testImages[0].url})`;
        
        // 计算正确率
        const accuracy = (correctAnswers / totalTests) * 100;
        
        // 显示正确率
        scoreSpan.textContent = Math.round(accuracy) + '%';
        
        // 更新建议
        const adviceElement = resultDiv.querySelector('.vision-test-result-advice');
        if (accuracy >= 80) {
            adviceElement.textContent = '您的色盲情况正常，建议继续保持良好的视力习惯。';
        } else if (accuracy >= 60) {
            adviceElement.textContent = '您的色盲情况较好，建议继续保持良好的视力习惯。';
        } else {
            adviceElement.textContent = '您的色盲情况较差，建议进行色盲训练或咨询医生。';
        }
    }
}

// 初始化散光测试页面
function initAstigmatismTest() {
    const screenElement = document.getElementById('astigmatism-screen');
    if (!screenElement) return;
    
    // 创建散光测试页面容器
    const astigmatismTestPage = document.createElement('div');
    astigmatismTestPage.className = 'vision-test-page';
    
    // 添加页面内容
    astigmatismTestPage.innerHTML = `
        <div class="vision-test-header">
            <button class="back-btn">返回</button>
            <h2 class="vision-test-title">散光测试</h2>
        </div>
        <div class="vision-test-content" id="astigmatism-content">
            <div class="astigmatism-image" id="astigmatism-image"></div>
            <div class="astigmatism-question">请选择您看到的最清晰的方向</div>
            <button class="vision-test-button" id="start-astigmatism-test">开始测试</button>
            <div class="astigmatism-options" style="display: none;">
                <button class="astigmatism-option-btn" data-direction="horizontal">水平方向</button>
                <button class="astigmatism-option-btn" data-direction="vertical">垂直方向</button>
                <button class="astigmatism-option-btn" data-direction="diagonal-right">右对角方向</button>
                <button class="astigmatism-option-btn" data-direction="diagonal-left">左对角方向</button>
                <button class="astigmatism-option-btn" data-direction="all">所有方向</button>
            </div>
            <div class="vision-test-result" style="display: none;">
                <div class="vision-test-result-title">测试结果</div>
                <div class="vision-test-result-score">散光情况：<span id="astigmatism-result">正常</span></div>
                <div class="vision-test-result-advice">您的视力正常，建议继续保持良好的视力习惯。</div>
            </div>
        </div>
    `;
    
    // 添加到页面中
    screenElement.appendChild(astigmatismTestPage);
    
    // 获取元素
    const startButton = astigmatismTestPage.querySelector('#start-astigmatism-test');
    const astigmatismImage = astigmatismTestPage.querySelector('#astigmatism-image');
    const optionsDiv = astigmatismTestPage.querySelector('.astigmatism-options');
    const resultDiv = astigmatismTestPage.querySelector('.vision-test-result');
    const resultSpan = astigmatismTestPage.querySelector('#astigmatism-result');
    const optionButtons = astigmatismTestPage.querySelectorAll('.astigmatism-option-btn');
    const backButton = astigmatismTestPage.querySelector('.back-btn');
    
    // 测试数据
    let currentTest = 0;
    let selectedDirections = [];
    const maxTests = 3;
    
    // 测试图片数组
    const testImages = [
        { url: './images/sanguang.jpeg', type: 'radial' },
        { url: 'https://via.placeholder.com/250x250?text=Astigmatism+Test+2', type: 'grid' },
        { url: 'https://via.placeholder.com/250x250?text=Astigmatism+Test+3', type: 'starburst' }
    ];
    
    // 默认加载散光测试图片
    loadDefaultImage();
    
    // 加载默认图片
    function loadDefaultImage() {
        astigmatismImage.style.backgroundImage = `url('./images/sanguang.jpeg')`;
        astigmatismImage.style.backgroundSize = 'contain';
        astigmatismImage.style.backgroundRepeat = 'no-repeat';
        astigmatismImage.style.backgroundPosition = 'center';
    }
    
    // 开始测试
    startButton.addEventListener('click', function() {
        startButton.style.display = 'none';
        optionsDiv.style.display = 'flex';
        resultDiv.style.display = 'none';
        
        // 重置数据
        currentTest = 0;
        selectedDirections = [];
        
        // 开始下一关
        startNextTest();
    });
    
    // 开始下一关
    function startNextTest() {
        if (currentTest >= maxTests) {
            // 测试结束
            endTest();
            return;
        }
        
        // 设置图片
        const test = testImages[currentTest];
        astigmatismImage.style.backgroundImage = `url(${test.url})`;
        astigmatismImage.style.backgroundSize = 'contain';
        astigmatismImage.style.backgroundRepeat = 'no-repeat';
        astigmatismImage.style.backgroundPosition = 'center';
        
        currentTest++;
    }
    
    // 选项按钮点击事件
    optionButtons.forEach(button => {
        button.addEventListener('click', function() {
            const selectedDirection = this.getAttribute('data-direction');
            selectedDirections.push(selectedDirection);
            
            startNextTest();
        });
    });
    
    // 测试结束
    function endTest() {
        optionsDiv.style.display = 'none';
        resultDiv.style.display = 'block';
        startButton.style.display = 'block';
        startButton.textContent = '重新测试';
        
        // 显示默认图片
        loadDefaultImage();
        
        // 分析测试结果
        let hasAstigmatism = false;
        let astigmatismDirection = '';
        
        // 检查是否有散光
        if (selectedDirections.includes('all')) {
            hasAstigmatism = false;
        } else {
            // 检查是否有一个方向被选择
            const directionCounts = {};
            selectedDirections.forEach(dir => {
                directionCounts[dir] = (directionCounts[dir] || 0) + 1;
            });
            
            // 找到最多被选择的方向
            let maxCount = 0;
            for (const dir in directionCounts) {
                if (directionCounts[dir] > maxCount) {
                    maxCount = directionCounts[dir];
                    astigmatismDirection = dir;
                }
            }
            
            // 如果一个方向被选择两次以上，则认为有散光
            if (maxCount >= 2) {
                hasAstigmatism = true;
            }
        }
        
        // 显示测试结果
        if (hasAstigmatism) {
            let directionText = '';
            switch(astigmatismDirection) {
                case 'horizontal':
                    directionText = '水平方向';
                    break;
                case 'vertical':
                    directionText = '垂直方向';
                    break;
                case 'diagonal-right':
                    directionText = '右对角方向';
                    break;
                case 'diagonal-left':
                    directionText = '左对角方向';
                    break;
            }
            
            resultSpan.textContent = `您可能有${directionText}散光`;
            const adviceElement = resultDiv.querySelector('.vision-test-result-advice');
            adviceElement.textContent = `您的视力可能受到${directionText}散光的影响，建议进行散光训练或咨询医生。`;
        } else {
            resultSpan.textContent = '正常';
            const adviceElement = resultDiv.querySelector('.vision-test-result-advice');
            adviceElement.textContent = '您的视力正常，建议继续保持良好的视力习惯。';
        }
    }
}

// 初始化颜色敏感度测试页面
function initColorSensitivityTest() {
    const screenElement = document.getElementById('color-sensitivity-screen');
    if (!screenElement) return;
    
    // 创建颜色敏感度测试页面容器
    const colorSensitivityTestPage = document.createElement('div');
    colorSensitivityTestPage.className = 'vision-test-page';
    
    // 添加页面内容
    colorSensitivityTestPage.innerHTML = `
        <div class="vision-test-header">
            <button class="back-btn">返回</button>
            <h2 class="vision-test-title">颜色敏感度测试</h2>
        </div>
        <div class="vision-test-content" id="color-sensitivity-content">
            <div class="color-sensitivity-container">
                <div class="color-sensitivity-description">本测试将评估您对颜色的敏感度。您将看到四个颜色方块，一个方块的颜色与其他三个方块的颜色略有不同。您需要选择与其他三个方块颜色不同的方块。</div>
                <div class="color-sensitivity-level">当前难度：<span id="difficulty-level">简单</span></div>
                <div class="color-sensitivity-boxes">
                    <div class="color-box" id="color-box-1"></div>
                    <div class="color-box" id="color-box-2"></div>
                    <div class="color-box" id="color-box-3"></div>
                    <div class="color-box" id="color-box-4"></div>
                </div>
                <div class="color-sensitivity-question">哪个颜色方块与其他三个方块的颜色不同？</div>
            </div>
            <button class="vision-test-button" id="start-color-sensitivity-test">开始测试</button>
            <div class="color-sensitivity-options" style="display: none;">
                <button class="color-sensitivity-option-btn" data-answer="1">1</button>
                <button class="color-sensitivity-option-btn" data-answer="2">2</button>
                <button class="color-sensitivity-option-btn" data-answer="3">3</button>
                <button class="color-sensitivity-option-btn" data-answer="4">4</button>
            </div>
            <div class="vision-test-result" style="display: none;">
                <div class="vision-test-result-title">测试结果</div>
                <div class="vision-test-result-score">颜色敏感度：<span id="color-sensitivity-score">0%</span></div>
                <div class="vision-test-result-level">您能区分的最小颜色差异：<span id="min-difference">0</span> 单位</div>
                <div class="vision-test-result-advice">您的颜色敏感度正常，建议继续保持良好的视力习惯。</div>
            </div>
        </div>
    `;
    
    // 添加到页面中
    screenElement.appendChild(colorSensitivityTestPage);
    
    // 获取元素
    const startButton = colorSensitivityTestPage.querySelector('#start-color-sensitivity-test');
    const colorBox1 = colorSensitivityTestPage.querySelector('#color-box-1');
    const colorBox2 = colorSensitivityTestPage.querySelector('#color-box-2');
    const colorBox3 = colorSensitivityTestPage.querySelector('#color-box-3');
    const colorBox4 = colorSensitivityTestPage.querySelector('#color-box-4');
    const optionsDiv = colorSensitivityTestPage.querySelector('.color-sensitivity-options');
    const resultDiv = colorSensitivityTestPage.querySelector('.vision-test-result');
    const scoreSpan = colorSensitivityTestPage.querySelector('#color-sensitivity-score');
    const minDifferenceSpan = colorSensitivityTestPage.querySelector('#min-difference');
    const optionButtons = colorSensitivityTestPage.querySelectorAll('.color-sensitivity-option-btn');
    const difficultyLevelSpan = colorSensitivityTestPage.querySelector('#difficulty-level');
    const questionDiv = colorSensitivityTestPage.querySelector('.color-sensitivity-question');
    
    // 测试数据
    let currentTest = 0;
    let correctAnswers = 0;
    let totalTests = 0;
    const maxTests = 10;
    
    // 当前答案
    let correctBoxIndex = 0;
    
    // 颜色敏感度难度等级
    const difficultyLevels = [
        { difference: 50, name: '简单' },
        { difference: 30, name: '简单' },
        { difference: 20, name: '中等' },
        { difference: 15, name: '中等' },
        { difference: 10, name: '困难' },
        { difference: 8, name: '困难' },
        { difference: 6, name: '非常困难' },
        { difference: 5, name: '非常困难' },
        { difference: 4, name: '极其困难' },
        { difference: 3, name: '极其困难' }
    ];
    
    // 生成随机颜色
    function generateRandomColor() {
        const r = Math.floor(Math.random() * 156) + 50; // 限制颜色值在50-205之间
        const g = Math.floor(Math.random() * 156) + 50;
        const b = Math.floor(Math.random() * 156) + 50;
        return { r, g, b };
    }
    
    // 生成不同颜色
    function generateDifferentColor(baseColor, difference) {
        // 随机选择一个颜色通道
        const channel = ['r', 'g', 'b'][Math.floor(Math.random() * 3)];
        const differentColor = { ...baseColor };
        
        // 改变颜色值
        const change = Math.random() > 0.5 ? difference : -difference;
        differentColor[channel] = Math.max(0, Math.min(255, differentColor[channel] + change));
        
        return differentColor;
    }
    
    // 显示默认颜色
    function showDefaultColors() {
        const baseColor = { r: 100, g: 150, b: 200 };
        colorBox1.style.backgroundColor = `rgb(${baseColor.r}, ${baseColor.g}, ${baseColor.b})`;
        colorBox2.style.backgroundColor = `rgb(${baseColor.r+50}, ${baseColor.g}, ${baseColor.b})`;
        colorBox3.style.backgroundColor = `rgb(${baseColor.r}, ${baseColor.g+50}, ${baseColor.b})`;
        colorBox4.style.backgroundColor = `rgb(${baseColor.r}, ${baseColor.g}, ${baseColor.b+50})`;
    }
    
    // 开始测试
    startButton.addEventListener('click', function() {
        startButton.style.display = 'none';
        optionsDiv.style.display = 'flex';
        resultDiv.style.display = 'none';
        
        // 重置数据
        currentTest = 0;
        correctAnswers = 0;
        totalTests = 0;
        
        // 开始下一关
        startNextTest();
    });
    
    // 开始下一关
    function startNextTest() {
        if (currentTest >= maxTests) {
            // 测试结束
            endTest();
            return;
        }
        
        // 获取当前难度
        const currentDifficulty = difficultyLevels[currentTest];
        difficultyLevelSpan.textContent = currentDifficulty.name;
        
        // 生成颜色
        const baseColor = generateRandomColor();
        
        // 随机选择一个颜色方块作为不同颜色
        correctBoxIndex = Math.floor(Math.random() * 4) + 1;
        
        // 设置颜色
        const boxes = [colorBox1, colorBox2, colorBox3, colorBox4];
        boxes.forEach((box, index) => {
            if (index + 1 === correctBoxIndex) {
                // 设置不同颜色
                const differentColor = generateDifferentColor(baseColor, currentDifficulty.difference);
                box.style.backgroundColor = `rgb(${differentColor.r}, ${differentColor.g}, ${differentColor.b})`;
            } else {
                // 设置相同颜色
                box.style.backgroundColor = `rgb(${baseColor.r}, ${baseColor.g}, ${baseColor.b})`;
            }
        });
        
        totalTests++;
    }
    
    // 选项按钮点击事件
    optionButtons.forEach(button => {
        button.addEventListener('click', function() {
            const selectedAnswer = parseInt(this.getAttribute('data-answer'));
            
            if (selectedAnswer === correctBoxIndex) {
                correctAnswers++;
            }
            
            currentTest++;
            startNextTest();
        });
    });
    
    // 测试结束
    function endTest() {
        optionsDiv.style.display = 'none';
        resultDiv.style.display = 'block';
        startButton.style.display = 'block';
        startButton.textContent = '重新测试';
        
        // 显示默认颜色
        showDefaultColors();
        
        // 计算正确率
        const accuracy = (correctAnswers / totalTests) * 100;
        
        // 计算最小颜色差异
        let minDifference = 50; // 默认最大值
        for (let i = 0; i < difficultyLevels.length; i++) {
            if (i < correctAnswers) {
                minDifference = difficultyLevels[i].difference;
            }
        }
        
        // 显示结果
        scoreSpan.textContent = Math.round(accuracy) + '%';
        minDifferenceSpan.textContent = minDifference;
        
        // 更新建议
        const adviceElement = resultDiv.querySelector('.vision-test-result-advice');
        if (accuracy >= 80) {
            adviceElement.textContent = '您的颜色敏感度正常，建议继续保持良好的视力习惯。';
        } else if (accuracy >= 60) {
            adviceElement.textContent = '您的颜色敏感度较好，建议继续保持良好的视力习惯。';
        } else if (accuracy >= 40) {
            adviceElement.textContent = '您的颜色敏感度一般，建议进行颜色敏感度训练。';
        } else {
            adviceElement.textContent = '您的颜色敏感度较差，建议进行颜色敏感度训练或咨询医生。';
        }
    }
    
    // 显示默认颜色
    showDefaultColors();
}

// 返回按钮点击事件
function setupBackButtons() {
    // 获取所有返回按钮
    const backButtons = document.querySelectorAll('.vision-test-page .back-btn');
    
    // 添加点击事件
    backButtons.forEach(button => {
        button.addEventListener('click', function() {
            // 隐藏所有测试页面
            const testPage = this.closest('.vision-test-page');
            if (testPage) {
                testPage.style.display = 'none';
            }
            
            // 显示视力测试选择页面
            switchTestType('heart-rate');
        });
    });
}
