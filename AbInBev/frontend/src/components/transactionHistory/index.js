import React from "react";
import "./style.scss";
import inTransitIcon from "../../assets/intransit.png";
import attachIcon from "../../assets/attach.png";
import receivedIcon from "../../assets/received.png";
import sentIcon from "../../assets/sent.png";
import SideBar from "../../components/sidebar";

const TransactionHistory = (props) => {
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-2 d-none d-md-block padding0 greyBG">
          <SideBar {...props} />
        </div>
        <main role="main" className="col-md-9 ml-sm-auto col-lg-10">
          <div className="row">
            <div className="col-md-9 mainContainer pt-3 px-4">
              <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pb-2 mb-3">
                <h1 className="h2">Transactions</h1>
                <div className="btn-toolbar mb-2 mb-md-0">
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" className="bi bi-bell" viewBox="0 0 16 16">
                    <path d="M8 16a2 2 0 0 0 2-2H6a2 2 0 0 0 2 2zM8 1.918l-.797.161A4.002 4.002 0 0 0 4 6c0 .628-.134 2.197-.459 3.742-.16.767-.376 1.566-.663 2.258h10.244c-.287-.692-.502-1.49-.663-2.258C12.134 8.197 12 6.628 12 6a4.002 4.002 0 0 0-3.203-3.92L8 1.917zM14.22 12c.223.447.481.801.78 1H1c.299-.199.557-.553.78-1C2.68 10.2 3 6.88 3 6c0-2.42 1.72-4.44 4.005-4.901a1 1 0 1 1 1.99 0A5.002 5.002 0 0 1 13 6c0 .88.32 4.2 1.22 6z"/>
                  </svg>
                </div>
              </div>
              <div class="btn-group mainButtonFilter">
                <a href="#!" class="btn active">All</a>
                <a href="#!" class="btn">Sent</a>
                <a href="#!" class="btn">Received</a>
                <a href="#!" class="btn">In-Transit</a>
                <a href="#!" class="btn">Added</a>
              </div>

              <div className="productList">
                <span className="transactionListDate">December 12, 2021</span>
                <div className="transactionListContainer">
                  <div className="productContainer">
                    <div className="productItem ">
                      <div className="iconGroup">
                        <div className="productIcon inTransit">
                          <img
                            src={inTransitIcon}
                            class="icon-thumbnail-img"
                            alt=""
                          />  
                        </div>
                        <div>
                          <span className="transactionTitle">Suvarna Durga Bottles Pvt. Ltd.</span><br/>
                          <span className="transactionDate">02/12/2019, 02:12PM</span>
                        </div>
                        
                      </div>
                    </div>
                    <div className="productItem">
                      Chintalakunta, Hyderabad
                    </div>
                    <div className="productItem">
                      <div className="productStatus"><span class="statusbadge transitBadge"></span> Received</div> 
                    </div>
                    <div className="productItem">
                      123456.jpg
                    </div>
                    <div className="productItem productQuantity">
                      9548
                    </div>
                  </div>

                  <div className="productContainer">
                    <div className="productItem ">
                      <div className="iconGroup">
                        <div className="productIcon added">
                          <img
                            src={inTransitIcon}
                            class="icon-thumbnail-img"
                            alt=""
                          />  
                        </div>
                        <div>
                          <span className="transactionTitle">Suvarna Durga Bottles Pvt. Ltd.</span><br/>
                          <span className="transactionDate">02/12/2019, 02:12PM</span>
                        </div>
                        
                      </div>
                    </div>
                    <div className="productItem">
                      Chintalakunta, Hyderabad
                    </div>
                    <div className="productItem">
                      <div className="productStatus"><span class="statusbadge addedBadge"></span> Added</div> 
                    </div>
                    <div className="productItem">
                      123456.jpg
                    </div>
                    <div className="productItem productQuantity">
                      9548
                    </div>
                  </div>

                  <div className="productContainer">
                    <div className="productItem ">
                      <div className="iconGroup">
                        <div className="productIcon sent">
                          <img
                            src={inTransitIcon}
                            class="icon-thumbnail-img"
                            alt=""
                          />  
                        </div>
                        <div>
                          <span className="transactionTitle">Suvarna Durga Bottles Pvt. Ltd.</span><br/>
                          <span className="transactionDate">02/12/2019, 02:12PM</span>
                        </div>
                        
                      </div>
                    </div>
                    <div className="productItem">
                      Chintalakunta, Hyderabad
                    </div>
                    <div className="productItem">
                      <div className="productStatus"><span class="statusbadge sentBadge"></span> Sent</div> 
                    </div>
                    <div className="productItem">
                      123456.jpg
                    </div>
                    <div className="productItem productQuantity">
                      9548
                    </div>
                  </div>

                </div>
              </div>

              <div className="productList">
                <span className="transactionListDate">December 12, 2021</span>
                <div className="transactionListContainer">
                  <div className="productContainer">
                    <div className="productItem ">
                      <div className="iconGroup">
                        <div className="productIcon inTransit">
                          <img
                            src={inTransitIcon}
                            class="icon-thumbnail-img"
                            alt=""
                          />  
                        </div>
                        <div>
                          <span className="transactionTitle">Suvarna Durga Bottles Pvt. Ltd.</span><br/>
                          <span className="transactionDate">02/12/2019, 02:12PM</span>
                        </div>
                        
                      </div>
                    </div>
                    <div className="productItem">
                      Chintalakunta, Hyderabad
                    </div>
                    <div className="productItem">
                      <div className="productStatus"><span class="statusbadge transitBadge"></span> Received</div> 
                    </div>
                    <div className="productItem">
                      123456.jpg
                    </div>
                    <div className="productItem productQuantity">
                      9548
                    </div>
                  </div>

                  <div className="productContainer">
                    <div className="productItem ">
                      <div className="iconGroup">
                        <div className="productIcon added">
                          <img
                            src={inTransitIcon}
                            class="icon-thumbnail-img"
                            alt=""
                          />  
                        </div>
                        <div>
                          <span className="transactionTitle">Suvarna Durga Bottles Pvt. Ltd.</span><br/>
                          <span className="transactionDate">02/12/2019, 02:12PM</span>
                        </div>
                        
                      </div>
                    </div>
                    <div className="productItem">
                      Chintalakunta, Hyderabad
                    </div>
                    <div className="productItem">
                      <div className="productStatus"><span class="statusbadge addedBadge"></span> Added</div> 
                    </div>
                    <div className="productItem">
                      123456.jpg
                    </div>
                    <div className="productItem productQuantity">
                      9548
                    </div>
                  </div>

                  <div className="productContainer">
                    <div className="productItem ">
                      <div className="iconGroup">
                        <div className="productIcon sent">
                          <img
                            src={inTransitIcon}
                            class="icon-thumbnail-img"
                            alt=""
                          />  
                        </div>
                        <div>
                          <span className="transactionTitle">Suvarna Durga Bottles Pvt. Ltd.</span><br/>
                          <span className="transactionDate">02/12/2019, 02:12PM</span>
                        </div>
                        
                      </div>
                    </div>
                    <div className="productItem">
                      Chintalakunta, Hyderabad
                    </div>
                    <div className="productItem">
                      <div className="productStatus"><span class="statusbadge sentBadge"></span> Sent</div> 
                    </div>
                    <div className="productItem">
                      123456.jpg
                    </div>
                    <div className="productItem productQuantity">
                      9548
                    </div>
                  </div>

                </div>
              </div>
            </div>
            <div className="col-md-3 rightSideMenu pt-3 px-2">
              
            </div>
          </div> 
        </main>
      </div>
    </div>   
  );
};
export default TransactionHistory;
