import { FormControl, FormHelperText, InputLabel, MenuItem, Select } from "@mui/material";
import { SelectInputProps } from "@mui/material/Select/SelectInput";
import { FieldValues, useController, UseControllerProps } from "react-hook-form"

type Props<T extends FieldValues> = {
    label: string,
    name: keyof T,
    items: string[]
} & UseControllerProps<T> & Partial<SelectInputProps> // makes all properties optional in SelectInputProps
export default function AppSelectInput<T extends FieldValues>(props: Props<T>){
    const {fieldState, field} = useController({...props});
  return (
    <FormControl fullWidth error={!!fieldState.error}>
        <InputLabel>{props.label}</InputLabel>
        <Select
            value={field.value || ""}
            label={props.label}
            onChange={field.onChange}
        >
            {props.items?.map((item, idx)=> (
                <MenuItem value={item} key={idx}>{item}</MenuItem>
            ))}
        </Select>
        <FormHelperText>{fieldState.error?.message}</FormHelperText>
    </FormControl>
  )
}