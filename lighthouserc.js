module.exports = {
    ci: {
        collect: {
            startServerCommand: 'npm run start',
            url: ['http://localhost:3000'],
            startServerReadyPattern: 'Ready in',
            numberOfRuns: 3,
            settings: {
                preset: 'desktop',
            },
        },
        upload: {
            target: 'filesystem',
            outputDir: './lhci_reports',
            reportFilenamePattern: '%%PATHNAME%%-%%DATETIME%%-report.%%EXTENSION%%',
        },
        assert: {
            preset: 'lighthouse:no-pwa',
            assertions: {
                'categories:performance': ['warn', { minScore: 0.9 }],
                'categories:accessibility': ['error', { minScore: 0.9 }],
                'categories:best-practices': ['warn', { minScore: 0.9 }],
                'categories:seo': ['warn', { minScore: 0.9 }],
            },
        },
    },
};
