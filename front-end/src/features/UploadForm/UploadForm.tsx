import { Button, Grid, Input } from '@material-ui/core';
import { Save } from '@material-ui/icons';
import { SFC } from 'react';
import * as React from 'react';
import { withState } from 'recompose';
import { styles } from '../../styles';

export interface IUploadFormProps {
  selectedFile: any;
  handleInputChange: any;
  handleUpload: any;
}

/**
 * Simple Upload form component
 *
 * @param {File} selectedFile - selected file from the input
 * @param {Function} handleInputChange - update state with selected file
 */
const UploadForm: SFC<IUploadFormProps> = ({ selectedFile, handleInputChange, handleUpload }) => {
  const handleChange = (event: any) => handleInputChange(event.target.files[0]);
  const handleButtonClick = () => handleUpload(selectedFile);
  
  return (<Grid container={true} spacing={24}>
    <Grid item={true} xs={12} sm={10}>
      <Input
        onChange={handleChange}
        style={styles.uploadForm} type="file"
      />
    </Grid>
    <Grid item={true} xs={12} sm={2}>
      <Button color="primary" onClick={handleButtonClick}>
        <Save />&nbsp;
        Upload
      </Button>
    </Grid>
  </Grid>);
};

export default withState('selectedFile', 'handleInputChange', null)(UploadForm);