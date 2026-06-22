"use client";

import Cursor from "@/components/ui/cursor";
import useHasMouse from "@/hooks/use-has-mouse";

export function SiteCursor() {
    const hasMouse = useHasMouse();

    if (!hasMouse) {
        return null;
    }

    return <Cursor />;
}
