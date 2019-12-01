// Copyright 2017-2019 @polkadot/react-components authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

import React from 'react';

import { classes } from '../util';
import Dropdown from './Dropdown';

type Props = Pick<React.ComponentProps<typeof Dropdown>, 'className' | 'isError' | 'onChange' | 'options' | 'value'>

export default function SelectMethod (props: Props): React.ReactElement<Props> | null {
  if (!props.options.length) {
    return null;
  }

  return (
    <Dropdown
      {...props}
      className={classes('ui--DropdownLinked-Items', props.className)}
      withLabel={false}
    />
  );
}
