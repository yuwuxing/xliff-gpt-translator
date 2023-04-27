# Xliff GPT Translator

Xliff GPT Translator是一个使用 OpenAI Chat API 自动翻译 XLIFF 文件的 Node.js 应用程序。它从输入目录读取 XLIFF 文件，将其翻译成目标语言，并将翻译后的文件保存到输出目录。

## 特点

- 批量翻译 XLIFF 文件。
- 可自定义速率限制和每个请求翻译的文本节点数，保证免费版API限流也能正常生成。
- 从 XLIFF 文件中自动检测源语言和目标语言。
- 易于使用且文档齐全的代码。

## 入门指南

### 先决条件

- Node.js（v14.0.0 或更高版本）
- OpenAI API 密钥

### 安装

1. 克隆仓库：

```
git clone https://github.com/yuwuxing/xliff-gpt-translator.git
```

2. 安装依赖：

```
cd xliff-gpt-translator
npm install
```

3. 通过更新 `config.json` 配置应用程序：

将 `YOUR_API_KEY` 替换为您的 OpenAI API 密钥：

```json
{
  "openai_api_key": "YOUR_API_KEY",
  "openai_api_baseurl": "https://api.openai.com",
  "openai_model": "gpt-3.5-turbo",
  "inputDir": "./xliff",
  "outputDir": "./output",
  "finishedDir": "./finished",
  "rateLimit": 3,
  "nodesPerRequest": 5
}
```

### 使用

1. 将要翻译的 XLIFF 文件放在 `./xliff` 目录中（或在 `config.json` 中指定的自定义输入目录）。

2. 运行应用程序：

```
node index.js
```

3. 翻译后的文件将保存在 `./output` 目录中（或在 `config.json` 中指定的自定义输出目录）。

4. 原始文件将被移动到 `./finished` 目录中（或在 `config.json` 中指定的自定义已完成目录）。

## 自定义

您可以通过修改 `config.json` 中的设置来自定义应用程序：

- `inputDir`：输入 XLIFF 文件所在的目录。默认为 `./xliff`。
- `outputDir`：翻译后的 XLIFF 文件将保存的目录。默认为 `./output`。
- `finishedDir`：翻译后的原始 XLIFF 文件将被移动到的目录。默认为 `./finished`。
- `openai_api_baseurl`：Openai 的API路径，可以换成你自己的，方便国内使用。
- `openai_model`：使用的模型，可以自己选择用GPT3.5还是GPT4。
- `rateLimit`：每分钟向 OpenAI API 发送请求的速率限制。默认为 3（免费版限制，付费版API可以调大）。
- `nodesPerRequest`：单个 API 请求中要翻译的 trans-unit 节点数。默认为 5（为了解决免费版API限制将多条文本合成一个请求，如果文本比较长或者是付费版API可以调小该值）。

## 贡献

欢迎提出拉取请求！请确保适当更新测试并遵循现有的代码风格。

## 许可

本项目采用 MIT 许可证。有关详细信息，请参阅 [LICENSE](LICENSE) 文件。
