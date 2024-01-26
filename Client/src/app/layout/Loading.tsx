import { Backdrop, CircularProgress } from '@mui/material';

type LoadingProps = {
    message?: string;
}

export default function Loading({message}: LoadingProps) {
  return (
    <Backdrop open={true} invisible={true}>
        <CircularProgress size={100}  color="secondary"/>
        {message}
    </Backdrop>
  )
}
