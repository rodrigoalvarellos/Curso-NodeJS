import mysql = require('mysql');


export default class MySQL {

    private  static _instance: MySQL;

    cnn: mysql.Connection;
    conectado: boolean = false;

    constructor(){
        
        console.log('Clase inicializada');

        this.cnn = mysql.createConnection({
            host: 'localhost',
            user:'root',
            password: '123456',
            database: 'node_db'
        });

        this.conectarDB();       
    }

    public static get instance() {
        return this._instance || ( this._instance = new this() );
    }

    static ejecutarQuery( query: string, callback: Function) {
        this.instance.cnn.query(query, ( err, results: Object[], fields: any) => {

            if ( err ) {
                console.log('Error al ejectuar Query: ', err);                
                return callback(err);
            }

            if ( results.length === 0 ) {
                callback('El registro solicitado no existe');
            }

            callback( null, results );
        });
    }



    private conectarDB() {

        this.cnn.connect( (err: mysql.MysqlError ) => {

            if( err ) {
                console.log( err.message );
                return;
            }

            this.conectado = true;
            console.log('Base de datos Online!');

        });

    }
}