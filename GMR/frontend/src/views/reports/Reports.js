import React, { useState } from 'react'
import './style.scss'
import { CAvatar, CCard, CCardBody, CCol, CDropdown, CDropdownToggle, CRow } from '@coreui/react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFilter } from '@fortawesome/free-solid-svg-icons'
import { Drawer } from 'antd'

const Reports = () => {
  const [visible, setVisible] = useState(false)

  const showDrawer = () => {
    setVisible(true)
  }

  const onClose = () => {
    setVisible(false)
  }
  return (
    <>
      <a onClick={showDrawer} className="floatFilter">
        <FontAwesomeIcon icon={faFilter} className="nav-icon my-float" />
      </a>

      {/* Filter Section Start */}
      <Drawer
        title="Basic Drawer"
        className="filterdrawer"
        placement="right"
        closable={false}
        onClose={onClose}
        visible={visible}
      >
        <div className="filterSection">
          <div className="filterHeader mb-2">
            <FontAwesomeIcon icon={faFilter} /> FILTERS
          </div>
          <label className="filterSubHeading mt-2 mb-2">Time Period</label>
          <label className="radioButton" htmlFor="daily">
            <input
              className="radioInput"
              type="radio"
              name="view"
              id="daily"
              value="daily"
              defaultChecked="daily"
            />
            Daily
          </label>
          <label className="radioButton" htmlFor="WeeklyReport">
            <input
              className="radioInput"
              type="radio"
              name="view"
              id="WeeklyReport"
              value="WeeklyReport"
            />
            Weekly Report
          </label>
          <label className="radioButton" htmlFor="FortnightReport">
            <input
              className="radioInput"
              type="radio"
              name="view"
              id="FortnightReport"
              value="FortnightReport"
            />
            Fortnight Report
          </label>
          <label className="radioButton" htmlFor="MonthlyReport">
            <input
              className="radioInput"
              type="radio"
              name="view"
              id="MonthlyReport"
              value="MonthlyReport"
            />
            Monthly Report
          </label>

          <label className="radioButton" htmlFor="QuarterlyReport">
            <input
              className="radioInput"
              type="radio"
              name="view"
              id="QuarterlyReport"
              value="QuarterlyReport"
            />
            Quarterly Report
          </label>
          <label className="radioButton" htmlFor="YearlyReport">
            <input
              className="radioInput"
              type="radio"
              name="view"
              id="YearlyReport"
              value="YearlyReport"
            />
            Yearly Report
          </label>
          <label className="radioButton" htmlFor="AllReports">
            <input
              className="radioInput"
              type="radio"
              name="view"
              id="AllReports"
              value="AllReports"
            />
            All Reports
          </label>

          <div className="btn-group filterButton mt-2 mb-2">
            <a className="btn active">All</a>
            <a className="btn">E-Rec</a>
            <a className="btn">Gen VCT</a>
          </div>

          <label className="filterSubHeading mt-2 mb-2">Agent</label>
          <select className="filterSelect mt-2">
            <option value="">Select Agent</option>
            <option key="1" value="agent1">
              Agent 1
            </option>
            <option key="2" value="agent2">
              Agent 2
            </option>
          </select>
          <label className="filterSubHeading mt-2 mb-2">Airline</label>
          <select className="filterSelect mt-2">
            <option value="">Select Airline</option>
            <option key="1" value="Airline1">
              Airline 1
            </option>
            <option key="2" value="Airline2">
              Airline 2
            </option>
          </select>
          <button className="btn SearchButton mt-4">Search</button>
        </div>
      </Drawer>
      {/* Filter Section Ends */}
      <CCard className="mb-4">
        <CCardBody className="mb-1">
          <CRow>
            <CCol sm="12">
              <CDropdown className="exportButton">
                <CDropdownToggle>Export</CDropdownToggle>
              </CDropdown>
            </CCol>
          </CRow>
          <div className="table-container" role="table" aria-label="Destinations">
            <div className="flex-table header tableHeader mb-0 pb-0" role="rowgroup">
              <div className="flex-rowReport first" role="columnheader">
                Agent Name
              </div>
              <div className="flex-rowReport" role="columnheader">
                AWB
              </div>
              <div className="flex-rowReport" role="columnheader">
                SB
              </div>
              <div className="flex-rowReport" role="columnheader">
                VCT
              </div>
              <div className="flex-rowReport" role="columnheader">
                Airline
              </div>
              <div className="flex-rowReport" role="columnheader">
                E-Red/Gen
              </div>
            </div>
            {/* Group data Begins */}
            <div className="flex-table groupbyDate mb-0 pb-0" role="rowgroup">
              <div className="flex-rowReport textLeft" role="cell">
                July 1, 2019
              </div>
            </div>
            <div className="flex-table" role="rowgroup">
              <div className="flex-rowReport first" role="cell">
                <div className="avatarTableDisplaywithName">
                  <CAvatar size="md" src="/avatars/profile.png" status="success" />
                  <div className="title">User Name</div>
                </div>
              </div>
              <div className="flex-rowReport" role="cell">
                123456
              </div>
              <div className="flex-rowReport" role="cell">
                123456
              </div>
              <div className="flex-rowReport" role="cell">
                123456
              </div>
              <div className="flex-rowReport" role="cell">
                123456
              </div>
              <div className="flex-rowReport" role="cell">
                Gen
              </div>
            </div>
            <div className="flex-table" role="rowgroup">
              <div className="flex-rowReport first" role="cell">
                <div className="avatarTableDisplaywithName">
                  <CAvatar size="md" src="/avatars/profile.png" status="success" />
                  <div className="title">User Name</div>
                </div>
              </div>

              <div className="flex-rowReport" role="cell">
                123456
              </div>
              <div className="flex-rowReport" role="cell">
                123456
              </div>
              <div className="flex-rowReport" role="cell">
                123456
              </div>
              <div className="flex-rowReport" role="cell">
                123456
              </div>
              <div className="flex-rowReport" role="cell">
                Gen
              </div>
            </div>
            <div className="flex-table" role="rowgroup">
              <div className="flex-rowReport first" role="cell">
                <div className="avatarTableDisplaywithName">
                  <CAvatar size="md" src="/avatars/profile.png" status="success" />
                  <div className="title">User Name</div>
                </div>
              </div>
              <div className="flex-rowReport" role="cell">
                123456
              </div>
              <div className="flex-rowReport" role="cell">
                123456
              </div>
              <div className="flex-rowReport" role="cell">
                123456
              </div>
              <div className="flex-rowReport" role="cell">
                123456
              </div>
              <div className="flex-rowReport" role="cell">
                Gen
              </div>
            </div>
            <div className="flex-table" role="rowgroup">
              <div className="flex-rowReport first" role="cell">
                <div className="avatarTableDisplaywithName">
                  <CAvatar size="md" src="/avatars/profile.png" status="success" />
                  <div className="title">User Name</div>
                </div>
              </div>
              <div className="flex-rowReport" role="cell">
                123456
              </div>
              <div className="flex-rowReport" role="cell">
                123456
              </div>
              <div className="flex-rowReport" role="cell">
                123456
              </div>
              <div className="flex-rowReport" role="cell">
                123456
              </div>
              <div className="flex-rowReport" role="cell">
                Gen
              </div>
            </div>
            <div className="flex-table" role="rowgroup">
              <div className="flex-rowReport first" role="cell">
                <div className="avatarTableDisplaywithName">
                  <CAvatar size="md" src="/avatars/profile.png" status="success" />
                  <div className="title">User Name</div>
                </div>
              </div>
              <div className="flex-rowReport" role="cell">
                123456
              </div>
              <div className="flex-rowReport" role="cell">
                123456
              </div>
              <div className="flex-rowReport" role="cell">
                123456
              </div>
              <div className="flex-rowReport" role="cell">
                123456
              </div>
              <div className="flex-rowReport" role="cell">
                Gen
              </div>
            </div>
            <div className="flex-table" role="rowgroup">
              <div className="flex-rowReport first" role="cell">
                <div className="avatarTableDisplaywithName">
                  <CAvatar size="md" src="/avatars/profile.png" status="success" />
                  <div className="title">User Name</div>
                </div>
              </div>
              <div className="flex-rowReport" role="cell">
                123456
              </div>
              <div className="flex-rowReport" role="cell">
                123456
              </div>
              <div className="flex-rowReport" role="cell">
                123456
              </div>
              <div className="flex-rowReport" role="cell">
                123456
              </div>
              <div className="flex-rowReport" role="cell">
                Gen
              </div>
            </div>
            <div className="flex-table" role="rowgroup">
              <div className="flex-rowReport first" role="cell">
                <div className="avatarTableDisplaywithName">
                  <CAvatar size="md" src="/avatars/profile.png" status="success" />
                  <div className="title">User Name</div>
                </div>
              </div>
              <div className="flex-rowReport" role="cell">
                123456
              </div>
              <div className="flex-rowReport" role="cell">
                123456
              </div>
              <div className="flex-rowReport" role="cell">
                123456
              </div>
              <div className="flex-rowReport" role="cell">
                123456
              </div>
              <div className="flex-rowReport" role="cell">
                Gen
              </div>
            </div>
            {/* Group data */}
            <div className="flex-table groupbyDate mb-0 pb-0" role="rowgroup">
              <div className="flex-rowReport textLeft" role="cell">
                July 2, 2019
              </div>
            </div>
            <div className="flex-table" role="rowgroup">
              <div className="flex-rowReport first" role="cell">
                <div className="avatarTableDisplaywithName">
                  <CAvatar size="md" src="/avatars/profile.png" status="success" />
                  <div className="title">User Name</div>
                </div>
              </div>
              <div className="flex-rowReport" role="cell">
                123456
              </div>
              <div className="flex-rowReport" role="cell">
                123456
              </div>
              <div className="flex-rowReport" role="cell">
                123456
              </div>
              <div className="flex-rowReport" role="cell">
                123456
              </div>
              <div className="flex-rowReport" role="cell">
                Gen
              </div>
            </div>
            <div className="flex-table" role="rowgroup">
              <div className="flex-rowReport first" role="cell">
                <div className="avatarTableDisplaywithName">
                  <CAvatar size="md" src="/avatars/profile.png" status="success" />
                  <div className="title">User Name</div>
                </div>
              </div>
              <div className="flex-rowReport" role="cell">
                123456
              </div>
              <div className="flex-rowReport" role="cell">
                123456
              </div>
              <div className="flex-rowReport" role="cell">
                123456
              </div>
              <div className="flex-rowReport" role="cell">
                123456
              </div>
              <div className="flex-rowReport" role="cell">
                Gen
              </div>
            </div>
            <div className="flex-table" role="rowgroup">
              <div className="flex-rowReport first" role="cell">
                <div className="avatarTableDisplaywithName">
                  <CAvatar size="md" src="/avatars/profile.png" status="success" />
                  <div className="title">User Name</div>
                </div>
              </div>
              <div className="flex-rowReport" role="cell">
                123456
              </div>
              <div className="flex-rowReport" role="cell">
                123456
              </div>
              <div className="flex-rowReport" role="cell">
                123456
              </div>
              <div className="flex-rowReport" role="cell">
                123456
              </div>
              <div className="flex-rowReport" role="cell">
                Gen
              </div>
            </div>
            <div className="flex-table" role="rowgroup">
              <div className="flex-rowReport first" role="cell">
                <div className="avatarTableDisplaywithName">
                  <CAvatar size="md" src="/avatars/profile.png" status="success" />
                  <div className="title">User Name</div>
                </div>
              </div>
              <div className="flex-rowReport" role="cell">
                123456
              </div>
              <div className="flex-rowReport" role="cell">
                123456
              </div>
              <div className="flex-rowReport" role="cell">
                123456
              </div>
              <div className="flex-rowReport" role="cell">
                123456
              </div>
              <div className="flex-rowReport" role="cell">
                Gen
              </div>
            </div>
            <div className="flex-table" role="rowgroup">
              <div className="flex-rowReport first" role="cell">
                <div className="avatarTableDisplaywithName">
                  <CAvatar size="md" src="/avatars/profile.png" status="success" />
                  <div className="title">User Name</div>
                </div>
              </div>
              <div className="flex-rowReport" role="cell">
                123456
              </div>
              <div className="flex-rowReport" role="cell">
                123456
              </div>
              <div className="flex-rowReport" role="cell">
                123456
              </div>
              <div className="flex-rowReport" role="cell">
                123456
              </div>
              <div className="flex-rowReport" role="cell">
                Gen
              </div>
            </div>
            <div className="flex-table" role="rowgroup">
              <div className="flex-rowReport first" role="cell">
                <div className="avatarTableDisplaywithName">
                  <CAvatar size="md" src="/avatars/profile.png" status="success" />
                  <div className="title">User Name</div>
                </div>
              </div>
              <div className="flex-rowReport" role="cell">
                123456
              </div>
              <div className="flex-rowReport" role="cell">
                123456
              </div>
              <div className="flex-rowReport" role="cell">
                123456
              </div>
              <div className="flex-rowReport" role="cell">
                123456
              </div>
              <div className="flex-rowReport" role="cell">
                Gen
              </div>
            </div>
            <div className="flex-table" role="rowgroup">
              <div className="flex-rowReport first" role="cell">
                <div className="avatarTableDisplaywithName">
                  <CAvatar size="md" src="/avatars/profile.png" status="success" />
                  <div className="title">User Name</div>
                </div>
              </div>
              <div className="flex-rowReport" role="cell">
                123456
              </div>
              <div className="flex-rowReport" role="cell">
                123456
              </div>
              <div className="flex-rowReport" role="cell">
                123456
              </div>
              <div className="flex-rowReport" role="cell">
                123456
              </div>
              <div className="flex-rowReport" role="cell">
                Gen
              </div>
            </div>
          </div>
        </CCardBody>
      </CCard>
    </>
  )
}

export default Reports
