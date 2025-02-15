module.exports = {
                      moduleFileExtensions: ['js', 'json', 'ts'],
                      rootDir: 'src',
                      testRegex: '.*\\.spec\\.ts$', // بررسی اینکه فقط فایل‌های .spec.ts تست شوند
                      transform: {
                        '^.+\\.(t|j)s$': 'ts-jest', // استفاده از ts-jest برای تبدیل فایل‌های TS به JS
                      },
                      collectCoverageFrom: [
                        '**/*.(t|j)s', // جمع‌آوری پوشش کد از فایل‌های TS و JS
                      ],
                      coverageDirectory: '../coverage', // محل ذخیره گزارشات پوشش کد
                      testEnvironment: 'node', // استفاده از محیط Node.js برای اجرای تست‌ها
                    };
                    