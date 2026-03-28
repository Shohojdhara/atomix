/**
 * Atomix CLI - Local Telemetry system
 * Tracks command execution times and success/failure rates
 */

import { writeFile, readFile, mkdir } from 'fs/promises';
import { join, dirname } from 'path';
import { existsSync } from 'fs';
import { configLoader } from '../internal/config-loader.js';
import { logger } from './logger.js';

class Telemetry {
  constructor() {
    this.logs = [];
    this.startTime = null;
    this.currentCommand = null;
    /** @type {Record<string, unknown>} */
    this.pendingExtra = {};
  }

  /**
   * Merge fields into the next stop() log entry (e.g. generate framework).
   * @param {Record<string, unknown>} extra
   */
  recordExtra(extra) {
    this.pendingExtra = { ...this.pendingExtra, ...extra };
  }

  /**
   * Start tracking a command
   * @param {string} commandName - Name of the command being run
   */
  start(commandName) {
    const config = configLoader.get('telemetry') || {};
    if (!config.enabled) return;

    this.startTime = performance.now();
    this.currentCommand = commandName;
  }

  /**
   * Stop tracking and log the result
   * @param {boolean} success - Whether the command succeeded
   * @param {Object} extra - Extra data to log
   */
  async stop(success = true, extra = {}) {
    const config = configLoader.get('telemetry') || {};
    if (!config.enabled || !this.startTime) return;

    const duration = performance.now() - this.startTime;
    const logEntry = {
      command: this.currentCommand,
      duration: parseFloat(duration.toFixed(2)),
      timestamp: new Date().toISOString(),
      success,
      ...this.pendingExtra,
      ...extra
    };

    this.pendingExtra = {};

    // Anonymize if needed
    if (config.anonymize !== false) {
      delete logEntry.path;
      delete logEntry.source;
    }

    await this._saveLog(logEntry, config.path || '.atomix/telemetry.json');
    this.startTime = null;
  }

  /**
   * Save the log entry to the local file
   * @private
   */
  async _saveLog(entry, logPath) {
    try {
      const fullPath = join(process.cwd(), logPath);
      const dir = dirname(fullPath);

      if (!existsSync(dir)) {
        await mkdir(dir, { recursive: true });
      }

      let logs = [];
      if (existsSync(fullPath)) {
        const content = await readFile(fullPath, 'utf8');
        try {
          logs = JSON.parse(content);
          if (!Array.isArray(logs)) logs = [];
        } catch (e) {
          logs = [];
        }
      }

      logs.push(entry);
      
      // Keep only last 100 logs to prevent file bloat
      if (logs.length > 100) {
        logs = logs.slice(-100);
      }

      await writeFile(fullPath, JSON.stringify(logs, null, 2), 'utf8');
    } catch (error) {
      logger.debug(`Telemetry failed to save: ${error.message}`);
    }
  }

  /**
   * Get all local telemetry logs
   */
  async getLogs() {
    const config = configLoader.get('telemetry') || {};
    const logPath = config.path || '.atomix/telemetry.json';
    const fullPath = join(process.cwd(), logPath);

    if (!existsSync(fullPath)) return [];

    try {
      const content = await readFile(fullPath, 'utf8');
      return JSON.parse(content);
    } catch (e) {
      return [];
    }
  }
}

export const telemetry = new Telemetry();
