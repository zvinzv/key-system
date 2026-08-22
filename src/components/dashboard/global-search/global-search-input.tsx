import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import { useGlobalSearch } from "./global-search-context";
import { Search } from "lucide-react";
import { Kbd } from "@/components/ui/kbd";

const InputGroupComponent = () => {
  const { inputRef, inputValue, setInputValue, setOpen, onKeyDown } =
    useGlobalSearch();
  return (
    <InputGroup dir="rtl" className="h-12 p-2  bg-background ">
      <InputGroupInput
        ref={inputRef}
        value={inputValue}
        placeholder="البحث عن صفحة او اجراء..."
        className="w-full outline-0 bg-transparent"
        onChange={(e) => {
          setInputValue(e.target.value);
          setOpen(true);
        }}
        onFocus={() => {
          setOpen(true);
        }}
        onKeyDown={onKeyDown}
      />
      <InputGroupAddon>
        <Search className="size-4" />
      </InputGroupAddon>
      <InputGroupAddon align={"inline-end"}>
        <Kbd>Ctrl + K</Kbd>
      </InputGroupAddon>
    </InputGroup>
  );
};

export default InputGroupComponent;
