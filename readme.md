
# CSS Module Transformer Beta
 
A CSS Module Transformer is a NPM package designed to transform classnames in JSX attributes to use CSS modules. This plugin replaces className="example" with  className={styles.example} for static classnames and className={dynamicClassName} with className={styles[dynamicClassName]} for dynamic classnames.


## Features

- Automatic Transformation: The plugin detects and transforms classnames containing hyphens to use CSS modules.
- Static Classnames: Replaces static classnames defined in JSX attributes with the corresponding CSS module syntax.
- Dynamic Classname Support: Seamlessly handle both static and dynamic classnames in JSX
- Preserve other JSX attributes while transforming classnames


## Installation

Install my-project with npm

```bash
npm install -g css-module-transformer-beta
```
    
## Usage
Transform a React or Next.js component file:
```bash

  npx transform-classes ./path/to/YourComponent.js

```
## Examples

#### Input:
```js
import './YourComponent.css';

function YourComponent() {
  return (
    <div className="container">
      <h1 className="title">Hello, CSS Modules!</h1>
    </div>
  );
}

export default YourComponent;

```

#### output

```js

import styles from './YourComponent.module.css';

function YourComponent() {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Hello, CSS Modules!</h1>
    </div>
  );
}

export default YourComponent;
```