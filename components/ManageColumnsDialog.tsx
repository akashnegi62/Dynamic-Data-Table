"use client";

import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  FormGroup,
  FormControlLabel,
  Checkbox,
  Stack,
  TextField,
} from "@mui/material";
import { useAppDispatch, useAppSelector } from "@/lib/store";
import { toggleVisibility, addColumn } from "@/features/columns/columnsSlice";
import { useForm } from "react-hook-form";

export function ManageColumnsDialog({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const dispatch = useAppDispatch();
  const columns = useAppSelector((s) =>
    [...s.columns.items].sort((a, b) => a.order - b.order)
  );
  const { register, handleSubmit, reset } = useForm<{
    id: string;
    label: string;
  }>();

  const onAdd = handleSubmit(({ id, label }) => {
    if (!id || !label) return;
    dispatch(addColumn({ id, label }));
    reset();
  });

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>Manage Columns</DialogTitle>
      <DialogContent dividers>
        <FormGroup>
          {columns.map((c) => (
            <FormControlLabel
              key={c.id}
              control={
                <Checkbox
                  checked={c.visible}
                  onChange={(e) =>
                    dispatch(
                      toggleVisibility({ id: c.id, visible: e.target.checked })
                    )
                  }
                />
              }
              label={c.label}
            />
          ))}
        </FormGroup>

        <Stack direction="row" spacing={2} mt={2}>
          <TextField
            size="small"
            label="New field key"
            placeholder="Department"
            {...register("id")}
          />
          <TextField
            size="small"
            label="Label"
            placeholder="Department"
            {...register("label")}
          />
          <Button variant="outlined" onClick={onAdd}>
            Add
          </Button>
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Close</Button>
      </DialogActions>
    </Dialog>
  );
}
