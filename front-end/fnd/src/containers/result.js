import React, { Component } from 'react'
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';

import ReactWordcloud from 'react-wordcloud';
import words from '../modules/words'
import { Divider, Row, Col } from 'antd';

import C3Chart from "react-c3js";
import "c3/c3.css";

// Charts properties

const hyperpartisanData = {
  columns: [],
  type : 'pie'
};

const stanceData = {
  columns: [],
  type : 'pie'
};

// Wordcloud properties
const options = {
  colors: ['#1f77b4', '#ff7f0e', '#2ca02c', '#d62728', '#9467bd', '#8c564b'],
  enableTooltip: true,
  deterministic: false,
  fontFamily: 'impact',
  fontSizes: [5, 60],
  fontStyle: 'normal',
  fontWeight: 'normal',
  padding: 1,
  rotations: 3,
  rotationAngles: [0, 90],
  scale: 'sqrt',
  spiral: 'archimedean',
  transitionDuration: 1000,
};

// Popup properties
const styles = theme => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
});

const DialogTitle = withStyles(styles)(props => {
  const { children, classes, onClose } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton aria-label="Close" className={classes.closeButton} onClick={onClose}>
          {/*<IconButton />*/}
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

const DialogContent = withStyles(theme => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiDialogContent);

const DialogActions = withStyles(theme => ({
  root: {
    margin: 0,
    padding: theme.spacing(1),
  },
}))(MuiDialogActions);



class Result extends Component {
  state = {
      open: true,
    };

  constructor(props) {
    super(props)
  }

  handleClickOpen = () => {
    this.setState({
      open: true,
    });
  };

  handleClose = () => {
    this.setState({ open: false });
    this.props.close();
  };

  render() {
    // genres_piechart.data.columns = Object.entries([['data1', 30], ['data2', 120]]);

    if (!this.props.hyperconfidence) {
      return <div></div>
    }
    console.log('hyperconfidence: ', this.props.hyperconfidence.hyperpartisan);
    hyperpartisanData.columns = [
      ['Hyperpartisan', parseFloat(this.props.hyperconfidence.hyperpartisan)],
      ['Non-hyperpartisan', 100 - parseFloat(this.props.hyperconfidence.hyperpartisan)]
    ]
    stanceData.columns = [['agrees', 25], ['disagree', 13.4], ['discuss', 45], ['unrelated', 16.6]]
    return (
      <div>
        <Dialog
          onClose={this.handleClose}
          aria-labelledby="customized-dialog-title"
          open={this.state.open}
          maxWidth="md"
        >
          <DialogTitle id="customized-dialog-title" onClose={this.handleClose}>
            Analysis
          </DialogTitle>
          <DialogContent dividers>
            <Typography gutterBottom>
              Based on our models, this article follows a hyperpartisan with 69%
               confidence.
            </Typography>
            <Typography gutterBottom>
              According to stance detection, this article was found to be relating its
               headline with 72% confidence.
            </Typography>
            <Typography gutterBottom>
              All visual statistics can be shown below.
            </Typography>

            <Divider />

            <Row>
            <Col span={4} />
            <Col span={13}> Hyperpartisan </Col>
            <Col> Stance </Col>
            </Row>
            <Row>
             <Col span={12}><C3Chart data={hyperpartisanData} /></Col>
             <Col span={12}><C3Chart data={stanceData} /></Col>
            </Row>
            <Divider />
            <Row>
              <Col span={11} />
              <Col> Wordcloud </Col>
            </Row>
            <Row>
              <Col span={3} />
              <Col span={21}>
                <div style={{height: 400, width: 600}}>
                  <ReactWordcloud options={options} words={this.props.words ? this.props.words : [{text: '', value: 0}]} />
                </div>
              </Col>
            </Row>

          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Ok
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    )
  }
}


export default Result;
