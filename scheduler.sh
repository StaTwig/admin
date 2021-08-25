curl --location --request POST 'http://localhost:80/divoc/api/citizen/facility/slots/init?force=true'
echo "Last initialized on: $(date)" > init.log
