import * as React from 'react';
import { Card, CardContent, Grid } from '@material-ui/core';

import { DocumentList, UploadForm } from '../../features';
import { styles } from '../../styles';
import { DocumentsProvider } from '../../providers';

export const Home = () => (
  <div style={styles.layout}>
    <DocumentsProvider>
      <Grid container={true} spacing={24}>
        <Grid item={true} xs={12}>
          <h3>FILE UPLOAD</h3>
        </Grid>
        <Grid item={true} xs={12}>
          <Card>
            <CardContent>
              <Grid item={true} xs={12}>
                <UploadForm />
              </Grid>
              <Grid item={true} xs={12}>
                <DocumentList />
              </Grid>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </DocumentsProvider>
  </div>
);