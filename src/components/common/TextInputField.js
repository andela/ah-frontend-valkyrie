import React from "react";
import PropTypes from "prop-types";

const TextInputField = ({
  name,
  label,
  type,
  placeholder,
  classname,
  icon,
  changed,
  value,
  required,
}) => (
  <div className="form-group">
    <div className="input-group">
      <span className="input-group-addon">
        <i className={icon} />
      </span>
      <input
        name={name}
        label={label}
        type={type}
        placeholder={placeholder}
        className={classname}
        onChange={changed}
        value={value}
        required={required}
      />
    </div>
  </div>
);

TextInputField.propTypes = {
  name: PropTypes.string,
  label: PropTypes.string,
  type: PropTypes.string,
  value: PropTypes.string,
  placeholder: PropTypes.string,
  icon: PropTypes.string,
  classname: PropTypes.string,
  changed: PropTypes.func,
  required: PropTypes.bool,
};

TextInputField.defaultProps = {
  label: "",
  placeholder: "",
  icon: "",
  value: "",
  classname: "",
  required: false,
  name: "",
  type: "",
  changed: null,
};

export default TextInputField;
