import React, { Fragment } from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import { makeStyles } from "@material-ui/core/styles";
import { Observation } from "avni-models";
import _ from "lodash";
import { ConceptService, i18n } from "../../dataEntryApp/services/ConceptService";
const useStyles = makeStyles(theme => ({
  listItem: {
    paddingBottom: "0px",
    paddingTop: "0px"
  },
  table: {
    border: "1px solid rgba(224, 224, 224, 1)"
  },
  abnormalColor: {
    color: "#ff4f33"
  }
}));

const Observations = ({ observations }) => {
  const conceptService = new ConceptService();
  const i = new i18n();
  const classes = useStyles();
 // debugger
  return (
    <div>
      {observations
        ? observations.map((element, index) => {
            return (
              <Fragment key={index}>
                <Table className={classes.table} size="small" aria-label="a dense table">
                  <TableBody>
                    <TableRow>
                      <TableCell component="th" scope="row" width="50%">
                        {element.concept["name"]}
                      </TableCell>
                      <TableCell align="left" width="50%">
                        <div>{Observation.valueAsString(element, conceptService, i)} </div>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </Fragment>
            );
          })
        : ""}
    </div>
  );
};

export default Observations;
