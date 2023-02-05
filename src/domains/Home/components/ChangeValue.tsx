import { Stack, Typography } from '@mui/material'
import { MdOutlineKeyboardArrowUp, MdOutlineKeyboardArrowDown } from 'react-icons/md'

const ChangeValue = ({ value }: { value: number }) => {
  const isUp = value >= 0
  return (
    <Stack
      alignItems={'center'}
      spacing={2}
      direction="row"
      color={isUp ? 'success.main' : 'error.main'}
    >
      {isUp ? <MdOutlineKeyboardArrowUp /> : <MdOutlineKeyboardArrowDown />}
      <Typography variant="body1">{value}</Typography>
    </Stack>
  )
}

export default ChangeValue
