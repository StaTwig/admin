import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import './style.scss';
import inTransitIcon from '../../assets/intransit.png';
import SideBar from '../../components/sidebar';
import filterIcon from '../../assets/icons/funnel.svg';
import {
  getTransactions,
  fetchShipment,
  fetchChallanImage,
  getImage,
} from '../../actions/transactionAction';
import Moment from 'react-moment';
import setAuthToken from '../../utils/setAuthToken';
import { func } from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { config } from '../../config';
import {
  getAllStates,
  getDistrictsByState,
  getOrganizationsByType,
} from '../../actions/inventoryAction';
import ModalImage from 'react-modal-image';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
}));
const TransactionHistory = (props) => {
  const dispatch = useDispatch();
  const [transactions, setTransactions] = useState([]);
  const [displayTransactions, setDisplayTransactions] = useState([]);
  const [inBound, setinBound] = useState([]); //being used for recieved
  const [inTransit, setinTransit] = useState([]);
  const [sent, setSent] = useState([]);
  const [Added, setAdded] = useState([]);
  const [image, setImage] = useState('');

  const [dateClassName, setdateClassName] = useState('transactionListDate');

  const [states, setStates] = useState([]);
  const [districts, setDistricts] = useState([]);

  const [selectedTransactionType, setSelectedTransactionType] = useState('ALL');
  const [selectedOrganizationType, setSelectedOrganizationType] =
    useState('BREWERY');
  const [selectedDateType, setSelectedDateType] = useState('by_yearly');
  const [selectedVendorType, setSelectedVendorType] = useState('ALL_VENDORS');

  const [organizations, setOrganizations] = useState([]);

  const [filterVisibility, setFilterVisibility] = useState({
    state: true,
    district: false,
    organization: false,
  });
  const [filters, setFilters] = useState({
    state: '',
    district: '',
    transactionType: 'ALL',
    sku: '',
    organizationType: 'BREWERY',
    vendorType: 'ALL_VENDORS',
    date_filter_type: 'by_yearly',
    startDate: new Date(),
    endDate: new Date(),
    year: new Date().getFullYear(),
    month: new Date().getMonth() + 1,
    quarter: 1,
  });

  const defaultFilters = {
    state: '',
    district: '',
    transactionType: 'ALL',
    sku: '',
    organizationType: 'BREWERY',
    vendorType: 'ALL_VENDORS',
    date_filter_type: 'by_yearly',
    startDate: new Date(),
    endDate: new Date(),
    year: new Date().getFullYear(),
    month: new Date().getMonth() + 1,
    quarter: 1,
  };

  const onStartDateChange = (event) => {
    const _filters = { ...filters };
    _filters.startDate = event.target.value;
    setFilters(_filters);
    // applyFilters(_filters);
  };

  const onEndDateChange = (event) => {
    const _filters = { ...filters };
    _filters.endDate = event.target.value;
    setFilters(_filters);
    applyFilters(_filters);
  };

  const onTransactionTypeChange = (transactionType) => {
    setSelectedTransactionType(transactionType);
    const _filters = { ...filters };
    _filters.transactionType = transactionType;
    setFilters(_filters);
    applyFilters(_filters);
  };
  const onOrganizationTypeChange = (organizationType) => {
    setSelectedOrganizationType(organizationType);
    const _filters = { ...filters };
    _filters.organizationType = organizationType;
    _filters.state = '';
    _filters.district = '';
    _filters.organization = '';
    _filters.vendorType = 'ALL_VENDORS';
    setFilters(_filters);
    setSelectedVendorType('ALL_VENDORS');
    applyFilters(_filters);
  };
  const onDateTypeChange = (dateType) => {
    setSelectedDateType(dateType);
    const _filters = { ...filters };
    _filters.date_filter_type = dateType;
    setFilters(_filters);
    applyFilters(_filters);
  };
  const onVendorTypeChange = (vendorType) => {
    setSelectedVendorType(vendorType);
    const _filters = { ...filters };
    _filters.vendorType = vendorType;
    _getOrganizationsByType(_filters);
    setFilters(_filters);
    applyFilters(_filters);
  };

  const toFixed2 = (input) => {
    if (!input) return 0;
    return input.toFixed(2);
  };

  const _getAllStates = async () => {
    const response = await dispatch(getAllStates());
    const _states = response.data ? response.data : [];
    setStates([_states]);
  };

  const _getOrganizationsByType = async (filters) => {
    const response = await dispatch(getOrganizationsByType(filters));
    const _organizations = response.data ? response.data : [];
    setOrganizations(_organizations);
  };

  const _getDistrictsByState = async (_state) => {
    const response = await dispatch(getDistrictsByState(_state));
    const _districts = response.data ? response.data : [];
    setDistricts(_districts);
  };

  function formatDate(date) {
    var d = new Date(date),
      month = '' + (d.getMonth() + 1),
      day = '' + d.getDate(),
      year = d.getFullYear();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    return [day, month, year].join('-');
  }

  const onStateSelection = (event) => {
    const selectedState = event.target.value;
    const _filters = { ...filters };
    _filters.state = selectedState;
    setFilters(_filters);
    applyFilters(_filters);
    _getDistrictsByState(selectedState);
    _getOrganizationsByType(_filters);

    const _filterVisibility = { ...filterVisibility };
    _filterVisibility.district = true;
    _filterVisibility.organization = true;
    setFilterVisibility(_filterVisibility);
  };
  const onDistrictSelection = (event) => {
    const selectedDistrict = event.target.value;
    const _filters = { ...filters };
    _filters.district = selectedDistrict;
    setFilters(_filters);
    _getOrganizationsByType(_filters);
    applyFilters(_filters);
  };

  const onOrganizationChange = (event) => {
    const selectedOrganization = event.target.value;
    const _filters = { ...filters };
    _filters.organization = selectedOrganization;
    setFilters(_filters);
    applyFilters(_filters);
  };

  const resetFilters = () => {
    let _filters = defaultFilters;
    if (selectedOrganizationType == 'BREWERY') {
      _filters = { ...filters };
      _filters.state = '';
      _filters.district = '';
      _filters.organization = '';
      _filters.year = new Date().getFullYear();
      _filters.month = new Date().getMonth() + 1;
      _filters.quarter = 1;
      _filters.startDate = new Date();
      _filters.date_filter_type = 'by_yearly';
      _filters.endDate = new Date();
      _filters.organizationType = 'BREWERY';
      setSelectedOrganizationType('BREWERY');
    } else {
      _filters = { ...filters };
      _filters.state = '';
      _filters.district = '';
      _filters.organizationType = 'VENDOR';
      _filters.organization = '';
      _filters.year = new Date().getFullYear();
      _filters.month = new Date().getMonth() + 1;
      _filters.quarter = 1;
      _filters.date_filter_type = 'by_yearly';
      _filters.startDate = new Date();
      _filters.endDate = new Date();
      setSelectedVendorType('ALL_VENDORS');
      setSelectedOrganizationType('VENDOR');
    }
    setFilters(_filters);
    setSelectedIndex(null);
    setSelectedTransaction(null);
    setSelectedTransactionType('ALL');

    setSelectedDateType('by_yearly');
    applyFilters(_filters);
  };

  const allowedMonths = [
    { key: 1, value: 'Jan' },
    { key: 2, value: 'Feb' },
    { key: 3, value: 'Mar' },
    { key: 4, value: 'Apr' },
    { key: 5, value: 'May' },
    { key: 6, value: 'Jun' },
    { key: 7, value: 'Jul' },
    { key: 8, value: 'Aug' },
    { key: 9, value: 'Sept' },
    { key: 10, value: 'Oct' },
    { key: 11, value: 'Nov' },
    { key: 12, value: 'Dec' },
  ];
  let thisYear = new Date().getFullYear();
  const allowedYears = [];
  for (let i = 0; i < 21; i++) {
    allowedYears.push(thisYear - i);
  }

  const onYearChange = (event) => {
    const selectedYear = event.target.value;
    const _filters = { ...filters };
    _filters.year = selectedYear;
    setFilters(_filters);
    applyFilters(_filters);
  };

  const onMonthChange = (event) => {
    const selectedMonth = event.target.value;
    const _filters = { ...filters };
    _filters.month = selectedMonth;
    setFilters(_filters);
    applyFilters(_filters);
  };

  const onQuarterChange = (event) => {
    const selectedQuarter = event.target.value;
    const _filters = { ...filters };
    _filters.quarter = selectedQuarter;
    setFilters(_filters);
    applyFilters(_filters);
  };

  const [selectedTransaction, setSelectedTransaction] = useState(null);
  const [selectedIndex, setSelectedIndex] = useState();

  const selectTransaction = async (transaction, index) => {
    if (index === selectedIndex) {
      setSelectedIndex(null);
      setSelectedTransaction(null);
    } else {
      const result = await dispatch(fetchShipment(transaction.id));
      setSelectedTransaction(result.data);
      if (result.data.imageDetails.length)
        getImageURL(result.data.imageDetails[0]);
      else setImage('');
      setSelectedIndex(index);
    }
  };

  const getImageURL = async (imageId) => {
    const r = await getImage(imageId);
    // const reader = new window.FileReader();
    // reader.readAsDataURL(r.data);
    // reader.onload = function () {
    //   setImage(reader.result);
    // };
    setImage(r.data.data);
  };

  const getSumByProperty = (inputArr, key) => {
    return inputArr
      .map((item) => parseInt(item[key]) || 0)
      .reduce((prev, next) => prev + next);
  };

  async function applyFilters(_filters) {
    const results = await dispatch(getTransactions(_filters));
    let addedarray = [];
    let date;
    results.data.forEach((b) => {
      let a = b;
      if (date !== formatDate(a.createdAt)) {
        date = formatDate(a.createdAt);
        a.shippingDates = true;
      } else {
        a.shippingDates = false;
      }
      if (a.status === 'CREATED') {
        a.status = 'SENT';
        addedarray.push(a);
      }
      if (a.status === 'RECEIVED' && a.supplier.id === props.user.id) {
        a.status = 'SENT';
        addedarray.push(a);
      }
      if (a.status === 'RECEIVED') inBound.push(a);
      if (a.status === 'SENT') sent.push(a);
      if (a.status === 'INTRANSIT') inTransit.push(a);
    });
    let _transactions = [];
    if (results && results.data) {
      _transactions = results.data.filter((trxn) => {
        let isDevTrxn = false;
        if (
          trxn.supplier.org.name === 'dev@statwigorg' ||
          trxn.supplier.org.name === 'Statwig'
        ) {
          isDevTrxn = true;
        }
        if (
          trxn.receiver.org.name === 'dev@statwigorg' ||
          trxn.receiver.org.name === 'Statwig'
        ) {
          isDevTrxn = true;
        }
        return !isDevTrxn;
      });
    }
    setDisplayTransactions(_transactions);
    setTransactions(_transactions);
  }
  useEffect(() => {
    (async () => {
      _getAllStates();
      const results = await dispatch(getTransactions(filters));
      let addedarray = [];
      let date;
      results.data.forEach((b) => {
        let a = b;
        if (date !== formatDate(a.createdAt)) {
          date = formatDate(a.createdAt);
          a.shippingDates = true;
        } else {
          a.shippingDates = false;
        }
        if (a.status === 'CREATED') {
          a.status = 'SENT';
          addedarray.push(a);
        }
        if (a.status === 'RECEIVED' && a.supplier.id === props.user.id) {
          a.status = 'SENT';
          addedarray.push(a);
        }
        if (a.status === 'RECEIVED') inBound.push(a);
        if (a.status === 'SENT') sent.push(a);
        if (a.status === 'INTRANSIT') inTransit.push(a);
      });
      let transactions = [];
      if (results && results.data) {
        results.data = results.data.filter((trxn) => {
          let isDevTrxn = false;
          if (
            trxn.supplier.org.name === 'dev@statwigorg' ||
            trxn.supplier.org.name === 'Statwig'
          ) {
            isDevTrxn = true;
          }
          if (
            trxn.receiver.org.name === 'dev@statwigorg' ||
            trxn.receiver.org.name === 'Statwig'
          ) {
            isDevTrxn = true;
          }
          return !isDevTrxn;
        });
      }
      setDisplayTransactions(results.data);
      setTransactions(results.data);
      // setAdded(addedarray);
    })();
  }, []);

  const displayComment = (comment) => {
    let rtn = comment;
    switch (comment) {
      case 'Receive_comment_1':
        rtn = 'Damaged in transit';
        break;
      case 'Receive_comment_2':
        rtn = 'Chipping';
        break;
      case 'Receive_comment_3':
        rtn = 'Dirty Bottles';
        break;
      case 'Receive_comment_4':
        rtn = 'Wrong count';
        break;
      case 'Receive_comment_5':
        rtn = 'Wrong count';
        break;

      default:
        break;
    }
    return rtn;
  };

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
              </div>
              <div className="btn-group mainButtonFilter">
                <a
                  className={`btn ${
                    selectedTransactionType === 'ALL' ? 'active' : ''
                  }`}
                  onClick={() => {
                    onTransactionTypeChange('ALL');
                  }}
                >
                  ALL
                </a>
                <a
                  className={`btn ${
                    selectedTransactionType === 'SENT' ? 'active' : ''
                  }`}
                  onClick={() => {
                    onTransactionTypeChange('SENT');
                  }}
                >
                  Sent
                </a>
                <a
                  className={`btn ${
                    selectedTransactionType === 'RECEIVED' ? 'active' : ''
                  }`}
                  onClick={() => {
                    onTransactionTypeChange('RECEIVED');
                  }}
                >
                  Received
                </a>
              </div>

              <div className="productList">
                <div className="productListHeader col-md-12">
                  <div className="col-md-6">Particulars</div>
                  <div className="col-md-3">Status</div>
                  <div className=" col-md-3">Quantity</div>
                </div>
                {displayTransactions.length == 0 && (
                  <div className="text-center"> No data found</div>
                )}

                {displayTransactions.map((transaction, index) => (
                  <div key={index}>
                    {transaction.shippingDates ? (
                      <span className={dateClassName}>
                        <Moment format="MMM Do, YYYY">
                          {transaction.createdAt}
                        </Moment>
                      </span>
                    ) : (
                      ''
                    )}
                    <div
                      className={`transactionListContainer ${
                        selectedIndex === index ? 'activeTxnContainer' : ''
                      }`}
                    >
                      <div
                        className={`productConainer ${
                          selectedIndex === index ? 'productDetailActive' : ''
                        }`}
                      >
                        <div
                          className={`productContainerListItem col-md-12`}
                          onClick={() => selectTransaction(transaction, index)}
                        >
                          <div className="productItem col-md-6">
                            <div className="iconGroup">
                              <div className="productIcon inTransit">
                                <img
                                  src={inTransitIcon}
                                  className="icon-thumbnail-img"
                                  alt=""
                                />
                              </div>
                              <div>
                                <span className="transactionTitle">
                                  {transaction.receiver.org.name}
                                </span>
                                <br />
                                <span className="transactionDate">
                                  <Moment format="MMMM Do YYYY, h:mm a">
                                    {transaction.createdAt}
                                  </Moment>
                                </span>
                                <br />
                                <span className="transactionDate">
                                  <span>FROM:</span>{' '}
                                  {transaction.receiver.org.type ===
                                    'BREWERY' &&
                                  (transaction.supplier.org.type === 'S2' ||
                                    transaction.supplier.org.type === 'S3')
                                    ? transaction.supplier.org?.S1?.name
                                    : transaction.supplier.org.name}{' '}
                                  - TO: {transaction.receiver.org.name}
                                </span>
                              </div>
                            </div>
                          </div>
                          <div className="productItem col-md-3">
                            {transaction.status === 'RECEIVED' && (
                              <div className="productStatus">
                                <span className="statusbadge receivedBadge"></span>{' '}
                                RECEIVED
                              </div>
                            )}
                            {transaction.status === 'SENT' && (
                              <div className="productStatus">
                                <span className="statusbadge sentBadge"></span>{' '}
                                SENT
                              </div>
                            )}
                            {transaction.status === 'INTRANSIT' && (
                              <div className="productStatus">
                                <span className="statusbadge transitBadge"></span>{' '}
                                IN TRANSIT
                              </div>
                            )}
                            {transaction.status === 'CREATED' && (
                              <div className="productStatus">
                                <span className="statusbadge addedBadge"></span>{' '}
                                ADDED
                              </div>
                            )}
                          </div>
                          <div className="productItem productQuantity col-md-3">
                            {transaction.products.reduce(
                              (a, v) => (a = a + v.productQuantity),
                              0,
                            )}
                          </div>
                        </div>
                        {selectedIndex === index ? <hr /> : ''}
                        {selectedIndex === index ? (
                          <>
                            <div className="productDetail">
                              <div className="row">
                                <div
                                  className="col-md-6"
                                  style={{ 'margin-bottom': '5px' }}
                                >
                                  <span className="productHeader">
                                    Vendor:&nbsp;
                                  </span>
                                  <span>
                                    {selectedTransaction.supplier &&
                                    selectedTransaction.supplier.org
                                      ? selectedTransaction.supplier.org.name
                                      : ''}
                                  </span>
                                </div>
                              </div>
                              <div className="row">
                                <div className="col-md-3">
                                  <span className="productHeader">
                                    Transaction ID:&nbsp;
                                  </span>
                                  <span>{transaction.id}</span>
                                </div>
                                <div className="col-md-3">
                                  <span className="productHeader">
                                    Status: &nbsp;
                                  </span>
                                  <span>{selectedTransaction.status}</span>
                                </div>
                                <div className="col-md-3">
                                  <span className="productHeader">
                                    Sent Date: &nbsp;
                                  </span>
                                  <span>
                                    <Moment format="DD/MM/YY">
                                      {selectedTransaction.createdAt}
                                    </Moment>
                                    {/* {new Date(selectedTransaction.createdAt)
                                      .toISOString()
                                      .slice(0, 10)} */}
                                  </span>
                                </div>
                                {selectedTransaction.status == 'RECEIVED' && (
                                  <div className="col-md-3 p-0">
                                    <span className="productHeader">
                                      Received Date: &nbsp;
                                    </span>
                                    <span>
                                      <Moment format="DD/MM/YY">
                                        {selectedTransaction.updatedAt}
                                      </Moment>
                                      {/* {new Date(selectedTransaction.createdAt)
                                      .toISOString()
                                      .slice(0, 10)} */}
                                    </span>
                                  </div>
                                )}
                                <div
                                  className={`col-md-3 ${
                                    selectedTransaction.status == `RECEIVED`
                                      ? `pt-3`
                                      : ``
                                  }`}
                                >
                                  <span className="productHeader">
                                    Challan No: &nbsp;
                                  </span>
                                  <span>
                                    {selectedTransaction.airWayBillNo}
                                  </span>
                                </div>
                                {/* <div className="col-md-3">
                                  <span>Truck No:</span><span>{selectedTransaction.externalShipmentId}</span>
                                </div> */}
                              </div>
                              <div className="row">
                                {selectedTransaction.imageDetails.length >
                                  0 && (
                                  <ModalImage
                                    small={image}
                                    className="challanImage"
                                    large={image}
                                    showRotate={true}
                                    hideZoom={false}
                                    alt="Challan Image"
                                  />
                                )}
                              </div>
                              <div className=" transactionProducts row">
                                {selectedTransaction.products.length ? (
                                  <>
                                    <table>
                                      <thead>
                                        <tr>
                                          <th className="productHeader">
                                            Manufacturer
                                          </th>
                                          <th className="productHeader">
                                            Product
                                          </th>
                                          <th className="productHeader">
                                            Quantity Sent
                                          </th>
                                          <th className="productHeader">
                                            Quantity Received
                                          </th>
                                          <th className="productHeader">
                                            Comments
                                          </th>
                                        </tr>
                                      </thead>
                                      <tbody>
                                        {selectedTransaction.products.map(
                                          (product) => {
                                            return (
                                              <>
                                                <tr>
                                                  <td>
                                                    {product.manufacturer}
                                                  </td>
                                                  <td>{product.productName}</td>
                                                  <td>
                                                    {product.productQuantity}
                                                  </td>
                                                  <td>
                                                    {
                                                      product.productQuantityDelivered
                                                    }
                                                  </td>
                                                  <td>
                                                    {selectedTransaction
                                                      .shipmentUpdates.length > 1 ? selectedTransaction
                                                      .shipmentUpdates[1]
                                                      .updateComment != ''
                                                      ? displayComment(
                                                          selectedTransaction
                                                            .shipmentUpdates[1]
                                                            .updateComment,
                                                        )
                                                      : '-' : '-'}
                                                  </td>
                                                </tr>
                                              </>
                                            );
                                          },
                                        )}
                                        {selectedTransaction?.products
                                          ?.length ? (
                                          <>
                                            <tr>
                                              <td></td>
                                              <td className="productHeader">
                                                Total
                                              </td>
                                              <td className="productHeader">
                                                {getSumByProperty(
                                                  selectedTransaction.products,
                                                  'productQuantity',
                                                )}
                                              </td>
                                              <td className="productHeader">
                                                {getSumByProperty(
                                                  selectedTransaction.products,
                                                  'productQuantityDelivered',
                                                )}
                                              </td>
                                            </tr>
                                          </>
                                        ) : (
                                          ''
                                        )}
                                      </tbody>
                                    </table>
                                  </>
                                ) : (
                                  ''
                                )}
                              </div>
                              <div className="row rejectionRateRow">
                                <span>
                                  Rejection Rate:{' '}
                                  {toFixed2(selectedTransaction.rejectionRate)}%{' '}
                                </span>
                              </div>
                            </div>
                          </>
                        ) : (
                          ''
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="col-md-3 rightSideMenu pt-4 px-2">
              <div className="filterSection">
                <div className="filterHeader">
                  <img src={filterIcon} className="filterIcon" /> FILTERS
                </div>

                <div className="btn-group filterButton mt-4">
                  <a
                    className={`btn ${
                      selectedOrganizationType === 'BREWERY' ? 'active' : ''
                    }`}
                    onClick={() => {
                      onOrganizationTypeChange('BREWERY');
                    }}
                  >
                    BREWERY
                  </a>
                  <a
                    className={`btn ${
                      selectedOrganizationType === 'VENDOR' ? 'active' : ''
                    }`}
                    onClick={() => {
                      onOrganizationTypeChange('VENDOR');
                    }}
                  >
                    VENDOR
                  </a>
                </div>

                <label className="filterSubHeading mt-2">Time Period</label>
                <div className="btn-group filterButton mt-2">
                  <a
                    className={`btn ${
                      selectedDateType === 'by_range' ? 'active' : ''
                    }`}
                    onClick={() => {
                      onDateTypeChange('by_range');
                    }}
                  >
                    Date Range
                  </a>
                  <a
                    className={`btn ${
                      selectedDateType === 'by_monthly' ? 'active' : ''
                    }`}
                    onClick={() => {
                      onDateTypeChange('by_monthly');
                    }}
                  >
                    Monthly
                  </a>
                  <a
                    className={`btn ${
                      selectedDateType === 'by_quarterly' ? 'active' : ''
                    }`}
                    onClick={() => {
                      onDateTypeChange('by_quarterly');
                    }}
                  >
                    Quarterly
                  </a>
                  <a
                    className={`btn ${
                      selectedDateType === 'by_yearly' ? 'active' : ''
                    }`}
                    onClick={() => {
                      onDateTypeChange('by_yearly');
                    }}
                  >
                    Yearly
                  </a>
                </div>
                {selectedDateType === 'by_range' ? (
                  <>
                    <div className="row">
                      <div className="col-md-5">
                        <input
                          type="date"
                          className="dateInput"
                          value={filters.startDate}
                          // Shiva
                          onChange={onStartDateChange}
                        />
                      </div>
                      <div className="col-md-5">
                        <input
                          type="date"
                          className="dateInput"
                          value={filters.endDate}
                          // Shiva
                          onChange={onEndDateChange}
                        />
                      </div>
                    </div>
                  </>
                ) : (
                  ''
                )}

                {selectedDateType === 'by_monthly' ? (
                  <>
                    <div className="row">
                      <div className="col-md-5">
                        <select
                          className="filterSelect mt-2"
                          value={filters.year}
                          onChange={onYearChange}
                        >
                          <option>Select Year</option>
                          {allowedYears.map((year, index) => {
                            return (
                              <option key={index} value={year}>
                                {year}
                              </option>
                            );
                          })}
                        </select>
                      </div>
                      <div className="col-md-5">
                        <select
                          className="filterSelect mt-2"
                          value={filters.month}
                          onChange={onMonthChange}
                        >
                          <option>Select Month</option>
                          {allowedMonths.map((month, index) => {
                            return (
                              <option key={index} value={month.key}>
                                {month.value}
                              </option>
                            );
                          })}
                        </select>
                      </div>
                    </div>
                  </>
                ) : (
                  ''
                )}

                {selectedDateType === 'by_quarterly' ? (
                  <>
                    <div className="row">
                      <div className="col-md-5">
                        <select
                          className="filterSelect mt-2"
                          value={filters.year}
                          onChange={onYearChange}
                        >
                          <option>Select Year</option>
                          {allowedYears.map((year, index) => {
                            return (
                              <option key={index} value={year}>
                                {year}
                              </option>
                            );
                          })}
                        </select>
                      </div>
                      <div className="col-md-5">
                        <select
                          className="filterSelect mt-2"
                          value={filters.quarter}
                          onChange={onQuarterChange}
                        >
                          <option>Select Quarter</option>
                          {/* {['1', '2', '3', '4'].map((quarter, index) => {
                            return (
                              <option key={index} value={quarter}>
                                {quarter}
                              </option>
                            );
                          })} */}
                          {[
                            'Jan - Mar',
                            'Apr - Jun',
                            'Jul - Sep',
                            'Oct - Dec',
                          ].map((qtr, index) => {
                            return (
                              <option key={index} value={index + 1}>
                                {qtr}
                              </option>
                            );
                          })}
                        </select>
                      </div>
                    </div>
                  </>
                ) : (
                  ''
                )}
                {selectedDateType === 'by_yearly' ? (
                  <>
                    <div className="row">
                      <div className="col-md-5">
                        <select
                          className="filterSelect mt-2"
                          value={filters.year}
                          onChange={onYearChange}
                        >
                          <option>Select Year</option>
                          {allowedYears.map((year, index) => {
                            return (
                              <option key={index} value={year}>
                                {year}
                              </option>
                            );
                          })}
                        </select>
                      </div>
                    </div>
                  </>
                ) : (
                  ''
                )}

                <label className="filterSubHeading mt-3">Select State</label>
                <select
                  className="filterSelect mt-2"
                  value={filters.state}
                  onChange={onStateSelection}
                >
                  <option>Select State</option>
                  {states.map((state, index) => {
                    return (
                      <option key={index} value={state}>
                        {state}
                      </option>
                    );
                  })}
                </select>
                <label className="filterSubHeading mt-2">District</label>
                <select
                  className="filterSelect mt-2"
                  value={filters.district}
                  onChange={onDistrictSelection}
                  disabled={!filterVisibility.district}
                >
                  <option value="">Select District</option>
                  {districts.map((district, index) => {
                    return (
                      <option key={index} value={district}>
                        {district}
                      </option>
                    );
                  })}
                </select>

                {selectedOrganizationType === 'VENDOR' ? (
                  <>
                    <label className="filterSubHeading mt-2">Vendor</label>
                    <div className="btn-group filterButton mt-2">
                      <a
                        className={`btn ${
                          selectedVendorType === 'ALL_VENDORS' ? 'active' : ''
                        }`}
                        onClick={() => {
                          onVendorTypeChange('ALL_VENDORS');
                        }}
                      >
                        All
                      </a>
                      <a
                        className={`btn ${
                          selectedVendorType === 'S1' ? 'active' : ''
                        }`}
                        onClick={() => {
                          onVendorTypeChange('S1');
                        }}
                      >
                        S1
                      </a>
                      <a
                        className={`btn ${
                          selectedVendorType === 'S2' ? 'active' : ''
                        }`}
                        onClick={() => {
                          onVendorTypeChange('S2');
                        }}
                      >
                        S2
                      </a>
                      <a
                        className={`btn ${
                          selectedVendorType === 'S3' ? 'active' : ''
                        }`}
                        onClick={() => {
                          onVendorTypeChange('S3');
                        }}
                      >
                        S3
                      </a>
                    </div>
                  </>
                ) : (
                  ''
                )}

                <label className="filterSubHeading mt-2">
                  Select
                  {selectedOrganizationType === 'VENDOR'
                    ? ' Vendor'
                    : ' Brewery'}
                </label>
                <select
                  className="filterSelect mt-2"
                  value={filters.organization}
                  onChange={onOrganizationChange}
                  disabled={!filterVisibility.organization}
                >
                  <option>
                    Select
                    {selectedOrganizationType === 'VENDOR'
                      ? ' Vendor'
                      : ' Brewery'}
                  </option>
                  {organizations &&
                    organizations.map((organization, index) => {
                      return (
                        <option key={index} value={organization.id}>
                          {organization.name}
                        </option>
                      );
                    })}
                </select>

                <button
                  className="btn SearchButton mt-4"
                  onClick={resetFilters}
                >
                  Clear
                </button>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};
export default TransactionHistory;
