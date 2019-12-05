// Copyright 2017-2019 @polkadot/react-components authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

import { useField, useFormikContext } from 'formik';
import React, { useEffect, useMemo } from 'react';
import styled from 'styled-components';

import { BareProps } from '@polkadot/react-components/types';
import { classes } from '@polkadot/react-components/util';
import { useApi } from '@polkadot/react-hooks';
import { GenericCall, getTypeDef } from '@polkadot/types';
import { TypeDef } from '@polkadot/types/types';

import getInitValue from '../initValue';
import { ParamDef } from '../types';
import ParamComp from './ParamComp';

interface Props extends BareProps {}

function FieldParams({
  className,
  name = 'params',
  style
}: Props): React.ReactElement<Props> {
  const { apiDefaultTxSudo: { meta } } = useApi();
  const { setFieldValue } = useFormikContext();
  const [field] = useField(name);

  const params = useMemo(() =>
    GenericCall.filterOrigin(meta).map((arg): { name: string; type: TypeDef } => ({
      name: arg.name.toString(),
      type: getTypeDef(arg.type.toString())
    })
  ), [meta]);

  const onChangeParams = val => setFieldValue(name, val);

  useEffect((): void => {
    const newParamsValue = params.map((param, i) =>
      field.value && field.value[i]
        ? field.value[i]
        : getInitValue(param.type));
    onChangeParams(newParamsValue);
  }, [params]);

  return (
    <div
      className={classes('ui--Params', className)}
      style={style}
    >
      <div className='ui--Params-Content'>
        {field.value && params.map(({ name, type }: ParamDef, index: number): React.ReactNode => (
          <ParamComp
            index={index}
            // isDisabled={isDisabled}
            key={`${name}:${type}:${index}`}
            name={name}
            // onChange={this.onChangeParam}
            // overrides={overrides}
            value={field.value[index]}
            type={type}
          />
        ))}
      </div>
    </div>
  );
}

export default styled(FieldParams)`
  .ui--Param-composite {
    position: relative;

    .ui--Param-overlay {
      position: absolute;
      top: 0.5rem;
      right: 3.5rem;
    }
  }
`

