/**
 * Atomix Plugin: Style Dictionary
 * Example plugin showing how to extend CLI functionality
 */

export default async function styleDictionaryPlugin(api, options = {}) {
  const { logger, hooks } = api;

  logger.info('Initializing Style Dictionary plugin...');

  // Register a hook to run before generation
  hooks.register('preGenerate', async (data) => {
    logger.debug(`[StyleDictionary] Pre-generation hook for ${data.name}`);
    
    // Example: Add a custom property to the generation data
    return {
      ...data,
      styleDictionary: {
        enabled: true,
        version: options.version || 'latest'
      }
    };
  });

  // Register a hook for validation
  hooks.register('onValidate', async (report) => {
    logger.debug('[StyleDictionary] Validation hook running');
    
    // Add a custom validation check
    if (options.strictMode && !report.styleDictionary) {
      report.issues.push('Missing Style Dictionary configuration');
      report.valid = false;
    }
    
    return report;
  });

  // Register a hook to run after build
  hooks.register('postBuild', async (assets) => {
    logger.info('[StyleDictionary] Post-build processing...');
    // In a real plugin, you might minify assets or upload them here
    return assets;
  });

  logger.debug('Style Dictionary plugin initialized successfully.');
}
