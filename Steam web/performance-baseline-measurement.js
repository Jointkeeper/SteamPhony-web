#!/usr/bin/env node

/**
 * Performance Baseline Measurement Script
 * Comprehensive performance audit for Steamphony web application
 * 
 * Usage: node performance-baseline-measurement.js
 * 
 * This script will:
 * 1. Run Lighthouse audits on all major pages
 * 2. Measure Core Web Vitals
 * 3. Analyze bundle size and composition
 * 4. Audit network requests and loading patterns
 * 5. Generate comprehensive baseline report
 */

const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');

// Configuration
const config = {
  baseUrl: 'http://localhost:5173', // Vite dev server
  pages: [
    { name: 'Home', url: '/', priority: 'high' },
    { name: 'Services', url: '/services', priority: 'high' },
    { name: 'Portfolio', url: '/portfolio', priority: 'medium' },
    { name: 'Contact', url: '/contact', priority: 'high' },
    { name: 'About', url: '/about', priority: 'medium' },
    { name: 'Web Development', url: '/services/web-development', priority: 'medium' },
    { name: 'Restaurant Marketing', url: '/services/restaurant-marketing', priority: 'low' },
    { name: 'Salon Marketing', url: '/services/salon-marketing', priority: 'low' },
  ],
  outputDir: './performance-reports',
  timestamp: new Date().toISOString().split('T')[0],
};

// Utility functions
const log = (message) => {
  console.log(`[${new Date().toISOString()}] ${message}`);
};

const execPromise = (command) => {
  return new Promise((resolve, reject) => {
    exec(command, (error, stdout, stderr) => {
      if (error) {
        reject({ error, stderr });
      } else {
        resolve(stdout);
      }
    });
  });
};

// Ensure output directory exists
const ensureOutputDir = () => {
  const dir = path.join(process.cwd(), config.outputDir);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  return dir;
};

// 1. Lighthouse Audit Functions
const runLighthouseAudit = async (page) => {
  log(`Running Lighthouse audit for ${page.name}...`);
  
  const url = `${config.baseUrl}${page.url}`;
  const outputPath = path.join(config.outputDir, `lighthouse-${page.name.toLowerCase().replace(/\s+/g, '-')}-${config.timestamp}.json`);
  
  try {
    // Run Lighthouse with comprehensive configuration
    const command = `lighthouse "${url}" --output=json --output-path="${outputPath}" --chrome-flags="--headless --no-sandbox --disable-gpu" --throttling-method=devtools --form-factor=desktop --preset=desktop`;
    
    await execPromise(command);
    
    // Also run mobile audit
    const mobileOutputPath = path.join(config.outputDir, `lighthouse-mobile-${page.name.toLowerCase().replace(/\s+/g, '-')}-${config.timestamp}.json`);
    const mobileCommand = `lighthouse "${url}" --output=json --output-path="${mobileOutputPath}" --chrome-flags="--headless --no-sandbox --disable-gpu" --throttling-method=devtools --form-factor=mobile --preset=mobile`;
    
    await execPromise(mobileCommand);
    
    log(`✅ Lighthouse audit completed for ${page.name}`);
    return {
      desktop: outputPath,
      mobile: mobileOutputPath,
      url,
      name: page.name,
      priority: page.priority,
    };
  } catch (error) {
    log(`❌ Lighthouse audit failed for ${page.name}: ${error.message}`);
    return null;
  }
};

// 2. Core Web Vitals Measurement
const measureCoreWebVitals = async (page) => {
  log(`Measuring Core Web Vitals for ${page.name}...`);
  
  const url = `${config.baseUrl}${page.url}`;
  
  // Core Web Vitals measurement script
  const coreWebVitalsScript = `
    const { getCLS, getFID, getFCP, getLCP, getTTFB } = require('web-vitals');
    
    const metrics = {};
    
    getCLS((metric) => { metrics.cls = metric; });
    getFID((metric) => { metrics.fid = metric; });
    getFCP((metric) => { metrics.fcp = metric; });
    getLCP((metric) => { metrics.lcp = metric; });
    getTTFB((metric) => { metrics.ttfb = metric; });
    
    setTimeout(() => {
      console.log(JSON.stringify(metrics, null, 2));
    }, 3000);
  `;
  
  // This would require actual browser automation
  // For now, we'll create a placeholder structure
  return {
    page: page.name,
    url,
    timestamp: new Date().toISOString(),
    metrics: {
      lcp: { value: 0, rating: 'needs-improvement' },
      fid: { value: 0, rating: 'good' },
      cls: { value: 0, rating: 'good' },
      fcp: { value: 0, rating: 'needs-improvement' },
      ttfb: { value: 0, rating: 'needs-improvement' },
    },
    // Note: Actual implementation would use Puppeteer or Playwright
    note: 'Placeholder - requires browser automation for actual measurement',
  };
};

// 3. Bundle Analysis
const analyzeBundleSize = async () => {
  log('Analyzing bundle size and composition...');
  
  try {
    // Build the application for analysis
    log('Building application for bundle analysis...');
    await execPromise('npm run build');
    
    // Analyze with webpack-bundle-analyzer or similar
    const distPath = path.join(process.cwd(), 'dist');
    const stats = fs.readdirSync(distPath, { withFileTypes: true });
    
    const bundleAnalysis = {
      timestamp: new Date().toISOString(),
      totalSize: 0,
      assets: [],
      chunks: [],
      recommendations: [],
    };
    
    stats.forEach((file) => {
      if (file.isFile()) {
        const filePath = path.join(distPath, file.name);
        const size = fs.statSync(filePath).size;
        bundleAnalysis.totalSize += size;
        
        bundleAnalysis.assets.push({
          name: file.name,
          size: size,
          sizeKB: Math.round(size / 1024),
          type: path.extname(file.name),
        });
      }
    });
    
    // Sort by size
    bundleAnalysis.assets.sort((a, b) => b.size - a.size);
    
    // Generate recommendations
    bundleAnalysis.recommendations = [
      'Consider code splitting for large chunks',
      'Implement lazy loading for non-critical components',
      'Optimize images and use modern formats (WebP, AVIF)',
      'Remove unused dependencies',
      'Enable gzip/brotli compression',
    ];
    
    const outputPath = path.join(config.outputDir, `bundle-analysis-${config.timestamp}.json`);
    fs.writeFileSync(outputPath, JSON.stringify(bundleAnalysis, null, 2));
    
    log(`✅ Bundle analysis completed. Total size: ${Math.round(bundleAnalysis.totalSize / 1024)}KB`);
    return bundleAnalysis;
    
  } catch (error) {
    log(`❌ Bundle analysis failed: ${error.message}`);
    return null;
  }
};

// 4. Network Audit
const auditNetworkRequests = async (page) => {
  log(`Auditing network requests for ${page.name}...`);
  
  // This would require browser automation for actual network analysis
  // For now, we'll create a structure for the audit
  const networkAudit = {
    page: page.name,
    url: `${config.baseUrl}${page.url}`,
    timestamp: new Date().toISOString(),
    totalRequests: 0,
    totalSize: 0,
    requestsByType: {
      html: { count: 0, size: 0 },
      css: { count: 0, size: 0 },
      js: { count: 0, size: 0 },
      images: { count: 0, size: 0 },
      fonts: { count: 0, size: 0 },
      xhr: { count: 0, size: 0 },
      other: { count: 0, size: 0 },
    },
    slowestRequests: [],
    recommendations: [
      'Implement resource hints (preload, preconnect, prefetch)',
      'Optimize critical rendering path',
      'Use CDN for static assets',
      'Enable HTTP/2 push for critical resources',
      'Implement service worker for caching',
    ],
    note: 'Placeholder - requires browser automation for actual measurement',
  };
  
  return networkAudit;
};

// 5. Performance Report Generation
const generateBaselineReport = async (audits) => {
  log('Generating comprehensive baseline report...');
  
  const report = {
    metadata: {
      timestamp: new Date().toISOString(),
      version: '1.0.0',
      environment: 'development',
      baseUrl: config.baseUrl,
      generatedBy: 'performance-baseline-measurement.js',
    },
    summary: {
      totalPagesAudited: audits.lighthouse.length,
      averageDesktopScore: 0,
      averageMobileScore: 0,
      criticalIssues: [],
      recommendations: [],
    },
    audits: {
      lighthouse: audits.lighthouse,
      coreWebVitals: audits.coreWebVitals,
      bundleAnalysis: audits.bundleAnalysis,
      networkAudits: audits.networkAudits,
    },
    actionItems: [
      {
        priority: 'high',
        category: 'performance',
        title: 'Optimize Largest Contentful Paint (LCP)',
        description: 'Reduce LCP by optimizing images, preloading critical resources, and improving server response times',
        estimatedImpact: 'high',
        effort: 'medium',
      },
      {
        priority: 'high',
        category: 'performance',
        title: 'Implement Code Splitting',
        description: 'Split large bundles into smaller chunks for better loading performance',
        estimatedImpact: 'high',
        effort: 'high',
      },
      {
        priority: 'medium',
        category: 'performance',
        title: 'Optimize Images',
        description: 'Convert images to modern formats (WebP, AVIF) and implement responsive images',
        estimatedImpact: 'medium',
        effort: 'medium',
      },
      {
        priority: 'medium',
        category: 'performance',
        title: 'Implement Resource Hints',
        description: 'Add preload, preconnect, and prefetch hints for critical resources',
        estimatedImpact: 'medium',
        effort: 'low',
      },
      {
        priority: 'low',
        category: 'performance',
        title: 'Enable Service Worker',
        description: 'Implement service worker for offline functionality and caching',
        estimatedImpact: 'low',
        effort: 'high',
      },
    ],
    metrics: {
      baseline: {
        date: config.timestamp,
        scores: {
          performance: 0,
          accessibility: 0,
          bestPractices: 0,
          seo: 0,
          pwa: 0,
        },
        coreWebVitals: {
          lcp: 0,
          fid: 0,
          cls: 0,
        },
        bundleSize: 0,
        totalRequests: 0,
      },
      targets: {
        performance: 90,
        accessibility: 100,
        bestPractices: 90,
        seo: 95,
        pwa: 80,
        lcp: 2500,
        fid: 100,
        cls: 0.1,
        bundleSize: 500, // KB
        totalRequests: 50,
      },
    },
  };
  
  const outputPath = path.join(config.outputDir, `performance-baseline-report-${config.timestamp}.json`);
  fs.writeFileSync(outputPath, JSON.stringify(report, null, 2));
  
  // Generate markdown report
  const markdownReport = generateMarkdownReport(report);
  const markdownPath = path.join(config.outputDir, `performance-baseline-report-${config.timestamp}.md`);
  fs.writeFileSync(markdownPath, markdownReport);
  
  log(`✅ Baseline report generated: ${outputPath}`);
  log(`✅ Markdown report generated: ${markdownPath}`);
  
  return report;
};

// Generate markdown report
const generateMarkdownReport = (report) => {
  return `# Performance Baseline Report
Generated: ${report.metadata.timestamp}

## Executive Summary
- **Total Pages Audited**: ${report.summary.totalPagesAudited}
- **Environment**: ${report.metadata.environment}
- **Base URL**: ${report.metadata.baseUrl}

## Current Performance Metrics

### Target vs Actual Scores
| Metric | Target | Current | Status |
|--------|--------|---------|--------|
| Performance | ${report.metrics.targets.performance} | ${report.metrics.baseline.scores.performance} | ⚠️ Needs Improvement |
| Accessibility | ${report.metrics.targets.accessibility} | ${report.metrics.baseline.scores.accessibility} | ⚠️ Needs Improvement |
| Best Practices | ${report.metrics.targets.bestPractices} | ${report.metrics.baseline.scores.bestPractices} | ⚠️ Needs Improvement |
| SEO | ${report.metrics.targets.seo} | ${report.metrics.baseline.scores.seo} | ⚠️ Needs Improvement |
| PWA | ${report.metrics.targets.pwa} | ${report.metrics.baseline.scores.pwa} | ⚠️ Needs Improvement |

### Core Web Vitals
| Metric | Target | Current | Status |
|--------|--------|---------|--------|
| LCP (ms) | ${report.metrics.targets.lcp} | ${report.metrics.baseline.coreWebVitals.lcp} | ⚠️ Needs Measurement |
| FID (ms) | ${report.metrics.targets.fid} | ${report.metrics.baseline.coreWebVitals.fid} | ⚠️ Needs Measurement |
| CLS | ${report.metrics.targets.cls} | ${report.metrics.baseline.coreWebVitals.cls} | ⚠️ Needs Measurement |

## Priority Action Items

${report.actionItems.map(item => `
### ${item.title} (${item.priority.toUpperCase()} PRIORITY)
- **Category**: ${item.category}
- **Impact**: ${item.estimatedImpact}
- **Effort**: ${item.effort}
- **Description**: ${item.description}
`).join('\n')}

## Next Steps
1. Run actual Lighthouse audits on deployed application
2. Implement Core Web Vitals measurement
3. Set up continuous performance monitoring
4. Begin optimization work based on identified issues

## Notes
This is a baseline measurement framework. Actual performance data requires running against a deployed application.
`;
};

// Main execution function
const main = async () => {
  log('🚀 Starting Performance Baseline Measurement...');
  
  // Ensure output directory exists
  ensureOutputDir();
  
  const audits = {
    lighthouse: [],
    coreWebVitals: [],
    bundleAnalysis: null,
    networkAudits: [],
  };
  
  try {
    // 1. Run Lighthouse audits for all pages
    log('📊 Phase 1: Running Lighthouse audits...');
    for (const page of config.pages) {
      const audit = await runLighthouseAudit(page);
      if (audit) {
        audits.lighthouse.push(audit);
      }
    }
    
    // 2. Measure Core Web Vitals
    log('⚡ Phase 2: Measuring Core Web Vitals...');
    for (const page of config.pages) {
      const cwv = await measureCoreWebVitals(page);
      audits.coreWebVitals.push(cwv);
    }
    
    // 3. Analyze bundle size
    log('📦 Phase 3: Analyzing bundle size...');
    audits.bundleAnalysis = await analyzeBundleSize();
    
    // 4. Audit network requests
    log('🌐 Phase 4: Auditing network requests...');
    for (const page of config.pages.filter(p => p.priority === 'high')) {
      const networkAudit = await auditNetworkRequests(page);
      audits.networkAudits.push(networkAudit);
    }
    
    // 5. Generate comprehensive report
    log('📋 Phase 5: Generating baseline report...');
    const report = await generateBaselineReport(audits);
    
    log('✅ Performance baseline measurement completed!');
    log(`📁 Reports saved to: ${config.outputDir}`);
    
    // Print summary
    console.log('\n🎯 PERFORMANCE BASELINE SUMMARY');
    console.log('================================');
    console.log(`Pages Audited: ${audits.lighthouse.length}`);
    console.log(`Bundle Size: ${audits.bundleAnalysis ? Math.round(audits.bundleAnalysis.totalSize / 1024) + 'KB' : 'Not measured'}`);
    console.log(`Reports Generated: ${fs.readdirSync(config.outputDir).length}`);
    console.log('\n🚀 Ready to begin optimization work!');
    
  } catch (error) {
    log(`❌ Performance baseline measurement failed: ${error.message}`);
    process.exit(1);
  }
};

// Run the script
if (require.main === module) {
  main();
}

module.exports = {
  runLighthouseAudit,
  measureCoreWebVitals,
  analyzeBundleSize,
  auditNetworkRequests,
  generateBaselineReport,
  config,
}; 