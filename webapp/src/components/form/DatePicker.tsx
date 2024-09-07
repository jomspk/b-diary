import { format, parse } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

type Props = {
  value: string | undefined;
  onChange: (value: string | undefined) => void;
};

const dateFormat = "yyyy-MM-dd";

export function DatePicker({ value, onChange }: Props) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className="pl-3 font-normal w-full justify-between"
        >
          <div>{value && format(value, dateFormat)}</div>
          <CalendarIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="p-0">
        <Calendar
          mode="single"
          selected={
            value != null ? parse(value, dateFormat, new Date()) : undefined
          }
          onSelect={(value) =>
            onChange(value != null ? format(value, dateFormat) : undefined)
          }
          initialFocus
        />
      </PopoverContent>
    </Popover>
  );
}
