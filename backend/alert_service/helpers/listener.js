async function alertListener(event) {
  try {
    const txnId =
      event?.transactionId ||
      event?.payloadData?.data?.id ||
      event?.payloadData?.data?.order_id;
    if (event.eventTypeDesc == "SHIPMENT") await processShipmentEvents(event);
    else if (event.eventTypeDesc == "ORDER") await processOrderEvents(event);
    else if (event.eventTypeDesc == "SHIPMENT_TRACKING")
      await processShipmentEvents(event);
    for await (const user of EmployeeModel.find({
      organisationId: event.actorOrgId,
    })) {
      alertPushNotification(event, user.id);
      if (event.eventTypeDesc == "SHIPMENT")
        pushNotification(event, user.id, "TRANSACTION", txnId);
      else pushNotification(event, user.id, "ALERT", txnId);
    }
    let params = {
      "alerts.event_type_primary": event.eventTypePrimary,
      "alerts.event_type_secondary": event.eventTypeDesc,
      "alerts.actorOrgId": event.actorOrgId,
    };
    for await (const row of Alert.find({
      ...params,
    })) {
      if (row.alertMode.mobile) {
        alertMobile(event, row.user.mobile_number);
      }
      if (row.alertMode.email) {
        alertEmail(event, row.user.emailId);
      }
    }
  } catch (err) {
    console.log(err);
  }
}
