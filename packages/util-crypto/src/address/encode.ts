// Copyright 2017-2021 @polkadot/util-crypto authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { Prefix } from './types';

// Original implementation: https://github.com/paritytech/polka-ui/blob/4858c094684769080f5811f32b081dd7780b0880/src/polkadot.js#L34
import { assert, u8aConcat } from '@polkadot/util';

import { base58Encode } from '../base58/encode';
import { decodeAddress } from './decode';
import { defaults } from './defaults';
import { sshash } from './sshash';

export function encodeAddress (_key: Uint8Array | string, ss58Format: Prefix = defaults.prefix): string {
  // decode it, this means we can re-encode an address
  const key = decodeAddress(_key);

  assert(ss58Format <= 16383, 'Out of range ss58Format specified');
  assert(defaults.allowedDecodedLengths.includes(key.length), `Expected a valid key to convert, with length ${defaults.allowedDecodedLengths.join(', ')}`);

  const isPublicKey = [32, 33].includes(key.length);
  const input = u8aConcat(
    new Uint8Array(
      ss58Format < 64
        ? [ss58Format]
        : [
          ((ss58Format & 0b00000000_11111100) >> 2) | 0b01000000,
          (ss58Format >> 8) | ((ss58Format & 0b00000000_00000011) << 6)
        ]
    ),
    key
  );
  const hash = sshash(input);

  return base58Encode(
    u8aConcat(input, hash.subarray(0, isPublicKey ? 2 : 1))
  );
}
