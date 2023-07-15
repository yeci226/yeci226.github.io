
// 偵測裝置類型
export const isMobileDevice = () => {
    return /Mobi/i.test(navigator.userAgent);
};

export const SignUpClick = () => {
    window.open('https://forms.gle/Wp4TyX4Gi8cds6Dg9', '_blank');
};

export const DiscordClick = () => {
    window.open('https://discord.gg/qaWtVXq82d', '_blank');
};