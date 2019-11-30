// Copyright 2017-2019 @polkadot/react-components authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

import React from 'react';
import Button from 'semantic-ui-react/dist/commonjs/elements/Button/Button';
import SUIDropdown, { DropdownProps } from 'semantic-ui-react/dist/commonjs/modules/Dropdown/Dropdown';
import styled from 'styled-components';


import { Labelled } from '..';
import { classes } from '../util';

interface Props<Option> extends
  Pick<DropdownProps, 'onBlur' | 'onClose' | 'options' | 'placeholder' | 'renderLabel' | 'searchInput' | 'selection'>,
  Pick<React.ComponentProps<typeof Labelled>, 'className' | 'help' | 'label' | 'labelExtra' | 'style' | 'withEllipsis' | 'withLabel'> {
  allowAdd?: boolean;
  dropdownClassName?: string;
  isButton?: boolean;
  isDisabled?: boolean;
  isError?: boolean;
  isMultiple?: boolean;
  onAdd?: (value: any) => void;
  onChange?: (value: any) => void;
  onSearch?: (filteredOptions: any[], query: string) => Option[];
  options: Option[];
  transform?: (value: any) => any;
  value: any;
}

function Dropdown<Option> ({
  allowAdd,
  dropdownClassName,
  isButton,
  isDisabled,
  isError,
  isMultiple,
  onAdd,
  onBlur,
  onChange,
  onClose,
  options,
  placeholder,
  renderLabel,
  onSearch,
  searchInput,
  selection,
  transform,
  value,
  ...labelledProps
}: Props<Option>): React.ReactElement<Props<Option>> {
  const _onAdd: DropdownProps['onAddItem'] = (_, { value }) => {
    onAdd && onAdd(value);
  };

  const _onChange: DropdownProps['onChange'] = (_, { value }) => {
    onChange && onChange(
      transform
        ? transform(value)
        : value
    );
  };

  const dropdownProps: React.ComponentProps<typeof SUIDropdown> = {
    allowAdditions: allowAdd,
    button: isButton,
    className: dropdownClassName,
    compact: isButton,
    disabled: isDisabled,
    error: isError,
    floating: isButton,
    fluid: true,
    multiple: isMultiple,
    onAddItem: _onAdd,
    onBlur,
    onChange: _onChange,
    onClose,
    options,
    placeholder,
    renderLabel,
    search: onSearch || allowAdd,
    searchInput,
    selection,
    value
  };

  return isButton ? (
    <Button.Group primary>
      <SUIDropdown {...dropdownProps} />
    </Button.Group>
  ) : (
    <Labelled
      {...labelledProps}
      className={classes('ui--Dropdown', labelledProps.className)}
    >
      <SUIDropdown {...dropdownProps} />
    </Labelled>
  );
}

export default styled(Dropdown)`
  .ui--Dropdown-item {
    position: relative;
    white-space: nowrap;

    .ui--Dropdown-icon,
    .ui--Dropdown-name {
      display: inline-block;
    }

    .ui--Dropdown-icon {
      height: 32px;
      left: 0;
      position: absolute;
      top: -9px;
      width: 32px;
    }

    .ui--Dropdown-name {
      margin-left: 3rem;
    }
  }

  .ui.selection.dropdown {
    > .text > .ui--Dropdown-item {
      .ui--Dropdown-icon {
        left: -2.6rem;
        top: -1.15rem;
        opacity: 1;
      }

      .ui--Dropdown-name {
        margin-left: 0;
      }
    }
  }
`;
