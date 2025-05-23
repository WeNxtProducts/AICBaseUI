import { useEffect, useRef, useState } from "react";

function IFrameSetUp() {
    const iframeRef = useRef(null);
    const [childMessage, setChildMessage] = useState("");
    const [messageToChild, setMessageToChild] = useState("");

    useEffect(() => {
        const handleMessage = (event) => {
            // For production: check event.origin to make sure the message comes from the expected domain.

            if (typeof event.data === "object" && event.data.type) {
                console.log("Parent received message:", event.data);
                switch (event.data.type) {
                    case "USER_DATA":
                        setChildMessage(event.data.payload);
                        break;
                    case "STATUS_UPDATE":
                        console.log("Status update:", event.data.payload);
                        break;
                    default:
                        console.log("Unknown message type:", event.data.type);
                }
            }
        };

        window.addEventListener("message", handleMessage);
        return () => {
            window.removeEventListener("message", handleMessage);
        };
    }, []);

    // Send message to child iframe
    const sendMessageToChild = () => {
        if (iframeRef.current) {
            iframeRef.current.contentWindow.postMessage(
                { type: "PARENT_MESSAGE", payload: messageToChild },
                "*" // In production, replace "*" with the child’s origin (e.g. "http://localhost:3000")
            );
        }
    };

    return (
        <div className="p-4">
            <h1 className="text-xl font-bold mb-4">Parent Next.js App</h1>
            <div className="mb-4">
                <p>
                    Received message from child:{" "}
                    <strong>{childMessage || "No message yet"}</strong>
                </p>
                <input
                    type="text"
                    value={messageToChild}
                    onChange={(e) => setMessageToChild(e.target.value)}
                    className="border p-2 mr-2"
                    placeholder="Type message for child"
                />
                <button
                    onClick={sendMessageToChild}
                    className="bg-blue-500 text-white px-4 py-2 rounded"
                >
                    Send to Child
                </button>
            </div>
            {/* Make sure the iframe src points to the child’s URL */}
            <iframe
                ref={iframeRef}
                src="http://localhost:3000/enquiryView/1"
                width="600"
                height="400"
                title="Child Iframe"
                className="border"
            />
        </div>
    );
}

export default IFrameSetUp;