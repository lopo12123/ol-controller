import {defineConfig} from "rollup";
import typescript from "@rollup/plugin-typescript";
import {terser} from "rollup-plugin-terser";

/**
 * @type {import('rollup').RollupOptions}
 */
export default defineConfig({
    input: 'lib/index.ts',
    output: [
        // esm
        {
            file: 'dist/index.mjs',
            format: 'esm',
            sourcemap: 'inline'
        },
        // esm.min
        {
            file: 'dist/index.min.mjs',
            format: 'esm',
            sourcemap: 'inline',
            plugins: [terser()]
        },
        // cjs
        {
            file: 'dist/index.js',
            format: 'cjs',
            sourcemap: 'inline',
        },
        // cjs.min
        {
            file: 'dist/index.min.js',
            format: 'cjs',
            sourcemap: 'inline',
            plugins: [terser()]
        }
    ],
    plugins: [typescript({tsconfig: './tsconfig.lib.json'})],
})