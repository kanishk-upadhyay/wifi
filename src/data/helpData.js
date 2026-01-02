export const categories = [
    {
        title: "Connection Problems",
        description: "Issues with connecting to WiFi or no internet access.",
        items: [
            {
                q: "No internet connection despite WiFi showing connected",
                a: "If your device shows connected to WiFi but can't access the internet, try restarting your router by unplugging it for 30 seconds. Also check if other devices have the same issue to determine if it's device-specific."
            },
            {
                q: "Can't find or connect to your WiFi network",
                a: "Make sure your WiFi network is broadcasting (not hidden) and within range. Check that you're entering the correct network password. If the network doesn't appear, try restarting your device's WiFi adapter."
            },
            {
                q: "Frequent disconnections from WiFi network",
                a: "Intermittent disconnections can be caused by interference, weak signal, or power management settings. Move closer to the router, check for interference from other devices, and disable power saving mode on your WiFi adapter."
            }
        ]
    },
    {
        title: "Speed & Performance Issues",
        description: "Slow internet speeds, buffering, and latency issues.",
        items: [
            {
                q: "Internet is extremely slow or pages won't load",
                a: "Run a speed test to check your actual speeds against what you're paying for. Clear your browser cache, close unnecessary applications, and try connecting via ethernet cable to test if it's a WiFi-specific issue."
            },
            {
                q: "Video streaming keeps buffering or cutting out",
                a: "Streaming issues are often due to bandwidth limitations or network congestion. Try lowering video quality, pausing other downloads, or upgrading to a higher speed plan if multiple devices are competing for bandwidth."
            },
            {
                q: "WiFi works but is much slower than expected",
                a: "WiFi speeds are typically slower than ethernet. Check your distance from the router, look for interference from microwaves or other 2.4GHz devices, and consider upgrading to a 5GHz network if available."
            }
        ]
    },
    {
        title: "Setup & Configuration",
        description: "Router setup, password changes, and admin settings.",
        items: [
            {
                q: "How to set up a new router or modem",
                a: "Connect your modem to the router via ethernet cable, plug in power, and wait 2-3 minutes for full startup. Use the setup wizard through your browser (usually 192.168.1.1) or the manufacturer's mobile app to configure your network name and password."
            },
            {
                q: "Router lights showing red or orange (error states)",
                a: "Red or orange lights typically indicate connection issues. Check all cable connections, ensure your internet service is active, and try power cycling your modem and router. Contact your ISP if the issue persists after basic troubleshooting."
            },
            {
                q: "Changing WiFi password or network settings",
                a: "Access your router's admin panel by typing its IP address (usually 192.168.1.1 or 192.168.0.1) in your browser. Login with admin credentials and navigate to WiFi or Wireless settings to change your network name, password, or security settings."
            }
        ]
    }
];
