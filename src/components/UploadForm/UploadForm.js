import React, { Component, createRef } from 'react';
import PropTypes from 'prop-types';
import Dropzone from 'react-dropzone';
import Drop from './Dropzone';
import { Pane, Paragraph, Button } from 'evergreen-ui';

const MARGIN = 15;
const PADDING = 15;
const FONT_SIZE = 12;
const FONT_SIZE_TITLE = 16;
const COLORS = {
  DISABLED: '#edf0f2',
  DEFAULT_BACKGROUND: 'white',
  PRIMARY: '#EE9913'
}

class UploadForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      uploaded: 0
    };
  }

  openDialog = dropzoneRef => {
    if (dropzoneRef.current) {
      dropzoneRef.current.open();
    }
  };

  onChange = (state, data, fileName) => {
    const { uploaded } = this.state;
    if(this.props.onChange && state === 2 && uploaded !==2) {
      this.setState({ uploaded: 2 });
      this.props.onChange(data, 2, fileName);
    }
  }

  render() {
    const { loading, disabeldColor, defaultBackground, buttonColor, ...style } = this.props;
    const dropzoneRef = createRef();
    const disabled = loading;

    return (
      <Pane marginTop={MARGIN} marginBottom={MARGIN*2} width='100%' {...style} >
        <Dropzone disabled={disabled} accept={[ '.tar' ]} ref={dropzoneRef} noClick noKeyboard>
          <Drop />
        </Dropzone>
      </Pane>
    );
  }
}

UploadForm.defaultProps = {
  loading: false,
  disabeldColor: COLORS.DISABLED,
  defaultBackground: COLORS.DEFAULT_BACKGROUND,
  buttonColor: COLORS.PRIMARY
}


UploadForm.propTypes = {
  loading: PropTypes.bool,
  disabeldColor: PropTypes.string,
  defaultBackground: PropTypes.string,
  buttonColor: PropTypes.string
};

export default UploadForm;
