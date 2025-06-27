import { Loader } from "lucide-react";
import React from "react";

export default function StupidLoader() {
    return (
        <div>
            <span>
                stupid Loader... 😅
                <Loader className="animate-spin" />
            </span>
        </div>
    );
}
