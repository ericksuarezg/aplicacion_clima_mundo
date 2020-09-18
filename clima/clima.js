const axios2 = require('axios');



const getClima = async(lat, long) => {
    console.log(lat, long);
    const respuesta = await axios2.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=adf02b2f4dcab657743c683072dafb28&units=metric`)
    if (!respuesta.data) {
        throw new Error('no se pudo obtener el clima de la ciudad');
    }
    return respuesta.data.main.temp;
}

module.exports = {
    getClima
}