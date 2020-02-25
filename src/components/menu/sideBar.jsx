import React from 'react'
import {
    Icon,
    Menu,
    Sidebar,
    Loader
} from 'semantic-ui-react'
import { Link } from 'react-router-dom';

import { useLocation } from 'hooks'

export default ({ isSidebarVisible, isMobile, setIsSidebarVisible, store }) => {
    const { pageState, isSync } = useLocation()
    return (
        <div>
            <Sidebar
                as={Menu}
                id='sidebar'
                animation={'push'}
                onHide={() => setIsSidebarVisible(false)}
                vertical
                visible={!isMobile || isSidebarVisible}
            >
                <Loader active={isSync} />
                {isSync || !store || !store.models ? '' : (
                    <Menu.Item>
                        <Menu.Header>Models</Menu.Header>
                        <Menu.Menu>
                            {store.models.map((model, key) => (
                                <Link to={`/models?model=${model.name}`} key={key}>
                                    <Menu.Item
                                        active={pageState.params.model === model.name}>
                                        {model.name}
                                    </Menu.Item>
                                </Link>
                            ))}
                        </Menu.Menu>
                    </Menu.Item>
                            )}
            </Sidebar>
            {isMobile && !isSidebarVisible ?
                <Icon
                    className='showSidebarIcon'
                    size='small'
                    onClick={() => setIsSidebarVisible(true)}
                    name="angle right"
                />
                : ''}
        </div>
    )
}