import '@shgysk8zer0/polyfills';
import './shims.js';
import { createCallback, unregisterCallback, hasCallback, callCallback, closeRegistration, registerCallback, CallbackRegistryKey } from '@aegisjsproject/callback-registry/callbacks.js';
import { describe, test } from 'node:test';
import assert from 'node:assert';

const signal = AbortSignal.timeout(1000);
const sum = createCallback((...nums) => nums.reduce((sum, num) => sum + num));

describe('Test callback registry', () => {
	test('Creating a callback should return the string key.', { signal }, () => {
		assert.ok(sum instanceof CallbackRegistryKey, 'Callback key should be a `CallbackRegistryKey`.');
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

	test('Check callback registry with optional `stack`', { signal }, () => {
		const stack = new DisposableStack();
		const cb = registerCallback('disposable:log', console.log, { stack });
		assert.ok(cb instanceof CallbackRegistryKey, 'Registering callbacks should return disposable String keys.');
		assert.ok(hasCallback(cb), 'Callback should be registered');
		stack.dispose();
		assert.ok(! hasCallback(cb), 'Callback should be unregistered after disposal.');
	});

	test('Callbacks keys should be disposable.', { signal }, () => {
		const name = 'disposable:callback';

		{
			using cb = registerCallback(name, console.log);
			assert.ok(hasCallback(name), 'Callbacks should match the string name/key as well as `CallbackRegistryKey`.');
			assert.ok(hasCallback(cb), 'Callbacks should match the string name/key as well as `CallbackRegistryKey`.');
		}

		assert.ok(! hasCallback(name), 'Callbacks should be removed when disposed.');
	});

	test('Cannot register new callbacks after closing registry', { signal }, () => {
		closeRegistration();
		assert.throws(() => createCallback(() => 'test'), 'Creating callbacks should throw if registry is closed.');
	});
});
