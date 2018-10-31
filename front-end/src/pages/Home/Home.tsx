import { Card, CardContent, Grid } from '@material-ui/core';
import * as React from 'react';
import { UploadContainer } from '../../features';
import { styles } from '../../styles';

export const Home = () => (
  <div style={styles.layout}>
    <Grid container={true} spacing={24}>
      <Grid item={true} xs={12}>
        <h3>FILE UPLOAD</h3>
      </Grid>
      <Grid item={true} xs={12}>
        <Card>
          <CardContent>
            <Grid item={true} xs={12}>
              <UploadContainer />
            </Grid>
            <Grid item={true} xs={12}>
              List of uploaded files
            </Grid>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  </div>
);