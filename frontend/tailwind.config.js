module.exports = {

    plugins: [
        require('flowbite/plugin')
    ],
    theme: {
        extend: {},
      },
    content: [
        './node_modules/flowbite/**/*.js',
        './src/**/*.{js,jsx,ts,tsx}',
    ],
}