import React, { useEffect } from 'react';


function ChatWidget() {
    useEffect(() => {
        const loadCrisp = () => {
            window.$crisp = [];
            window.CRISP_WEBSITE_ID = "f54477f9-2ba5-4b0d-9866-bd4600cca472";

            if (!document.querySelector("#crisp-chat-widget-script")) {
                const script = document.createElement("script");
                script.id = "crisp-chat-widget-script";
                script.src = "https://client.crisp.chat/l.js";
                script.async = true;
                document.body.appendChild(script);
            }
        };

        loadCrisp();

        return () => {
            const script = document.querySelector("#crisp-chat-widget-script");
            if (script) {
                document.body.removeChild(script);
            }
            window.$crisp = null;
        };
    }, []);

    return (
        <button
            onClick={() => window.$crisp.push(['do', 'chat:open'])}
            className="fixed bottom-5 right-5 w-12 h-12 bg-blue-600 text-white rounded-full shadow-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-800 focus:ring-offset-2"
        >
            <i className="fas fa-comments"></i>
        </button>
    );
}

export default ChatWidget;