import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

function Calender() {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer components={["DatePicker"]}>
        <DatePicker
          label="Filter by Goal Add Date"
          views={["month", "year"]}
          slotProps={{
            textField: {
              helperText: "MM/YYYY",
            },
          }}
        />
      </DemoContainer>
    </LocalizationProvider>
  );
}

export default Calender;
