import { Input } from "@nextui-org/react";

interface inputValues {
  type: string;
  label: string;
  autofocus: boolean;
  value: string;
  onChange: (value: string) => void;
}

export default function InputComp({
  type = "",
  label = "",
  autofocus = false,
  value = "",
  onChange,
}: inputValues) {

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    onChange(value);
  };
  return (
    <div className="w-full flex flex-col gap-4">
      <div className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4">
        <Input
          variant="bordered"
          label={label}
          size="lg"
          type={type}
          autoFocus={autofocus}
          onChange={handleChange}
          value={value}
        />
      </div>
    </div>
  );
}
