
# Node-Mongo-Express



DiveCode&trade;

## **Ejercicios prácticos de Mongo con Express.**


Aquí encontraras cuatro ejercicios del basicos con Mongo y Express y una conexion estandar a Mongodb.

Todos los erercios se has relizado en LocalHost.




**Recuerda decarjar los repositorios del pakacge.json de cada ejerccio con:**


`npm install`



|  Ejercicio 1 | Descripción  |
| ------------ | ------------ |
| Resturante  Back end  | CRUD Basic use Postman  |
|  Series | Post - Get  |
|  Restaurante | CRUD   |
| Libros  | Update - Status(Leido)True or False   |
| Hotel  | CRUD con condicionales de registro  |


`npm install`



|  Ejercicio 1 | Descripción  |
| ------------ | ------------ |
| Resturante  Back end  | CRUD Basic use Postman  |
|  Series | Post - Get  |
|  Restaurante | CRUD   |
| Libros  | Update - Status(Leido)True or False   |
| Hotel  | CRUD con condicionales de registro y API  |


## HOTEL API Reference

#### Get all items

| Parameter | Type     | Description     |
| :-------- | :------- | :-------------- |
| `api_key` | `string` | **NO Required** |

```http
  GET /API/clientes/
```

| Parameter  | Type      | Description                          |
| :--------- | :-------- | :----------------------------------- |
| `id`       | `ObjetId` | **No Required**.  |
| `nombre`   | `string`  | **No Required**.  |
| `apellido` | `string`  | **No Required**.  |
| `dni`      | `string`  | **No Required**.  |

```http
  GET /API/habitaciones/
```

| Parameter | Type      | Description                          |
| :-------- | :-------- | :----------------------------------- |
| `id`      | `ObjetId` | **No Required**. |
| `numHab`  | `string`  | **No Required**. |
| `camas`   | `string`  | **No Required**. |
| `estado`  | `string`  | **No Required**. |

```http
  GET /API/reservas/
```

| Parameter | Type      | Description                          |
| :-------- | :-------- | :----------------------------------- |
| `id`      | `ObjetId` | **No Required** |
| `dni`     | `string`  | **No Required** |
| `numHab`  | `string`  | **No Required** |
| `fechaCI` | `string`  | **No Required** |
| `fechaCO` | `string`  | **No Required** |

## Others/Routes

| route                      | method | headers                             |
| :------------------------- | :----- | :---------------------------------- |
| /API/clientes/registro     | `POST` |  `id`  `ObjetId`  Required |
| /API/habitaciones/registro | `POST` | `id`  `ObjetId`  Required |
| /API/reserva/registro      | `POST` | `id`  `ObjetId`   Required |
| /API/clientes/registro     | `PUT`  | `id`  `ObjetId`   Required |
| /API/habitaciones/registro | `PUT`  | `id`  `ObjetId`   Required|
| /API/reserva/registro      | `PUTT` | `id`  `ObjetId`   Required |

## Usage/Examples

```javascript
function enviarDatosPost() {
  let cliente = { nombre: nombre, apellido: apellido, dni: dni };
  fetch(`/API/clientes/registro`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(cliente),
  })
    .then((res) => res.json())
    .then(function (datos) {
      cosole.log(datos);
    });
}
