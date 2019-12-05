// Copyright 2017-2019 @polkadot/react-components authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

import React from 'react';

import FieldParams from '@polkadot/react-params/experimental';

import FieldExtrinsic from './FieldExtrinsic';

interface Props extends Pick<React.ComponentProps<typeof FieldExtrinsic>, 'label' | 'withLabel'> {
  name?: string;
}

export default function Extrinsic ({
  label,
  name = 'extrinsic',
  withLabel
}: Props): React.ReactElement<Props> {
  return (
    <div className='extrinsics--Extrinsic'>
      <FieldExtrinsic
        // defaultValue={defaultValue}
        // isDisabled={isDisabled}
        // isPrivate={isPrivate}
        label={label}
        name={name}
        withLabel={withLabel}
      />
      <FieldParams
        // key={`${section}.${method}:params` // force re-render on change}
        // onChange={setValues}
        // onEnter={onEnter}
        // overrides={paramComponents}
        // params={params}
      />
    </div>
  );
}
