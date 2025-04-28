import { FormControl, FormHelperText, InputLabel, MenuItem, Select } from "@mui/material";
import { SelectInputProps } from "@mui/material/Select/SelectInput";
import { FieldValues, useController, UseControllerProps } from "react-hook-form";

type SelectItem = string | { label: string; value: string | number };

type Props<T extends FieldValues> = {
  label: string;
  name: keyof T;
  items: SelectItem[];
} & UseControllerProps<T> & Partial<SelectInputProps>;

export default function AppSelectInput<T extends FieldValues>(props: Props<T>) {
  const { fieldState, field } = useController({ ...props });
  const selectId = `${props.name}-select`;

  return (
    <FormControl fullWidth error={!!fieldState.error}>
      <InputLabel id={`${selectId}-label`}>{props.label}</InputLabel>
      <Select
        labelId={`${selectId}-label`}
        id={selectId}
        value={field.value ?? ""}
        label={props.label}
        onChange={field.onChange}
      >
        {props.items?.map((item, idx) =>
          typeof item === "string" ? (
            <MenuItem value={item} key={idx}>
              {item}
            </MenuItem>
          ) : (
            <MenuItem value={item.value} key={idx}>
              {item.label}
            </MenuItem>
          )
        )}
      </Select>
      <FormHelperText>{fieldState.error?.message}</FormHelperText>
    </FormControl>
  );
}
