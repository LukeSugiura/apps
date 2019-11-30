// Copyright 2017-2019 @polkadot/react-components authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

import React from 'react';

import FieldExtrinsic from './FieldExtrinsic';

type Props = Pick<React.ComponentProps<typeof FieldExtrinsic>, 'label' | 'withLabel'>

export default function Extrinsic ({
  label,
  withLabel
}: Props): React.ReactElement<Props> {
  return (
    <div className='extrinsics--Extrinsic'>
      <FieldExtrinsic
        // defaultValue={defaultValue}
        // isDisabled={isDisabled}
        // isError={isError}
        // isPrivate={isPrivate}
        label={label}
        name='extrinsic'
        withLabel={withLabel}
        // help={meta && meta.documentation && meta.documentation.join(' ')}
      />
      {/* <Params
        key={`${section}.${method}:params` // force re-render on change}
        onChange={setValues}
        onEnter={onEnter}
        overrides={paramComponents}
        params={params}
      /> */}
    </div>
  );
}
