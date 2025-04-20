import { Checkbox, FormControlLabel, FormGroup } from "@mui/material";
import { ChangeEvent, useEffect, useState } from "react";

type Props = {
  checkboxes: string[];
  checked: string[];
  onChange: (items: string[]) => void;
};

const CheckboxButtons = ({ checkboxes, checked, onChange }: Props) => {
  const [checkedItems, setCheckedItems] = useState(checked);

  useEffect(() => {
    setCheckedItems(checked);
  }, [checked]);

  const handleToggle = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const updatedChecked = checkedItems?.includes(value)
      ? checkedItems.filter((item) => item != value)
      : [...checkedItems, value];
    setCheckedItems(updatedChecked);
    onChange(updatedChecked);
  };

  return (
    <FormGroup>
      {checkboxes &&
        checkboxes?.map((item: string) => (
          <FormControlLabel
            key={item}
            control={
              <Checkbox
                checked={checkedItems.includes(item)}
                color="secondary"
                sx={{ py: 0.7, fontSize: 40 }}
                value={item}
                onChange={handleToggle}
              />
            }
            label={item}
          />
        ))}
    </FormGroup>
  );
};
export default CheckboxButtons;
