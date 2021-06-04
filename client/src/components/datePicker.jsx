import React from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import axios from "axios";

class DatePicker extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      StartDate: "2020-09-21",
      EndDate: this.todayDate(),
    };

    this.download_csv_file = this.download_csv_file.bind(this);
    this.dateChange = this.dateChange.bind(this);
    this.FetchTransactions = this.FetchTransactions.bind(this);
    this.todayDate = this.todayDate.bind(this);
  }

  FetchTransactions() { //Fetch transactions
    axios
      .get(
        "http://localhost:3000/Transactions?StartDate=" +
          this.state.StartDate +
          "&EndDate=" +
          this.state.EndDate
      )
      .then((result) => {
        this.download_csv_file(result.data);
      });
  }

  download_csv_file(transactions) { //create and download CSV file

    var csv ="id,hideIdentity,hideContribution,sender,receiver,receiverWalletId,status,type,token,amount,message,totalFee,createdAt,updatedAt,v\n";

    transactions.forEach((transaction) => {
      csv += [
        transaction._id,
        transaction.hideIdentity,
        transaction.hideContribution,
        transaction.sender,
        transaction.receiver,
        transaction.receiverWalletId,
        transaction.status,
        transaction.type,
        transaction.token,
        transaction.amount,
        transaction.message,
        transaction.totalFee,
        transaction.createdAt,
        transaction.updatedAt,
        transaction.__v,
      ].join(",");
      csv += "\n";
    });

    document.write(csv);

    var hiddenElement = document.createElement("a");
    hiddenElement.href = "data:text/csv;charset=utf-8," + encodeURI(csv);
    hiddenElement.target = "_blank";

    hiddenElement.download = "transactions.csv";
    hiddenElement.click();
    setTimeout(() => {
      location.reload();
    }, 2000);
  }

  dateChange(event) { //Update State when onchange event got triggered

    let PickerName = event.target.name;

    if (PickerName == "StartDate") {
      this.setState({ StartDate: event.target.value });
    } else {
      this.setState({ EndDate: event.target.value });
    }
  }

  todayDate() { // Return today's date format : YYYY-MM-DD

    var today = new Date();
    var dd = String(today.getDate()).padStart(2, "0");
    var mm = String(today.getMonth() + 1).padStart(2, "0");
    var yyyy = today.getFullYear();

    today = yyyy + "-" + mm + "-" + dd;
    return today;
  }

  render() {
    return (
      <div>
        <form noValidate>
          <div id="pickerContainer">
            <TextField
              name="StartDate"
              id="date"
              label="StartDate"
              type="date"
              defaultValue={this.state.StartDate}
              onChange={this.dateChange}
              InputLabelProps={{
                shrink: true,
              }}
              className="datepicker"
            />
            <TextField
              name="EndDate"
              id="date"
              label="EndDate"
              type="date"
              defaultValue={this.todayDate()}
              InputLabelProps={{
                shrink: true,
              }}
              onChange={this.dateChange}
              className="datepicker"
              max={this.todayDate()}
            />
          </div>
        </form>

        <div className="flex">
          <Button
            variant="contained"
            color="primary"
            className="submitButton"
            onClick={this.FetchTransactions}
          >
            Primary
          </Button>
        </div>
      </div>
    );
  }
}

export default DatePicker;
