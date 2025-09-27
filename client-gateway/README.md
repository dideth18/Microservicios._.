## Project setup

```bash
$ npm install
```

## Compile and run the project

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## nats config

Por defecto, segun la documentation para la configuración de NATS en docker:
``` cmd
docker run -d --name nats-main -p 4222:4222 -p 6222:6222 -p 8222:8222 nats
```

Sin embargo, para nuestro ejercio el comando debe ser:
``` cmd
docker run -d --name nats-main -p 4222:4222 -p 8222:8222 nats
```
Prescindimos del puerto 6222 porque es para el enrutamiento en clusteres.
