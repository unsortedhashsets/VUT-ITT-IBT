import React, { FC, ReactElement } from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';

import { CItoolModel } from '../model/CItool.model';
import StateRow from './StateRow';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      '& > *': {
        background: `${theme.palette.primary.dark}`,
      },
    },
  })
);

const Row: FC<{ row: CItoolModel }> = ({ row }): ReactElement => {
  const [openModule, setOpenModule] = React.useState(true);
  const classes = useStyles();

  console.log(row);
  if (row.jobs.length === 0) {
    return (
      <React.Fragment>
        <TableRow className={classes.root}>
          <TableCell style={{ width: '62px' }} />
          <TableCell style={{ color: 'white' }}>{row.ci}</TableCell>
        </TableRow>
        <TableBody />
      </React.Fragment>
    );
  }

  return (
    <React.Fragment>
      <TableRow className={classes.root}>
        <TableCell style={{ width: '62px' }}>
          <IconButton
            aria-label='expand row'
            size='small'
            onClick={() => setOpenModule(!openModule)}
            style={{ color: 'white' }}
          >
            {openModule ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell style={{ color: 'white' }}>{row.ci}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={openModule} timeout='auto' unmountOnExit>
            <Box margin={1}>
              <Table size='small' aria-label='jobs'>
                <TableHead>
                  <TableRow>
                    <TableCell></TableCell>
                    <TableCell>Job name</TableCell>
                    <TableCell>Job link</TableCell>
                    <TableCell>Last build link</TableCell>
                    <TableCell>Last build number</TableCell>
                    <TableCell>Commands</TableCell>
                    <TableCell>Last build status</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row.jobs.map((childrenRow) => (
                    <StateRow jobRow={childrenRow} />
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
};

const CollapsibleTable: FC<{ rows: CItoolModel[] }> = ({
  rows,
}): ReactElement => {
  return (
    <TableContainer component={Paper}>
      <Table aria-label='collapsible table'>
        <TableHead></TableHead>
        <TableBody>
          {rows.map((row) => (
            <Row key={row.ci} row={row} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default CollapsibleTable;
