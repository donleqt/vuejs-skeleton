export const selectMainMenu = (state, getter, rootState) => state.websiteConfig.data && state.websiteConfig.data.mainMenu;

export const selectFooterMenu = (state, getter, rootState) => state.websiteConfig.data && state.websiteConfig.data.footerMenu;

export const selectSocialLinks = (state, getter, rootState) => state.websiteConfig.data && state.websiteConfig.data.socialLinks;

export const selectThemeColors = (state, getter, rootState) => state.websiteConfig.data && state.websiteConfig.data.themeColors;

export const selectSeoInfo = (state, getter, rootState) => state.websiteConfig.data && state.websiteConfig.data.seo;

export const selectLogo = (state, getter, rootState) => state.websiteConfig.data && state.websiteConfig.data.logo;

export const selectWebsiteConfig = (state, getter, rootState) => state.websiteConfig;

export const selectStaticPages = (state, getter, rootState) => state.websiteConfig.data && state.websiteConfig.data.staticPages;
