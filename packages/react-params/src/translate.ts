// Copyright 2017-2019 @polkadot/react-components authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

import {
  withTranslation,
  useTranslation as _useTranslation,
  UseTranslationResponse
} from 'react-i18next';

export default withTranslation(['react-params']);

export function useTranslation (): UseTranslationResponse {
  return _useTranslation('react-params');
}
