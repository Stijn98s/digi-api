import * as Joi from 'joi';
import * as fs from 'fs';
import * as dotenv from 'dotenv';

export interface EnvConfig {
  [key: string]: string;
}

export class ConfigService {
  private readonly envConfig: EnvConfig;

  constructor(filePath: string) {
    const config = dotenv.parse(fs.readFileSync(filePath));
    this.envConfig = this.validateInput(config);
  }

  /**
   * Ensures all needed variables are set, and returns the validated JavaScript object
   * including the applied default values.
   */
  private validateInput(envConfig: EnvConfig): EnvConfig {
    const envVarsSchema: Joi.ObjectSchema = Joi.object({
      PORT: Joi.number().default(3000),
      API_AUTH_ENABLED: Joi.boolean().required(),
      DATABASE_NAME: Joi.string().required(),
      DATABASE_HOST: Joi.string().required(),
      DATABASE_USER: Joi.string().required(),
      DATABASE_PASSWORD: Joi.string().required(),
      AUTH_SECRET: Joi.string().required(),
      GOOGLE_CLIENT_ID: Joi.string().required(),
      GOOGLE_CLIENT_SECRET: Joi.string().required(),
      FACEBOOK_CLIENT_ID: Joi.string().required(),
      FACEBOOK_CLIENT_SECRET: Joi.string().required(),
      PRIVATE_KEY_PATH: Joi.string(),
      CERT_PATH: Joi.string(),
    });

    const { error, value: validatedEnvConfig } = Joi.validate(
      envConfig,
      envVarsSchema,
    );
    if (error) {
      throw new Error(`Config validation error: ${error.message}`);
    }
    return validatedEnvConfig;
  }

  get isApiAuthEnabled(): boolean {
    return Boolean(this.envConfig.API_AUTH_ENABLED);
  }

  get port(): number {
    return Number(process.env.PORT) || Number(this.envConfig.PORT);
  }

  get mongoUrl(): string {
    const {
      DATABASE_USER,
      DATABASE_HOST,
      DATABASE_PASSWORD,
      DATABASE_NAME,
    } = this.envConfig;
    return (
      // @ts-ignore
      global.__MONGO_URI__ ||
      `mongodb://${DATABASE_USER}:${DATABASE_PASSWORD}@${DATABASE_HOST}/${DATABASE_NAME}`
    );
  }

  get secretKey(): string {
    return this.envConfig.AUTH_SECRET;
  }

  get googleClientId(): string {
    return this.envConfig.GOOGLE_CLIENT_ID;
  }

  get googleClientSecret(): string {
    return this.envConfig.GOOGLE_CLIENT_SECRET;
  }

  get facebookClientId() {
    return this.envConfig.FACEBOOK_CLIENT_ID;
  }

  get facebookClientSecret() {
    return this.envConfig.FACEBOOK_CLIENT_SECRET;
  }

  get isSSLEnabled(): boolean {
    return 'true' === process.env.SSL_ENABLED;
  }

  get privateKey(): string {
    return this.envConfig.PRIVATE_KEY_PATH;
  }
  get certificate(): string {
    return this.envConfig.CERT_PATH;
  }

  get issueTime(): number {
    return 10000;
  }

  get schema() {
    return this.isSSLEnabled ? 'https' : 'http';
  }

  get isDevelopment(): boolean {
    return process.env.NODE_ENV === 'development';
  }
}
