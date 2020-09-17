import React, { useState } from 'react';

const POModal = props => {
  const { purchaseOrder, userAddress, onAccept, onReject } = props;
  const po = JSON.parse(purchaseOrder.data);
  const receiverAddress = po.receiver.address;
  return (
    <div>
      Purchase Order
      {purchaseOrder.status === 'Received' &&
        userAddress === receiverAddress && (
          <div>
            <button onClick={() => onAccept('Accepted')}>Accept</button>
            <button onClick={() => onReject('Rejected')}>Reject</button>
          </div>
        )}
      {purchaseOrder.status === 'Approved' &&
        userAddress === receiverAddress && (
          <div>
            <button>Create Shipment</button>
          </div>
        )}
    </div>
  );
};

export default POModal;
