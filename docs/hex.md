# hex

Internal utilities to create and test for hex values 

- [hexAddPrefix](#hexaddprefix) Adds the `0x` prefix to string values.
- [hexFromBn](#hexfrombn) Creates a hex value from a BN.js bignumber object. [bn.md#bntohex](alias bnToHex)
- [hexFromBn](#hexfrombn) Creates a hex value from a Buffer object. [buffer.md#buffertohex](alias bufferToHex)
- [hexFromNumber](#hexfromnumber) Creates a hex value from a number. [number.md#numbertohex](alias numberToHex)
- [hexHasPrefix](#hexhasprefix) Tests for the existence of a `0x` prefix.
- [hexStripPrefix](#hexstripprefix) Strips any leading `0x` prefix.
- [hexToBn](#hextobn) Creates a BN.js bignumber object from a hex string.
- [hexToBuffer](#hextobuffer) Creates a Buffer object from a hex string.
- [hexToNumber](#hextonumber) Creates a Number value from a Buffer object.

## hexAddPrefix

Adds the `0x` prefix to string values.

```js
hexAddPrefix (value: ?string): string
```


Returns a `0x` prefixed string from the input value. If the input is already prefixed, it is returned unchanged.

```js
import { hexAddPrefix } from '@polkadot/util';

console.log('With prefix', hexAddPrefix('0a0b12')) // => 0x0a0b12
```

## hexFromBn

Creates a hex value from a BN.js bignumber object. [bn.md#bntohex](alias bnToHex)

```js
hexFromBn (value?: BN): string
```





## hexFromBn

Creates a hex value from a Buffer object. [buffer.md#buffertohex](alias bufferToHex)

```js
hexFromBuffer (value?: Buffer): string
```





## hexFromNumber

Creates a hex value from a number. [number.md#numbertohex](alias numberToHex)

```js
hexFromNumber (value?: number): string
```





## hexHasPrefix

Tests for the existence of a `0x` prefix.

```js
hexHasPrefix (value: ?string): boolean
```


Checks for a valid hex input value and if the start matched `0x`

```js
import { hexHasPrefix } from '@polkadot/util';

console.log('has prefix', hexHasPrefix('0x1234')); // => true
```

## hexStripPrefix

Strips any leading `0x` prefix.

```js
hexStripPrefix (value: ?string): string
```


Tests for the existence of a `0x` prefix, and returns the value without the prefix. Un-prefixed values are returned as-is.

```js
import { hexStripPrefix } from '@polkadot/util';

console.log('stripped', hexStripPrefix('0x1234')); // => 1234
```

## hexToBn

Creates a BN.js bignumber object from a hex string.

```js
hexToBn (value?: string): BN
```


`null` inputs returns a `BN(0)` result. Hex input values return the actual value converted to a BN. Anything that is not a hex string (including the `0x` prefix) throws an error.

```js
import { hexToBn } from '@polkadot/util';

console.log('BN object', hexToBn('0x123480001f'));
```

## hexToBuffer

Creates a Buffer object from a hex string.

```js
hexToBuffer (value?: string): Buffer
```


`null` inputs returns an empty `Buffer` result. Hex input values return the actual bytes value converted to a Buffer. Anything that is not a hex string (including the `0x` prefix) throws an error.

```js
import { hexToBuffer } from '@polkadot/util';

console.log('Buffer object', hexToBuffer('0x123480001f'));
```

## hexToNumber

Creates a Number value from a Buffer object.

```js
hexToNumber (value?: Hex): number
```


`null` inputs returns an NaN result, `hex` values return the actual value as a `Number`.

```js
import { hexToNumber } from '@polkadot/util';

hexToNumber('0x1234'); // => 0x1234
```