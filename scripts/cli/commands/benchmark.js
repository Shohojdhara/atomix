/**
 * Atomix CLI - Benchmark Command
 * Profiles CLI speed and provides performance metrics
 */

import chalk from 'chalk';
import { logger } from '../utils/logger.js';
import { telemetry } from '../utils/telemetry.js';

/**
 * Benchmark action handler
 */
export async function benchmarkAction(options) {
  logger.info(chalk.blue('📊 CLI Performance Benchmark...'));

  const logs = await telemetry.getLogs();
  
  if (logs.length === 0) {
    logger.warn('No performance data found. Run some commands first!');
    return;
  }

  // Calculate stats
  const stats = calculateStats(logs);

  // Display results
  displayBenchmarkResults(stats);
}

/**
 * Calculate performance statistics from logs
 */
function calculateStats(logs) {
  const byCommand = {};

  logs.forEach(log => {
    if (!byCommand[log.command]) {
      byCommand[log.command] = {
        name: log.command,
        runs: 0,
        successes: 0,
        totalDuration: 0,
        min: Infinity,
        max: -Infinity,
        durations: []
      };
    }

    const cmd = byCommand[log.command];
    cmd.runs++;
    if (log.success) cmd.successes++;
    cmd.totalDuration += log.duration;
    cmd.min = Math.min(cmd.min, log.duration);
    cmd.max = Math.max(cmd.max, log.duration);
    cmd.durations.push(log.duration);
  });

  // Calculate averages and percentiles
  Object.values(byCommand).forEach(cmd => {
    cmd.avg = parseFloat((cmd.totalDuration / cmd.runs).toFixed(2));
    
    // Simple 95th percentile
    cmd.durations.sort((a, b) => a - b);
    const p95Index = Math.floor(cmd.durations.length * 0.95);
    cmd.p95 = cmd.durations[p95Index];
  });

  return Object.values(byCommand);
}

/**
 * Display benchmark results in a clean table
 */
function displayBenchmarkResults(stats) {
  console.log('\n' + chalk.bold.underline('CLI Performance Metrics (Local)'));
  console.log(chalk.gray('Last 100 commands recorded\n'));

  // Header
  console.log(
    chalk.bold(
      'Command'.padEnd(15) + 
      'Runs'.padEnd(8) + 
      'Avg (ms)'.padEnd(12) + 
      'P95 (ms)'.padEnd(12) + 
      'Success Rate'
    )
  );
  console.log(chalk.gray('-'.repeat(60)));

  stats.forEach(s => {
    const successRate = ((s.successes / s.runs) * 100).toFixed(0) + '%';
    const color = s.avg < 1000 ? chalk.green : s.avg < 2000 ? chalk.yellow : chalk.red;
    
    console.log(
      s.name.padEnd(15) + 
      s.runs.toString().padEnd(8) + 
      color(s.avg.toString().padEnd(12)) + 
      color(s.p95.toString().padEnd(12)) + 
      (s.successes === s.runs ? chalk.green(successRate) : chalk.yellow(successRate))
    );
  });

  console.log('\n' + chalk.blue('Performance Budget: ') + chalk.bold('< 2000ms per command'));
}
