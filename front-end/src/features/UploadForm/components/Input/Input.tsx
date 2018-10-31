import { Button, Grid, Input as MUIInput } from '@material-ui/core';
import { Save } from '@material-ui/icons';
import { SFC } from 'react';
import * as React from 'react';
import { withState } from 'recompose';
import { styles } from '../../../../styles';
import { uploadService } from '../../../../domains/Documents';

export interface IInputProps {
  selectedFile: any;
  handleInputChange: any;
  handleUpload: any;
}

/**
 * Simple Upload Input field component
 *
 * @param {File} selectedFile - selected file from the input
 * @param {Function} handleInputChange - update state with selected file
 */
const Input: SFC<IInputProps> = ({ selectedFile, handleInputChange, handleUpload }) => {
  const handleChange = (event: any) => handleInputChange(event.target.files[0]);
  const handleButtonClick = () => uploadService(selectedFile);
  
  return (<Grid container={true} spacing={24}>
    <Grid item={true} xs={12}>
      <MUIInput
        onChange={handleChange}
        style={styles.uploadForm} type="file"
      />
    </Grid>
    <Grid item={true} xs={12}>
      <Button
        disabled={!selectedFile}
        variant="contained"
        color="primary"
        onClick={handleButtonClick}
      >
        <Save />&nbsp;
        Upload
      </Button>
    </Grid>
  </Grid>);
};

export default withState('selectedFile', 'handleInputChange', null)(Input);