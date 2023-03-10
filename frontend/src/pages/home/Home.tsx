import { Button } from "antd";
import React from "react";
import './home.style.css';

import { useAuth } from "../../contexts/auth-context";

export function Home() {
    const { logout } = useAuth();

    return (
        <div>
            OI
            <Button onClick={logout}>Log out</Button>
        </div>
    )
}