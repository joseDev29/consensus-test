CREATE TABLE stores(
    id VARCHAR(10) PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    createdAt TIMESTAMP,
    updatedAt TIMESTAMP,
);

CREATE TABLE products(
    id VARCHAR(10) PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    description VARCHAR(150) NOT NULL,
    createdAt TIMESTAMP,
    updatedAt TIMESTAMP,
);

CREATE TABLE stores_products(
    store_id VARCHAR(10),
    product_id VARCHAR(10),
    stock NUMBER(10) NOT NULL,
    createdAt TIMESTAMP,
    updatedAt TIMESTAMP,

    CONSTRAINT stores_products_pk PRIMARY KEY (store_id, product_id),
    CONSTRAINT stps_store_fk FOREIGN KEY (store_id) REFERENCES stores,
    CONSTRAINT stps_product_fk FOREIGN KEY (product_id) REFERENCES products
);

CREATE TABLE transfer_logs(
    id NUMBER(10) AUTO_INCREMENT PRIMARY KEY,
    store_origin_id VARCHAR(10),
    store_destination_id VARCHAR(10),
    product_id VARCHAR(10),
    amount NUMBER(10),
    createdAt TIMESTAMP,
    updatedAt TIMESTAMP

    CONSTRAINT tfl_store_org_fk FOREIGN KEY (store_origin_id) REFERENCES stores,
    CONSTRAINT tfl_store_dst_fk FOREIGN KEY (store_destination_id) REFERENCES stores,
    CONSTRAINT tfl_product_fk FOREIGN KEY (product_id) REFERENCES products 
)

