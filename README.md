# Xliff GPT Translator

Xliff GPT Translator is a Node.js application that automatically translates XLIFF files using the OpenAI Chat API. It reads XLIFF files from an input directory, translates them into the target language, and saves the translated files in an output directory.

## Features

- Batch translation of XLIFF files.
- Customizable rate limit and number of text nodes translated per request, ensuring smooth operation even under free API limits.
- Automatically detects source and target languages from the XLIFF file.
- Easy-to-use and well-documented code.

## Getting Started

### Prerequisites

- Node.js (v14.0.0 or higher)
- OpenAI API Key

### Installation

1. Clone the repository:

```
git clone https://github.com/yourusername/xliff-gpt-translator.git
```

2. Install dependencies:

```
cd xliff-gpt-translator
npm install
```

3. Configure the application by updating `config.json`:

Replace `YOUR_API_KEY` with your OpenAI API key:

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

### Usage

1. Place the XLIFF files you want to translate in the `./xliff` directory (or a custom input directory specified in `config.json`).

2. Run the application:

```
node index.js
```

3. The translated files will be saved in the `./output` directory (or a custom output directory specified in `config.json`).

4. The original files will be moved to the `./finished` directory (or a custom finished directory specified in `config.json`).

## Customization

You can customize the application by modifying the settings in `config.json`:

- `inputDir`: The directory where the input XLIFF files are located. Defaults to `./xliff`.
- `outputDir`: The directory where the translated XLIFF files will be saved. Defaults to `./output`.
- `finishedDir`: The directory where the original XLIFF files will be moved after translation. Defaults to `./finished`.
- `openai_api_baseurl`: The API path for Openai, you can replace it with your own for better accessibility in your region.
- `openai_model`: The model to be used, allowing you to choose between GPT-3.5 and GPT-4.
- `rateLimit`: The rate limit for sending requests to the OpenAI API per minute. Defaults to 3 (free version limit, you can increase it for paid APIs).
- `nodesPerRequest`: The number of trans-unit nodes to be translated in a single API request. Defaults to 5 (to combine multiple texts into one request for free API limits, you can decrease this value if texts are longer or if using paid APIs).

## Contributing

Pull requests are welcome! Please make sure to update tests as appropriate and follow the existing code style.

## License

This project is licensed under the MIT License. For more details, see the [LICENSE](LICENSE) file.