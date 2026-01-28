const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const fs = require('fs');
const dotenv = require('dotenv');

// Carrega variáveis de ambiente baseado no NODE_ENV
const environment = process.env.NODE_ENV || 'development';
const envFile = path.resolve(__dirname, `.env.${environment}`);

console.log(`\n📦 Compilando para ambiente: ${environment}`);
console.log(`📄 Carregando arquivo: .env.${environment}\n`);

if (fs.existsSync(envFile)) {
  dotenv.config({ path: envFile });
} else {
  console.warn(`⚠️  Arquivo ${envFile} não encontrado. Usando valores padrão.`);
}

// Gera entry points dinamicamente para cada script
const getEntries = () => {
  const entries = {
    main: './src/index.ts',
  };
  
  const scriptsDir = path.resolve(__dirname, 'src/scripts');
  if (fs.existsSync(scriptsDir)) {
    const files = fs.readdirSync(scriptsDir).filter(file => file.endsWith('.ts') && file !== 'main.ts');
    files.forEach(file => {
      const name = path.parse(file).name;
      entries[name] = `./src/scripts/${file}`;
    });
  }
  
  return entries;
};

// Gera plugins HtmlWebpackPlugin para cada arquivo HTML
const getHtmlPlugins = () => {
  const htmlDir = path.resolve(__dirname, 'src/pages');
  if (!fs.existsSync(htmlDir)) {
    fs.mkdirSync(htmlDir, { recursive: true });
  }
  
  const htmlFiles = fs.readdirSync(htmlDir).filter(file => file.endsWith('.html'));
  
  return htmlFiles.map(file => {
    const name = path.parse(file).name;
    // Mapeia cada HTML para seu script correspondente
    const chunkName = name === 'index' ? 'main' : name;
    return new HtmlWebpackPlugin({
      template: path.join(htmlDir, file),
      filename: `${name}.html`,
      chunks: [chunkName],
    });
  });
};

module.exports = {
  mode: process.env.NODE_ENV === 'production' ? 'production' : 'development',
  entry: getEntries(),
  output: {
    filename: 'js/[name].js',
    path: path.resolve(__dirname, 'dist'),
    clean: true,
    assetModuleFilename: 'assets/[name][ext]',
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(png|jpg|jpeg|gif|svg)$/i,
        type: 'asset/resource',
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
    alias: {
      '@pages': path.resolve(__dirname, 'src/pages/'),
      '@scripts': path.resolve(__dirname, 'src/scripts/'),
      '@styles': path.resolve(__dirname, 'src/styles/'),
      '@assets': path.resolve(__dirname, 'src/assets/'),
    },
  },
  plugins: getHtmlPlugins(),
  devServer: {
    static: {
      directory: path.join(__dirname, 'src/assets'),
    },
    port: 3001,
    hot: true,
    historyApiFallback: true,
    compress: true,
    open: true,
  },
  devtool: 'source-map',
};
