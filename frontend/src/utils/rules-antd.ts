import { RuleObject, RuleRender } from "antd/lib/form";
import { NamePath, StoreValue } from "antd/lib/form/interface";

const regexNoSpace = /^\S*$/
const regexAlphanumeric = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&.,;:#¨></\\|^~{}+-])[A-Za-z\d@$!%*?&.,;:#¨></\\|^~{}+-]{8,}$/;
const regexNumeric = /^[0-9\b]+$/

export const requireInput = (message: string = ""): RuleObject => ({ required: true, message,  });
export const noSpaceInput = (message: string = ""): RuleObject => ({ pattern: regexNoSpace, message });
export const minimumCharactersInput = (min: number, message: string = ""): RuleObject => ({ min, message });
export const alphanumericInput = (message: string = ""): RuleObject => ({ pattern: regexAlphanumeric, message });
export const numericInput = (message: string = ""): RuleObject => ({ pattern: regexNumeric, message });

export const confirmInput = (input: NamePath, message: string = ""): RuleRender => 
  (form) => ({
    async validator(_: RuleObject, value: StoreValue) {
      if(!form.getFieldValue(input)) {
        return Promise.resolve();
      }

      if (form.getFieldValue(input) === value) {
        return;
      }
      
      return Promise.reject(new Error(message));
    }
  });

export const inputNumberValueHigher = (input: NamePath, message: string = ""): RuleRender =>
  (form) => ({
    async validator(_, value: number) {
      if(!form.getFieldValue(input)) {
        return Promise.resolve();
      }
      console.log({
        value,
        "form.getFieldValue(input)": form.getFieldValue(input)
      });
      if (value >= form.getFieldValue(input)) {
        return Promise.resolve();
      }

      return Promise.reject(new Error(message));
  },
});

export const inputNumberValueLower = (input: NamePath, message: string = ""): RuleRender =>
  (form) => ({
    async validator(_, value: number) {
      if(!form.getFieldValue(input)) {
        return Promise.resolve();
      }

      if (value < form.getFieldValue(input)) {
        return Promise.resolve();
      }

      return Promise.reject(new Error(message));
    }
});
