// transformClasses.test.js
const { transform } = require('@babel/core');
const transformClasses = require('../lib/transformClasses');

test('transforms class names correctly', () => {
  const code = '<div className="example" />';
  const expected = '<div className={styles["example"]} />';

  const result = transform(code, {
    plugins: [transformClasses],
  }).code;

  expect(result.trim()).toEqual(expected.trim());
});

// Add more tests as needed
