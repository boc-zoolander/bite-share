import React from 'react';
import SplitList from './splitList.jsx';

class BillSummaryPage extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      split: 'by Item',
      guests: [
        {
          guest_id: 34556,
          first_name: 'Tom',
          last_name: 'Ho',
          order: [
            {
              order_id: 7777,
              item_name: 'Foamy Latte',
              price: 8.99,
              qty: 2
            },
            {
              order_id: 5555,
              item: 'Basic Avocado Toast',
              price: 15.99,
              qty: 1
            }
          ]
        },
        {
          guest_id: 99999,
          first_name: 'Derek',
          last_name: 'Zoolander',
          order: [
            {
              order_id: 8888,
              item_name: 'Orange Mocha Frappucino!!',
              price: 8.99,
              qty: 1
            },
            {
              order_id: 5555,
              item: 'The Black Lung:  Burnt Biscuits',
              price: 15.99,
              qty: 1
            }
          ]
        },
        {
          guest_id: 34550,
          first_name: 'Sara',
          last_name: 'Landis',
          order: [
            {
              order_id: 7777,
              item_name: 'Foamy Latte',
              price: 8.99,
              qty: 5
            },
            {
              order_id: 5555,
              item: 'Basic Avocado Toast',
              price: 15.99,
              qty: 12
            }
          ]
        }
      ]
    };

    this.getBillTotal = this.getBillTotal.bind(this);
    this.splitEvenly = this.splitEvenly.bind(this);
    this.splitByItem = this.splitByItem.bind(this);
  }

  getBillTotal (guestArray) {
    let billTotal = 0;
    for (let i = 0; i < guestArray.length; i++) {
      const currentGuestID = guestArray[i].guest_id;
      const currentGuestOrders = guestArray[i].order;
      for (let j = 0; j < currentGuestOrders.length; j++) {
        const orderItemCost = currentGuestOrders[j].price;
        const howManyOrdered = currentGuestOrders[j].qty;
        const itemTotal = Math.round(orderItemCost * howManyOrdered * 100) / 100;
        billTotal += Math.round(itemTotal * 100) / 100;
      }
    };
    return billTotal;
  }

  splitEvenly () {
    this.setState({
      split: 'Evenly'
    });
  }

  splitByItem () {
    this.setState({
      split: 'by Item'
    });
  }

  render () {
    return (
      <div>
        <h3>Final Bill Split {this.state.split}</h3>
        <SplitList guests={this.state.guests} totalCost={this.getBillTotal(this.state.guests)} split={this.state.split}/>
        <button onClick={this.splitEvenly}>Split Evenly</button>
        <button onClick={this.splitByItem}>Split by Item</button>
        <button>Complete Session</button>
      </div>
    );
  }
}

export default BillSummaryPage;
