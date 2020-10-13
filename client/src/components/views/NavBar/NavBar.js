import React, { useState } from 'react';
import LeftMenu from './Sections/LeftMenu';
import RightMenu from './Sections/RightMenu';
import { Drawer, Button } from 'antd';
import { AlignRightOutlined } from '@ant-design/icons';
import './Sections/Navbar.css';

function NavBar() {

    const [visible, setvisible] = useState(false);

    const showDrawer = () => {
        setvisible(true);
    };

    const onClose = () => {
        setvisible(false);
    };

    return (
        <nav className="menu">
            <div className="menu__logo">
                <a href="/">Logo</a>
            </div>
            <div className="menu__container">
                <div className="menu__left">
                    <LeftMenu mode="horizontal" />
                </div>
                <div className="menu__right">
                    <RightMenu mode="horizontal" />
                </div>
                <Button
                    className="menu__mobile-button"
                    type="primary"
                    onClick={showDrawer}
                >
                    <AlignRightOutlined />
                </Button>
                <Drawer
                    title="Basic Drawer"
                    placement="right"
                    className="menu_drawer"
                    closable={false}
                    onClose={onClose}
                    visible={visible}
                >
                    <LeftMenu mode="inline" />
                    <RightMenu mode="inline" />
                </Drawer>
            </div>
        </nav>
    );
};

export default NavBar;