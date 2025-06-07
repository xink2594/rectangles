document.addEventListener('DOMContentLoaded', () => {
    const rowsInput = document.getElementById('rows');
    const colsInput = document.getElementById('cols');
    const createGridBtn = document.getElementById('createGridBtn');
    const gridContainer = document.getElementById('gridContainer');
    const generateAsciiBtn = document.getElementById('generateAsciiBtn');
    const asciiDisplayArea = document.getElementById('asciiDisplayArea');

    const chars = [' ', '+', '-', '|']; // 用于循环切换的字符数组
    let gridData = []; // 用于存储网格数据的二维数组

    function createGrid() {
        const numRows = parseInt(rowsInput.value); // 获取行数输入值并转换为整数
        const numCols = parseInt(colsInput.value); // 获取列数输入值并转换为整数

        // 检查行数和列数是否为有效正整数
        if (isNaN(numRows) || isNaN(numCols) || numRows <= 0 || numCols <= 0) {
            alert('请输入有效的行数和列数。');
            return;
        }

        gridContainer.innerHTML = ''; // 清除上一个网格
        gridContainer.style.gridTemplateRows = `repeat(${numRows}, 20px)`; // 设置网格行样式
        gridContainer.style.gridTemplateColumns = `repeat(${numCols}, 20px)`; // 设置网格列样式
        gridData = []; // 重置网格数据数组
        asciiDisplayArea.innerHTML = ''; // 清空ASCII输出区域

        // 循环创建网格单元格
        for (let i = 0; i < numRows; i++) {
            const row = []; // 当前行的数据
            for (let j = 0; j < numCols; j++) {
                const cell = document.createElement('div'); // 创建单元格元素
                cell.classList.add('grid-cell'); // 添加CSS类
                cell.dataset.row = i; // 存储行索引
                cell.dataset.col = j; // 存储列索引
                cell.textContent = ' '; // 设置初始内容为空格
                row.push(' '); // 用空格初始化当前行的数据
                cell.addEventListener('click', handleCellClick); // 为单元格添加点击事件监听器
                gridContainer.appendChild(cell); // 将单元格添加到网格容器中
            }
            gridData.push(row); // 将当前行的数据添加到网格数据中
        }
    }

    // 处理单元格点击事件的函数
    function handleCellClick(event) {
        const cell = event.target; // 获取被点击的单元格元素
        const row = parseInt(cell.dataset.row); // 获取单元格的行索引
        const col = parseInt(cell.dataset.col); // 获取单元格的列索引
        
        let currentChar = cell.textContent; // 获取单元格当前字符
        let charIndex = chars.indexOf(currentChar); // 获取当前字符在预定义字符数组中的索引
        charIndex = (charIndex + 1) % chars.length; // 计算下一个字符的索引（循环）
        const newChar = chars[charIndex]; // 获取新的字符

        cell.textContent = newChar; // 更新单元格显示的字符
        gridData[row][col] = newChar; // 更新网格数据中对应位置的字符
        asciiDisplayArea.innerHTML = ''; // 清空之前的ASCII输出，提示用户重新生成
    }

    // 生成ASCII字符串并显示在文本区域的函数
    function generateAscii() {
        if (gridData.length === 0) {
            asciiDisplayArea.innerHTML = '<p>请先创建网格并绘制内容。</p>';
            return;
        }

        asciiDisplayArea.innerHTML = ''; // 清空旧内容

        let firstContentRow = -1;
        let lastContentRow = -1;

        // 查找第一个和最后一个有内容的行
        for (let i = 0; i < gridData.length; i++) {
            const rowString = gridData[i].join('');
            if (rowString.trim() !== '') { // 检查行是否不仅仅是空白
                if (firstContentRow === -1) {
                    firstContentRow = i;
                }
                lastContentRow = i;
            }
        }

        if (firstContentRow === -1) { // 如果没有找到任何有内容的行
            asciiDisplayArea.innerHTML = '<p>网格中没有有效内容可生成 ASCII。</p>';
            return;
        }

        // 只处理从第一个有内容的行到最后一个有内容的行
        const relevantGridData = gridData.slice(firstContentRow, lastContentRow + 1);

        relevantGridData.forEach(rowData => {
            const lineText = rowData.join('').trimEnd(); // 每一行去除末尾空格
            
            const lineDiv = document.createElement('div');
            lineDiv.classList.add('ascii-line-container');

            const textElement = document.createElement('pre');
            textElement.classList.add('ascii-line-text');
            textElement.textContent = lineText;

            const copyButton = document.createElement('button');
            copyButton.classList.add('copy-line-btn');
            copyButton.textContent = '复制';
            copyButton.addEventListener('click', () => {
                navigator.clipboard.writeText(lineText + '\n').then(() => {
                    const originalText = copyButton.textContent;
                    copyButton.textContent = '已复制!';
                    setTimeout(() => {
                        copyButton.textContent = originalText;
                    }, 1500);
                }).catch(err => {
                    console.error('无法复制文本: ', err);
                    alert('复制失败，请检查浏览器权限或手动复制。');
                });
            });

            lineDiv.appendChild(textElement);
            lineDiv.appendChild(copyButton);
            asciiDisplayArea.appendChild(lineDiv);
        });
    }

    createGridBtn.addEventListener('click', createGrid); // 为"创建/重置网格"按钮添加点击事件监听器
    generateAsciiBtn.addEventListener('click', generateAscii); // 为"生成 ASCII"按钮添加点击事件监听器

    // 页面加载完成后自动创建初始网格
    createGrid(); 
}); 