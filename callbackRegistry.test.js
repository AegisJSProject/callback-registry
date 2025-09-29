import '@shgysk8zer0/polyfills';
import './shims.js';
import { createCallback, unregisterCallback, hasCallback, callCallback, closeRegistration } from '@aegisjsproject/callback-registry/callbacks.js';
import { describe, test } from 'node:test';
import assert from 'node:assert';

const signal = AbortSignal.timeout(1000);
const sum = createCallback((...nums) => nums.reduce((sum, num) => sum + num));

describe('Test callback registry', () => {
	test('Creating a callback should return the string key.', { signal }, () => {
		assert.ok(typeof sum === 'string', 'Callback key should be a string.');
	});

	test('Callbacks are registered correctly', { signal }, () => {
		assert.ok(hasCallback(sum), 'Callback should be registerd.');
	});

	test('Callback can be called correctly.', { signal }, () => {
		assert.strictEqual(callCallback(sum, 1, 2 ,3), 6, 'Sum should be 6 when called with `1, 2, 3`.');
	});

	test('Callbacks unregister', { signal }, () => {
		unregisterCallback(sum);
		assert.strictEqual(hasCallback(sum), false, 'Callbacks should be removed from registry.');
	});

	test('Cannot register new callbacks after closing registry', { signal }, () => {
		closeRegistration();
		assert.throws(() => createCallback(() => 'test'), 'Creating callbacks should throw if registry is closed.');
	});
});
