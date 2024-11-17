import terser from '@rollup/plugin-terser';

export default [{
	input: 'callbackRegistry.js',
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
	output: [{
		file: 'callbacks.cjs',
		format: 'cjs',
	}],
}];
