'use strict';
require('../common');
const assert = require('assert');

function arrayOfNumbers(length) {
  return Array.from({ length }, (_, i) => i);
}

/**
 * Assert the Uint8Array is not converted to a Buffer
 * in the process of calling a Buffer method on it.
 */
function assertContentEqual(actualUint8Array, expectedBuffer) {
  assert.ok(!Buffer.isBuffer(actualUint8Array));
  assert.ok(Buffer.isBuffer(expectedBuffer));
  assert.strictEqual(actualUint8Array.length, expectedBuffer.length);
  for (let i = 0; i < actualUint8Array.length; i++) {
    assert.strictEqual(actualUint8Array[i], expectedBuffer[i], `Uint8Array and Buffer differ at ${i}`);
  }
}

// Currently inherited. Could be subclassed:
{
  // buf.keys()

  const uint8array = Uint8Array.of(0, 0, 1, 0);
  const buffer = Buffer.of(0, 0, 1, 0);

  assert.deepStrictEqual(
    [...Buffer.prototype.keys.call(uint8array)],
    [...buffer.keys()]
  );
}

{
  // buf.values()

  const uint8array = Uint8Array.of(0, 0, 1, 0);
  const buffer = Buffer.of(0, 0, 1, 0);

  assert.deepStrictEqual(
    [...Buffer.prototype.values.call(uint8array)],
    [...buffer.values()]
  );
}

{
  // buf.entries()

  const uint8array = Uint8Array.of(0, 0, 1, 0);
  const buffer = Buffer.of(0, 0, 1, 0);

  assert.deepStrictEqual(
    [...Buffer.prototype.entries.call(uint8array)],
    [...buffer.entries()]
  );
}

// Buffer Methods:

{
  // buf.compare(target[, targetStart[, targetEnd[, sourceStart[, sourceEnd]]]])

  const buf = Uint8Array.of(0, 1, 2, 3, 4, 5, 6, 7, 8, 9);
  const target = Uint8Array.of(0, 1, 2, 3, 4, 5, 6, 7, 8, 9);

  assert.strictEqual(Buffer.prototype.compare.call(buf, target, 0, 4, 0, 4), 0);
  assert.strictEqual(Buffer.prototype.compare.call(buf, target, 0, 4, 1, 5), 1);
  assert.strictEqual(Buffer.prototype.compare.call(buf, target, 1, 5, 0, 4), -1);
}

{
  // buf.copy(target[, targetStart[, sourceStart[, sourceEnd]]])

  const sourceUint8Array = Uint8Array.of(0, 1, 2, 3, 4, 5, 6, 7, 8, 9);

  const destination = new Uint8Array(4);

  Buffer.prototype.copy.call(sourceUint8Array, destination, 1, 7, 10);
  assertContentEqual(destination, Buffer.of(0, 7, 8, 9));
}

{
  // buf.equals(otherBufferLike)

  const emptyUint8Array = new Uint8Array(0);
  const emptyBuffer = Buffer.alloc(0);

  assert.ok(Buffer.prototype.equals.call(emptyUint8Array, emptyBuffer));
  assert.ok(Buffer.prototype.equals.call(emptyUint8Array, emptyUint8Array));
  assert.ok(Buffer.prototype.equals.call(emptyUint8Array, new Uint8Array(0)));

  const largeUint8Array = new Uint8Array(arrayOfNumbers(9000));
  const largeBuffer = Buffer.from(arrayOfNumbers(9000));

  assert.ok(Buffer.prototype.equals.call(largeUint8Array, largeBuffer));
  assert.ok(Buffer.prototype.equals.call(largeUint8Array, largeUint8Array));
  assert.ok(Buffer.prototype.equals.call(largeUint8Array, new Uint8Array(arrayOfNumbers(9000))));
}

{
  // buf.fill(value[, byteOffset][, encoding])

  const uint8array = new Uint8Array(10);
  const buffer = Buffer.alloc(10);

  assertContentEqual(
    Buffer.prototype.fill.call(uint8array, '\u03a3', 0, 'utf16le'),
    buffer.fill('\u03a3', 0, 'utf16le')
  );
}

{
  // buf.includes(value[, byteOffset][, encoding])

  const uint8array = Uint8Array.of(154, 3, 145, 3, 163, 3, 163, 3, 149, 3);
  const buffer = Buffer.of(154, 3, 145, 3, 163, 3, 163, 3, 149, 3);

  assert.strictEqual(
    Buffer.prototype.includes.call(uint8array, '\u03a3', 0, 'utf16le'),
    buffer.includes('\u03a3', 0, 'utf16le')
  );
}


{
  // buf.indexOf(value[, byteOffset][, encoding])

  const uint8array = Uint8Array.of(154, 3, 145, 3, 163, 3, 163, 3, 149, 3);
  const buffer = Buffer.of(154, 3, 145, 3, 163, 3, 163, 3, 149, 3);

  assert.strictEqual(
    Buffer.prototype.indexOf.call(uint8array, '\u03a3', 0, 'utf16le'),
    buffer.indexOf('\u03a3', 0, 'utf16le')
  );
}

{
  // buf.lastIndexOf(value[, byteOffset][, encoding])

  const uint8array = Uint8Array.of(154, 3, 145, 3, 163, 3, 163, 3, 149, 3);
  const buffer = Buffer.of(154, 3, 145, 3, 163, 3, 163, 3, 149, 3);

  assert.strictEqual(
    Buffer.prototype.lastIndexOf.call(uint8array, '\u03a3', -5, 'utf16le'),
    buffer.lastIndexOf('\u03a3', -5, 'utf16le')
  );
}


{
  // buf.readBigInt64BE([offset])

  const uint8array = Uint8Array.of(0, 0, 1, 0, 0, 0, 1, 0);
  const buffer = Buffer.of(0, 0, 1, 0, 0, 0, 1, 0);

  assert.strictEqual(
    Buffer.prototype.readBigInt64BE.call(uint8array, 0),
    buffer.readBigInt64BE(0)
  );
}

{
  // buf.readBigInt64LE([offset])

  const uint8array = Uint8Array.of(0, 0, 1, 0, 0, 0, 1, 0);
  const buffer = Buffer.of(0, 0, 1, 0, 0, 0, 1, 0);

  assert.strictEqual(
    Buffer.prototype.readBigInt64LE.call(uint8array, 0),
    buffer.readBigInt64LE(0)
  );
}

{
  // buf.readBigUInt64BE([offset])

  const uint8array = Uint8Array.of(0, 0, 1, 0, 0, 0, 1, 0);
  const buffer = Buffer.of(0, 0, 1, 0, 0, 0, 1, 0);

  assert.strictEqual(
    Buffer.prototype.readBigUInt64BE.call(uint8array, 0),
    buffer.readBigUInt64BE(0)
  );
}

{
  // buf.readBigUInt64LE([offset])

  const uint8array = Uint8Array.of(0, 0, 1, 0, 0, 0, 1, 0);
  const buffer = Buffer.of(0, 0, 1, 0, 0, 0, 1, 0);

  assert.strictEqual(
    Buffer.prototype.readBigUInt64LE.call(uint8array, 0),
    buffer.readBigUInt64LE(0)
  );
}

{
  // buf.readDoubleBE([offset])

  const uint8array = Uint8Array.of(0, 0, 1, 0, 0, 0, 1, 0);
  const buffer = Buffer.of(0, 0, 1, 0, 0, 0, 1, 0);

  assert.strictEqual(
    Buffer.prototype.readDoubleBE.call(uint8array, 0),
    buffer.readDoubleBE(0)
  );
}

{
  // buf.readDoubleLE([offset])

  const uint8array = Uint8Array.of(0, 0, 1, 0, 0, 0, 1, 0);
  const buffer = Buffer.of(0, 0, 1, 0, 0, 0, 1, 0);

  assert.strictEqual(
    Buffer.prototype.readDoubleLE.call(uint8array, 0),
    buffer.readDoubleLE(0)
  );
}

{
  // buf.readFloatBE([offset])

  const uint8array = Uint8Array.of(0, 0, 1, 0);
  const buffer = Buffer.of(0, 0, 1, 0);

  assert.strictEqual(
    Buffer.prototype.readFloatBE.call(uint8array, 0),
    buffer.readFloatBE(0)
  );
}

{
  // buf.readFloatLE([offset])

  const uint8array = Uint8Array.of(0, 0, 1, 0);
  const buffer = Buffer.of(0, 0, 1, 0);

  assert.strictEqual(
    Buffer.prototype.readFloatLE.call(uint8array, 0),
    buffer.readFloatLE(0)
  );
}

{
  // buf.readInt8([offset])

  const uint8array = Uint8Array.of(0, 0, 1, 0);
  const buffer = Buffer.of(0, 0, 1, 0);

  assert.strictEqual(
    Buffer.prototype.readInt8.call(uint8array, 2),
    buffer.readInt8(2)
  );
}

{
  // buf.readInt16BE([offset])

  const uint8array = Uint8Array.of(0, 0, 1, 0);
  const buffer = Buffer.of(0, 0, 1, 0);

  assert.strictEqual(
    Buffer.prototype.readInt16BE.call(uint8array, 2),
    buffer.readInt16BE(2)
  );
}

{
  // buf.readInt16LE([offset])

  const uint8array = Uint8Array.of(0, 0, 1, 0);
  const buffer = Buffer.of(0, 0, 1, 0);

  assert.strictEqual(
    Buffer.prototype.readInt16LE.call(uint8array, 2),
    buffer.readInt16LE(2)
  );
}

{
  // buf.readInt32BE([offset])

  const uint8array = Uint8Array.of(0, 0, 1, 0);
  const buffer = Buffer.of(0, 0, 1, 0);

  assert.strictEqual(
    Buffer.prototype.readInt32BE.call(uint8array, 0),
    buffer.readInt32BE(0)
  );
}

{
  // buf.readInt32LE([offset])

  const uint8array = Uint8Array.of(0, 0, 1, 0);
  const buffer = Buffer.of(0, 0, 1, 0);

  assert.strictEqual(
    Buffer.prototype.readInt32LE.call(uint8array, 0),
    buffer.readInt32LE(0)
  );
}

{
  // buf.readIntBE(offset, byteLength)

  const uint8array = Uint8Array.of(0, 0, 1, 0);
  const buffer = Buffer.of(0, 0, 1, 0);

  assert.strictEqual(
    Buffer.prototype.readIntBE.call(uint8array, 2, 2),
    buffer.readIntBE(2, 2)
  );
}

{
  // buf.readIntLE(offset, byteLength)

  const uint8array = Uint8Array.of(0, 0, 1, 0);
  const buffer = Buffer.of(0, 0, 1, 0);

  assert.strictEqual(
    Buffer.prototype.readIntLE.call(uint8array, 2, 2),
    buffer.readIntLE(2, 2)
  );
}

{
  // buf.readUInt8([offset])

  const uint8array = Uint8Array.of(0, 0, 1, 0);
  const buffer = Buffer.of(0, 0, 1, 0);

  assert.strictEqual(
    Buffer.prototype.readUInt8.call(uint8array, 2),
    buffer.readUInt8(2)
  );
}

{
  // buf.readUInt16BE([offset])

  const uint8array = Uint8Array.of(0, 0, 1, 0);
  const buffer = Buffer.of(0, 0, 1, 0);

  assert.strictEqual(
    Buffer.prototype.readUInt16BE.call(uint8array, 2),
    buffer.readUInt16BE(2)
  );
}

{
  // buf.readUInt16LE([offset])

  const uint8array = Uint8Array.of(0, 0, 1, 0);
  const buffer = Buffer.of(0, 0, 1, 0);

  assert.strictEqual(
    Buffer.prototype.readUInt16LE.call(uint8array, 2),
    buffer.readUInt16LE(2)
  );
}

{
  // buf.readUInt32BE([offset])

  const uint8array = Uint8Array.of(0, 0, 1, 0);
  const buffer = Buffer.of(0, 0, 1, 0);

  assert.strictEqual(
    Buffer.prototype.readUInt32BE.call(uint8array, 0),
    buffer.readUInt32BE(0)
  );
}

{
  // buf.readUInt32LE([offset])

  const uint8array = Uint8Array.of(0, 0, 1, 0);
  const buffer = Buffer.of(0, 0, 1, 0);

  assert.strictEqual(
    Buffer.prototype.readUInt32LE.call(uint8array, 0),
    buffer.readUInt32LE(0)
  );
}

{
  // buf.readUIntBE(offset, byteLength)

  const uint8array = Uint8Array.of(0, 0, 1, 0);
  const buffer = Buffer.of(0, 0, 1, 0);

  assert.strictEqual(
    Buffer.prototype.readUIntBE.call(uint8array, 2, 2),
    buffer.readUIntBE(2, 2)
  );
}

{
  // buf.readUIntLE(offset, byteLength)

  const uint8array = Uint8Array.of(0, 0, 1, 0);
  const buffer = Buffer.of(0, 0, 1, 0);

  assert.strictEqual(
    Buffer.prototype.readUIntLE.call(uint8array, 2, 2),
    buffer.readUIntLE(2, 2)
  );
}

{
  // buf.subarray()

  const uint8array = new Uint8Array(arrayOfNumbers(8));
  const buffer = Buffer.from(arrayOfNumbers(8));

  const subarray = Buffer.prototype.subarray.call(uint8array, 2, 5);
  assert.ok(Buffer.isBuffer(subarray));
  assert.deepStrictEqual(
    subarray,
    buffer.subarray(2, 5)
  );
}

{
  // buf.slice()

  const uint8array = new Uint8Array(arrayOfNumbers(8));
  const buffer = Buffer.from(arrayOfNumbers(8));

  assertContentEqual(
    Buffer.prototype.slice.call(uint8array, 2, 5),
    buffer.slice(2, 5)
  );
}

{
  // buf.swap16()

  const smallUint8array = new Uint8Array(arrayOfNumbers(2));
  const smallBuffer = Buffer.from(arrayOfNumbers(2));

  assertContentEqual(
    Buffer.prototype.swap16.call(smallUint8array),
    smallBuffer.swap16()
  );

  const largeUint8array = new Uint8Array(arrayOfNumbers(2 * 500));
  const largeBuffer = Buffer.from(arrayOfNumbers(2 * 500));

  assertContentEqual(
    Buffer.prototype.swap16.call(largeUint8array),
    largeBuffer.swap16()
  );
}

{
  // buf.swap32()

  const smallUint8array = new Uint8Array(arrayOfNumbers(4));
  const smallBuffer = Buffer.from(arrayOfNumbers(4));

  assertContentEqual(
    Buffer.prototype.swap32.call(smallUint8array),
    smallBuffer.swap32()
  );

  const largeUint8array = new Uint8Array(arrayOfNumbers(4 * 500));
  const largeBuffer = Buffer.from(arrayOfNumbers(4 * 500));

  assertContentEqual(
    Buffer.prototype.swap32.call(largeUint8array),
    largeBuffer.swap32()
  );
}

{
  // buf.swap64()

  const smallUint8array = new Uint8Array(arrayOfNumbers(8));
  const smallBuffer = Buffer.from(arrayOfNumbers(8));

  assertContentEqual(
    Buffer.prototype.swap64.call(smallUint8array),
    smallBuffer.swap64()
  );

  const largeUint8array = new Uint8Array(arrayOfNumbers(8 * 500));
  const largeBuffer = Buffer.from(arrayOfNumbers(8 * 500));

  assertContentEqual(
    Buffer.prototype.swap64.call(largeUint8array),
    largeBuffer.swap64()
  );
}

{
  // buf.toJSON()

  const uint8array = Uint8Array.of(1, 2, 3, 4);
  const buffer = Buffer.of(1, 2, 3, 4);

  assert.deepStrictEqual(
    Buffer.prototype.toJSON.call(uint8array),
    buffer.toJSON()
  );
}

{
  // buf.toString([encoding[, start[, end]]])

  const uint8array = Uint8Array.of(1, 2, 3, 4);
  const buffer = Buffer.of(1, 2, 3, 4);

  assert.deepStrictEqual(
    Buffer.prototype.toString.call(uint8array),
    buffer.toString()
  );

  assert.deepStrictEqual(
    Buffer.prototype.toString.call(uint8array, 'utf8'),
    buffer.toString('utf8')
  );

  assert.deepStrictEqual(
    Buffer.prototype.toString.call(uint8array, 'utf16le'),
    buffer.toString('utf16le')
  );

  assert.deepStrictEqual(
    Buffer.prototype.toString.call(uint8array, 'latin1'),
    buffer.toString('latin1')
  );

  assert.deepStrictEqual(
    Buffer.prototype.toString.call(uint8array, 'base64'),
    buffer.toString('base64')
  );

  assert.deepStrictEqual(
    Buffer.prototype.toString.call(uint8array, 'base64url'),
    buffer.toString('base64url')
  );

  assert.deepStrictEqual(
    Buffer.prototype.toString.call(uint8array, 'hex'),
    buffer.toString('hex')
  );

  assert.deepStrictEqual(
    Buffer.prototype.toString.call(uint8array, 'ascii'),
    buffer.toString('ascii')
  );

  assert.deepStrictEqual(
    Buffer.prototype.toString.call(uint8array, 'binary'),
    buffer.toString('binary')
  );

  assert.deepStrictEqual(
    Buffer.prototype.toString.call(uint8array, 'ucs2'),
    buffer.toString('ucs2')
  );
}

{
  // buf.write(string[, offset[, length]][, encoding])
  const bufferSize = 16;
  // UTF-8 encoding
  {
    const testString = 'Hello, world!';
    const uint8array = new Uint8Array(bufferSize);
    const buffer = Buffer.alloc(bufferSize);

    const returnValue = Buffer.prototype.write.call(uint8array, testString, 0, 'utf8');
    const expectedReturnValue = buffer.write(testString, 0, 'utf8');

    assert.strictEqual(returnValue, expectedReturnValue);
    assertContentEqual(uint8array, buffer);
  }

  // Hex encoding
  {
    const testString = 'a1b2c3d4e5';
    const uint8array = new Uint8Array(bufferSize);
    const buffer = Buffer.alloc(bufferSize);

    const returnValue = Buffer.prototype.write.call(uint8array, testString, 0, 'hex');
    const expectedReturnValue = buffer.write(testString, 0, 'hex');

    assert.strictEqual(returnValue, expectedReturnValue);
    assertContentEqual(uint8array, buffer);
  }

  // Base64 encoding
  {
    const testString = 'SGVsbG8gd29ybGQ=';
    const uint8array = new Uint8Array(bufferSize);
    const buffer = Buffer.alloc(bufferSize);

    const returnValue = Buffer.prototype.write.call(uint8array, testString, 0, 'base64');
    const expectedReturnValue = buffer.write(testString, 0, 'base64');

    assert.strictEqual(returnValue, expectedReturnValue);
    assertContentEqual(uint8array, buffer);
  }

  // Latin1 encoding
  {
    const testString = '¡Hola!';
    const uint8array = new Uint8Array(bufferSize);
    const buffer = Buffer.alloc(bufferSize);

    const returnValue = Buffer.prototype.write.call(uint8array, testString, 0, 'latin1');
    const expectedReturnValue = buffer.write(testString, 0, 'latin1');

    assert.strictEqual(returnValue, expectedReturnValue);
    assertContentEqual(uint8array, buffer);
  }

  // Utf16le encoding
  {
    const testString = '\uD835\uDC9C\uD835\uDCB7\uD835\uDCB8'; // Unicode string
    const uint8array = new Uint8Array(bufferSize);
    const buffer = Buffer.alloc(bufferSize);

    const returnValue = Buffer.prototype.write.call(uint8array, testString, 0, 'utf16le');
    const expectedReturnValue = buffer.write(testString, 0, 'utf16le');

    assert.strictEqual(returnValue, expectedReturnValue);
    assertContentEqual(uint8array, buffer);
  }

  // Binary encoding
  {
    const testString = '\x00\x01\x02\x03';
    const uint8array = new Uint8Array(bufferSize);
    const buffer = Buffer.alloc(bufferSize);

    const returnValue = Buffer.prototype.write.call(uint8array, testString, 0, 'binary');
    const expectedReturnValue = buffer.write(testString, 0, 'binary');

    assert.strictEqual(returnValue, expectedReturnValue);
    assertContentEqual(uint8array, buffer);
  }

  // Base64url encoding
  {
    const testString = 'SGVsbG9fV29ybGQ'; // Valid base64url string
    const uint8array = new Uint8Array(bufferSize);
    const buffer = Buffer.alloc(bufferSize);

    const returnValue = Buffer.prototype.write.call(uint8array, testString, 0, 'base64url');
    const expectedReturnValue = buffer.write(testString, 0, 'base64url');

    assert.strictEqual(returnValue, expectedReturnValue);
    assertContentEqual(uint8array, buffer);
  }

  // Ascii encoding
  {
    const testString = 'ASCII!';
    const uint8array = new Uint8Array(bufferSize);
    const buffer = Buffer.alloc(bufferSize);

    const returnValue = Buffer.prototype.write.call(uint8array, testString, 0, 'ascii');
    const expectedReturnValue = buffer.write(testString, 0, 'ascii');

    assert.strictEqual(returnValue, expectedReturnValue);
    assertContentEqual(uint8array, buffer);
  }

  // Ucs2 encoding
  {
    const testString = 'A\uD83D\uDC96B';
    const uint8array = new Uint8Array(bufferSize);
    const buffer = Buffer.alloc(bufferSize);

    const returnValue = Buffer.prototype.write.call(uint8array, testString, 0, 'ucs2');
    const expectedReturnValue = buffer.write(testString, 0, 'ucs2');

    assert.strictEqual(returnValue, expectedReturnValue);
    assertContentEqual(uint8array, buffer);
  }

}

{
  // buf.writeBigInt64BE(value[, offset])

  const uint8array = new Uint8Array(8);
  const buffer = Buffer.alloc(8);

  Buffer.prototype.writeBigInt64BE.call(uint8array, 1234567890123456789n, 0);
  buffer.writeBigInt64BE(1234567890123456789n, 0);

  assertContentEqual(uint8array, buffer);
}

{
  // buf.writeBigInt64LE(value[, offset])

  const uint8array = new Uint8Array(8);
  const buffer = Buffer.alloc(8);

  Buffer.prototype.writeBigInt64LE.call(uint8array, 1234567890123456789n, 0);
  buffer.writeBigInt64LE(1234567890123456789n, 0);

  assertContentEqual(uint8array, buffer);
}

{
  // buf.writeBigUInt64BE(value[, offset])

  const uint8array = new Uint8Array(8);
  const buffer = Buffer.alloc(8);

  Buffer.prototype.writeBigUInt64BE.call(uint8array, 12345678901234567890n, 0);
  buffer.writeBigUInt64BE(12345678901234567890n, 0);

  assertContentEqual(uint8array, buffer);
}

{
  // buf.writeBigUInt64LE(value[, offset])

  const uint8array = new Uint8Array(8);
  const buffer = Buffer.alloc(8);

  Buffer.prototype.writeBigUInt64LE.call(uint8array, 12345678901234567890n, 0);
  buffer.writeBigUInt64LE(12345678901234567890n, 0);

  assertContentEqual(uint8array, buffer);
}

{
  // buf.writeDoubleBE(value[, offset])

  const uint8array = new Uint8Array(8);
  const buffer = Buffer.alloc(8);

  Buffer.prototype.writeDoubleBE.call(uint8array, 12345.6789, 0);
  buffer.writeDoubleBE(12345.6789, 0);

  assertContentEqual(uint8array, buffer);
}

{
  // buf.writeDoubleLE(value[, offset])

  const uint8array = new Uint8Array(8);
  const buffer = Buffer.alloc(8);

  Buffer.prototype.writeDoubleLE.call(uint8array, 12345.6789, 0);
  buffer.writeDoubleLE(12345.6789, 0);

  assertContentEqual(uint8array, buffer);
}

{
  // buf.writeFloatBE(value[, offset])

  const uint8array = new Uint8Array(4);
  const buffer = Buffer.alloc(4);

  Buffer.prototype.writeFloatBE.call(uint8array, 12345.67, 0);
  buffer.writeFloatBE(12345.67, 0);

  assertContentEqual(uint8array, buffer);
}

{
  // buf.writeFloatLE(value[, offset])

  const uint8array = new Uint8Array(4);
  const buffer = Buffer.alloc(4);

  Buffer.prototype.writeFloatLE.call(uint8array, 12345.67, 0);
  buffer.writeFloatLE(12345.67, 0);

  assertContentEqual(uint8array, buffer);
}

{
  // buf.writeInt8(value[, offset])

  const uint8array = new Uint8Array(1);
  const buffer = Buffer.alloc(1);

  Buffer.prototype.writeInt8.call(uint8array, -123, 0);
  buffer.writeInt8(-123, 0);

  assertContentEqual(uint8array, buffer);
}

{
  // buf.writeInt16BE(value[, offset])

  const uint8array = new Uint8Array(2);
  const buffer = Buffer.alloc(2);

  Buffer.prototype.writeInt16BE.call(uint8array, -12345, 0);
  buffer.writeInt16BE(-12345, 0);

  assertContentEqual(uint8array, buffer);
}

{
  // buf.writeInt16LE(value[, offset])

  const uint8array = new Uint8Array(2);
  const buffer = Buffer.alloc(2);

  Buffer.prototype.writeInt16LE.call(uint8array, -12345, 0);
  buffer.writeInt16LE(-12345, 0);

  assertContentEqual(uint8array, buffer);
}

{
  // buf.writeInt32BE(value[, offset])

  const uint8array = new Uint8Array(4);
  const buffer = Buffer.alloc(4);

  Buffer.prototype.writeInt32BE.call(uint8array, -123456789, 0);
  buffer.writeInt32BE(-123456789, 0);

  assertContentEqual(uint8array, buffer);
}

{
  // buf.writeInt32LE(value[, offset])

  const uint8array = new Uint8Array(4);
  const buffer = Buffer.alloc(4);

  Buffer.prototype.writeInt32LE.call(uint8array, -123456789, 0);
  buffer.writeInt32LE(-123456789, 0);

  assertContentEqual(uint8array, buffer);
}

{
  // buf.writeIntBE(value, offset, byteLength)

  const uint8array = new Uint8Array(3);
  const buffer = Buffer.alloc(3);

  Buffer.prototype.writeIntBE.call(uint8array, -1234567, 0, 3);
  buffer.writeIntBE(-1234567, 0, 3);

  assertContentEqual(uint8array, buffer);
}

{
  // buf.writeIntLE(value, offset, byteLength)

  const uint8array = new Uint8Array(3);
  const buffer = Buffer.alloc(3);

  Buffer.prototype.writeIntLE.call(uint8array, -1234567, 0, 3);
  buffer.writeIntLE(-1234567, 0, 3);

  assertContentEqual(uint8array, buffer);
}

{
  // buf.writeUInt8(value[, offset])

  const uint8array = new Uint8Array(1);
  const buffer = Buffer.alloc(1);

  Buffer.prototype.writeUInt8.call(uint8array, 255, 0);
  buffer.writeUInt8(255, 0);

  assertContentEqual(uint8array, buffer);
}

{
  // buf.writeUInt16BE(value[, offset])

  const uint8array = new Uint8Array(2);
  const buffer = Buffer.alloc(2);

  Buffer.prototype.writeUInt16BE.call(uint8array, 65535, 0);
  buffer.writeUInt16BE(65535, 0);

  assertContentEqual(uint8array, buffer);
}

{
  // buf.writeUInt16LE(value[, offset])

  const uint8array = new Uint8Array(2);
  const buffer = Buffer.alloc(2);

  Buffer.prototype.writeUInt16LE.call(uint8array, 65535, 0);
  buffer.writeUInt16LE(65535, 0);

  assertContentEqual(uint8array, buffer);
}

{
  // buf.writeUInt32BE(value[, offset])

  const uint8array = new Uint8Array(4);
  const buffer = Buffer.alloc(4);

  Buffer.prototype.writeUInt32BE.call(uint8array, 4294967295, 0);
  buffer.writeUInt32BE(4294967295, 0);

  assertContentEqual(uint8array, buffer);
}

{
  // buf.writeUInt32LE(value[, offset])

  const uint8array = new Uint8Array(4);
  const buffer = Buffer.alloc(4);

  Buffer.prototype.writeUInt32LE.call(uint8array, 4294967295, 0);
  buffer.writeUInt32LE(4294967295, 0);

  assertContentEqual(uint8array, buffer);
}

{
  // buf.writeUIntBE(value, offset, byteLength)

  const uint8array = new Uint8Array(3);
  const buffer = Buffer.alloc(3);

  Buffer.prototype.writeUIntBE.call(uint8array, 1234567, 0, 3);
  buffer.writeUIntBE(1234567, 0, 3);

  assertContentEqual(uint8array, buffer);
}

{
  // buf.writeUIntLE(value, offset, byteLength)

  const uint8array = new Uint8Array(3);
  const buffer = Buffer.alloc(3);

  Buffer.prototype.writeUIntLE.call(uint8array, 1234567, 0, 3);
  buffer.writeUIntLE(1234567, 0, 3);

  assertContentEqual(uint8array, buffer);
}

{
  // buf[Symbol.for('nodejs.util.inspect.custom')]()

  const customInspectSymbol = Symbol.for('nodejs.util.inspect.custom')

  const emptyUint8Array = new Uint8Array(0);
  const emptyBuffer = Buffer.alloc(0);

  assert.strictEqual(
    Buffer.prototype[customInspectSymbol].call(emptyUint8Array),
    emptyBuffer[customInspectSymbol]().replace('Buffer', 'Uint8Array')
  );

  const smallUint8Array = Uint8Array.of(1,2,3,4,5,6,7,8);
  const smallBuffer = Buffer.of(1,2,3,4,5,6,7,8)

  assert.strictEqual(
    Buffer.prototype[customInspectSymbol].call(smallUint8Array),
    smallBuffer[customInspectSymbol]().replace('Buffer', 'Uint8Array')
  );

  const largeUint8Array = new Uint8Array(arrayOfNumbers(9000));
  const largeBuffer = Buffer.from(arrayOfNumbers(9000));

  assert.strictEqual(
    Buffer.prototype[customInspectSymbol].call(largeUint8Array),
    largeBuffer[customInspectSymbol]().replace('Buffer', 'Uint8Array')
  );
}
