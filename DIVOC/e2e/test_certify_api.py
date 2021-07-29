import json
import requests as r
import sys
import time
import utils
import random

VACCINATION_API = "http://vaccination_api:8000" + "/divoc/api/v1/"
CERTIFY_REQUEST_BODY = "test_data/certify.json"

def service_check():
    try:
        vacc_api_resp = r.get(VACCINATION_API + "ping")
        registry_resp = r.get(utils.REGISTRY_SEARCH)
    except Exception as e:
        print("Error : %s" % (e))
        return False
    return (vacc_api_resp.status_code == 200) and (registry_resp.status_code == 200)

def call_and_verify():
    cid = str(random.randint(1e11, 1e12))
    print("Creating certificate %s"%cid)
    old_certs = utils.fetch_certificates(cid);
    print("User has %s old certificates" % (len(old_certs)))

    headers = {
        'Authorization' : 'Bearer ' + utils.fetch_auth_token(),
        'Content-Type': 'application/json'
    }
    certify_data = json.load(open(CERTIFY_REQUEST_BODY))[0]
    certify_data["preEnrollmentCode"] = cid
    certify_res = r.post(VACCINATION_API + "certify", headers=headers, json=[certify_data])
    assert certify_res.status_code == 200, "post /cerify call failed. Response code : {code}".format(code = certify_res.status_code)
    print("Cerify request sent")
    
    new_certs = []
    max_tries = 12
    for i in range(max_tries):
        print("Fetching certificates...., try no : %s" % (i+1))
        new_certs = utils.fetch_certificates(cid)
        if(len(new_certs) == len(old_certs) + 1):
            latest_cert = [x for x in new_certs if x not in old_certs][0]
            assert latest_cert["name"] == certify_data["recipient"]["name"], "recipient name mismatch"
            assert latest_cert["mobile"] == certify_data["recipient"]["contact"][0][4:], "recipient contact mismatch"
            print("Test Certify Successful")
            break;
        print("No new Certificate found")
        time.sleep(5)
    assert len(new_certs) == len(old_certs) + 1, "Cerrificate creation failed"

def test_certify():
    test_ran = False
    ping_retries = 24
    for i in range(ping_retries):
        print("Trying to ping...., try no : %s", i+1)
        if(service_check()):
            print("Ping successful. Starting tests")
            call_and_verify()
            test_ran = True
            break
        print("Ping failed. Services not ready")
        time.sleep(5)
    if(not test_ran):
        exit(1)
