import { render, screen, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom';
import React from 'react';
import PayBill from '../client/src/components/PayBill.jsx';
import { Helmet } from "react-helmet";
afterEach(cleanup);



describe('Paybill page can render properly', () => {
  test('can render page correctly', () => {
    let hostInfo = {
      email: "sb-dmus17722352@personal.example.com",
      guestName: "Ming Ma",
      id: 133
    }
    let finalTotals = {
      paymentsOwed: {
        "Ming Ma": 32.1,
        "Sara": 37.3,
        "Milo": 30.1
      }
    }
    render(
      <div>
        <Helmet>
          <script
            src="https://www.paypal.com/sdk/js?client-id=AcuzwYns3SuSSdJfwStMFCPsnRV3Ohu3ebkRskSvHlnR0p3UXVuhIcMbdUXpsBY6ISfepv7yQ2YQtpCC" />
          <PayBill finalTotals={finalTotals} hostInfo={hostInfo} />
        </Helmet>);
      </div>
    )
  })
})
