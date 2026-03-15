import terser from '@rollup/plugin-terser';

export default [{
	input: 'callbackRegistry.js',
	external: ['@shgysk8zer0/signals'],
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
	external: ['@shgysk8zer0/signals'],
	output: [{
		file: 'callbacks.cjs',
		format: 'cjs',
	}],
}];
