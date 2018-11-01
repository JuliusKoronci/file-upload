import { Button, Grid, Input as MUIInput } from '@material-ui/core';
import { Save } from '@material-ui/icons';
import { SFC } from 'react';
import * as React from 'react';
import { withState } from 'recompose';
import { Loader } from '../../../../components/Loader';
import { styles } from '../../../../styles';

export interface IInputProps {
  selectedFile: any;
  handleInputChange: any;
  handleUpload: any;
  loading: boolean;
}

/**
 * Simple Upload Input field component
 *
 * @param {File} selectedFile - selected file from the input
 * @param {Function} handleInputChange - update state with selected file
 * @param {Function} handleUpload - handles upload comming from container
 */
const Input: SFC<IInputProps> = ({ selectedFile, handleInputChange, handleUpload, loading }) => {
  const handleChange = (event: any) => handleInputChange(event.target.files[0]);
  const handleButtonClick = () => handleUpload(selectedFile);
  
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
        <Loader loading={loading}><Save /></Loader>&nbsp;
        Upload
      </Button>
    </Grid>
  </Grid>);
};

export default withState('selectedFile', 'handleInputChange', null)(Input);