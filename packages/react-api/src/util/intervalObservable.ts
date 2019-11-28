// Copyright 2017-2019 @polkadot/react-api authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

import { CallState } from '../types';

import { Subscription } from 'rxjs';
import { interval } from 'rxjs/observable/interval';

const interval$ = interval(500);

export default function intervalObservable<T, Props, State extends CallState> (that: React.Component<Props, State>): Subscription {
  return interval$.subscribe((): void => {
    const elapsed = Date.now() - ((that.state.callUpdatedAt as number) || 0);
    const callUpdated = elapsed <= 1500;

    if (callUpdated !== that.state.callUpdated) {
      that.setState({
        callUpdated
      });
    }
  });
}

export function intervalObservableWithoutComponent(
  callUpdated: CallState['callUpdated'],
  setCallUpdated: (callUpdated: CallState['callUpdated']) => void,
  callUpdatedAt: number = 0
): Subscription {
  return interval$.subscribe((): void => {
    const elapsed = Date.now() - (callUpdatedAt || 0);
    const newCallUpdated = elapsed <= 1500;

    if (newCallUpdated !== callUpdated) {
      setCallUpdated(newCallUpdated)
    }
  });
}
