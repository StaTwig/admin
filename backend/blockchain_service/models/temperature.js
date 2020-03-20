const initmc= require('../common/init');
var shell = require('shelljs')

exports.getData = function (req, res) {
    const {param, from, to, init, mini, maxi} = req.query;
    console.log('param : ' + param + ' from : ' + from + ' till : ' + to + ' Initial Temperature : ' + init + ' Minimum : ' + mini + ' Maximum : ' + maxi);

    var parameter = param;
    var startFrom = from;
    var endAt = to;
    var initialTemperature = init;
    var maximum = maxi;
    var minimum = mini;
// Start Time Input preprocessing
    const startFrom_str = String(startFrom); //.toString().trim();
    console.log("****************", startFrom_str);
    if (startFrom_str.length !== 5) {
        res.sendStatus(400);
    }
    var startFromHour = startFrom_str.substring(0, 2);
    var startFromMinute = startFrom_str.substring(3, 5);
console.log(startFromHour,startFromMinute)
// Finishing Time Input preprocessing
    const endAt_str = String(endAt); //.toString().trim();
    if (endAt_str.length !== 5) {
        res.sendStatus(400);
    }
    const endAtHour = endAt_str.substring(0, 2);
    const endAtMinute = endAt_str.substring(3, 5);
console.log(endAtHour,endAtMinute)
    const hour_difference = endAtHour - startFromHour;
    const minute_difference = endAtMinute - startFromMinute;
console.log(hour_difference,minute_difference)
    var minuteCount, valueCount;

// To calculate number of values within the range
    if (minute_difference < 0) {
        minuteCount = minute_difference + 60;
        if ((minuteCount > 0) && (minuteCount <= 15)) {
            valueCount = 4 * (hour_difference - 1);

        } else if ((minuteCount > 15) && (minuteCount <= 30)) {
            valueCount = 4 * (hour_difference - 1) + 1;

        } else if ((minuteCount > 30) && (minuteCount <= 45)) {
            valueCount = 4 * (hour_difference - 1) + 2;

        } else if ((minuteCount > 45) && (minuteCount < 60)) {
            valueCount = 4 * (hour_difference - 1) + 3;

        }

    } else {

        if ((minute_difference > 0) && (minute_difference <= 15)) {
            valueCount = 4 * (hour_difference);
        } else if ((minute_difference > 15) && (minute_difference <= 30)) {
            valueCount = 4 * (hour_difference) + 1;

        } else if ((minute_difference > 30) && (minute_difference <= 45)) {
            valueCount = 4 * (hour_difference) + 2;

        } else if ((minute_difference > 45) && (minute_difference < 60)) {
            valueCount = 4 * (hour_difference) + 3;
        }
    }
console.log(valueCount)

    var temperatureList = [];

    var currentMinute, currentHour, temp_Value, humidity_Value;

    if (parameter.toString().trim() === 'temperature') {

	currentTime = String(startFrom);
	temp_Value = parseFloat(initialTemperature);
        temperatureList.push({currentTime, temp_Value});
        for (var i = 0; i < valueCount; i++) {

            var initialValue = initialTemperature;
            temp_Value = (Math.random() * 1.8) + initialValue;

            if (startFromMinute < 45) {
                currentMinute = parseInt(startFromMinute) + 15;
                currentHour = parseInt(startFromHour);
                currentTime = String(currentHour) + ':' + String(currentMinute);
                if ((currentHour >= 6) && (currentHour <= 18)) {
                    temp_Value = parseInt(initialValue) + (Math.random() * 2.5);

                } else {
                    temp_Value = parseInt(initialValue) - (Math.random() * 2.5);

                }

                temperatureList.push({currentTime, temp_Value});

            } else if ((startFromMinute > 45) && (startFromMinute < 60)) {
                currentMinute = (parseInt(startFromMinute) + 15) - 60;
                currentHour = parseInt(startFromHour) + 1;
                currentTime = String(currentHour) + ':' + String(currentMinute);
                if ((currentHour >= 6) && (currentHour <= 18)) {
                    temp_Value = parseInt(initialValue) + (Math.random() * 2.5);

                } else {
                    temp_Value = parseInt(initialValue) - (Math.random() * 2.5);

                }

                temperatureList.push({currentTime, temp_Value});

            } else {
                console.log("Invalid Start Time Minute Input");
            }
            startFromHour = currentHour;
            startFromMinute = currentMinute;
            initialValue = temp_Value;
        }
        temp_Value = temp_Value + 0.5;
	currentTime = String(endAt);
        temperatureList.push({currentTime, temp_Value});
    } else {
        res.sendStatus(400);
    }

const multichain = initmc.getMultichain();

  var stream_name="stream1"

  temperatureList.forEach(function(temperatur) {
	var key = temperatur.currentTime
	var data1 = temperatur.temp_Value
	const data = Buffer.from(JSON.stringify(data1), 'utf8').toString('hex');

	  var multichain1 = initmc.getMultichain();

	  console.log("multichain-cli chain1 publish stream1" + "'" + key + "' " + "'" + (String(data1)).toString("hex") + "'")
	  //var result = shell.exec("multichain-cli chain1 publish stream1 " + "'" + key + "' " + "'" + (String(data)).toString("hex") + "'" , function(code, stdout, stderr) {
	  })


res.json({param: 'temperature',temperatureList});
}

