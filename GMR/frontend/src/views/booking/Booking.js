import React from 'react'
import {
  CAvatar,
  CCard,
  CCardBody,
  CCol,
  CDropdown,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
  CRow,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
} from '@coreui/react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFilter } from '@fortawesome/free-solid-svg-icons'

const Booking = () => {
  return (
    <>
      <a className="float">
        <FontAwesomeIcon icon={faFilter} className="nav-icon my-float" />
      </a>
      <CCard className="mb-4">
        <CCardBody className="mb-1">
          <CRow>
            <CCol sm="10">
              <h4 id="traffic" className="card-title mb-0">
                Booking
              </h4>
            </CCol>

            <CCol sm="2">
              <CDropdown>
                <CDropdownToggle color="primary">Export</CDropdownToggle>
                <CDropdownMenu>
                  <CDropdownItem href="#">Option</CDropdownItem>
                </CDropdownMenu>
              </CDropdown>
            </CCol>
          </CRow>
        </CCardBody>
        <CTable hover responsive align="middle" className="mb-0">
          <CTableHead color="light">
            <CTableRow>
              <CTableHeaderCell className="text-center">Agent Name</CTableHeaderCell>
              <CTableHeaderCell>Created By</CTableHeaderCell>
              <CTableHeaderCell className="text-center">AWB</CTableHeaderCell>
              <CTableHeaderCell>SB</CTableHeaderCell>
              <CTableHeaderCell className="text-center">VCT</CTableHeaderCell>
              <CTableHeaderCell>Airline</CTableHeaderCell>
              <CTableHeaderCell>E-Red/Gen</CTableHeaderCell>
            </CTableRow>
          </CTableHead>
          <CTableBody>
            <CTableRow className="groupByTable">
              <CTableDataCell colSpan="7" className="text-left ">
                <small className="text-medium-emphasis">Aug 01, 2021</small>
              </CTableDataCell>
            </CTableRow>
            <CTableRow>
              <CTableDataCell className="text-center">
                <div className="avatarTableDisplaywithName">
                  <CAvatar size="md" src="/avatars/profile.png" status="success" />
                  <div className="title">User Name</div>
                </div>
              </CTableDataCell>
              <CTableDataCell>
                <div>Yiorgos Avraamu</div>
              </CTableDataCell>
              <CTableDataCell className="text-center">
                <div>123456</div>
              </CTableDataCell>
              <CTableDataCell>
                <div className="clearfix">123456</div>
              </CTableDataCell>
              <CTableDataCell className="text-center">
                <div>123456789</div>
              </CTableDataCell>
              <CTableDataCell>
                <div>EY</div>
              </CTableDataCell>
              <CTableDataCell>
                <div>Gen VCT</div>
              </CTableDataCell>
            </CTableRow>
            <CTableRow>
              <CTableDataCell className="text-center">
                <div className="avatarTableDisplaywithName">
                  <CAvatar size="md" src="/avatars/profile.png" status="success" />
                  <div className="title">User Name</div>
                </div>
              </CTableDataCell>
              <CTableDataCell>
                <div>Yiorgos Avraamu</div>
              </CTableDataCell>
              <CTableDataCell className="text-center">
                <div>123456</div>
              </CTableDataCell>
              <CTableDataCell>
                <div className="clearfix">123456</div>
              </CTableDataCell>
              <CTableDataCell className="text-center">
                <div>123456789</div>
              </CTableDataCell>
              <CTableDataCell>
                <div>EY</div>
              </CTableDataCell>
              <CTableDataCell>
                <div>Gen VCT</div>
              </CTableDataCell>
            </CTableRow>
            <CTableRow>
              <CTableDataCell className="text-center">
                <div className="avatarTableDisplaywithName">
                  <CAvatar size="md" src="/avatars/profile.png" status="success" />
                  <div className="title">User Name</div>
                </div>
              </CTableDataCell>
              <CTableDataCell>
                <div>Yiorgos Avraamu</div>
              </CTableDataCell>
              <CTableDataCell className="text-center">
                <div>123456</div>
              </CTableDataCell>
              <CTableDataCell>
                <div className="clearfix">123456</div>
              </CTableDataCell>
              <CTableDataCell className="text-center">
                <div>123456789</div>
              </CTableDataCell>
              <CTableDataCell>
                <div>EY</div>
              </CTableDataCell>
              <CTableDataCell>
                <div>Gen VCT</div>
              </CTableDataCell>
            </CTableRow>
            <CTableRow className="groupByTable">
              <CTableDataCell colSpan="7" className="text-left">
                <small className="text-medium-emphasis">Aug 02, 2021</small>
              </CTableDataCell>
            </CTableRow>
            <CTableRow>
              <CTableDataCell className="text-center">
                <div className="avatarTableDisplaywithName">
                  <CAvatar size="md" src="/avatars/profile.png" status="success" />
                  <div className="title">User Name</div>
                </div>
              </CTableDataCell>
              <CTableDataCell>
                <div>Yiorgos Avraamu</div>
              </CTableDataCell>
              <CTableDataCell className="text-center">
                <div>123456</div>
              </CTableDataCell>
              <CTableDataCell>
                <div className="clearfix">123456</div>
              </CTableDataCell>
              <CTableDataCell className="text-center">
                <div>123456789</div>
              </CTableDataCell>
              <CTableDataCell>
                <div>EY</div>
              </CTableDataCell>
              <CTableDataCell>
                <div>Gen VCT</div>
              </CTableDataCell>
            </CTableRow>
            <CTableRow>
              <CTableDataCell className="text-center">
                <div className="avatarTableDisplaywithName">
                  <CAvatar size="md" src="/avatars/profile.png" status="success" />
                  <div className="title">User Name</div>
                </div>
              </CTableDataCell>
              <CTableDataCell>
                <div>Yiorgos Avraamu</div>
              </CTableDataCell>
              <CTableDataCell className="text-center">
                <div>123456</div>
              </CTableDataCell>
              <CTableDataCell>
                <div className="clearfix">123456</div>
              </CTableDataCell>
              <CTableDataCell className="text-center">
                <div>123456789</div>
              </CTableDataCell>
              <CTableDataCell>
                <div>EY</div>
              </CTableDataCell>
              <CTableDataCell>
                <div>Gen VCT</div>
              </CTableDataCell>
            </CTableRow>
            <CTableRow>
              <CTableDataCell className="text-center">
                <div className="avatarTableDisplaywithName">
                  <CAvatar size="md" src="/avatars/profile.png" status="success" />
                  <div className="title">User Name</div>
                </div>
              </CTableDataCell>
              <CTableDataCell>
                <div>Yiorgos Avraamu</div>
              </CTableDataCell>
              <CTableDataCell className="text-center">
                <div>123456</div>
              </CTableDataCell>
              <CTableDataCell>
                <div className="clearfix">123456</div>
              </CTableDataCell>
              <CTableDataCell className="text-center">
                <div>123456789</div>
              </CTableDataCell>
              <CTableDataCell>
                <div>EY</div>
              </CTableDataCell>
              <CTableDataCell>
                <div>Gen VCT</div>
              </CTableDataCell>
            </CTableRow>
          </CTableBody>
        </CTable>
      </CCard>
    </>
  )
}

export default Booking
