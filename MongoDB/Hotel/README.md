
## API Reference

#### Get all items

| Parameter | Type     | Description     |
| :-------- | :------- | :-------------- |
| `api_key` | `string` | **NO Required** |

```http
  GET /API/clientes/
```

| Parameter  | Type      | Description                          |
| :--------- | :-------- | :----------------------------------- |
| `id`       | `ObjetId` | **No Required**. Id of item to fetch |
| `nombre`   | `string`  | **No Required**. Id of item to fetch |
| `apellido` | `string`  | **No Required**. Id of item to fetch |
| `dni`      | `string`  | **No Required**. Id of item to fetch |

```http
  GET /API/habitaciones/
```

| Parameter | Type      | Description                          |
| :-------- | :-------- | :----------------------------------- |
| `id`      | `ObjetId` | **No Required**. Id of item to fetch |
| `numHab`  | `string`  | **No Required**. Id of item to fetch |
| `camas`   | `string`  | **No Required**. Id of item to fetch |
| `estado`  | `string`  | **No Required**. Id of item to fetch |

```http
  GET /API/reservas/
```

| Parameter | Type      | Description                          |
| :-------- | :-------- | :----------------------------------- |
| `id`      | `ObjetId` | **No Required**. Id of item to fetch |
| `dni`     | `string`  | **No Required**. Id of item to fetch |
| `numHab`  | `string`  | **No Required**. Id of item to fetch |
| `fechaCI` | `string`  | **No Required**. Id of item to fetch |
| `fechaCO` | `string`  | **No Required**. Id of item to fetch |

## others/Routes

| route                      | method | headers                             |
| :------------------------- | :----- | :---------------------------------- |
| /API/clientes/registro     | `POST` | {"Content-Type": "application/json" |
| /API/habitaciones/registro | `POST` | {"Content-Type": "application/json" |
| /API/reserva/registro      | `POST` | {"Content-Type": "application/json" |
| /API/clientes/registro     | `PUT`  | {"Content-Type": "application/json" |
| /API/habitaciones/registro | `PUT`  | {"Content-Type": "application/json" |
| /API/reserva/registro      | `PUTT` | {"Content-Type": "application/json" |

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
```
