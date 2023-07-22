import classnames from 'classnames';
import React from 'react';
import './Checkbox.less';

// -- icons --
import LineIcon from '../icons/LineIcon';
import TickIcon from '../icons/TickIcon';

export default ({
  indeterminate,
  checked,
  ...props
}) => (
  <div
    className={classnames(['Checkbox', {
      'is-checked': checked,
      'is-indeterminate': indeterminate,
    }])}
  >
    <input
      type="checkbox"
      checked={checked}
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...props}
    />

    {indeterminate && (
      <LineIcon
        color="#fff"
        width="12"
        height="10"
      />
    )}

    {checked && (
      <TickIcon
        color="#fff"
        width="12"
        height="9"
      />
    )}
  </div>
);
