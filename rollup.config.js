import {defineConfig} from "rollup";
import typescript from "@rollup/plugin-typescript";
import {terser} from "rollup-plugin-terser";

/**
 * @type {import('rollup').RollupOptions}
 */
export default defineConfig({
    input: [
        'lib/core.ts',
        'lib/animation.ts',
        'lib/popup.ts',
        'lib/index.ts'
    ],
    output: [
        {
            dir: 'dist/esm',
            format: 'esm',
            sourcemap: 'inline',
            plugins: [terser()]
        },
        // {
        //     dir: 'dist/cjs',
        //     format: 'cjs',
        //     sourcemap: 'inline',
        //     plugins: [terser()]
        // },
    ],
    plugins: [typescript({tsconfig: './tsconfig.esm.json'})],
})