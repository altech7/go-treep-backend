const { CLIEngine } = require('eslint')

const cli = new CLIEngine({})

module.exports = {
  'src/**/*.{js,jsx,ts,tsx,json,md}': [
    files => 'eslint --max-warnings 0 --fix ' + files.filter(file => !cli.isPathIgnored(file)).join(' '),
    'git add',
  ],
}
