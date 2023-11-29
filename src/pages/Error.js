import React from "react";
import { Grid, Typography } from "@material-ui/core";

export const ErrorPage = (props) => {
    return (
      <Grid
        container
        item
        direction="column"
        alignItems="center"
        justify="center"
        style={{ padding: "30px", minHeight: "100vh", backgroundColor: '#F75F24', color: "white", textAlign: 'center' }}
      >
        <Grid item>
          <Typography variant="h2">Error 404</Typography>
          <Typography variant="h4">Ci dispiace ma la pagina che cerchi non esiste!</Typography>
        </Grid>
      </Grid>
    );
  };