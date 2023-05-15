const whitelist = [
  'http://localhost:3001',
  'http://localhost:5555',
  'http://localhost:7777',
  'http://api.diploma.sedov.d.s.nomoredomains.rocks',
  'https://api.diploma.sedov.d.s.nomoredomains.rocks',
];
const corsOptions = {
  credentials: true,
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,',
  optionsSuccessStatus: 204,
};
module.exports = (req, callback) => {
  if (whitelist.indexOf(req.header('Origin')) !== -1) {
    corsOptions.origin = true; // reflect (enable) the requested origin in the CORS response
  } else {
    corsOptions.origin = false; // disable CORS for this request
  }
  callback(null, corsOptions); // callback expects two parameters: error and options
};
