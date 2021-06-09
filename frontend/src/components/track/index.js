import React, { useState } from 'react';
import Chart from './temperature';
import Map from './map';
import CurrentTemperature from '../../assets/icons/thermometer.svg';
import PoChainOfCustody from './pochainofcustody';
import SoChainOfCustody from './sochainofcustody';
import AoChainOfCustody from "./aochainofcustody";
import Package from '../../assets/icons/package.svg';
import back from '../../assets/icons/back.png';
import searchingIcon from '../../assets/icons/searching@2x.png';
import './style.scss';

const Track = (props) => {
  const [value, setValue] = useState('');
  const [searchType, setSearchType] = useState('PO');
  const [visible, setVisible] = useState(false);
  const [op, setOp] = useState(-1);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const {
    poChainOfCustodyData,
    shippmentChainOfCustodyData,
    searchData,
    resetData,
  } = props;

  const onSearchChange = (e) => {
    setValue(e.target.value);
    setIsSubmitted(false);
    if (
      e.target.value.substring(0, 2) == 'SH' ||
      e.target.value.substring(0, 2) == 'sh'
    ) {
      setSearchType('SH');
      setOp(1);
    } else if (
      e.target.value.substring(0, 2) == 'PO' ||
      e.target.value.substring(0, 2) == 'po'
    ) {
      setSearchType('PO');
      setOp(-1);
    }
    else{
      setSearchType("AO");
      setOp(0);
    }
  };

  const onSeach = async () => {
    await searchData(value,searchType);
    setIsSubmitted(true);
  };


  const onkeydown = (event) => {
    if (event.keyCode === 13) {
      onSeach();
    }
  };

  return (
    <div className="track">
      <div className="row justify-content-between">
        <h1 className="breadcrumb">Track & Trace</h1>
      </div>
      <div className="row">
        {shippmentChainOfCustodyData.length > 0 &&
          <div className="col-6">
            <div className="row mb-4">
              <div className="col" style={{ minHeight: 400 }}>
                <Map />
              </div>
            </div>
          </div>}
        <div className="col row ml-3">
          {shippmentChainOfCustodyData.length == 0 ? (
            <>
              <div className="noOutline" tabIndex="-1" onKeyDown={onkeydown}>
                <div className="search-form">
                  <input
                    type="text"
                    placeholder="Enter Order ID,Shipment ID or AirWay BillNo."
                    onChange={onSearchChange}
                    //className="form-control border border-primary search-field"
                      className="form-control search-field border-8"
                    />
                  <img
                    src={searchingIcon}
                    onClick={onSeach}
                    className="searchIcon cursorP"
                    alt="searching"
                  />
                </div>
                {isSubmitted && (
                  <span className="text-danger">No data found</span>
                )}
              </div>
            </>
          ) : (
            <div className="col-12 noOutline">
              <div className="d-flex flex-row-reverse mb-2">
                {' '}
                <button
                  onClick={() => {
                    resetData();
                    setIsSubmitted(false);
                  }}
                  className="btn btn-outline-primary cursorP"
                >
                  <img src={back} height="17" className="mr-2 mb-1" />
                  <span className="fontSize20">Back to Search</span>
                </button>{' '}
              </div>
              {searchType == 'SH' && (
                <>
                  <div className=" panel commonpanle  bg-light">
                    <h6 className=" text-primary mb-4">CHAIN OF CUSTODY</h6>
                    <div className="row orderTxt">
                      <div className="col-1">
                        <div className="picture recived-bg">
                          <img src={Package} alt="package" />
                        </div>
                      </div>
                      <div className="col ml-1">
                        <div className="">
                            <div className="text-muted ">Shipment ID</div>
                          <div className="font-weight-bold ">
                            {shippmentChainOfCustodyData?.length > 0
                              ? poChainOfCustodyData[0].id
                              : 'NA'}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="pb-4">
                      {shippmentChainOfCustodyData.map((row, index) => { 
                        let newArr = [];
                        // if(row.id == value)
                        newArr = shippmentChainOfCustodyData.filter(rw => rw?.taggedShipments?.includes(value));
                        let cIndex = shippmentChainOfCustodyData.map((el) => el.id).indexOf(value) + 1;
                        cIndex = index < cIndex ? index : cIndex;
                       
                        return row?.shipmentUpdates?.filter(s => s.status == 'RECEIVED').map((r, i) => (
                          <SoChainOfCustody
                            len={row.shipmentUpdates.length}
                            i={i}
                            v={visible}
                            setV={setVisible}
                            level={i + 1}
                            key={i}
                            op={op}
                            setOp={setOp}
                            data={row}
                            update={r}
                            index={i + 3}
                            parentIndex={newArr.length && row.id != value ? cIndex : index }
                            pindex={
                              shippmentChainOfCustodyData.length - 1 == index
                                ? 1
                                : newArr.length && row.id != value ? newArr.length : 1 
                            }
                            container={2 + i}
                          />
                        ));
                      })}
                    </div>
                  </div>
                </>
              ) }
              {searchType == "PO"&&
              (
                <div className=" panel commonpanle  bg-light">
                  <h6 className=" text-primary mb-4">CHAIN OF CUSTODY</h6>
                  <div className="row orderTxt">
                    <div className="col-1">
                      <div className="picture recived-bg">
                        <img src={Package} alt="package" />
                      </div>
                    </div>
                    <div className="col ml-1">
                      <div className="">
                        <div className="text-muted ">Order ID</div>
                        <div className="font-weight-bold ">
                          {poChainOfCustodyData?.length > 0
                            ? poChainOfCustodyData[0].id
                            : 'NA'}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="pb-4">
                    {poChainOfCustodyData.map((row, index) => (
                      <PoChainOfCustody
                        key={index}
                        shippmentChainOfCustodyData={
                          shippmentChainOfCustodyData
                        }
                        data={row}
                        index="1"
                        pindex="1"
                        container="0"
                      />
                    ))}
                  </div>
                </div>
              )}
              {searchType == "AO"&&
              (
                <>
                  <div className=" panel commonpanle  bg-light">
                    <h6 className=" text-primary mb-4">CHAIN OF CUSTODY</h6>
                    <div className="row orderTxt">
                      <div className="col-1">
                        <div className="picture recived-bg">
                          <img src={Package} alt="package" />
                        </div>
                      </div>
                      <div className="col ml-1">
                        <div className="">
                            <div className="text-muted ">AirWay BillNo</div>
                          <div className="font-weight-bold ">
                            {shippmentChainOfCustodyData?.length > 0
                              ? poChainOfCustodyData[0].airWayBillNo
                              : 'NA'}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="pb-4">
                      {shippmentChainOfCustodyData.map((row, index) => { 
                        let newArr = [];
                        // if(row.id == value)
                        newArr = shippmentChainOfCustodyData.filter(rw => rw?.taggedShipments?.includes(value));
                        let cIndex = shippmentChainOfCustodyData.map((el) => el.id).indexOf(value) + 1;
                        cIndex = index < cIndex ? index : cIndex;
                       
                        return row?.shipmentUpdates?.filter(s => s.status == 'RECEIVED').map((r, i) => (
                          <AoChainOfCustody
                            len={row.shipmentUpdates.length}
                            i={i}
                            v={visible}
                            setV={setVisible}
                            level={i + 1}
                            key={i}
                            op={op}
                            setOp={setOp}
                            data={row}
                            update={r}
                            index={i + 3}
                            parentIndex={newArr.length && row.id != value ? cIndex : index }
                            pindex={
                              shippmentChainOfCustodyData.length - 1 == index
                                ? 1
                                : newArr.length && row.id != value ? newArr.length : 1 
                            }
                            container={2 + i}
                          />
                        ));
                      })}
                    </div>
                  </div>
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
export default Track;
