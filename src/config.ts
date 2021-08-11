import configModule from 'config';

type Config = {
    logging: boolean|undefined;
    tracker: {
        wsUrl: string;
    },
    discord: {
        username: string|undefined;
        webhook: string;
    }
}

const validateConfig = (config: any): config is Config => {
    // validate tracker config
    const trackerConfig = config.tracker;
    if (typeof trackerConfig.wsUrl !== 'string') {
        return false;
    }

    // validate discord config
    const discordConfig = config.discord;
    if (typeof discordConfig.webhook !== 'string') {
        return false;
    }

    return true;
}

const loadedConfig = configModule;

if (!validateConfig(loadedConfig)) {
    throw new Error('Config is invalid.');
};

export const config = loadedConfig;