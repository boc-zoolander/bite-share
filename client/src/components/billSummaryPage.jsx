import React from 'react';
import SplitList from './splitList.jsx';

class BillSummaryPage extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      split: 'byItem',
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
      ],
      totalCost: 295.78
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
        <SplitList guests={this.state.guests} totalCost={this.state.totalCost} split={this.state.split}/>
        <button onClick={this.splitEvenly}>Split Evenly</button>
        <button onClick={this.splitByItem}>Split by Item</button>
        <button>Complete Session</button>
      </div>
    );
  }
}

export default BillSummaryPage;
