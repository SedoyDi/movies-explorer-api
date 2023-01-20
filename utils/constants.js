const validationError = 'Ошибка валидации';
const filmNotFound = 'Фильм не найден';
const cannotDelete = 'Удаление невозможно';
const deletedMovie = 'Фильм успешно удален';
const notFoundUser = 'Пользователь не найден';
const existUserAlready = 'Пользователь с таким email уже зарегистрирован';
const neededAutorisation = 'Необходима авторизация';
const serverError = 'Ошибка сервера';
const pageNotFound = 'Страница не найдена';
const emailError = 'Почта указана неверно';
const fillField = 'Это поле должно быть заполнено';
const lengthFieldMin = 'Минимальная длина поля - 2 знака';
const lengthFieldMax = 'Максимальная длина поля - 30 знака';
const unauthError = 'Неправильные почта или пароль';
const urlError = 'Ссылка указана неверно';
const manyRequest = 'Превышен лимит запросов';

const PORT_NUMBER = 3001;
const ALLOWED_CORS = [
  'http://localhost:3001',
  'diploma.sedov.d.s.nomoredomains.rocks',
  'api.diploma.sedov.d.s.nomoredomains.rocks',
];

module.exports = {
  validationError,
  filmNotFound,
  cannotDelete,
  deletedMovie,
  notFoundUser,
  existUserAlready,
  neededAutorisation,
  serverError,
  pageNotFound,
  emailError,
  fillField,
  lengthFieldMin,
  lengthFieldMax,
  unauthError,
  urlError,
  manyRequest,
  PORT_NUMBER,
  ALLOWED_CORS,
};
