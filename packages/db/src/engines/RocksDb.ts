// Copyright 2017-2019 @polkadot/db authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

// At this point, it doesn't seem to write anything to disk, so subsequent startups
// has an empty database - again. Something is wrong in the config and with
// life being too short...

// "rocksdb-node": "jacogr/rocksdb-node#00ebfdbf0462ee615f4f48f1db403fd4df8471ea",

import { BaseDb, ProgressCb } from '../types';

import rocksdb, { RocksDb } from 'rocksdb-node';
import mkdirp from 'mkdirp';
import path from 'path';
// import snappy from 'snappy';
import { bufferToU8a, logger, u8aToBuffer, u8aToHex } from '@polkadot/util/index';

const l = logger('db/rocksdb');

const OPEN_OPTIONS = {
  allow_mmap_reads: true,
  allow_mmap_writes: true,
  bytes_per_sync: 1 * 1024 * 1024, // 1MB default
  create_if_missing: true
};

export default class Rocks implements BaseDb {
  private db: RocksDb;

  constructor (base: string, name: string) {
    const location = path.join(base, name);

    mkdirp.sync(location);

    this.db = rocksdb.open(OPEN_OPTIONS, location);
  }

  close (): void {
    l.debug(() => ['close']);

    this.db.close();
  }

  drop (): void {
    throw new Error('unimplemented');
  }

  empty (): void {
    throw new Error('unimplemented');
  }

  open (): void {
    l.debug(() => ['open']);
  }

  maintain (fn: ProgressCb): void {
    fn({
      isCompleted: true,
      keys: 0,
      percent: 100
    });
  }

  rename (base: string, file: string): void {
    // nothing
  }

  del (key: Uint8Array): void {
    this.db.del(
      {},
      this._serializeKey(key)
    );
  }

  get (key: Uint8Array): Uint8Array | null {
    try {
      return this._deserializeValue(
        this.db.get(
          { buffer: true },
          this._serializeKey(key)
        ) as Buffer
      );
    } catch (error) {
      return null;
    }
  }

  put (key: Uint8Array, value: Uint8Array): void {
    this.db.put(
      {},
      this._serializeKey(key),
      this._serializeValue(value)
    );
  }

  size (): number {
    return 0;
  }

  private _deserializeValue (value: Buffer): Uint8Array | null {
    return value && value.length
      ? bufferToU8a(value)
      // ? bufferToU8a(
      //   snappy.uncompressSync(value)
      // )
      : null;
  }

  private _serializeKey (key: Uint8Array): string {
    return u8aToHex(key);
  }

  private _serializeValue (value: Uint8Array): Buffer {
    return u8aToBuffer(value);

    // return snappy.compressSync(
    //   u8aToBuffer(value)
    // );
  }
}