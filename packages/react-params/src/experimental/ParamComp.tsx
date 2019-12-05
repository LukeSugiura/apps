// Copyright 2017-2019 @polkadot/react-components authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

import React from 'react';

import Param from './Param';

interface Props {

}

export default function ParamComp ({
  index,
  name,
  type,
  value
}: Props): React.ReactElement {
  console.log(value, name, type)
  return (
    <div className='ui--Param-composite'>
      <Param
        // defaultValue={defaultValue}
        // isDisabled={isDisabled}
        key={`input:${index}`}
        name={name}
        // onChange={_onChange}
        // onEnter={onEnter}
        // overrides={overrides}
        type={type}
        value={value}
      />
    </div>
  );
}
