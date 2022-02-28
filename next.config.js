/** @type {import('next').NextConfig} */


const nextra = require('nextra');


module.exports = nextra('./components/layout.tsx')({
  reactStrictMode: false
})