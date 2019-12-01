// Copyright 2017-2019 @polkadot/react-components authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

import { useField } from 'formik';
import React, { useMemo } from 'react';

import '../InputExtrinsic/InputExtrinsic.css';

import { useApi } from '@polkadot/react-hooks';

import { Labelled } from '..';
import createOptionsSection from '../InputExtrinsic/options/section';
import createOptionsMethod from '../InputExtrinsic/options/method';
import { BareProps } from '../types';
import SelectMethod from './SelectMethod';
import SelectSection from './SelectSection';
import { FieldProps } from './type';

interface Props extends BareProps, FieldProps, Pick<React.ComponentProps<typeof Labelled>, 'help' | 'label' | 'withLabel'> {
}

export default function FieldExtrinsic ({
  className,
  help: helpProp,
  label,
  name,
  withLabel,
  style
}: Props): React.ReactElement<Props> {
  const { api, apiDefaultTxSudo: { meta } } = useApi();
  const sectionName = `${name}.section`;
  const [sectionField, sectionMeta] = useField(sectionName);
  const optionsSection = useMemo(() => createOptionsSection(api), [api]);
  const onChangeSection = sectionField.onChange(sectionName);

  const methodName = `${name}.method`;
  const [methodField, methodMeta] = useField(methodName);
  const optionsMethod = useMemo(
    () => createOptionsMethod(api, sectionField.value),
    [api, sectionField.value]
  );
  const onChangeMethod = sectionField.onChange(methodName);

  const help = useMemo(
    () => meta && meta.documentation && meta.documentation.join(' '),
    [meta]
  );

  return (
    <div
      className={className}
      style={style}
    >
      <Labelled
        help={helpProp || help}
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
          <SelectMethod
            className='large'
            isError={!!(methodMeta.touched && methodMeta.error)}
            onChange={onChangeMethod}
            options={optionsMethod}
            value={methodField.value}
          />
        </div>
      </Labelled>
    </div>
  );
}
