/* eslint-disable no-useless-escape */
const { celebrate, Joi } = require('celebrate');

const linkPattern = /https?:\/\/[\w\-\.\_\~\:\/\?\#\[\]\@\!\$\&\'\(\)\*\+\,\;\=\#]{1,}/;
const nameRuPattern = /[А-ЯЁа-яё \w\-\–\.\_\~\:\/\?\#\[\]\@\!\$\&\'\(\)\*\+\,\;\=]+/;
const nameEnPattern = /^[\w \-\–\.\_\~\:\/\?\#\[\]\@\!\$\&\'\(\)\*\+\,\;\=]+$/;

const userValidation = celebrate({
  body: Joi.object().keys({
    email: Joi.string().email().required(),
    name: Joi.string().min(2).max(30).required(),
  }),
});

const movieCreateValidation = celebrate({
  body: Joi.object().keys({
    country: Joi.string().required(),
    director: Joi.string().required(),
    duration: Joi.number().required(),
    year: Joi.string().required(),
    description: Joi.string().required(),
    image: Joi.string().regex(linkPattern).required(),
    trailerLink: Joi.string().regex(linkPattern).required(),
    thumbnail: Joi.string().regex(linkPattern).required(),
    movieId: Joi.number().required(),
    nameRU: Joi.string().regex(nameRuPattern).required(),
    nameEN: Joi.string().regex(nameEnPattern).required(),
  }),
});

const movieIdValidation = celebrate({
  params: Joi.object().keys({
    movieId: Joi.string().hex().length(24).required(),
  }),
});

const registrationValidation = celebrate({
  body: Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().min(4).required(),
    name: Joi.string().min(2).max(30),
  }),
});

const loginValidation = celebrate({
  body: Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().min(4).required(),
  }),
});

module.exports = {
  userValidation,
  movieCreateValidation,
  movieIdValidation,
  registrationValidation,
  loginValidation,
};
