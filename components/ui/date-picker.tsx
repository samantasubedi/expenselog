"use client";

import * as React from "react";
import { Calendar1, CalendarCheck, ChevronDownIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import moment from "moment";

export const DatePicker: React.FC<{
  onChange: (v: Date) => void;
  value: Date;
  disabled?: boolean;
}> = ({ onChange, value, disabled }) => {
  const [open, setOpen] = React.useState(false);
  const [date, setDate] = React.useState<Date | undefined>(value || undefined);

  React.useEffect(() => {
    setDate(value);
  }, [value]);

  return (
    <div className="flex flex-col gap-3">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            id="date"
            className=" justify-between font-normal"
            disabled={disabled}
          >
            {date ? moment(date).format("YYYY-MM-DD") : "Select date"}
            <CalendarCheck />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto overflow-hidden p-0" align="start">
          <Calendar
            mode="single"
            selected={date}
            captionLayout="dropdown"
            onSelect={(date) => {
              setDate(date);
              if (date) onChange(date);
              setOpen(false);
            }}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
};
