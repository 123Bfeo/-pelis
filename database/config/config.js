module.exports={
  //DB desarrollo
  "development": {
    "username": "root",
    "password": "Root",
    "database": "movies_db",
    "host": "127.0.0.1",
    "dialect": "mysql"
  },
  //DB prueva
  "test": {
    "username": "root",
    "password": null,
    "database": "database_test",
    "host": "127.0.0.1",
    "dialect": "mysql"
  },
  //DB produccion 
  "production": {
    "username": "root",
    "password": null,
    "database": "database_production",
    "host": "127.0.0.1",
    "dialect": "mysql"
  }
}
