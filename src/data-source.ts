import "reflect-metadata";
import { DataSource } from "typeorm";
import * as dotenv from "dotenv";
dotenv.config({ path: "./.env" });

export const AppDataSource = new DataSource({
  type: "postgres",
  host: process.env.POSTGRES_HOST,
  port: parseInt(process.env.POSTGRES_PORT),
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB,
  synchronize: false,
  logging: false,
  // entities:
  //   process.env.NODE_ENV === "local"
  //     ? ["src/entity/**/*.ts"]
  //     : ["dist/entity/**/*.js"],

  // migrations:
  //   process.env.NODE_ENV === "local"
  //     ? ["src/migration/*.ts"]
  //     : ["dist/migration/*.js"],
  entities:
      ["dist/entity/**/*.js"],

  migrations:
      ["dist/migration/*.js"],

  //     ssl:
  //      {
  //         rejectUnauthorized: true,
  //         ca:`-----BEGIN CERTIFICATE-----
  // MIIEQTCCAqmgAwIBAgIUKY3Uhj8dj3wRvBlTJdChujza/c8wDQYJKoZIhvcNAQEM
  // BQAwOjE4MDYGA1UEAwwvNmM2YmQ4NTYtNWIzOS00MzA5LTk0MjQtNzEwMDk3NWVj
  // NjQzIFByb2plY3QgQ0EwHhcNMjQxMjI0MTExNjA2WhcNMzQxMjIyMTExNjA2WjA6
  // MTgwNgYDVQQDDC82YzZiZDg1Ni01YjM5LTQzMDktOTQyNC03MTAwOTc1ZWM2NDMg
  // UHJvamVjdCBDQTCCAaIwDQYJKoZIhvcNAQEBBQADggGPADCCAYoCggGBAKAWqHDN
  // rOXRCa2J7ywkLv7GNiINywOZZjKPRFLpgs96pxvZgqjN9QY6y2FqDnyLcTeF77uV
  // X7zhAPhp4jrW3s0MmuJ4bwWsNKY+PFWBz/iIGANmAQO421v4fQPqYAxUA5wQbQVu
  // /jvW01t18gEJfOaSTu80PYJtVCGe1zl5J1pznDtw20TctY13+ssROIbyy69bjlqB
  // MpIYpl3O7MJNwgKHdBopHaTNX6u6cKHdRfkoAD1JYhPQZG5d5Y58NTY+40iQz+PE
  // uWliBCROMBtSQrXTseMu8yOYUF7Ao0ieMBYBCd3t5uEh9DWQgF1aWVy+Et3+iFxN
  // eXir+f64VTXxhE6CS2S2k7cY5gN1HuxcrvE4DN34pL9+6jg2ZhSJKvRntKXHd32Y
  // bFR5i+4yfAHfZkEeR5pcZiLn01s70bgrbOUJiz1fbqmCZTMXpjjNDY2Y/f92p/9v
  // 0sJajds+VBr4FqUshD6u0FVJKVdGPtT8quN9fIAbMu1OVEBFR9YEqiGXewIDAQAB
  // oz8wPTAdBgNVHQ4EFgQUNBLIqcQC1slBM2WA+NKM+Gqt0e8wDwYDVR0TBAgwBgEB
  // /wIBADALBgNVHQ8EBAMCAQYwDQYJKoZIhvcNAQEMBQADggGBADSlHmE55N1pKZ8B
  // jlv3Ud8c49iqnxH4elYuSiJ/XIqmo4VW90KEDt/RpJW0ovLE49+ubQrLukS563Dj
  // rnnXINukxcUiYXyHroxhdjq3a0/0FNN4DU+JDM3ULenofKbha9GxVwVGBZDuAoZp
  // NMKTeH/SK1mV6op3UTVen1dIWc9Zc04Mte453/ZaQQShkrDCkr68pjr684BmYaHG
  // r4RJYjsQ5ULFksJMKb3vxYWkvhBsBw6niPHtljZT+zsI5mCrX4r/Gg+kxM3hIORw
  // l2U/iWnXVxn+PH8u/ikakZGO9gFzQaVSTRlCsUdmD1k9pRFiNn7rvUyIkR6KfTi9
  // a+GKqQBNMt64/WdzIabmNVX/rpVMP67SoTWjdk3YZ5XhM6nUmrBbMRGUSGWST3YH
  // 4I2rI7/5EYXreFc90FR3nJSiJw9Kwlv9+MXAX/I5MrzDmVdzLW92npqhwSDa4W3z
  // KUpHxRGUKffH1Y5FK8dOjmDBG0Mro3+hR1GOM/mHaJmQF3wQJg==
  // -----END CERTIFICATE-----`},
});
