/* 
    The file name can be env.validation.ts or env.schema.ts or config.schema.ts
    depending on your team’s naming conventions.
    The important part is that its sole responsibility is to validate environment variables.

    This file uses a schema validation library (like Joi, Zod, Yup, etc.) to define
    the expected environment variables, their types, and any constraints (e.g., required, default values).

    What env.validation.ts Is Responsible For
    This file answers one question only:
    “What environment variables must exist, and what shape must they have?”

    It does not:
    It only guards startup.
    If validation fails → app must not start

    NODE_ENV variable	specifies the Runtime mode flag — tells your code whether it’s running in development, production, or test.
    Why we call development, production, test valid
    means:

    Only these 3 strings are allowed as values for NODE_ENV
    Anything else is invalid and will crash the app
    (e.g., NODE_ENV=devv → startup fails)

    Why we set .default('development')
    During local development, you may not set NODE_ENV manually.
    .default('development') ensures the app still starts.
    In production or CI/CD, the variable should be explicitly set.
    It’s just a safe fallback, not a rule for filenames.

    # local dev, nothing set
    $ npm run start:dev
    # NODE_ENV automatically defaults to 'development'

    Where you “switch” NODE_ENV depends on context:
    # .env
    NODE_ENV=development
    PORT=3000


 */


import * as Joi from 'joi';

export const envValidationSchema = Joi.object({
  NODE_ENV: Joi.string()
    .valid('development', 'production', 'test')
    .default('development'),

  PORT: Joi.number().default(3000),

  DB_HOST: Joi.string().required(),
  DB_PORT: Joi.number().default(5432),
  DB_USERNAME: Joi.string().required(),
  DB_PASSWORD: Joi.string().required(),
  DB_NAME: Joi.string().required(),
});
