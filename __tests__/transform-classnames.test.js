const babel = require('@babel/core');
const plugin = require('./../src/transform-classname'); // Update with your actual file path

const transformCode = (code) => {
  return babel.transform(code, {
    plugins: [plugin],
  }).code;
};

describe('Babel Plugin Transform Classnames', () => {
    it('transforms class names and converts CSS file imports', () => {
        const input = `
          import styles from './styles.css';
      
          function App() {
            return <div className="example" />;
          }
        `;
        const transformedCode = transformCode(input);
        const expectedCode = `
          "use strict";
      
          require("./styles.module.css");
      
          function App() {
            return /*#__PURE__*/React.createElement("div", {
              className: styles.example
            });
          }
        `;
        expect(transformedCode).toBe(expectedCode);
      });
});
