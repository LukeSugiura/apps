// Copyright 2017-2019 @polkadot/react-components authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

import React, { useRef } from 'react';

import { classes } from '@polkadot/react-components/util';

import findComponent from '../../Param/findComponent';
import Static from '../../Param/Static';
import { Props as CProps, ComponentMap } from '../../types';

interface Props extends Pick<CProps, 'className' | 'isDisabled' | 'label' | 'name' | 'style' | 'type'>{
  isOptional?: boolean;
  overrides?: ComponentMap;
  value: CProps['defaultValue'];
}

export default function Param ({
  className,
  isDisabled = false,
  isOptional = false,
  label,
  overrides,
  style,
  type,
  value
}: Props): React.ReactElement<Props> | null {
  const compRef = useRef<React.ComponentType<CProps> | null>(findComponent(type, overrides));

  if (!compRef.current) {
    return null;
  }

  return isOptional
    ? (
      <Static
        defaultValue={value}
        label={label}
        type={type}
      />
    )
    : (
      <compRef.current
        className={classes('ui--Param', className)}
        defaultValue={{ value, isValid: true }}
        key={`${name}:${type}`}
        isDisabled={isDisabled}
        label={label}
        name={name}
        // onChange={onChange}
        // onEnter={onEnter}
        style={style}
        type={type}
      />
    );
}
