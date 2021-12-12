var toasty = {

    // --- Variables
    container: null,

    styles: {
        "success": {
            icon: `<svg width="24" height="24" viewBox="0 0 24 24" stroke-width="1.5" stroke="#fff" fill="none" stroke-linecap="round" stroke-linejoin="round"><path d="m5 12 5 5L20 7"/></svg>`
        },
        "error": {
            icon: `<svg width="24" height="24" viewBox="0 0 24 24" stroke-width="1.5" stroke="#fff" fill="none" stroke-linecap="round" stroke-linejoin="round"><path d="M12 9v2m0 4v.01M5 19h14a2 2 0 0 0 1.84-2.75L13.74 4a2 2 0 0 0-3.5 0l-7.1 12.25A2 2 0 0 0 4.89 19"/></svg>`
        },
        "info": {
            icon: `<svg width="24" height="24" viewBox="0 0 24 24" stroke-width="1.5" stroke="#fff" fill="none" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="8" x2="12.01" y2="8" /><rect x="4" y="4" width="16" height="16" rx="2" /><polyline points="11 12 12 12 12 16 13 16" /></svg>`
        }
    },

    // --- Functions

    init: function() {
        let el = document.createElement("div");
        el.id = "toasty";

        document.body.appendChild(el);
        this.container = el;

        let style = document.createElement("style");
        style.innerHTML = toastyCss;
        document.head.appendChild(style);
    },

    success: function(message, timeout=null) {
        this._show("success", message, timeout);
    },

    error: function(message, timeout=null) {
        this._show("error", message, timeout);
    },

    info: function(message, timeout=null) {
        this._show("info", message, timeout);
    },

    _show: function(type, message, timeout=null) {
        let id = Math.random().toString(36).replace("0.", "");
        let msg = document.createElement("div");
        msg.innerHTML = `
            <div id="icon">${this.styles[type].icon}</div>
            <div id="message">${message}</div>
            <button onclick="toasty.dismiss('${id}')">&times;</button>
        `;
        msg.id = "toasty-" + id;
        msg.classList.add("message");
        msg.classList.add(type);
        this.container.appendChild(msg);

        if (timeout) {
            msg.style = "--timeout:"+ timeout + "s";
            window.setTimeout(function() { toasty.dismiss(id) }, timeout*1000);
        }
    },

    dismiss: function(id) {
        let message = this.container.querySelector("#toasty-" + id);
        if (message) {
            message.remove();
        }
    }
}

document.addEventListener("DOMContentLoaded", function () {
    toasty.init();
    //toasty.success("Toasty initialized!")
    //toasty.info("Toasty initialized!", 10)
    //toasty.error("Toasty initialized!", 20)
}, false);

// --- CSS Definitions ------------------------------------------------------------------------------------------------

var toastyCss = `
@keyframes timeout {
    0% {
        width: 100%;
    }

    100% {
        width: 0%;
    }
}

#toasty {
    bottom: 1rem;
    display: flex;
    flex-direction: column;
    left: 1rem;
    padding: 0.75rem;
    position: absolute;
    right: 1rem;
}

#toasty .message {
    align-items: center;
    border-radius: 0.25rem;
    display: flex;
    margin-top: 1rem;
    padding: 0.75rem;
    position: relative;
}

#toasty .message #message {
    color: #fff;
    flex: 1 0 auto;
    font-family: sans-serif;
    font-size: 1rem;
    line-height: 1.25rem;
    margin: 0.125rem 1rem;
}

#toasty .message button {
    background: none;
    border-radius: 50%;
    border: none;
    color: #fff;
    cursor: pointer;
    font-size: 1.25rem;
    height: 1.5rem;
    line-height: 1.5rem;
    width: 1.5rem;
}

#toasty .message:after {
    animation-name: timeout;
    animation-duration: var(--timeout);
    animation-timing-function: linear;
    background: rgba(255, 255, 255, 0.5);
    bottom: 0;
    content: " ";
    display: block;
    height: 0.33rem;
    left: 0;
    position: absolute;
    width: 100%;
}

#toasty .message.success {
    background: #31c584;
}

#toasty .message.error {
    background: #c53a31;
}

#toasty .message.info {
    background: #3172c5;
}
`;