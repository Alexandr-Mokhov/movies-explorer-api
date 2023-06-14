const { celebrate, Joi } = require('celebrate');

// eslint-disable-next-line no-useless-escape
const linkPattern = /https?:\/\/[\w\-\.\_\~\:\/\?\#\[\]\@\!\$\&\'\(\)\*\+\,\;\=\#]{1,}/;
const nameRuPattern = /[А-ЯЁа-яё \d]/;
const nameEnPattern = /^[\w ]+$/;

const userValidation = celebrate({
  body: Joi.object().keys({
    email: Joi.string().email().required()
      .messages({
        'string.base': 'Поле email должно быть текстом',
        'string.empty': 'Поле email не должно быть пустым',
        'string.email': 'В поле email должен быть email',
        'any.required': 'Поле email обязательное поле',
      }),
    name: Joi.string().min(2).max(30).required()
      .messages({
        'string.base': 'Имя должно быть текстом',
        'string.empty': 'Имя не должно быть пустым',
        'string.min': 'Минимальная длина имени 2 знака',
        'string.max': 'Максимальная длина имени 30 знаков',
        'any.required': 'Имя обязательное поле',
      }),
  }),
});

const movieCreateValidation = celebrate({
  body: Joi.object().keys({
    country: Joi.string().required()
      .messages({
        'string.base': 'Поле страна должно быть текстом',
        'string.empty': 'Поле страна не должно быть пустым',
        'any.required': 'Поле страна обязательное поле',
      }),
    director: Joi.string().required()
      .messages({
        'string.base': 'Поле директор должно быть текстом',
        'string.empty': 'Поле директор не должно быть пустым',
        'any.required': 'Поле директор обязательное поле',
      }),
    duration: Joi.number().required()
      .messages({
        'string.base': 'Поле продолжительность должно быть числом',
        'string.empty': 'Поле продолжительность не должно быть пустым',
        'any.required': 'Поле продолжительность обязательное поле',
      }),
    year: Joi.string().required()
      .messages({
        'string.base': 'Поле год должно быть текстом',
        'string.empty': 'Поле год не должно быть пустым',
        'any.required': 'Поле год обязательное поле',
      }),
    description: Joi.string().required()
      .messages({
        'string.base': 'Поле описание должно быть текстом',
        'string.empty': 'Поле описание не должно быть пустым',
        'any.required': 'Поле описание обязательное поле',
      }),
    image: Joi.string().regex(linkPattern).required()
      .messages({
        'string.base': 'Поле изображение должно быть текстом',
        'string.empty': 'Поле изображение не должно быть пустым',
        'string.pattern.base': 'Поле изображение должно соответствовать ссылке',
        'any.required': 'Поле изображение обязательное поле',
      }),
    trailerLink: Joi.string().regex(linkPattern).required()
      .messages({
        'string.base': 'Поле трйлер должно быть текстом',
        'string.empty': 'Поле трйлер не должно быть пустым',
        'string.pattern.base': 'Поле трйлер должно соответствовать ссылке',
        'any.required': 'Поле трйлер обязательное поле',
      }),
    thumbnail: Joi.string().regex(linkPattern).required()
      .messages({
        'string.base': 'Поле миниатюра должно быть текстом',
        'string.empty': 'Поле миниатюра не должно быть пустым',
        'string.pattern.base': 'Поле миниатюра должно соответствовать ссылке',
        'any.required': 'Поле миниатюра обязательное поле',
      }),
    nameRU: Joi.string().regex(nameRuPattern).required()
      .messages({
        'string.base': 'Поле имя должно быть текстом',
        'string.empty': 'Поле имя не должно быть пустым',
        'string.pattern.base': 'Поле имя должно быть на русском языке',
        'any.required': 'Поле имя обязательное поле',
      }),
    nameEN: Joi.string().regex(nameEnPattern).required()
      .messages({
        'string.base': 'Поле имя должно быть текстом',
        'string.empty': 'Поле имя не должно быть пустым',
        'string.pattern.base': 'Поле имя должно быть на английском языке',
        'any.required': 'Поле имя обязательное поле',
      }),
  }),
});

const movieIdValidation = celebrate({
  params: Joi.object().keys({
    movieId: Joi.string().hex().length(24).required()
      .messages({
        'string.base': 'Идентификатор должен быть текстом',
        'string.hex': 'Идентификатор должен состоять из шестнадцатиричных чисел',
        'string.length': 'Идентификатор должен быть длиной 24 знака',
        'any.required': 'Идентификатор обязательное поле',
      }),
  }),
});

module.exports = {
  userValidation,
  movieCreateValidation,
  movieIdValidation,
};
