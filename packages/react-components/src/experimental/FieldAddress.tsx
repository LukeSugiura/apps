// Copyright 2017-2019 @polkadot/react-components authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

import { useField } from 'formik';
import React, { useEffect, useMemo } from 'react';
import store from 'store';
import styled from 'styled-components';

import { useObservable } from '@polkadot/react-hooks';
import keyring from '@polkadot/ui-keyring';
import keyringOption from '@polkadot/ui-keyring/options';
import { KeyringOptions, KeyringSectionOptions, KeyringOption$Type } from '@polkadot/ui-keyring/options/types';

import { classes } from '../util';
import createHeader from '../InputAddress/createHeader';
import createItem from '../InputAddress/createItem';
import { Option } from '../InputAddress/types';
import addressToAddress from '../util/toAddress';
import Dropdown from './Dropdown';
import { FieldProps } from './type';

const STORAGE_KEY = 'options:InputAddress';
const DEFAULT_TYPE = 'all';

function transformToAddress (value: string | Uint8Array): string | null {
  try {
    return addressToAddress(value) || null;
  } catch (error) {
    console.error('Unable to transform address', value);
  }

  return null;
}

function transformToAccountId (value: string): string | null {
  if (!value) {
    return null;
  }

  const accountId = transformToAddress(value);

  return !accountId
    ? null
    : accountId;
}

function readOptions (): Record<string, any> {
  return store.get(STORAGE_KEY) || { defaults: {} };
}

function getLastValue (type: KeyringOption$Type = DEFAULT_TYPE): any {
  return readOptions().defaults[type];
}

function setLastValue (type: KeyringOption$Type = DEFAULT_TYPE, value: string): void {
  const options = readOptions();

  store.set(STORAGE_KEY, {
    ...options,
    defaults: {
      [type]: value
    }
  });
}

type DropdownProps = React.ComponentProps<typeof Dropdown>

interface Props extends FieldProps, Omit<DropdownProps, 'onSearch' | 'options' | 'value'> {
  hideAddress?: boolean;
  isInput?: boolean;
  type?: KeyringOption$Type;
}

function FieldAddress ({
  isInput = true,
  hideAddress = false,
  name,
  type = DEFAULT_TYPE,
  ...dropdownProps
}: Props): React.ReactElement<Props> | null {
  const [field, meta] = useField(name);
  const { optionsAll } = useObservable<Record<string, Option[]>>(keyringOption.optionsSubject, {
    propName: 'optionsAll',
    transform: (optionsAll: KeyringOptions): Record<string, Option[]> =>
      Object.entries(optionsAll).reduce((result: Record<string, Option[]>, [type, options]): Record<string, Option[]> => {
        result[type] = options.map((option): Option =>
          option.value === null
            ? createHeader(option)
            : createItem(option)
        );

        return result;
      }, {})
  });

  function isExist (test?: Uint8Array | string): boolean {
    if (!optionsAll) {
      return false;
    }

    return !!optionsAll[type].find(({ value }): boolean => test === value);
  }

  const onChange = (value: string): void => {
    setLastValue(type, value);
    field.onChange(name)(value);
  };

  // set stored address if exists
  useEffect(() => {
    const storedAddress = getLastValue(type);
    if (!isExist(storedAddress)) {
      return;
    }
    onChange(storedAddress);
  }, [optionsAll]);

  const options: Option[] = useMemo(() => {
    if (!optionsAll || !optionsAll[type]) {
      return [];
    }

    return optionsAll[type];
  }, [optionsAll]);

  const onSearch = (filteredOptions: KeyringSectionOptions, _query: string): KeyringSectionOptions => {
    const query = _query.trim();
    const queryLower = query.toLowerCase();
    const matches = filteredOptions.filter((item): boolean =>
      item.value !== null && (
        (item.name.toLowerCase && item.name.toLowerCase().includes(queryLower)) ||
        item.value.toLowerCase().includes(queryLower)
      )
    );

    const valueMatches = matches.filter((item): boolean =>
      item.value !== null
    );

    if (isInput && valueMatches.length === 0) {
      const accountId = transformToAccountId(query);

      if (accountId) {
        matches.push(
          keyring.saveRecent(
            accountId.toString()
          ).option
        );
      }
    }

    return matches.filter((item, index): boolean => {
      const isLast = index === matches.length - 1;
      const nextItem = matches[index + 1];
      const hasNext = nextItem && nextItem.value;

      return item.value !== null || (!isLast && !!hasNext);
    });
  };

  return (
    <Dropdown
      {...dropdownProps}
      className={classes('ui--InputAddress', hideAddress && 'hideAddress', dropdownProps.className)}
      isError={meta.touched && typeof meta.error === 'undefined'}
      options={options}
      onSearch={onSearch}
      onChange={onChange}
      value={field.value}
    />
  );
}

export default styled(FieldAddress)`
  .ui.dropdown .text {
    width: 100%;
  }

  .ui.disabled.search {
    pointer-events: all;
  }

  .ui.search.selection.dropdown {
    > .text > .ui--KeyPair {
      .ui--IdentityIcon {
        border: 1px solid #888;
        border-radius: 50%;
        left: -2.75rem;
        top: -1.2rem;
      }

      .name {
        margin-left: 0;
      }
    }
  }

  &.hideAddress .ui--KeyPair .address {
    flex: 0;
    max-width: 0;
  }
`;
