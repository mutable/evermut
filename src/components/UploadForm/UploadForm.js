import React, { Component, createRef } from 'react';
import PropTypes from 'prop-types';
import Dropzone from 'react-dropzone'
import { Pane, Paragraph, Button } from 'evergreen-ui';

const MARGIN = 15;
const PADDING = 15;
const FONT_SIZE = 12;
const FONT_SIZE_TITLE = 16;
const BUTTON_NAME = 'Choose file';
const COLORS = {
  DISABLED: '#edf0f2',
  DEFAULT_BACKGROUND: 'white',
  PRIMARY: '#1070ca'
}

class UploadForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: ''
    };
  }

  openDialog = dropzoneRef => {
    if (dropzoneRef.current) {
      dropzoneRef.current.open();
    }
  };

  onChange = (state, data, fileName) => {
    const { name } = this.state;

    if(this.props.onChange && state === 2 && name !== fileName) {
      this.setState({ uploaded: 2, name: fileName });
      this.props.onChange(data, 2, fileName);
    }
  }

  render() {
    const {
      loading,
      disabledColor,
      defaultBackground,
      buttonColor,
      acceptedFileTypes,
      buttonName,
      ...style
    } = this.props;
    const dropzoneRef = createRef();
    const disabled = loading;

    return (
      <Pane marginTop={MARGIN} marginBottom={MARGIN*2} width='100%' {...style} >
        <Dropzone disabled={disabled} accept={acceptedFileTypes.length && acceptedFileTypes} ref={dropzoneRef} noClick noKeyboard>
          {({getRootProps, getInputProps, acceptedFiles}) => (
            <Pane>
              <Pane {...getRootProps({refKey: 'innerRef', className: 'dropzone'})}
                flex={1}
                display="flex"
                flexDirection="column"
                alignItems="center"
                padding={PADDING}
                borderWidth={1}
                borderRadius={2}
                borderColor={disabledColor}
                borderStyle="dashed"
                backgroundColor={disabled ? disabledColor : defaultBackground}
                cursor={disabled ? 'no-drop' : 'default'}
                color={disabledColor}
                outline="none"
                transition="border .24s ease-in-out"
              >
                <input {...getInputProps()} />
                <Paragraph fontSize={FONT_SIZE_TITLE}>{`Drag 'n' drop file here (${acceptedFileTypes.toString()})`}</Paragraph>
                <Paragraph>or</Paragraph>
                <Button
                  iconBefore="upload"
                  style={{pointerEvents: "auto"}}
                  appearance="minimal"
                  type="button"
                  disabled={disabled}
                  onClick={() => this.openDialog(dropzoneRef)}
                  color={buttonColor}
                >
                  {buttonName}
                </Button>
              </Pane>
              <Pane>
                {
                  acceptedFiles.map(file => {
                    const reader = new FileReader()

                    reader.onabort = () => console.log('file reading was aborted')
                    reader.onerror = () => console.log('file reading has failed')
                    reader.onloadend = () => {
                      this.onChange(reader.readyState, reader.result, file.path)
                    }
                    reader.readAsArrayBuffer(file)
                    return (
                      <Paragraph key={file.path} marginTop={MARGIN*2} fontSize={FONT_SIZE}>
                        {file.path} - {file.size} bytes
                      </Paragraph>
                    );
                  })
                }
              </Pane>
            </Pane>
          )}
        </Dropzone>
      </Pane>
    );
  }
}

UploadForm.defaultProps = {
  loading: false,
  disabledColor: COLORS.DISABLED,
  defaultBackground: COLORS.DEFAULT_BACKGROUND,
  buttonColor: COLORS.PRIMARY,
  acceptedFileTypes: [],
  buttonName: BUTTON_NAME
}


UploadForm.propTypes = {
  loading: PropTypes.bool,
  disabledColor: PropTypes.string,
  defaultBackground: PropTypes.string,
  buttonColor: PropTypes.string,
  acceptedFileTypes: PropTypes.array,
  onChange: PropTypes.func.isRequired,
  buttonName: PropTypes.string,
};

export default UploadForm;
