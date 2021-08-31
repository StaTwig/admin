import React from 'react'
import { CFooter } from '@coreui/react'

const AppFooter = () => {
  return (
    <CFooter>
      <div>
        {/* <a href="" target="_blank" rel="noopener noreferrer">
          
        </a> */}
        <span className="ms-1">&copy; 2021 GMR Cargo.</span>
      </div>
      {/* <div className="ms-auto">
        <span className="me-1">Statwig</span>
        <a href="" target="_blank" rel="noopener noreferrer">
          Test
        </a>
      </div> */}
    </CFooter>
  )
}

export default React.memo(AppFooter)
