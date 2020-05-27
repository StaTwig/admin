import React from 'react';
import Modal from '../../shared/modal';
import PurchaseFormReview from './purchaseFormReview';

const ReviewPo = props => {
  
  return (
    <div className="reviewPo">

      
      <Modal
    
          title="Create Purchase Order"
          size="modal-xl" //for other size's use `modal-lg, modal-md, modal-sm`
          buttonclassName="btn-orange"
        >
          <PurchaseFormReview />
        </Modal>
      
    </div>
  );
};

export default ReviewPo;
