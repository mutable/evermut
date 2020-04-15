import React, { useState } from 'react';

export default Drop = ({getRootProps, getInputProps, acceptedFiles}) => (
  <Pane>
    <Pane {...getRootProps({className: 'dropzone'})}
      flex={1}
      display="flex"
      flexDirection="column"
      alignItems="center"
      padding={PADDING}
      borderWidth={1}
      borderRadius={2}
      borderColor={disabeldColor}
      borderStyle="dashed"
      backgroundColor={disabled ? disabeldColor : defaultBackground}
      color={disabeldColor}
      outline="none"
      transition="border .24s ease-in-out"
    >
      <input {...getInputProps()} />
      <Paragraph fontSize={FONT_SIZE_TITLE}>Drag 'n' drop file here (.tar)</Paragraph>
      <Paragraph>or</Paragraph>
      <Button
        iconBefore="upload"
        style={{pointerEvents: "auto"}}
        color={buttonColor}
        appearance="minimal"
        type="button"
        disabled={disabled}
        onClick={() => this.openDialog(dropzoneRef)}
      >
        Choose file
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
)
