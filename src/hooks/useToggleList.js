import { useState } from "react";

const useToggleList = () => {
    const [visible, setVisible] = useState(false);

    const toggle = () => {
        setVisible(prev => !prev)
    };

    return {
        visible,
        toggle
    };
}
export default useToggleList