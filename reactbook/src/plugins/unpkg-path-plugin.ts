import * as esbuild from 'esbuild-wasm';
import axios from 'axios';

export const unpkgPathPlugin = () => {
    return {
        name: 'unpkg-path-plugin',
        // represents the building process
        setup(build: esbuild.PluginBuild) {
            // figures out where the index.js file stored
            build.onResolve({ filter: /.*/ }, async (args: any) => {
                console.log('onResole', args);
                if (args.path === 'index.js') {
                    return { path: args.path, namespace: 'a' };
                } 

                if (args.path.includes('./') || args.path.includes('../')) {
                    return {
                        namespace: 'a',
                        // generates a url object
                        path: new URL(args.path, args.importer + '/').href
                    };
                }

                return {
                    namespace: 'a',
                    path: `https://unpkg.com/${args.path}`,
                }
                // else if (args.path === 'tiny-test-pkg') {
                //     return { path: 'https://unpkg.com/tiny-test-pkg@1.0.0/index.js',
                // namespace: 'a',
                //     };
                // }
               
            });

            // filter controls when onResolve and onLoad should be executed based on type of file

            // loads the index.js file
            build.onLoad({ filter: /.*/ }, async (args: any) => {
                console.log('onLoad', args);

                // if esbuild attemps to load an index.js file, force a return/load of certain information (override)
                if (args.path === 'index.js') {
                    return {
                        loader: 'jsx',
                        contents: `
                            const message = require('nested-test-pkg');
                            console.log(message);
                        `,
                    };
                }

                const { data, request } = await axios.get(args.path);
                return {
                    loader: 'jsx',
                    contents: data,
                    // where did we find the original file
                    resolveDir: new URL('./', request.responseURL).pathname
                }
            });
        },
    };
};


// import * as esbuild from 'esbuild-wasm';

// export const unpkgPathPlugin = () => {
//     return {
//         name: 'unpkg-path-plugin',
//         // represents the building process
//         setup(build: esbuild.PluginBuild) {
//             // figures out where the index.js file stored
//             build.onResolve({ filter: /.*/ }, async (args: any) => {
//                 console.log('onResole', args);
//                 return { path: args.path, namespace: 'a' };
//             });

//             // filter controls when onResolve and onLoad should be executed based on type of file

//             // loads the index.js file
//             build.onLoad({ filter: /.*/ }, async (args: any) => {
//                 console.log('onLoad', args);

//                 // if esbuild attemps to load an index.js file, force a return/load of certain information (override)
//                 if (args.path === 'index.js') {
//                     return {
//                         loader: 'jsx',
//                         contents: `
//                             import message from './message';
//                             console.log(message);
//                         `,
//                     };
//                 } else {
//                     return {
//                         loader: 'jsx',
//                         contents: 'export default "hi there!"',
//                     };
//                 }
//             });
//         },
//     };
// };