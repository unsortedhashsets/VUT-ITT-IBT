import React, { FC, ReactElement, useState } from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

import {
  Box,
  Collapse,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from '@material-ui/core/';
import UpdateIcon from '@material-ui/icons/Update';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import { CItoolModel, defaultCItool } from '../model/CItool.model';
import StateRow from './StateRow';
import axios from 'axios';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      '& > *': {
        background: `${theme.palette.primary.dark}`,
      },
    },
    content: {
      '& > *': {
        background: `${theme.palette.primary.light}`,
      },
    },
  })
);

// define interface to represent component props
interface PropsR {
  _CItool: CItoolModel;
}

const Row: FC<PropsR> = ({ _CItool }): ReactElement => {
  const [openModule, setOpenModule] = React.useState(true);
  const classes = useStyles();
  const [CItool, setCItool] = useState<CItoolModel>(_CItool);

  const handleUpdate = (): void => {
    axios
      .get<CItoolModel>(`/api/ci/${CItool.id}/`, {
        withCredentials: true,
      })
      .then((response) => {
        setCItool(defaultCItool);
        setCItool(response.data);
      });
  };

  if (CItool.jobs.length === 0) {
    return (
      <React.Fragment>
        <TableRow className={classes.root}>
          <TableCell style={{ width: '62px' }} />
          <TableCell style={{ color: 'white' }}>{CItool.ci}</TableCell>
          <TableCell></TableCell>
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
        <TableCell style={{ color: 'white' }}>{CItool.ci}</TableCell>
        <TableCell align='right'>
          <IconButton>
            <UpdateIcon onClick={handleUpdate} />
          </IconButton>
        </TableCell>
      </TableRow>
      <TableRow className={classes.content}>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={openModule} timeout='auto' unmountOnExit>
            <Box margin={1}>
              <Table size='small' aria-label='jobs'>
                <TableHead>
                  <TableRow>
                    <TableCell style={{ width: 50 }}></TableCell>
                    <TableCell style={{ width: 350 }}>Job name</TableCell>
                    <TableCell>Job link</TableCell>
                    <TableCell>Last build link</TableCell>
                    <TableCell>Last build number</TableCell>
                    <TableCell>Commands</TableCell>
                    <TableCell>Last build status</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {CItool.jobs.map((childrenRow) => (
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

// define interface to represent component props
interface PropsCT {
  CItools: CItoolModel[];
}

const StateCollapsibleTable: FC<PropsCT> = ({ CItools }): ReactElement => {
  return (
    <TableContainer component={Paper}>
      <Table aria-label='collapsible table'>
        <TableHead></TableHead>
        <TableBody>
          {CItools.map((CItool) => (
            <Row key={CItool.ci} _CItool={CItool} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default StateCollapsibleTable;