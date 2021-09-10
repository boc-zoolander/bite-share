import React from 'react';
import SplitList from './SplitList.jsx';

/*
props =
 guests: [
    {  guest_id: 34556,
       first_name: ‘Tom’,
       last_name: ‘Ho’,
       //Orders is an array of orders
       order: [
        {  order_id: 7777,
           item_name: ‘Foamy Latte’,
           price: 8.99,
           qty: 2 },
        {  order_id: 5555,
           item: ‘Basic Avocado Toast’,
           price: 15.99,
           qty: 1 }
        ]
      },
    {  guest_id: 99999,
        first_name: ‘Derek’,
        last_name: ‘Zoolander’,
        //Orders is an array of orders
        order: [
         {  order_id: 8888,
            item_name: ‘Orange Mocha Frappucino!!’,
            price: 8.99,
            qty: 1 },
         {  order_id: 5555,
            item: ‘The Black Lung:  Burnt Biscuits’,
            price: 15.99,
            qty: 1 }
         ]
    }
  ],

  totalCost = number
*/

class BillSummaryPage extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      split: 'byItem',
      // BELOW DELETE will not hold in state but will be passed as props
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
        }
      ],
      totalCost: 58.95
      // ABOVE THIS WILL BE REMOVED AND PASSED AS PROPS
    };

    this.splitEvenly = this.splitEvenly.bind(this);
    this.splitByItem = this.splitByItem.bind(this);
  }

  splitEvenly () {
    this.setState({
      split: 'evenly'
    });
  }

  splitByItem () {
    this.setState({
      split: 'byItem'
    });
  }

  render () {
    return (
      <div>
        <h3>Final Bill</h3>
        {/* will need to change below to handle with props and not state for guests and total cost */}
        <SplitList guests={this.state.guests} totalCost={this.state.totalCost} split={this.state.split}/>
        <button onClick={this.splitEvenly}>Split Evenly</button>
        <button onClick={this.splitByItem}>Split by Item</button>
        <button>Complete Session</button>
      </div>
    );
  }
}

export default BillSummaryPage;
