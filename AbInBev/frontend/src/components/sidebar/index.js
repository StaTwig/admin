import React from 'react';
import logo from '../../assets/ABInBev.png';
import HomeIcon from '../../assets/icons/home.svg';
import HomeSelectedIcon from '../../assets/icons/home_selected.svg';
import DashboardIcon from '../../assets/icons/dashboard.svg';
import DashboardSelectedIcon from '../../assets/icons/dashboard_selected.svg';
import TransactionIconSelected from '../../assets/icons/transaction_selected.svg';
import TransactionIcon from '../../assets/icons/transaction.svg';
import ManageIcon from '../../assets/icons/manage.svg';
import Logout from '../../assets/icons/logout.svg';
import InventoryIconSelected from '../../assets/icons/inventory_selected.svg';
import InventoryIcon from '../../assets/icons/inventory.svg';
import rightArrow from '../../assets/icons/rightarrow.svg';
import { useSelector, useDispatch } from 'react-redux';
import { logoutUser } from '../../actions/userActions';
import UploadModal from './UploadModal';
import TargetIconSelected from '../../assets/icons/selectTarget.svg';
import TargetIconUnSelect from '../../assets/icons/unSelectTarget.svg'

const Sidebar = (props) => {
  const { history } = props;
  history.location.pathname;
  const dispatch = useDispatch();
  const type = localStorage.getItem('type');

  const user = useSelector((state) => {
    return state.user;
  });

  return (
    <nav className="sidebar">
      <div className="abinBevLogo">
        <img src={logo} width={90} />
      </div>
      <div className="sidebar-sticky mb-3">
        <div className="grid" style={{ rowGap: '20px', alignContent: 'end' }}>
          <div
            className={
              history.location.pathname.includes('analytics')
                ? 'gds-links bord-white'
                : 'gds-links'
            }
          >
            <div className="gdsl-in">
              <img
                src={
                  history.location.pathname.includes('analytics')
                    ? DashboardSelectedIcon
                    : DashboardIcon
                }
              />
              <div onClick={() => history.push('/analytics')}>Analytics</div>
            </div>
          </div>

          <div
            className={
              history.location.pathname.includes('transactionHistory')
                ? 'gds-links bord-white'
                : 'gds-links'
            }
          >
            <div className="gdsl-in">
              <img
                src={
                  history.location.pathname.includes('transactionHistory')
                    ? TransactionIconSelected
                    : TransactionIcon
                }
              />
              <div onClick={() => history.push('/transactionHistory')}>
                Transaction History
              </div>
            </div>
          </div>
          <div
            className={
              history.location.pathname.includes('inventory')
                ? 'gds-links bord-white'
                : 'gds-links'
            }
          >
            <div className="gdsl-in">
              <img
                src={
                  history.location.pathname.includes('inventory')
                    ? InventoryIconSelected
                    : InventoryIcon
                }
              />
              <div onClick={() => history.push('/inventory')}>Inventory</div>
            </div>
          </div>
          <div
            className={
              history.location.pathname.includes('targets')
                ? 'gds-links bord-white'
                : 'gds-links'
            }
          >
            <div className="gdsl-in">
              <img
                src={
                  history.location.pathname.includes('targets')
                    ? InventoryIconSelected
                    : InventoryIcon
                }
              />
              <div onClick={() => history.push('/targets')}>Targets</div>
            </div>
          </div>
          {/* <div className="gds-links">
            <div className="gdsl-in">
              <img src={ManageIcon}/>
              <div>Manage Users</div>
            </div>
          </div> */}
        </div>
      </div>
      <UploadModal />
      <button className="btn btn-warning dahbtngo">
        <span className="whiteC"></span>
        <span className="grid jis">
          <span>{user?.firstName}</span>
          <span className="orgType">{type}</span>
        </span>
      </button>

      <div className="sidebar-sticky mb-1">
        <div className="grid">
          <div className="gds-links">
            <div className="gdsl-in">
              <img src={Logout} />
              <div
                onClick={(e) =>
                  window.confirm('Are you sure you wish Logout?') &&
                  dispatch(logoutUser())
                }
              >
                Logout
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Sidebar;
