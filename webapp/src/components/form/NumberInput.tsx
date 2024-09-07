"use client";

import { useState, useEffect, useCallback } from "react";
import { Input } from "@/components/ui/input";

type Props = {
  value: number | undefined;
  onChange: (value: number | undefined) => void;
};

const strToNum = (value: string) => {
  if (value === "") return undefined;
  // 全角数字を半角数字に変換
  const converted = value.replaceAll(/[０-９]/g, function (s) {
    return String.fromCodePoint(s.codePointAt(0)! - 0xfee0);
  });
  // 数字・小数点・マイナス記号以外を削除して number に変換
  const digits = converted.replaceAll(/[^\d.-]/g, "");
  if (digits === "") return undefined;
  return !Number.isNaN(Number(digits)) ? Number(digits) : undefined;
};

const numToStr = (value: number | undefined) => {
  if (value == null) return "";
  return value.toLocaleString();
};

export function NumberInput({ value, onChange }: Props) {
  const [displayValue, setDisplayValue] = useState(numToStr(value));

  useEffect(() => {
    setDisplayValue(numToStr(value));
  }, [value]);

  const setValue = useCallback(
    (value: string) => {
      const newValue = strToNum(value);
      const newDisplayValue = numToStr(newValue);
      setDisplayValue(newDisplayValue);
      onChange(newValue);
    },
    [onChange]
  );

  return (
    <Input
      value={displayValue}
      type="text"
      inputMode="numeric"
      onChange={(e) => setDisplayValue(e.currentTarget.value)}
      onBlur={(e) => setValue(e.currentTarget.value)}
    />
  );
}
