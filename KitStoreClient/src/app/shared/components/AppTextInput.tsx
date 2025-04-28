import { TextField, TextFieldProps } from "@mui/material";
import { FieldValues, useController, UseControllerProps } from "react-hook-form";

type Props<T extends FieldValues> = {
  label: string;
  name: keyof T;
} & UseControllerProps<T> & TextFieldProps;

export default function AppTextInput<T extends FieldValues>(props: Props<T>) {
  const { field, fieldState } = useController({ ...props });

  const {
    label,
    type,
    multiline,
    rows,
    slotProps,
    ...textFieldProps
  } = props;

  return (
    <TextField
      {...textFieldProps}
      {...field}
      label={label}
      type={type}
      multiline={multiline}
      rows={rows}
      fullWidth
      variant="outlined"
      error={!!fieldState.error}
      helperText={fieldState.error?.message}
      slotProps={{
        ...slotProps,
        input: (ownerState) => ({
          ...(typeof slotProps?.input === 'function' ? slotProps.input(ownerState) : {}),
          min: type === "number" ? 1 : undefined,
        }),
      }}
    />
  );
}
