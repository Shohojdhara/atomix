module.exports = [
  {
    path: 'dist/esm/index.js',
    limit: '50 KB',
    webpack: false,
    running: false,
  },
  {
    path: 'dist/cjs/index.js',
    limit: '50 KB',
    webpack: false,
    running: false,
  },
  {
    path: 'dist/umd/index.js',
    limit: '60 KB',
    webpack: false,
    running: false,
  },
  {
    path: 'dist/css/index.css',
    limit: '30 KB',
    webpack: false,
    running: false,
  },
  {
    name: 'import size',
    import: { '@shohojdhara/atomix': 'dist/esm/index.js' },
    limit: '50 KB',
    webpack: false,
    running: false,
  },
];