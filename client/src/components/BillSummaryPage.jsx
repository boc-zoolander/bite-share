import React from 'react';
import { Link } from 'react-router-dom';
import SplitList from './SplitList.jsx';

class BillSummaryPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      split: 'by Item',
      zipCode: this.props.restaurantInfo.address.postal_code,
      guests: this.props.guests
    };

    this.getBillTotalWithoutTipOrTax = this.getBillTotalWithoutTipOrTax.bind(this);
    this.changeTipPercentage = this.changeTipPercentage.bind(this);
    this.splitEvenly = this.splitEvenly.bind(this);
    this.splitByItem = this.splitByItem.bind(this);
  }

  getBillTotalWithoutTipOrTax(guestArray) {
    let billTotal = 0;
    for (let i = 0; i < guestArray.length; i++) {
      const currentGuestOrders = guestArray[i].order;
      for (let j = 0; j < currentGuestOrders.length; j++) {
        const orderItemCost = currentGuestOrders[j].price;
        const howManyOrdered = currentGuestOrders[j].qty;
        const itemTotal = orderItemCost * howManyOrdered;
        billTotal += itemTotal;
      }
    };
    return billTotal;
  }

  changeTipPercentage(event) {
    const value = Number(event.target.value);
    this.props.setTopLevelState('tipPercentage', value);
  }

  splitEvenly() {
    this.setState({
      split: 'Evenly'
    });
    this.props.setTopLevelState('splitMechanism', 'Evenly');
  }

  splitByItem() {
    this.setState({
      split: 'by Item'
    });
    this.props.setTopLevelState('splitMechanism', 'by Item');
  }

  render() {
    return (
      <div>
        <h3>Final Bill Split {this.state.split}</h3>
        <SplitList guests={this.state.guests} totalCost={this.getBillTotalWithoutTipOrTax(this.state.guests)} tipPercentage={this.props.tipPercentage} split={this.props.splitMethod} zipCode={this.state.zipCode} setTopLevelState={this.props.setTopLevelState} finalTotals={this.props.finalTotals} />
        <form>
          Tip Percentage (%):
          <input type="number" id="tipPercentage" name="tipPercentage" min="0" max="1000" value={this.props.tipPercentage} onChange={this.changeTipPercentage} /><br />
        </form>
        <br />
        <Link to="/select-food" className="button-link">
          <button>Modify Order</button>
        </Link>
        {this.state.guests.length > 1
          ? <div>
            <button onClick={this.splitEvenly}>Split Evenly</button>
            <button onClick={this.splitByItem}>Split by Item</button>
          </div>
          : <></>
        }
        <Link to="/pay-bill" className="button-link">
          <button>Complete Session</button>
        </Link>
      </div>
    );
  }
}

export default BillSummaryPage;