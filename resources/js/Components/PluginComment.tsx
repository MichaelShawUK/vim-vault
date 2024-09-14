import hljs from 'highlight.js/lib/core';
import lua from 'highlight.js/lib/languages/lua';
import 'highlight.js/styles/night-owl.css';
import { useEffect, useRef } from 'react';

hljs.registerLanguage('lua', lua);

export default function PluginComment() {
    const codeRef = useRef<HTMLElement>(null);
    useEffect(() => {
        if (codeRef.current) {
            hljs.highlightElement(codeRef.current);
        }
    }, []);
    return (
        <article>
            <pre>
                <code
                    className="language-lua"
                    ref={codeRef}
                >
                    {`
                    local wk = require('which-key')
                    wk.setup()

                    wk.register({
                        { "<leader>l", group = "[L]SP" },
                        { "<leader>s", group = "[S]earch" },
                        { "gJ", group = "[J]oin block" },
                        { "gS", group = "[S]plit block" },
                    })
                    `}
                </code>
            </pre>
        </article>
    );
}
