import { SegmentedControl } from "@mantine/core";

function AppSidebar() {
    return (
        <div>
            Here is the sidebar.

            <div>Testing Item</div>
            <SegmentedControl
                data={[
                    { label: 'Item 1', value: 'item1' },
                    { label: 'Item 2', value: 'item2' },
                    { label: 'Item 3', value: 'item3' },
                ]}
            />
        </div>
    );
}

export default AppSidebar;