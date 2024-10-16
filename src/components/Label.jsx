import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUp, faArrowDown } from "@fortawesome/free-solid-svg-icons";

export const Label = ({ str, id, value, setValue }) => {
  return (
    <div id={`${id}-label`}>
      <h3>{str} Length</h3>
      <button id={`${id}-decrement`} onClick={() => setValue(value - 1)}>
        <FontAwesomeIcon icon={faArrowDown} />
      </button>
      <span id={`${id}-length`}>{value}</span>
      <button id={`${id}-increment`} onClick={() => setValue(value + 1)}>
        <FontAwesomeIcon icon={faArrowUp} />
      </button>
    </div>
  );
};

Label.propTypes = {
  str: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  value: PropTypes.number.isRequired,
  setValue: PropTypes.func.isRequired,
};
