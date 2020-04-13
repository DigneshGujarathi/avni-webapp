import React from "react";
import http from "common/utils/httpClient";

class ReportList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      reports: [{ id: "", report_name: "", corres_report_name: "", description: "", is_active: "" }]
    };
    this.getReports();
  }

  getReports() {
    http.get("/web/reports").then(response => {
      console.log("post method resp: ", response.data.content);
      response.data.content.sort((a, b) => {
        if (a.id < b.id) {
          return -1;
        }
        if (a.id > b.id) {
          return 1;
        }
        return 0;
      });
      this.setState({ reports: response.data.content });
      console.log(" resp: ", this.state);

      //   this.state = {
      //     reports: response.data.content
      //  }
    });
  }

  renderTableHeader() {
    if (this.state.reports.length > 0) {
      // let header = Object.keys(this.state.reports[0])
      // let header = Object.keys({ id: '', report_name: '', corres_report_name: '', description: '', is_active: '' })
      let header = ["No", "report name", "corresponding report name", "description", "is active"];
      return header.map((value, index) => {
        return <th key={index}>{value.toUpperCase()}</th>;
      });
    }
  }

  renderTableData() {
    return this.state.reports.map((report, index) => {
      const { id, report_name, corres_report_name, description, is_active } = report; //destructuring
      return (
        <tr key={id}>
          <td>{index + 1}</td>
          <td>{report_name}</td>
          <td>{corres_report_name}</td>
          <td>{description}</td>
          <td>{is_active.toString()}</td>
        </tr>
      );
    });
  }

  render() {
    if (this.state) {
      return (
        <div>
          <h1 id="title">All Reports</h1>
          <table id="reports">
            <tbody>
              <tr>{this.renderTableHeader()}</tr>
              {this.renderTableData()}
            </tbody>
          </table>
        </div>
      );
    } else {
      return (
        <div>
          <h1 id="title">Loading</h1>
        </div>
      );
    }
  }
}

export default ReportList;
// ReactDOM.render(<ReportList />, document.getElementById('root'));
