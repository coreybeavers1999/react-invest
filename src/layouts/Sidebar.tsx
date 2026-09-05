import { SegmentedControl } from "@mantine/core";
import { useNavigate, useLocation } from "react-router";

function AppSidebar() {
    const navigate = useNavigate();
    const location = useLocation();

    function navigateCalled(val: string) {
        console.log('Navigated to', val)
        navigate(val);
    }

    return (
        <div>
            <SegmentedControl
                orientation="vertical"
                fullWidth
                size="md"
                data={[
                    { label: 'Home', value: '/' },
                    { label: 'Banking', value: '/bank' },
                    { label: 'Stock Market', value: '/stock' },
                ]}
                value={location.pathname}
                onChange={navigateCalled}
            />
        </div>
    );
}

export default AppSidebar;