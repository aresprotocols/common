// Copyright 2017-2018 @polkadot/util-keyring authors & contributors
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.

import { KeyringInstance, KeyringPair, KeyringPair$Json, KeyringPair$Meta } from './types';

import naclKeypairFromSeed from '@polkadot/util-crypto/nacl/keypair/fromSeed';
import hexToU8a from '@polkadot/util/hex/toU8a';

import addressDecode from './address/decode';
import createPair from './pair';
import Pairs from './pairs';

export default class Keyring implements KeyringInstance {
  private _pairs: Pairs;

  constructor () {
    this._pairs = new Pairs();
  }

  addFromAddress (address: string | Uint8Array, meta?: KeyringPair$Meta, defaultEncoded?: Uint8Array): KeyringPair {
    // @ts-ignore no secretKey - cannot unlock
    return this._pairs.add(createPair({ publicKey: addressDecode(address) }, meta, defaultEncoded));
  }

  addFromJson ({ address, encoded, meta }: KeyringPair$Json): KeyringPair {
    return this.addFromAddress(address, meta, hexToU8a(encoded));
  }

  addFromSeed (seed: Uint8Array, meta?: KeyringPair$Meta): KeyringPair {
    return this._pairs.add(createPair(naclKeypairFromSeed(seed), meta));
  }

  getPair (address: string | Uint8Array): KeyringPair {
    return this._pairs.get(address);
  }

  getPairs (): Array<KeyringPair> {
    return this._pairs.all();
  }

  getPublicKeys (): Array<Uint8Array> {
    return this._pairs
      .all()
      .map(({ publicKey }) =>
        publicKey()
      );
  }

  removePair (address: string | Uint8Array): void {
    this._pairs.remove(address);
  }

  toJson (address: string | Uint8Array, passphrase?: string): KeyringPair$Json {
    return this._pairs.get(address).toJson(passphrase);
  }
}
