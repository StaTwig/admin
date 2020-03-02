const init = require('../common/init.js');
var shell = require('shelljs')

exports.getData = function (req, res) {
    const {param, from, to, init, mini, maxi} = req.query;
    console.log('parameter : ' + param + ' from : ' + from + ' till : ' + to + ' Initial Humidity : ' +init + ' Minimum : ' + mini + ' Maximum : ' + maxi);

    var parameter = param;
    var startFrom = from;
    var endAt = to;
    var initialHumidity = init;
    var minimum = mini;
    var maximum = maxi;
    // Start Time Input preprocessing
    const startFrom_str = String(startFrom); //.toString().trim();
    if (startFrom_str.length !== 5) {
        res.sendStatus(400);
    }
    var startFromHour = startFrom_str.substring(0, 2);
    var startFromMinute = startFrom_str.substring(3, 5);


    // Finishing Time Input preprocessing
    const endAt_str = String(endAt); //.toString().trim();
    if (endAt_str.length !== 5) {
        res.sendStatus(400);
    }
    const endAtHour = endAt_str.substring(0, 2);
    const endAtMinute = endAt_str.substring(3, 5);

    const hour_difference = endAtHour - startFromHour;
    const minute_difference = endAtMinute - startFromMinute;

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


    const humidityList = [];

    var currentMinute, currentHour, temp_Value, humidity_Value;

    if (parameter.toString().trim() === 'humidity') {

	currentTime = String(startFrom);
	humidity_Value = parseFloat(initialHumidity);
        humidityList.push({currentTime, humidity_Value});
        for (var i = 0; i < valueCount; i++) {

            var initialValue = initialHumidity;
            temp_Value = (Math.random() * 1.8) + initialValue;

            if (startFromMinute < 45) {
                currentMinute = parseInt(startFromMinute) + 15;
                currentHour = parseInt(startFromHour);
                currentTime = String(currentHour) + ':' + String(currentMinute);
                if ((currentHour >= 6) && (currentHour <= 18)) {
                    humidity_Value = parseInt(initialValue) + (Math.random() * 2.5);

                } else {
                    humidity_Value = parseInt(initialValue) - (Math.random() * 2.5);

                }

                humidityList.push({currentTime, humidity_Value});

            } else if ((startFromMinute > 45) && (startFromMinute < 60)) {
                currentMinute = (parseInt(startFromMinute) + 15) - 60;
                currentHour = parseInt(startFromHour) + 1;
                currentTime = String(currentHour) + ':' + String(currentMinute);
                if ((currentHour >= 6) && (currentHour <= 18)) {
                    humidity_Value = parseInt(initialValue) + (Math.random() * 2.5);

                } else {
                    humidity_Value = parseInt(initialValue) - (Math.random() * 2.5);

                }

                humidityList.push({currentTime, humidity_Value});

            } else {
                console.log("Invalid Start Time Minute Input");
            }
            startFromHour = currentHour;
            startFromMinute = currentMinute;
            initialValue = temp_Value;
        }
        humidity_Value = humidity_Value + 0.3;
	currentTime = String(endAt);
        humidityList.push({currentTime, humidity_Value});
    } else {
        res.status(400);
    }
    console.log('humidity',humidityList);


const multichain = init.getMultichain();

  var stream_name="stream1"
  var num_alert = 0;

  humidityList.forEach(function(humid) {
	var key = humid.currentTime
	var data1 = humid.humidity_Value
	const json = '{"json":';
	const data = Buffer.from(JSON.stringify(data1), 'utf8').toString('hex');

	//conditions for alert
	if( (parseFloat(data1) > parseFloat(maximum) ) || ( parseFloat(data1) < parseFloat(minimum) ) ){

	  console.log("OOPS! Alert Generated! Humidity Value out of Range");
	  num_alert = num_alert + 1;
	  var multichain1 = initmc.getMultichain();

	  console.log("Publishing Humidity alerts to multichain");
	  var result = shell.exec("multichain-cli chain1 publish Humidity Alerts stream1 " + "'" + key + "' " + "'" + (String(data1)).toString("hex") + "'" , function(code, stdout, stderr) {
	  console.log(stdout);
	  })

	}


//*****************The end - condition for alerts  ******************//


//console.log("multichain-cli chain1 publish stream1 " + "'" + key  + "' " + "'" + data + "'")
//  console.log("Publishing to multichain");
  var result = shell.exec("multichain-cli chain1 publish stream1 " + "'" + key + "' " + "'" + data + "'" , function(code, stdout, stderr) {
  console.log(stdout);
  })
})

  console.log("Total Humidity Alerts : " + num_alert);
  res.json({param: 'humidity',humidityList});
}

