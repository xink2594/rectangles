# rectangles
# ASCII 矩形计数器  
这是一个用于统计 ASCII 字符图中矩形数量的工具。它能够识别由 `+`、`-` 和 `|` 字符构成的矩形，并准确计算其数量。


## 功能特点  
- 支持识别各种大小和位置的矩形  
- 能够处理嵌套矩形和共享边的矩形  
- 提供简洁的命令行交互界面  
- 输入验证确保数据有效性  
- **辅助工具**：配套 HTML 文件可生成可复制的 ASCII 代码，快速构造测试用例  


## 运行环境  
- 仓颉编程语言环境  
- HTML 工具可在任意现代浏览器中打开  


## 使用方法  

### 1. 运行程序  
```bash  
# 编译并运行仓颉代码  
cd rectangle
cjpm run  
```  
按照提示输入网格行数及每行内容，程序将输出矩形数量。  


### 2. 使用 HTML 辅助工具  
#### 工具功能  
- 可视化绘制 ASCII 网格  
- 自动生成可复制的代码字符串  
- 快速验证矩形结构  

#### 使用步骤  
1. 打开 `html/ascii-generator.html` 文件。  
2. 在网格区域点击绘制 `+`、`-`、`|` 字符。  
3. 点击 **生成ASCII** 按钮，复制输出框中的字符串。  
4. 将代码粘贴到程序输入界面，完成测试。  

#### 截图  
![HTML 工具界面示例](https://github.com/user-attachments/assets/9b7fcb97-ceec-443f-9fa9-7e9ca0c17f25)


## 示例  
**输入**（通过 HTML 工具生成）：  
```  
   +--+  
  ++  |  
+-++--+  
|  |  |  
+--+--+  
```  
**输出**：  
```  
找到的矩形数量: 6  
```  


## 技术细节  
- 使用高效的点检测算法  
- 通过水平和垂直方向扫描确定矩形边缘  
- 严格遵循矩形定义规则进行验证  
- HTML 工具基于原生 JavaScript 实现，无第三方依赖  


## 项目结构  
```  
project-root/  
├─ rectangle/  
│  ├─ src   
│  │  └─ main.cj # 核心代码
│  └─ cjpm.toml # 核心配置文件
├─ html/  
│  └─ ascii-generator.html # ASCII 代码生成工具  
└─ README.md  
```  


## 贡献方式  
如需优化工具功能或报告问题，请通过项目仓库提交 Issue 或 Pull Request。  
