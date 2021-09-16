import React from 'react';
import {Link} from 'react-router-dom';
import SplitList from './SplitList.jsx';

class BillSummaryPage extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      split: 'by Item',
      tipPercentage: 0,
      guests: this.props.guests
    };

    this.getBillTotal = this.getBillTotal.bind(this);
    this.addTip = this.addTip.bind(this);
    this.splitEvenly = this.splitEvenly.bind(this);
    this.splitByItem = this.splitByItem.bind(this);
  }

  getBillTotal (guestArray) {
    let billTotal = 0;
    for (let i = 0; i < guestArray.length; i++) {
      const currentGuestOrders = guestArray[i].order;
      for (let j = 0; j < currentGuestOrders.length; j++) {
        const orderItemCost = currentGuestOrders[j].price;
        const howManyOrdered = 1;
        // const howManyOrdered = currentGuestOrders[j].qty;
        const itemTotal = Math.round(orderItemCost * howManyOrdered * 100) / 100;
        billTotal += Math.round(itemTotal * 100) / 100;
      }
    };
    return billTotal;
  }

  addTip (event) {
    const value = event.target.value
    this.setState({
      tipPercentage : value
    })
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
        <SplitList guests={this.state.guests} totalCost={this.getBillTotal(this.state.guests)} tipPercentage = {this.state.tipPercentage} split={this.state.split}/>
        <form>
          Tip Percentage (%):
          <input type="number" id="tipPercentage" name="tipPercentage" min="0" max="1000" value={this.state.tipPercentage} onChange={this.addTip}/><br/>
        </form>
        <button onClick={this.splitEvenly}>Split Evenly</button>
        <button onClick={this.splitByItem}>Split by Item</button>
        <Link to = "/">
          <button>Complete Session</button>
        </Link>
      </div>
    );
  }
}

export default BillSummaryPage;
