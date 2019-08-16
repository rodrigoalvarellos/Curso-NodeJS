const axios = require('axios');

const apiKey = '59550fa96050890609d7d0f809a0a73c';


const getClima = async(lat, lng) => {

    const resp = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${ lat }&lon=${ lng }&appid=${ apiKey }&units=metric`);

    return resp.data.main.temp;

};

module.exports = {
    getClima
};