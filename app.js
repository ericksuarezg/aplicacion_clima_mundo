const axios = require('axios');

const { argv } = require('./configuracion/config');
const clima = require('./clima/clima').getClima;
const getLugarLatLong = async(direccion) => {
        console.log(argv);
        console.log(direccion);

        const encodedUrl = encodeURI(direccion); //trasnforma los caracteres especiales como espacios en blanco
        // dejando la URL lista para utilizar Nueva York = Nueva%20York

        let response = await axios.get(`https://geocode.xyz/?locate=${encodedUrl}&json=1`);
        if (response.data.error) {
            throw new Error('No hay parametros para esa ciudad ' + direccion);
        }
        const ciudad = response.data.standard.city;
        const lat = response.data.latt;
        const long = response.data.longt;

        /*   .then(response => console.log(response.data))
          .catch(error => console.log(error))
          .then(function() {
              // always executed
          }); */

        return {
            ciudad,
            lat,
            long
        }

    }
    /* getLugarLatLong(argv.direccion).
    then((prom) => {
        console.log(prom.ciudad, prom.lat, prom.long);
        clima(prom.lat, prom.long).then(clima => console.log(clima)).catch(error => console.log('no se puede acceder a la api del clima', error));
    }); */


let getInfo = async(direccion) => {

    let ubicacion = await getLugarLatLong(direccion);
    let datosCiudad = await clima(ubicacion.lat, ubicacion.long);
    return {
        cuidad: direccion,
        lat: ubicacion.lat,
        long: ubicacion.long,
        clima: datosCiudad

    }

}

getInfo(argv.direccion).then(datosCiudad => console.log(`La temperatura de ${datosCiudad.cuidad}
es de ${datosCiudad.clima} y esta ubicada a una latitud de ${datosCiudad.lat} y una longitud de
${datosCiudad.long}`)).catch(console.log);








/* const instance = axios.create({ //instancio la clase, por que hay que hacer apy key con valor en la cabecera
    baseURL: 'https://devru-latitude-longitude-find-v1.p.rapidapi.com/latlon.php?location=New York',
    headers: { // agregando cabeceras
        'x-rapidapi-host': 'devru-latitude-longitude-find-v1.p.rapidapi.com',
        'x-rapidapi-key': 'c1f890d36amsh1ae9d34e062d2abp127f2cjsn38eec50cf865'
    }
}); */

/* instance.get()
    .then(resp => console.log(resp.headers.date))
    .catch(err => console.log('!!!Error', err)); */