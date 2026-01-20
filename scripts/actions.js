const StoppyActions = {
    redirect: (customUrl) => {
        // Fallback to config default if no custom URL is provided
        // TODO: Update this custom redirect
        const target = customUrl || 'suryanshkushwaha.com';

        console.log(`stoppy: Executing redirect to ${target}`);

        if (target) {
            // Check for http or https explicitly
            const finalUrl = /^https?:\/\//i.test(target) ? target : 'https://' + target;
            window.location.href = finalUrl;
        }
    }
};
