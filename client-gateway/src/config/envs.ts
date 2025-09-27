import 'dotenv/config';
import * as joi from 'joi';

interface EnvVars {
  PORT: number;
  NATS_SERVER: string[];
}

const envSchemaValidator = joi
  .object({
    PORT: joi.number().required(),
    NATS_SERVER: joi.array().items(joi.string()).required(),
  })
  .unknown(true);

const { error, value } = envSchemaValidator.validate({
  ...process.env,
  NATS_SERVER: process.env.NATS_SERVER?.split(','),
});

if (error) {
  throw new Error(`Config(.env) has error: \${error.message}`);
}

const envVars: EnvVars = value;

export const envs = {
  port: envVars.PORT,
  NATS_SERVER: envVars.NATS_SERVER,
};
