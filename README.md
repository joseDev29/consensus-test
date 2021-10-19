# Consensus test

## Entidades

###### Almacen

    Store {
    	id,
    	name,
    	createdAt,
    	updatedAt
    }

###### Producto

    Product {
    	id,
    	name,
    	description,
    	createdAt,
    	updatedAt
    }

###### Registro de stock de determinado producto en determinado almacen

    StoreProduct {
    	store_id,
    	product_id,
    	stock,
    	createdAt,
    	updatedAt
    }

###### Registro de transferencias de stock entre bodegas

    TransferLogs {
    	id,
    	store_origin_id,
    	store_destination_id,
    	product_id,
    	amount,
    	createdAt,
    	updatedAt
    }

### Notas

- El id de cada bodega y prodcuto es generado automaticamente en el servidor
- El id de los registros de transferencias es creado autoincrementalmente por base de datos
- El archivo ddl.sql contiene el script de la base de datos
- El archivo endpoints.json contiene toda la informacion de los endpoints disponibles

### Inicio

1. Cree en la raiz del proyecto un archivo .env con las especificaciones del archivo .env-example, este contendra el puerto para el servidor y los datos de host y acceso de su ambiente MySQL
2. Ejecute los siguiente comandos desde la raiz del proyecto
3. Instale las dependencias utilizando el comando " npm i "
4. Ejecute el comando " npm run build " para compilar los archivos typescript a javascript
5. Ejecute el comando " npm start " para iniciar el servidor de node
6. El proyecto se inciara por defecto en http://localhost:3000 o en el puerto definido en el .env
