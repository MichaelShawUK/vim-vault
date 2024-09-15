import hljs from 'highlight.js/lib/core';
import lua from 'highlight.js/lib/languages/lua';
import vimscript from 'highlight.js/lib/languages/vim';
import { useEffect, useRef } from 'react';
import 'highlight.js/styles/night-owl.css';

hljs.registerLanguage('lua', lua);
hljs.registerLanguage('vim', vimscript);

export default function CodeSnippet() {
    const codeRef = useRef<HTMLElement>(null);

    useEffect(() => {
        if (codeRef.current) {
            hljs.highlightElement(codeRef.current);
        }
    }, []);

    return (
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
    );
}
