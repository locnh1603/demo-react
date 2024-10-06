import { useRouteError } from "react-router-dom";
import {Typography} from '@mui/material';

export default function ErrorPage() {
  const error: any = useRouteError();
  console.error(error);

  return (
    <div id="error-page">
      <Typography variant="h1">Oops!</Typography>
      <Typography>Sorry, an unexpected error has occurred.</Typography>
      <Typography>
        <i>{error.statusText || error.message}</i>
      </Typography>
    </div>
  );
}
