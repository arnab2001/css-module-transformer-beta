const babel = require('@babel/core');
const plugin = require('./../src/transform-classname');

const transformCode = (code) => {
  return babel.transform(code, {
    plugins: [plugin],
  }).code;
};

describe('Babel Plugin Transform Classnames', () => {
  it('transforms simple static class name', () => {
    const input = '<div className="example" />';
    const output = transformCode(input);
    expect(output).toMatchSnapshot();
  });

  it('transforms dynamic class name with hyphen', () => {
    const input = '<div className={dynamicClassName} />';
    const output = transformCode(input);
    expect(output).toMatchSnapshot();
  });

  it('does not transform dynamic class name without hyphen', () => {
    const input = '<div className={dynamicClassName} />';
    const output = transformCode(input);
    expect(output).toMatchSnapshot();
  });

  it('leaves other JSX attributes unchanged', () => {
    const input = '<div id="myDiv" data-custom="value" />';
    const output = transformCode(input);
    expect(output).toMatchSnapshot();
  });

  it('transforms CSS file import', () => {
    const input = 'import "./styles.css";';
    const output = transformCode(input);
    expect(output).toMatchSnapshot();
  });
});
