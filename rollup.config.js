import terser from '@rollup/plugin-terser';

const external = ['@shgysk8zer0/signals', '@aegisjsproject/disposable-callbacks'];

export default [{
	input: 'callbackRegistry.js',
	external,
	output: [{
		file: 'callbackRegistry.cjs',
		format: 'cjs',
	}, {
		file: 'callbackRegistry.mjs',
		format: 'esm',
		sourcemap: true,
		plugins: [terser()],
	}],
}, {
	input: 'callbacks.js',
	external,
	output: [{
		file: 'callbacks.cjs',
		format: 'cjs',
	}],
}];
