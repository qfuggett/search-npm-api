import * as esbuild from 'esbuild-wasm';
import { useState, useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';

const App = () => {
    const ref = useRef<any>();
    const [input, setInput] = useState('');
    const [code, setCode] = useState('');


    // goes into the public directory to retrieve the esbuild service to store inside the ref
    const startService = async () => {
        ref.current = await esbuild.startService({
            worker: true,
            wasmURL: '/esbuild.wasm'
        });
    };

    useEffect(() => {
        startService();
    }, []);

    const onClick = async () => {
        if (!ref.current) {
            return;
        }

        // code that we want to transpile
        const result = await ref.current.transform(input, {
            loader: 'jsx',
            target: 'es2015'
        });

        setCode(result.code);
    };

    return <div>
        <textarea value={input} onChange={(e) => setInput(e.target.value)}></textarea>
        <div>
            <button onClick={onClick}>Submit</button>
        </div>
        <pre>{code}</pre>
    </div>;
};

ReactDOM.render(
    <App />,
    document.querySelector('#root')
);