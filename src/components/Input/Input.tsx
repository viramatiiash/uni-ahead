import { HTMLInputTypeAttribute } from "react";
import {
  Control,
  Controller,
  FieldValues,
  Path,
  PathValue,
  RegisterOptions,
} from "react-hook-form";
import "./input.component.scss";
import classNames from "classnames";

interface Props<T extends FieldValues> {
  belongsTo: string;
  name: Path<T>;
  control: Control<T>;
  type?: HTMLInputTypeAttribute;
  placeholder?: string;
  label?: string;
  defaultValue?: PathValue<T, Path<T>>;
  error?: string;
  success?: boolean;
  disabled?: boolean;
  variant?: string;
  textarea?: boolean;
  rules?: RegisterOptions<T, Path<T>>;
  showCounter?: boolean;
  className?: string;
}

const Input = <T extends FieldValues>({
  belongsTo,
  name,
  label = "",
  control,
  defaultValue,
  type = "text",
  placeholder = "",
  error = "",
  success = false,
  disabled = false,
  variant = "primary",
  textarea = false,
  rules,
  showCounter,
  className,
}: Props<T>) => {
  const InputComponent = textarea ? "textarea" : "input";

  const maxLengthValue =
    typeof rules?.maxLength === "object"
      ? rules.maxLength.value
      : rules?.maxLength;

  return (
    <div
      className={classNames(
        `${belongsTo}__input-field`,
        "input-field",
        disabled && "input-field--disabled",
        !!error?.length && "input-field--error",
        success && "input-field--success",
        className
      )}
    >
      {label && (
        <label
          htmlFor={name}
          className={classNames("label", `label--${variant}`)}
        >
          {label}
        </label>
      )}

      <Controller
        name={name}
        control={control}
        defaultValue={defaultValue}
        rules={rules}
        render={({ field }) => (
          <div className="input-wrapper">
            <InputComponent
              {...field}
              id={name}
              placeholder={placeholder}
              type={textarea ? undefined : type}
              disabled={disabled}
              className={classNames(
                "input",
                `input--${variant}`,
                error?.length && "input--error",
                success && "input--success"
              )}
              maxLength={maxLengthValue}
            />

            {showCounter && maxLengthValue && (
              <div className="input-counter">
                {field.value?.length || 0} / {maxLengthValue}
              </div>
            )}
          </div>
        )}
      />

      {error && <p className="error-message">{error}</p>}
    </div>
  );
};

export default Input;
