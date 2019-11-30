// Copyright 2017-2019 @polkadot/react-components authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

import { useField } from 'formik';
import React, { useMemo } from 'react';

import { useApi } from '@polkadot/react-hooks';

import { Labelled } from '..';
import createOptionsSection from '../InputExtrinsic/options/section';
import { BareProps } from '../types';
import SelectSection from './SelectSection';
import { FieldProps } from './type';

interface Props extends BareProps, FieldProps, Pick<React.ComponentProps<typeof Labelled>, 'help' | 'label' | 'withLabel'> {
}

export default function FieldExtrinsic ({
  className,
  help,
  label,
  name,
  withLabel,
  style
}: Props): React.ReactElement<Props> {
  const { api } = useApi();
  const sectionName = `${name}.section`;
  const [sectionField, sectionMeta] = useField(sectionName);
  const optionsSection = useMemo(() => createOptionsSection(api), [api]);

  const onChangeSection = sectionField.onChange(sectionName);

  return (
    <div
      className={className}
      style={style}
    >
      <Labelled
        help={help}
        label={label}
        withLabel={withLabel}
      >
        <div className='ui--DropdownLinked ui--row'>
          <SelectSection
            className='small'
            isError={!!(sectionMeta.touched && sectionMeta.error)}
            onChange={onChangeSection}
            options={optionsSection}
            value={sectionField.value}
          />
          {/* <SelectMethod
            api={api}
            className='large'
            onChange={_onKeyChange}
            options={optionsMethod}
            value={value}
          /> */}
        </div>
      </Labelled>
    </div>
  );
}
